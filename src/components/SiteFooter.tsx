import Link from 'next/link';

/** 全站页脚 */
export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-[#29241f]/15 bg-[#e8d4ac]/40">
      {/* 顶部铜色细线 */}
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#b18a50]/45 to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* 左：品牌说明 */}
          <div className="max-w-sm">
            <p className="font-display text-base tracking-[0.24em] text-[#24372f]">
              她们的命运之书
            </p>
            <p className="mt-1 font-display text-[0.6rem] tracking-[0.3em] text-[#6f655a]">
              THE LITERARY ARCANA
            </p>
            <p className="mt-5 font-serif text-[0.85rem] leading-relaxed text-[#4a423a]/80">
              二十二张牌，二十二位女性，二十二种理解世界的方式。
              <br />
              这是一套象征性的叙事框架，不是命运预测，也不是心理诊断。
            </p>
          </div>

          {/* 右：导航 */}
          <div className="flex gap-12 sm:gap-16">
            <div>
              <p className="font-serif text-xs tracking-[0.25em] text-[#6f655a]">浏览</p>
              <ul className="mt-4 space-y-2.5">
                {[
                  { href: '/', label: '扉页' },
                  { href: '/quiz', label: '开始测试' },
                  { href: '/arcana', label: '文学塔罗图鉴' },
                  { href: '/about', label: '关于本项目' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-serif text-sm text-[#4a423a] transition-colors hover:text-[#722f36]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-serif text-xs tracking-[0.25em] text-[#6f655a]">说明</p>
              <ul className="mt-4 space-y-2.5 font-serif text-sm text-[#4a423a]/75">
                <li>非科学心理测量</li>
                <li>非命运占卜</li>
                <li>无账号 · 本地保存</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="mt-12 flex flex-col gap-3 border-t border-[#29241f]/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-xs tracking-wider text-[#6f655a]/80">
            卡面由本站作者独立设计 · 文学形象版权归原作者所有
          </p>
          <p className="font-display text-[0.6rem] tracking-[0.28em] text-[#6f655a]/60">
            MEMENTO MORI · MEMENTO LITERAE
          </p>
        </div>
      </div>
    </footer>
  );
}
