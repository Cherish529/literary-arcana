'use client';

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { TarotCardImage } from '@/components/TarotCardImage';
import { FlipTarotCard } from '@/components/FlipTarotCard';
import { OrnamentDivider, CornerOrnaments, Flourish } from '@/components/Ornaments';
import type { AnswerSet, MatchResult } from '@/lib/matching';
import { DIMENSION_LABELS, DIMENSIONS } from '@/lib/matching';
import {
  buildNarrative,
  buildShareUrl,
  encodeAnswers,
  loadLastResult,
  parseResultFromUrl,
  saveLastResult,
} from '@/lib/results';
import { downloadShareImage, shareSummary } from '@/lib/shareImage';

type Phase = 'loading' | 'revealing' | 'revealed';

interface ResultSource {
  answers: AnswerSet;
  result: MatchResult;
  /** 是否来自 URL 参数 */
  fromUrl: boolean;
}

/**
 * 读取当前应展示的结果。
 *
 * URL 参数优先，其次是本地存储的最近一次结果。
 * 服务端快照返回 null，由客户端水合后填充——
 * 这样既不会有 hydration mismatch，也不需要在 effect 里 setState。
 *
 * ⚠️ getSnapshot 必须返回「引用稳定」的值。
 * 否则 React 认为快照一直在变，导致无限渲染
 * （Maximum update depth exceeded）。
 * 这里用「来源 key + 缓存对象」的方式保证引用稳定。
 */
function useResultSource(): ResultSource | null {
  const cacheRef = useRef<{ key: string; value: ResultSource | null }>({
    key: '',
    value: null,
  });

  const urlSource = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener('storage', onStoreChange);
      return () => window.removeEventListener('storage', onStoreChange);
    },
    () => {
      const fromUrl = parseResultFromUrl();
      if (fromUrl) {
        const key = `url:${encodeAnswers(fromUrl.answers)}`;
        if (cacheRef.current.key !== key) {
          cacheRef.current = {
            key,
            value: {
              answers: fromUrl.answers,
              result: fromUrl.result,
              fromUrl: true,
            },
          };
        }
        return cacheRef.current.value;
      }

      const fromLocal = loadLastResult();
      if (fromLocal) {
        const key = `local:${encodeAnswers(fromLocal.answers)}`;
        if (cacheRef.current.key !== key) {
          cacheRef.current = {
            key,
            value: {
              answers: fromLocal.answers,
              result: fromLocal.result,
              fromUrl: false,
            },
          };
        }
        return cacheRef.current.value;
      }

      if (cacheRef.current.key !== 'empty') {
        cacheRef.current = { key: 'empty', value: null };
      }
      return cacheRef.current.value;
    },
    () => null,
  );

  return urlSource;
}

/**
 * 结果页
 *
 * 流程：读取 URL 参数（或本地记录）→ 卡牌揭晓 → 逐步展开信件
 */
export function ResultClient() {
  const [phase, setPhase] = useState<Phase>('loading');
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // 读取结果：URL 参数优先，其次是本地记录。
  // 用 useSyncExternalStore 读取，避免在 effect 里 setState。
  const source = useResultSource();

  const result = source?.result ?? null;
  const answers = source?.answers ?? null;

  // 若来自 URL，把结果存入本地（供下次直接查看）
  useEffect(() => {
    if (source?.fromUrl && source.answers) {
      saveLastResult(source.answers);
    }
  }, [source]);

  // 揭晓动画：短暂停顿后进入展开阶段
  useEffect(() => {
    if (!result) return;
    const t = window.setTimeout(() => setPhase('revealing'), 1400);
    return () => window.clearTimeout(t);
  }, [result]);

  // 展开完成后进入 revealed
  useEffect(() => {
    if (phase !== 'revealing') return;
    const t = window.setTimeout(() => setPhase('revealed'), 2600);
    return () => window.clearTimeout(t);
  }, [phase]);

  const narrative = useMemo(() => (result ? buildNarrative(result) : null), [result]);

  if (!result || !answers || !narrative) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
        <p className="font-display text-[0.62rem] tracking-[0.34em] text-[#6f655a]">
          {phase === 'loading' ? 'READING' : ''}
        </p>
        <div className="mt-5 h-px w-24 overflow-hidden bg-[#29241f]/12">
          <motion.div
            className="h-full w-1/3 bg-[#b18a50]"
            animate={{ x: ['-100%', '320%'] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <p className="mt-6 font-serif text-sm tracking-[0.14em] text-[#6f655a]/75">
          正在翻阅命运之书……
        </p>
        <Link
          href="/quiz"
          className="mt-8 font-serif text-xs tracking-[0.16em] text-[#722f36] underline decoration-[#b18a50]/45 underline-offset-4"
        >
          若长久停留，请重新开始测试
        </Link>
      </div>
    );
  }

  const card = result.primary;
  const shareUrl = buildShareUrl(answers);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // 剪贴板不可用时，退回到手动复制
      window.prompt('请复制以下链接：', shareUrl);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadShareImage(card);
    } catch {
      // 忽略下载失败
    } finally {
      setDownloading(false);
    }
  };

  return (
    <article className="relative px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-3xl">
        {/* ============ 揭晓段 ============ */}
        <section className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="font-display text-[0.58rem] tracking-[0.38em] text-[#b18a50]"
          >
            YOUR LITERARY ARCANA
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-4 font-serif text-[0.95rem] tracking-[0.14em] text-[#6f655a]"
          >
            最接近的文学原型是
          </motion.p>

          {/* 卡牌：先见统一卡背随后翻出正面，点击可来回翻看 */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-8 w-[62%] max-w-[330px] sm:w-[52%]"
          >
            <div className="group block">
              <div className="relative border border-[#b18a50]/50 p-2 shadow-[0_24px_50px_-22px_rgba(41,36,31,0.6)] transition-shadow duration-500 group-hover:shadow-[0_30px_60px_-22px_rgba(41,36,31,0.7)] sm:p-2.5">
                <div className="relative border border-[#29241f]/22">
                  <FlipTarotCard
                    frontSrc={card.image}
                    frontAlt={`${card.tarotNameZh} · ${card.characterNameZh}`}
                    cardId={card.id}
                    romanNumeral={card.romanNumeral}
                    priority
                    sizes="(max-width: 640px) 62vw, 330px"
                    autoFlipDelay={1400}
                    autoFlipOnView={false}
                  />
                </div>
              </div>
              <p className="mt-3 text-center font-serif text-[0.72rem] tracking-[0.2em] text-[#6f655a]/70">
                轻触卡面可翻看牌背
              </p>
            </div>
          </motion.div>

          {/* 牌名与人物 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-8"
          >
            <p className="font-display text-[0.6rem] tracking-[0.32em] text-[#6f655a]">
              {card.romanNumeral} · {card.tarotNameEn.toUpperCase()}
            </p>
            <h1 className="mt-3 font-display text-3xl tracking-[0.1em] text-[#722f36] sm:text-[2.7rem]">
              {card.tarotNameZh}
            </h1>

            <OrnamentDivider className="mt-6" />

            <p className="mt-5 font-serif text-xl tracking-[0.06em] text-[#24372f] sm:text-2xl">
              {card.characterNameZh}
            </p>
            <p className="mt-1.5 font-serif text-sm tracking-[0.12em] text-[#6f655a]">
              {card.characterNameEn}
            </p>
            <p className="mt-3 font-serif text-[0.92rem] tracking-[0.14em] text-[#6f655a]/85">
              《{card.novelName}》
            </p>
          </motion.div>

          {/* 原型标题 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-7"
          >
            <p className="font-display text-[0.56rem] tracking-[0.34em] text-[#6f655a]">
              YOUR ARCHETYPE
            </p>
            <p className="mt-2.5 font-serif text-[1.3rem] tracking-[0.1em] text-[#24372f] sm:text-[1.5rem]">
              {card.archetype}
            </p>
          </motion.div>
        </section>

        {/* ============ 信件 ============ */}
        <AnimatePresence>
          {phase !== 'loading' && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9 }}
              className="mt-16 border border-[#29241f]/15 bg-[#f5e9d4]/55 p-6 sm:mt-20 sm:p-10"
            >
              <CornerOrnaments />

              {/* 引文（信件开篇） */}
              <blockquote className="relative text-center">
                <p className="font-display text-3xl leading-none text-[#b18a50]/70">「</p>
                <p className="-mt-2 font-serif text-[1.12rem] italic leading-[2] text-[#24372f] text-pretty sm:text-[1.28rem] sm:leading-[2.1]">
                  {card.literaryQuote}
                </p>
                <p className="mt-4 font-serif text-[0.78rem] tracking-[0.1em] text-[#8a8075]">
                  — {card.quoteAttribution}
                </p>
              </blockquote>

              <OrnamentDivider className="mt-9" />

              {/* 导语 */}
              <div className="mt-9">
                <SectionLabel>命运之书写给你的话</SectionLabel>
                <p className="mt-4 font-serif text-[1rem] leading-[2.15] text-[#4a423a] text-pretty sm:text-[1.05rem] sm:leading-[2.2]">
                  {narrative.opening}
                </p>
              </div>

              {/* 为什么匹配 */}
              <div className="mt-10">
                <SectionLabel>为什么与你匹配</SectionLabel>
                <p className="mt-4 font-serif text-[0.97rem] leading-[2.1] text-[#4a423a] text-pretty">
                  {narrative.whyMatched}
                </p>
              </div>

              {/* 六维图示 */}
              <div className="mt-10">
                <SectionLabel>你的六维倾向</SectionLabel>
                <DimensionChart result={result} />
              </div>

              {/* 优势 / 困境 / 建议 */}
              <div className="mt-10 space-y-8">
                <div>
                  <SectionLabel>你的优势</SectionLabel>
                  <p className="mt-4 font-serif text-[0.97rem] leading-[2.1] text-[#4a423a] text-pretty">
                    {narrative.strengths}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {card.strengths.map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <span
                          className="mt-[0.62rem] h-1 w-1 shrink-0 rotate-45 bg-[#b18a50]"
                          aria-hidden
                        />
                        <span className="font-serif text-[0.93rem] leading-[1.9] text-[#4a423a]/90">
                          {s}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <SectionLabel>容易陷入的困境</SectionLabel>
                  <p className="mt-4 font-serif text-[0.97rem] leading-[2.1] text-[#4a423a] text-pretty">
                    {narrative.shadows}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {card.shadowTraits.map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <span
                          className="mt-[0.62rem] h-1 w-1 shrink-0 rotate-45 bg-[#722f36]/55"
                          aria-hidden
                        />
                        <span className="font-serif text-[0.93rem] leading-[1.9] text-[#4a423a]/90">
                          {s}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <SectionLabel>成长建议</SectionLabel>
                  <p className="mt-4 font-serif text-[0.97rem] leading-[2.1] text-[#4a423a] text-pretty">
                    {narrative.advice}
                  </p>
                </div>
              </div>

              {/* 正逆位 */}
              <div className="mt-10 grid gap-px overflow-hidden border border-[#29241f]/15 bg-[#29241f]/12 sm:grid-cols-2">
                <div className="bg-[#f5e9d4]/95 p-5 sm:p-6">
                  <p className="font-display text-[0.58rem] tracking-[0.28em] text-[#24372f]">
                    UPRIGHT · 正位
                  </p>
                  <p className="mt-3.5 font-serif text-[0.9rem] leading-[2] text-[#4a423a] text-pretty">
                    {card.uprightMeaning}
                  </p>
                </div>
                <div className="bg-[#f5e9d4]/95 p-5 sm:p-6">
                  <p className="font-display text-[0.58rem] tracking-[0.28em] text-[#722f36]">
                    REVERSED · 逆位
                  </p>
                  <p className="mt-3.5 font-serif text-[0.9rem] leading-[2] text-[#4a423a] text-pretty">
                    {card.reversedMeaning}
                  </p>
                </div>
              </div>

              {/* 人物介绍 */}
              <div className="mt-10">
                <SectionLabel>关于她</SectionLabel>
                <p className="mt-4 font-serif text-[0.97rem] leading-[2.1] text-[#4a423a] text-pretty">
                  {card.characterBiography}
                </p>
              </div>

              {/* 视觉符号 */}
              <div className="mt-10">
                <SectionLabel>卡面符号</SectionLabel>
                <p className="mt-4 font-serif text-[0.93rem] leading-[2.05] text-[#6f655a] text-pretty">
                  {card.visualSymbolism}
                </p>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ============ 相近角色 ============ */}
        <section className="mt-14 sm:mt-16">
          <div className="flex items-center justify-center gap-4">
            <Flourish className="h-4 w-20 opacity-70" />
            <p className="font-display text-[0.58rem] tracking-[0.3em] text-[#6f655a]">
              ALSO RESONANT
            </p>
            <Flourish className="h-4 w-20 scale-x-[-1] opacity-70" />
          </div>

          <p className="mt-4 text-center font-serif text-[0.9rem] leading-[1.95] text-[#6f655a]/85">
            命运之书还翻到了这两页，与你的某些部分同样相近。
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {result.alternates.map((alt) => (
              <Link
                key={alt.id}
                href={`/arcana/${alt.id}`}
                className="group flex items-center gap-4 border border-[#29241f]/15 bg-[#f5e9d4]/50 p-4 transition-all duration-500 hover:border-[#b18a50]/60 hover:bg-[#e8d4ac]/40"
              >
                <div className="w-[68px] shrink-0 border border-[#b18a50]/40 p-1 sm:w-[80px]">
                  <TarotCardImage
                    src={alt.image}
                    alt={`${alt.tarotNameZh} · ${alt.characterNameZh}`}
                    cardId={alt.id}
                    romanNumeral={alt.romanNumeral}
                    className="aspect-[2/3] w-full"
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-[0.55rem] tracking-[0.24em] text-[#b18a50]">
                    {alt.romanNumeral} · {alt.tarotNameZh}
                  </p>
                  <p className="mt-1.5 font-serif text-[1.02rem] tracking-[0.05em] text-[#24372f]">
                    {alt.characterNameZh}
                  </p>
                  <p className="mt-1 font-serif text-[0.8rem] text-[#6f655a]">
                    《{alt.novelName}》
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ============ 操作 ============ */}
        <section className="mt-14 border-t border-[#29241f]/12 pt-10 sm:mt-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={handleCopy}
              className="group inline-flex items-center justify-center gap-2.5 border border-[#24372f] bg-[#24372f] px-6 py-3.5 font-serif text-[0.88rem] tracking-[0.16em] text-[#f5e9d4] transition-all duration-400 hover:bg-transparent hover:text-[#24372f]"
            >
              <span>{copied ? '链接已复制' : '复制结果链接'}</span>
              <span className="text-[#b18a50]">{copied ? '✓' : '⧉'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center justify-center gap-2.5 border border-[#29241f]/25 px-6 py-3.5 font-serif text-[0.88rem] tracking-[0.16em] text-[#4a423a] transition-all duration-400 hover:border-[#b18a50] hover:text-[#722f36] disabled:opacity-50"
            >
              <span>{downloading ? '正在绘制……' : '下载分享图'}</span>
            </button>

            <Link
              href={`/arcana/${card.id}`}
              className="inline-flex items-center justify-center gap-2.5 border border-[#29241f]/25 px-6 py-3.5 font-serif text-[0.88rem] tracking-[0.16em] text-[#4a423a] transition-all duration-400 hover:border-[#b18a50] hover:text-[#722f36]"
            >
              <span>查看完整图鉴</span>
            </Link>

            <Link
              href="/quiz"
              className="inline-flex items-center justify-center gap-2.5 border border-[#29241f]/25 px-6 py-3.5 font-serif text-[0.88rem] tracking-[0.16em] text-[#4a423a] transition-all duration-400 hover:border-[#b18a50] hover:text-[#722f36]"
            >
              <span>重新测试</span>
            </Link>
          </div>

          {/* 分享摘要 */}
          <p className="mx-auto mt-8 max-w-lg text-center font-serif text-[0.78rem] leading-[1.9] text-[#6f655a]/70">
            {shareSummary(card)}
          </p>
        </section>

        {/* ============ 声明 ============ */}
        <p className="mx-auto mt-12 max-w-lg border-t border-[#29241f]/10 pt-7 text-center font-serif text-[0.76rem] leading-[1.95] text-[#6f655a]/65">
          以上描述依据你在十六道情境题中的作答倾向生成，
          <br className="hidden sm:block" />
          是文学化的自我叙述，不是心理诊断，也不是科学测量结论。
        </p>
      </div>
    </article>
  );
}

/* ---------- 子组件 ---------- */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-6 bg-[#b18a50]" aria-hidden />
      <h2 className="font-display text-[0.62rem] tracking-[0.28em] text-[#722f36]">
        {children}
      </h2>
    </div>
  );
}

/** 六维倾向条形图 */
function DimensionChart({ result }: { result: MatchResult }) {
  return (
    <div className="mt-6 space-y-3.5">
      {DIMENSIONS.map((dim) => {
        const value = result.playerVector[dim];
        const label = DIMENSION_LABELS[dim];
        const width = Math.abs(value) * 50;
        const positive = value >= 0;

        return (
          <div key={dim} className="flex items-center gap-3 sm:gap-4">
            <span className="w-12 shrink-0 text-right font-serif text-[0.78rem] tracking-[0.08em] text-[#6f655a]">
              {label.zh}
            </span>

            {/* 中轴双向条 */}
            <div className="relative h-4 flex-1">
              <div
                className="absolute left-1/2 top-0 h-full w-px bg-[#29241f]/18"
                aria-hidden
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${width}%` }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute top-1/2 h-[7px] -translate-y-1/2 ${
                  positive
                    ? 'left-1/2 bg-[#722f36]/75'
                    : 'right-1/2 bg-[#b18a50]/85'
                }`}
              />
            </div>

            <span className="w-16 shrink-0 font-serif text-[0.72rem] tracking-[0.06em] text-[#8a8075]">
              {positive ? label.high : label.low}
            </span>
          </div>
        );
      })}
    </div>
  );
}
