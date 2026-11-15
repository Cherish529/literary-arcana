'use client';

import Link from 'next/link';

/**
 * 卡牌详情页的上一张 / 下一张导航
 * 纯链接，不需要客户端逻辑，但用 client 组件以便做进入动画。
 */
export function CardDetailNav({
  prev,
  next,
}: {
  prev: { id: string; label: string; sub: string };
  next: { id: string; label: string; sub: string };
}) {
  return (
    <nav
      className="mt-14 grid gap-px overflow-hidden border border-[#29241f]/15 bg-[#29241f]/12 sm:grid-cols-2"
      aria-label="卡牌导航"
    >
      <Link
        href={`/arcana/${prev.id}`}
        className="group flex items-center gap-3 bg-[#f5e9d4]/80 px-5 py-4 transition-colors duration-300 hover:bg-[#e8d4ac]/60"
      >
        <span className="text-[#b18a50] transition-transform duration-300 group-hover:-translate-x-0.5">
          ←
        </span>
        <span className="min-w-0">
          <span className="block font-serif text-[0.72rem] tracking-[0.16em] text-[#8a8075]">
            上一张
          </span>
          <span className="mt-0.5 block truncate font-serif text-[0.98rem] tracking-[0.06em] text-[#24372f] transition-colors group-hover:text-[#722f36]">
            {prev.label}
            <span className="ml-2 text-[0.82rem] text-[#6f655a]">{prev.sub}</span>
          </span>
        </span>
      </Link>

      <Link
        href={`/arcana/${next.id}`}
        className="group flex items-center justify-end gap-3 bg-[#f5e9d4]/80 px-5 py-4 text-right transition-colors duration-300 hover:bg-[#e8d4ac]/60"
      >
        <span className="min-w-0">
          <span className="block font-serif text-[0.72rem] tracking-[0.16em] text-[#8a8075]">
            下一张
          </span>
          <span className="mt-0.5 block truncate font-serif text-[0.98rem] tracking-[0.06em] text-[#24372f] transition-colors group-hover:text-[#722f36]">
            {next.label}
            <span className="ml-2 text-[0.82rem] text-[#6f655a]">{next.sub}</span>
          </span>
        </span>
        <span className="text-[#b18a50] transition-transform duration-300 group-hover:translate-x-0.5">
          →
        </span>
      </Link>
    </nav>
  );
}
