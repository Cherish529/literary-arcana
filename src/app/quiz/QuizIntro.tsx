'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { TOTAL_QUESTIONS } from '@/data/questions';
import { OrnamentDivider, SealEmblem } from '@/components/Ornaments';

interface QuizIntroProps {
  hasSavedProgress: boolean;
  savedCount: number;
  onStart: () => void;
  onResume: () => void;
  onRestart: () => void;
}

/**
 * 测试介绍页
 * 说明测试性质、所需时间，并提供开始/继续入口。
 */
export function QuizIntro({
  hasSavedProgress,
  savedCount,
  onStart,
  onResume,
  onRestart,
}: QuizIntroProps) {
  return (
    <div className="relative px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-2xl">
        {/* 徽记 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <SealEmblem className="mx-auto h-16 w-16 opacity-70 sm:h-20 sm:w-20" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-center"
        >
          <p className="font-display text-[0.58rem] tracking-[0.38em] text-[#b18a50]">
            THE READING
          </p>
          <h1 className="mt-4 font-display text-3xl tracking-[0.1em] text-[#24372f] sm:text-[2.6rem]">
            命运之书
          </h1>

          <OrnamentDivider className="mt-7" />

          <p className="mx-auto mt-7 max-w-lg font-serif text-[0.98rem] leading-[2.05] text-[#4a423a] text-pretty sm:text-[1.05rem]">
            接下来的 {TOTAL_QUESTIONS} 个问题，都以情境的形式出现。
            <br className="hidden sm:block" />
            没有对错，没有计分提示——
            <br className="hidden sm:block" />
            请凭第一直觉作答，那通常最接近你。
          </p>
        </motion.div>

        {/* 说明条目 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-11 grid gap-px overflow-hidden border border-[#29241f]/15 bg-[#29241f]/12 sm:grid-cols-3"
        >
          {[
            { n: '01', t: '情境作答', d: '每个选项都不比别的更好' },
            { n: '02', t: '六维评估', d: '自由、情感、秩序等六项' },
            { n: '03', t: '确定性匹配', d: '同样的答案得到同样的结果' },
          ].map((item) => (
            <div key={item.n} className="bg-[#f5e9d4]/90 px-5 py-6 text-center">
              <p className="font-display text-[0.62rem] tracking-[0.26em] text-[#b18a50]">
                {item.n}
              </p>
              <p className="mt-2.5 font-serif text-[0.95rem] tracking-[0.1em] text-[#24372f]">
                {item.t}
              </p>
              <p className="mt-1.5 font-serif text-[0.78rem] leading-relaxed text-[#6f655a]">
                {item.d}
              </p>
            </div>
          ))}
        </motion.div>

        {/* 入口 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
          className="mt-11"
        >
          {hasSavedProgress ? (
            <div className="flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={onResume}
                className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden border border-[#24372f] bg-[#24372f] px-8 py-4 font-serif text-[0.92rem] tracking-[0.2em] text-[#f5e9d4] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-transparent hover:text-[#24372f] sm:w-auto"
              >
                <span className="absolute inset-0 -translate-x-full bg-[#722f36] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
                <span className="relative z-10">
                  继续作答（已完成 {savedCount} / {TOTAL_QUESTIONS}）
                </span>
              </button>

              <button
                type="button"
                onClick={onRestart}
                className="font-serif text-xs tracking-[0.16em] text-[#6f655a] underline decoration-[#b18a50]/45 underline-offset-4 transition-colors hover:text-[#722f36]"
              >
                放弃进度，从头开始
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={onStart}
                className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden border border-[#24372f] bg-[#24372f] px-8 py-4 font-serif text-[0.92rem] tracking-[0.2em] text-[#f5e9d4] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-transparent hover:text-[#24372f] sm:w-auto"
              >
                <span className="absolute inset-0 -translate-x-full bg-[#722f36] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
                <span className="relative z-10">开始阅读</span>
                <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </button>

              <Link
                href="/arcana"
                className="font-serif text-xs tracking-[0.16em] text-[#6f655a] underline decoration-[#b18a50]/45 underline-offset-4 transition-colors hover:text-[#722f36]"
              >
                或者，先去翻阅图鉴
              </Link>
            </div>
          )}
        </motion.div>

        {/* 声明 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-12 max-w-lg border-t border-[#29241f]/12 pt-7 text-center font-serif text-[0.78rem] leading-[1.95] text-[#6f655a]/80"
        >
          这不是心理测量，也不是命运预测。
          <br />
          它是一套象征性的叙事框架——用来帮助你想象自己的另一种可能。
        </motion.p>
      </div>
    </div>
  );
}
