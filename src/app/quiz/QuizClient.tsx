'use client';

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { questions, TOTAL_QUESTIONS } from '@/data/questions';
import type { AnswerSet } from '@/lib/matching';
import { encodeAnswers } from '@/lib/results';
import { QuizIntro } from './QuizIntro';
import { OrnamentDivider } from '@/components/Ornaments';

/**
 * 性格测试主体
 *
 * 流程：介绍页 → 逐题作答 → 结果
 * - 每次一题，可返回修改
 * - 进度写入 localStorage，刷新可恢复
 */

const STORAGE_KEY = 'literary-arcana:quiz-progress';

interface SavedProgress {
  answers: AnswerSet;
  currentIndex: number;
}

/* ------------------------------------------------------------------ */
/* localStorage 存取                                                   */
/* ------------------------------------------------------------------ */

function writeProgress(progress: SavedProgress): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // 忽略隐私模式下的写入失败
  }
}

function removeProgress(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // 忽略
  }
}

/**
 * 用 useSyncExternalStore 读取本地进度。
 *
 * 服务端返回 null（未水合），客户端返回实际值，
 * 由 React 处理两者不一致的情况，避免 hydration mismatch，
 * 也不需要在 effect 里 setState。
 *
 * ⚠️ getSnapshot 必须返回「引用稳定」的值。
 * 如果每次都 JSON.parse 出新对象，React 会认为快照一直在变，
 * 从而触发无限渲染（Maximum update depth exceeded）。
 * 因此这里缓存解析结果：只有当 localStorage 中的原始字符串
 * 真正改变时，才返回新的对象引用。
 */
let cachedRaw: string | null = null;
let cachedValue: SavedProgress | null = null;

function readProgressSnapshot(): SavedProgress | null {
  if (typeof window === 'undefined') return null;

  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }

  if (raw === cachedRaw) return cachedValue;

  cachedRaw = raw;
  cachedValue = null;

  if (raw) {
    try {
      const parsed = JSON.parse(raw) as SavedProgress;
      if (parsed && parsed.answers && typeof parsed.answers === 'object') {
        cachedValue = parsed;
      }
    } catch {
      cachedValue = null;
    }
  }

  return cachedValue;
}

function useSavedProgress(): SavedProgress | null {
  return useSyncExternalStore(
    // subscribe：localStorage 在同标签页内的 storage 事件
    (onStoreChange) => {
      window.addEventListener('storage', onStoreChange);
      return () => window.removeEventListener('storage', onStoreChange);
    },
    // getSnapshot：客户端
    readProgressSnapshot,
    // getServerSnapshot：服务端
    () => null,
  );
}

/**
 * 一个「永不变化」的订阅，用于只需要区分服务端/客户端快照的场景。
 */
function subscribeToNothing(onStoreChange: () => void): () => void {
  return () => {
    void onStoreChange;
  };
}

/* ------------------------------------------------------------------ */
/* 主体                                                                */
/* ------------------------------------------------------------------ */

export function QuizClient() {
  const router = useRouter();
  const saved = useSavedProgress();

  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<AnswerSet>({});
  const [index, setIndex] = useState(0);

  // 水合标记：服务端渲染时 localStorage 不可用，而客户端水合后可能读到已有进度。
  // 若直接依据 saved 渲染「继续作答」按钮，会造成 hydration mismatch。
  // 因此：水合完成前，一律按「无存档」渲染。
  // 用 useSyncExternalStore 读取一个「是否已水合」的常量：
  // 服务端恒为 false，客户端首次渲染即为 true，
  // React 会在水合后自动重渲染，无需在 effect 里 setState。
  const hydrated = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

  // 载入本地进度：采用 React 官方推荐的「渲染期调整 state」模式。
  // 这比 useEffect + setState 更好：没有级联渲染，也不会触发
  // react-hooks/set-state-in-effect 规则。
  const [restoredKey, setRestoredKey] = useState<string | null>(null);
  const savedKey = saved ? `${saved.currentIndex}:${Object.keys(saved.answers).length}` : null;

  if (saved && savedKey !== null && savedKey !== restoredKey) {
    setRestoredKey(savedKey);
    setAnswers(saved.answers);
    setIndex(saved.currentIndex);
  }

  // 持久化
  useEffect(() => {
    if (!started) return;
    writeProgress({ answers, currentIndex: index });
  }, [answers, index, started]);

  const question = questions[index];

  // 最后一题作答后暂存答案，由下面的 effect 统一跳转。
  // 用 state 而非 ref：ref 的变更不会触发 effect 重跑。
  const [pendingResult, setPendingResult] = useState<AnswerSet | null>(null);

  // 最后一题：短暂停顿后跳转结果页
  useEffect(() => {
    if (!pendingResult) return;
    const encoded = encodeAnswers(pendingResult);

    const timer = window.setTimeout(() => {
      router.push(`/result?r=${encodeURIComponent(encoded)}`);
    }, 320);

    return () => window.clearTimeout(timer);
  }, [pendingResult, router]);

  const choose = useCallback(
    (optionId: string) => {
      // 先在 updater 之外算出完整的答案集，
      // 保证 setState 的 updater 保持纯粹（React 可能重复调用它）。
      const nextAnswers: AnswerSet = { ...answers, [question.id]: optionId };
      setAnswers(nextAnswers);

      // 最后一题：短暂停顿后跳转结果页
      if (index === questions.length - 1) {
        setPendingResult(nextAnswers);
      }
    },
    [answers, index, question.id],
  );

  const goNext = useCallback(() => {
    if (!answers[question.id]) return;
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
    } else {
      // 最后一题：点击「即将揭晓」直接前往结果页
      setPendingResult(answers);
    }
  }, [answers, index, question.id]);

  const goBack = useCallback(() => {
    if (index > 0) {
      setIndex((i) => i - 1);
    }
  }, [index]);

  const restart = useCallback(() => {
    removeProgress();
    setAnswers({});
    setIndex(0);
    setStarted(true);
  }, []);

  // 键盘操作：数字键选择，方向键导航
  useEffect(() => {
    if (!started) return;

    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.key >= '1' && e.key <= '4') {
        const opt = question.options[Number(e.key) - 1];
        if (opt) {
          e.preventDefault();
          choose(opt.id);
        }
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goBack();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [started, question, choose, goNext, goBack]);

  if (!started) {
    // 水合完成前不读取 localStorage，避免服务端/客户端渲染结果不一致
    const savedCount = hydrated && saved ? Object.keys(saved.answers).length : 0;

    return (
      <QuizIntro
        hasSavedProgress={savedCount > 0}
        savedCount={savedCount}
        onStart={() => setStarted(true)}
        onResume={() => setStarted(true)}
        onRestart={restart}
      />
    );
  }

  const progress = ((index + 1) / TOTAL_QUESTIONS) * 100;
  const selected = answers[question.id];
  const isLast = index === questions.length - 1;

  return (
    <div className="relative px-5 py-12 sm:px-8 sm:py-16">
      {/* 顶部进度 */}
      <div className="mx-auto max-w-2xl">
        <div className="flex items-end justify-between">
          <p className="font-display text-[0.6rem] tracking-[0.3em] text-[#6f655a]">
            QUESTION{' '}
            <span className="text-[1.15rem] tracking-[0.1em] text-[#722f36]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-[#b18a50]"> / {TOTAL_QUESTIONS}</span>
          </p>
          <button
            type="button"
            onClick={restart}
            className="font-serif text-xs tracking-[0.16em] text-[#6f655a] underline decoration-[#b18a50]/45 underline-offset-4 transition-colors hover:text-[#722f36]"
          >
            重新开始
          </button>
        </div>

        {/* 进度条 */}
        <div
          className="mt-3 h-[3px] w-full bg-[#29241f]/10"
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={TOTAL_QUESTIONS}
        >
          <motion.div
            className="h-full bg-[#722f36]"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      {/* 题目 */}
      <div className="mx-auto mt-10 max-w-2xl sm:mt-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 26 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -26 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {question.context && (
              <p className="font-display text-[0.58rem] tracking-[0.34em] text-[#b18a50]">
                {question.context.toUpperCase()}
              </p>
            )}

            <h2 className="mt-4 font-serif text-[1.35rem] leading-[1.85] text-[#24372f] text-pretty sm:text-[1.6rem] sm:leading-[1.9]">
              {question.prompt}
            </h2>

            <OrnamentDivider className="mt-7 !justify-start" />

            {/* 选项 */}
            <div className="mt-8 space-y-3.5" role="radiogroup" aria-label={question.prompt}>
              {question.options.map((option, i) => {
                const active = selected === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => choose(option.id)}
                    className={`group relative flex w-full items-start gap-4 border px-4 py-4 text-left transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-5 sm:py-[1.15rem] ${
                      active
                        ? 'border-[#722f36]/55 bg-[#722f36]/[0.055]'
                        : 'border-[#29241f]/18 bg-[#f5e9d4]/40 hover:border-[#b18a50]/70 hover:bg-[#e8d4ac]/45'
                    }`}
                  >
                    {/* 选项字母 */}
                    <span
                      className={`mt-[3px] flex h-6 w-6 shrink-0 items-center justify-center border font-display text-[0.6rem] tracking-[0.08em] transition-all duration-400 ${
                        active
                          ? 'border-[#722f36] bg-[#722f36] text-[#f5e9d4]'
                          : 'border-[#29241f]/25 text-[#6f655a] group-hover:border-[#b18a50] group-hover:text-[#722f36]'
                      }`}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>

                    <span
                      className={`font-serif text-[0.97rem] leading-[1.85] transition-colors duration-300 sm:text-[1.02rem] ${
                        active ? 'text-[#24372f]' : 'text-[#4a423a] group-hover:text-[#24372f]'
                      }`}
                    >
                      {option.text}
                    </span>

                    {/* 选中标记 */}
                    {active && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute right-4 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rotate-45 bg-[#722f36]"
                        aria-hidden
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 导航 */}
        <div className="mt-9 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={goBack}
            disabled={index === 0}
            className="group inline-flex items-center gap-2 border border-[#29241f]/20 px-5 py-3 font-serif text-[0.85rem] tracking-[0.16em] text-[#4a423a] transition-all duration-300 hover:border-[#b18a50] hover:text-[#722f36] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[#29241f]/20 disabled:hover:text-[#4a423a]"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-0.5">←</span>
            上一题
          </button>

          <div className="hidden items-center gap-1.5 sm:flex" aria-hidden>
            {questions.map((q, i) => (
              <span
                key={q.id}
                className={`h-1 w-1.5 rounded-full transition-all duration-400 ${
                  i === index
                    ? 'w-4 bg-[#722f36]'
                    : answers[q.id]
                      ? 'bg-[#b18a50]'
                      : 'bg-[#29241f]/15'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={!selected}
            className="group inline-flex items-center gap-2 border border-[#24372f] bg-[#24372f] px-5 py-3 font-serif text-[0.85rem] tracking-[0.16em] text-[#f5e9d4] transition-all duration-300 hover:bg-transparent hover:text-[#24372f] disabled:cursor-not-allowed disabled:border-[#29241f]/15 disabled:bg-transparent disabled:text-[#6f655a]/45"
          >
            {isLast ? '即将揭晓' : '下一题'}
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </button>
        </div>

        {/* 键盘提示 */}
        <p className="mt-7 text-center font-serif text-[0.72rem] tracking-wider text-[#6f655a]/60">
          按数字键 1–4 可直接选择 · 方向键可翻页
        </p>
      </div>
    </div>
  );
}
