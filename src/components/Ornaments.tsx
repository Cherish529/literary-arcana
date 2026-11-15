/**
 * 装饰性雕版纹样
 *
 * 用 SVG 绘制的克制装饰：细线卷草、分隔线、角饰。
 * 不使用 emoji，也不使用现成图标库的符号。
 */

/** 分隔线：中央菱形 + 两侧渐隐细线 */
export function OrnamentDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#b18a50]/55 sm:w-28" />
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M9 1.5L11.5 6.2L16.5 9L11.5 11.8L9 16.5L6.5 11.8L1.5 9L6.5 6.2Z"
          stroke="#b18a50"
          strokeWidth="0.9"
        />
        <circle cx="9" cy="9" r="1.4" fill="#722f36" opacity="0.7" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#b18a50]/55 sm:w-28" />
    </div>
  );
}

/** 卷草纹样：用于段落标题两侧 */
export function Flourish({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="120"
      height="16"
      viewBox="0 0 120 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M0 8h38c8 0 9-6 4-6-3.2 0-3.6 3.2-1 4.4 4 1.8 9-.6 9-4.4 0-2.6-2.2-3.6-3.6-2.6"
        stroke="#b18a50"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M120 8H82c-8 0-9-6-4-6 3.2 0 3.6 3.2 1 4.4-4 1.8-9-.6-9-4.4 0-2.6 2.2-3.6 3.6-2.6"
        stroke="#b18a50"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}

/** 角饰：用于卡片边框的四角 */
export function CornerOrnaments() {
  const corners = [
    { pos: 'top-0 left-0', d: 'M1 14 L1 1 L14 1' },
    { pos: 'top-0 right-0', d: 'M14 1 L1 1 L1 14' },
    { pos: 'bottom-0 left-0', d: 'M1 1 L1 14 L14 14' },
    { pos: 'bottom-0 right-0', d: 'M1 14 L14 14 L14 1' },
  ];

  return (
    <>
      {corners.map((c, i) => (
        <svg
          key={i}
          className={`pointer-events-none absolute h-4 w-4 text-[#b18a50]/55 ${c.pos}`}
          viewBox="0 0 15 15"
          fill="none"
          aria-hidden
        >
          <path d={c.d} stroke="currentColor" strokeWidth="1" />
          <circle cx="4.5" cy="4.5" r="0.9" fill="currentColor" opacity="0.6" />
        </svg>
      ))}
    </>
  );
}

/** 植物卷叶：首页与页角的克制装饰 */
export function BotanicalSprig({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="120"
      height="160"
      viewBox="0 0 120 160"
      fill="none"
      aria-hidden
    >
      {/* 主茎 */}
      <path
        d="M60 158C60 120 58 88 52 58 48 36 46 18 52 4"
        stroke="#24372f"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* 对生叶片 */}
      {[
        { y: 138, s: 1, flip: false },
        { y: 118, s: 0.9, flip: true },
        { y: 98, s: 0.82, flip: false },
        { y: 78, s: 0.72, flip: true },
        { y: 60, s: 0.62, flip: false },
        { y: 44, s: 0.5, flip: true },
        { y: 30, s: 0.38, flip: false },
      ].map((leaf, i) => (
        <g key={i} transform={`translate(58 ${leaf.y}) scale(${leaf.s}) ${leaf.flip ? -1 : 1}`}>
          <path
            d="M0 0C-14-2-22-10-24-20-13-18-4-11 0 0Z"
            fill="#24372f"
            opacity="0.16"
            stroke="#24372f"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          <path
            d="M0 0C-8-6-13-13-15-19"
            stroke="#24372f"
            strokeWidth="0.6"
            opacity="0.4"
          />
        </g>
      ))}
      {/* 顶花 */}
      <g transform="translate(52 4)">
        <path d="M0 0C-7-5-8-13-2-17 4-14 5-6 0 0Z" fill="#722f36" opacity="0.22" stroke="#722f36" strokeWidth="0.9" />
        <path d="M0 0C7-5 8-13 2-17-4-14-5-6 0 0Z" fill="#722f36" opacity="0.16" stroke="#722f36" strokeWidth="0.9" />
        <circle cx="0" cy="-1" r="2" fill="#b18a50" opacity="0.7" />
      </g>
    </svg>
  );
}

/** 印章样式的圆形徽记 */
export function SealEmblem({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden>
      <circle cx="50" cy="50" r="46" stroke="#b18a50" strokeWidth="1" opacity="0.6" />
      <circle cx="50" cy="50" r="41" stroke="#b18a50" strokeWidth="0.6" opacity="0.4" />
      <circle cx="50" cy="50" r="30" stroke="#722f36" strokeWidth="0.8" opacity="0.35" />
      {/* 放射刻线 */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 15 * Math.PI) / 180;
        // 保留三位小数：避免服务端与客户端在浮点序列化精度上不一致
        // （如 20.55513627132909 vs 20.555136271329097）导致 hydration 不匹配
        const r3 = (n: number) => Math.round(n * 1000) / 1000;
        const x1 = r3(50 + Math.cos(angle) * 34);
        const y1 = r3(50 + Math.sin(angle) * 34);
        const x2 = r3(50 + Math.cos(angle) * 39);
        const y2 = r3(50 + Math.sin(angle) * 39);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#b18a50"
            strokeWidth="0.8"
            opacity="0.35"
          />
        );
      })}
      {/* 中心星形 */}
      <path
        d="M50 36L54.2 45.8L64 46L56.5 52.8L58.7 62.5L50 57.5L41.3 62.5L43.5 52.8L36 46L45.8 45.8Z"
        stroke="#722f36"
        strokeWidth="1.1"
        opacity="0.55"
        strokeLinejoin="round"
      />
    </svg>
  );
}
