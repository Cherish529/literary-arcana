'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

/**
 * 全站页眉
 * - 移动端使用折叠菜单
 * - 当前页有铜金色下划标记
 */

const NAV_ITEMS = [
  { href: '/', label: '扉页' },
  { href: '/quiz', label: '测试' },
  { href: '/arcana', label: '图鉴' },
  { href: '/about', label: '关于' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // 菜单在每次导航后自动收起。
  // 路由变化时重新挂载导航区，比在 effect 里 setState 更干净。
  const navKey = pathname;

  return (
    <header className="sticky top-0 z-50 border-b border-[#29241f]/12 bg-[#f5e9d4]/88 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-8">
        {/* 品牌 */}
        <Link
          href="/"
          className="group flex items-baseline gap-2.5 transition-opacity hover:opacity-80"
        >
          <span className="font-display text-base tracking-[0.22em] text-[#24372f] sm:text-lg">
            她们的命运之书
          </span>
          <span className="hidden font-display text-[0.6rem] tracking-[0.3em] text-[#6f655a] sm:inline">
            THE LITERARY ARCANA
          </span>
        </Link>

        {/* 桌面导航 */}
        <nav className="hidden items-center gap-9 md:flex" aria-label="主导航">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`relative py-1 font-serif text-[0.9rem] tracking-[0.18em] transition-colors ${
                  active
                    ? 'text-[#722f36]'
                    : 'text-[#4a423a] hover:text-[#722f36]'
                }`}
              >
                {item.label}
                {active && (
                  <span
                    className="absolute -bottom-0.5 left-1/2 h-px w-6 -translate-x-1/2 bg-[#b18a50]"
                    aria-hidden
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* 移动端菜单按钮 */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? '关闭菜单' : '打开菜单'}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] border border-[#29241f]/20 transition-colors hover:border-[#b18a50] md:hidden"
        >
          <span
            className={`h-px w-4 bg-[#29241f] transition-transform duration-300 ${
              open ? 'translate-y-[3px] rotate-45' : ''
            }`}
          />
          <span
            className={`h-px w-4 bg-[#29241f] transition-transform duration-300 ${
              open ? '-translate-y-[3px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* 移动端导航 */}
      <div
        id="mobile-nav"
        key={navKey}
        className={`overflow-hidden border-[#29241f]/12 bg-[#f5e9d4]/97 transition-[max-height,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          open ? 'max-h-72 border-t opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-5 py-3" aria-label="移动端导航">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`border-b border-[#29241f]/8 py-3 font-serif text-[0.95rem] tracking-[0.16em] last:border-b-0 ${
                  active ? 'text-[#722f36]' : 'text-[#4a423a]'
                }`}
              >
                {item.label}
                {active && <span className="ml-2 text-[#b18a50]">·</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
