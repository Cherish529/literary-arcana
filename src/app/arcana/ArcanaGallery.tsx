'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cardsByNumber, allNovels } from '@/data/tarotCards';
import { TarotCardImage } from '@/components/TarotCardImage';
import { OrnamentDivider } from '@/components/Ornaments';

/**
 * 文学塔罗图鉴
 * - 按大阿尔卡那编号排序
 * - 支持按牌名 / 角色名 / 作品名搜索
 * - 支持按作品筛选
 */
export function ArcanaGallery() {
  const [query, setQuery] = useState('');
  const [novel, setNovel] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return cardsByNumber.filter((card) => {
      if (novel && card.novelName !== novel) return false;
      if (!q) return true;

      return (
        card.tarotNameZh.toLowerCase().includes(q) ||
        card.tarotNameEn.toLowerCase().includes(q) ||
        card.characterNameZh.toLowerCase().includes(q) ||
        card.characterNameEn.toLowerCase().includes(q) ||
        card.novelName.toLowerCase().includes(q) ||
        card.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [query, novel]);

  return (
    <div className="px-5 pb-20 sm:px-8">
      {/* ============ 工具栏 ============ */}
      <div className="mx-auto max-w-4xl">
        {/* 搜索 */}
        <div className="relative">
          <label htmlFor="arcana-search" className="sr-only">
            搜索塔罗牌、角色名或文学作品
          </label>
          <svg
            className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a8075]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            id="arcana-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索牌名、角色或作品……"
            className="w-full border-b border-[#29241f]/22 bg-transparent py-3 pl-7 pr-2 font-serif text-[0.95rem] text-[#24372f] placeholder:text-[#8a8075]/70 focus:border-[#b18a50] focus:outline-none"
          />
        </div>

        {/* 作品筛选 */}
        <div className="mt-6">
          <p className="font-display text-[0.56rem] tracking-[0.3em] text-[#6f655a]">
            按作品筛选
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <FilterChip active={novel === null} onClick={() => setNovel(null)}>
              全部 {cardsByNumber.length}
            </FilterChip>
            {allNovels.map((n) => (
              <FilterChip
                key={n}
                active={novel === n}
                onClick={() => setNovel(novel === n ? null : n)}
              >
                {n}
              </FilterChip>
            ))}
          </div>
        </div>

        {/* 结果计数 */}
        <div className="mt-7 flex items-center gap-3">
          <span className="h-px flex-1 bg-[#29241f]/12" aria-hidden />
          <p className="font-serif text-[0.8rem] tracking-[0.14em] text-[#6f655a]">
            {filtered.length} 张牌
          </p>
          <span className="h-px flex-1 bg-[#29241f]/12" aria-hidden />
        </div>
      </div>

      {/* ============ 网格 ============ */}
      {filtered.length === 0 ? (
        <div className="mx-auto mt-16 max-w-md text-center">
          <p className="font-display text-3xl text-[#b18a50]/50">◦</p>
          <p className="mt-4 font-serif text-lg tracking-[0.08em] text-[#4a423a]">
            没有找到相符的牌
          </p>
          <p className="mt-2.5 font-serif text-sm leading-relaxed text-[#6f655a]/80">
            试试换一个词，或取消作品筛选。
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setNovel(null);
            }}
            className="mt-6 font-serif text-xs tracking-[0.16em] text-[#722f36] underline decoration-[#b18a50]/45 underline-offset-4"
          >
            清除全部筛选
          </button>
        </div>
      ) : (
        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8">
          {filtered.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.6,
                delay: Math.min(i * 0.04, 0.4),
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link href={`/arcana/${card.id}`} className="group block">
                {/* 卡面 */}
                <div className="relative transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5">
                  <div className="relative border border-[#b18a50]/40 p-1.5 shadow-[0_12px_28px_-16px_rgba(41,36,31,0.55)] transition-all duration-500 group-hover:border-[#b18a50]/75 group-hover:shadow-[0_20px_40px_-16px_rgba(41,36,31,0.6)] sm:p-2">
                    <div className="relative border border-[#29241f]/18">
                      <TarotCardImage
                        src={card.image}
                        alt={`${card.tarotNameZh} · ${card.characterNameZh}`}
                        cardId={card.id}
                        romanNumeral={card.romanNumeral}
                        className="aspect-[2/3] w-full"
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 240px"
                      />
                    </div>
                  </div>

                  {/* 编号角标 */}
                  <span className="absolute -left-1 -top-1 flex h-6 min-w-6 items-center justify-center border border-[#b18a50]/60 bg-[#f5e9d4] px-1 font-display text-[0.58rem] tracking-[0.08em] text-[#722f36]">
                    {card.romanNumeral}
                  </span>
                </div>

                {/* 文字 */}
                <div className="mt-3.5 text-center">
                  <p className="font-display text-[0.56rem] tracking-[0.2em] text-[#6f655a]/75">
                    {card.tarotNameEn.toUpperCase()}
                  </p>
                  <p className="mt-1 font-serif text-[0.95rem] tracking-[0.08em] text-[#24372f] transition-colors duration-300 group-hover:text-[#722f36] sm:text-[1.02rem]">
                    {card.tarotNameZh}
                  </p>
                  <p className="mt-1 font-serif text-[0.8rem] text-[#6f655a]">
                    {card.characterNameZh}
                  </p>
                  <p className="mt-0.5 font-serif text-[0.72rem] tracking-[0.06em] text-[#8a8075]">
                    《{card.novelName}》
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      <OrnamentDivider className="mt-20" />
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-3 py-1.5 font-serif text-[0.8rem] tracking-[0.08em] transition-all duration-300 ${
        active
          ? 'border-[#722f36] bg-[#722f36] text-[#f5e9d4]'
          : 'border-[#29241f]/20 text-[#4a423a] hover:border-[#b18a50] hover:text-[#722f36]'
      }`}
    >
      {children}
    </button>
  );
}
