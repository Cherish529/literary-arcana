import Link from 'next/link';
import { cardsByNumber } from '@/data/tarotCards';
import { TarotCardImage } from '@/components/TarotCardImage';
import { BotanicalSprig, OrnamentDivider, SealEmblem } from '@/components/Ornaments';

/**
 * 首页 — 交互式文学作品的扉页
 * 不一次展示全部信息，只呈现「引子 + 两个入口 + 少量卡牌」。
 */

// 首页展示的三张牌：愚者、星星、世界
const FEATURED_IDS = ['fool', 'star', 'world'];
const FEATURED = FEATURED_IDS.map((id) => cardsByNumber.find((c) => c.id === id)!);

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* 背景装饰 */}
      <BotanicalSprig className="pointer-events-none absolute -left-6 top-24 h-56 w-auto opacity-30 sm:left-4 sm:h-80" />
      <BotanicalSprig className="pointer-events-none absolute -right-6 bottom-32 h-56 w-auto scale-x-[-1] opacity-25 sm:right-4 sm:h-72" />

      {/* ============ 扉页 ============ */}
      <section className="relative px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* 顶部徽记 */}
          <SealEmblem className="mx-auto h-14 w-14 opacity-70 sm:h-16 sm:w-16" />

          {/* 英文副题 */}
          <p className="mt-7 font-display text-[0.58rem] tracking-[0.42em] text-[#6f655a] sm:text-[0.68rem] sm:tracking-[0.5em]">
            THE LITERARY ARCANA
          </p>

          {/* 主标题 */}
          <h1 className="mt-5 font-display text-[2.6rem] leading-[1.15] tracking-[0.08em] text-[#24372f] sm:text-6xl sm:tracking-[0.12em] lg:text-7xl">
            她们的命运之书
          </h1>

          {/* 铜色双线 */}
          <div className="mx-auto mt-8 flex max-w-xs items-center gap-3" aria-hidden>
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#b18a50]/70" />
            <span className="h-1.5 w-1.5 rotate-45 border border-[#b18a50] bg-[#b18a50]/25" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#b18a50]/70" />
          </div>

          {/* 引言 */}
          <p className="mx-auto mt-8 max-w-xl font-serif text-[1.05rem] leading-[2] text-[#4a423a] sm:text-lg sm:leading-[2.1]">
            在无数种女性命运之中，
            <br className="sm:hidden" />
            你会与谁相遇？
          </p>

          <p className="mx-auto mt-6 max-w-md font-serif text-[0.86rem] leading-[1.95] text-[#6f655a]/90">
            二十二张大阿尔卡那，二十二位经典文学中的女性。
            <br className="hidden sm:block" />
            回答十六个情境，让命运之书翻开属于你的那一页。
          </p>

          {/* 入口 */}
          <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <Link
              href="/quiz"
              className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden border border-[#24372f] bg-[#24372f] px-8 py-4 font-serif text-[0.92rem] tracking-[0.2em] text-[#f5e9d4] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-transparent hover:text-[#24372f] sm:w-auto"
            >
              <span className="absolute inset-0 -translate-x-full bg-[#722f36] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
              <span className="relative z-10">开始寻找你的文学原型</span>
              <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/arcana"
              className="inline-flex w-full items-center justify-center gap-2.5 border border-[#29241f]/28 px-8 py-4 font-serif text-[0.92rem] tracking-[0.2em] text-[#4a423a] transition-all duration-400 hover:border-[#b18a50] hover:text-[#722f36] sm:w-auto"
            >
              <span>翻阅文学塔罗图鉴</span>
              <span className="text-[#b18a50]">·</span>
              <span className="font-display text-[0.62rem] tracking-[0.16em] text-[#6f655a]">
                22 CARDS
              </span>
            </Link>
          </div>
        </div>
      </section>

      <OrnamentDivider className="px-5 sm:px-8" />

      {/* ============ 卡牌展示 ============ */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-5xl">
          {/* 三张牌：中间略大，形成层次 */}
          <div className="flex items-end justify-center gap-4 sm:gap-7 lg:gap-10">
            {FEATURED.map((card, i) => {
              const isCenter = i === 1;
              return (
                <Link
                  key={card.id}
                  href={`/arcana/${card.id}`}
                  className={`group relative block w-[30%] max-w-[210px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 ${
                    isCenter
                      ? 'z-10 w-[38%] max-w-[265px]'
                      : 'opacity-90 hover:opacity-100'
                  }`}
                >
                  {/* 卡框 */}
                  <div className="relative border border-[#b18a50]/45 p-1.5 shadow-[0_18px_40px_-18px_rgba(41,36,31,0.5)] transition-shadow duration-700 group-hover:shadow-[0_26px_55px_-18px_rgba(41,36,31,0.6)] sm:p-2">
                    <div className="relative border border-[#29241f]/22">
                      <TarotCardImage
                        src={card.image}
                        alt={`${card.tarotNameZh} · ${card.characterNameZh}`}
                        cardId={card.id}
                        romanNumeral={card.romanNumeral}
                        priority={i === 1}
                        className="aspect-[2/3] w-full"
                        sizes="(max-width: 640px) 38vw, 265px"
                      />
                    </div>
                  </div>

                  {/* 悬停时浮出的牌名 */}
                  <div className="pointer-events-none mt-4 text-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <p className="font-display text-[0.6rem] tracking-[0.28em] text-[#6f655a]">
                      {card.romanNumeral} · {card.tarotNameEn.toUpperCase()}
                    </p>
                    <p className="mt-1 font-serif text-xs tracking-[0.12em] text-[#722f36]">
                      {card.characterNameZh}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* 卡片说明 */}
          <div className="mt-14 grid gap-8 text-center sm:mt-16 sm:grid-cols-3 sm:gap-6">
            {[
              { n: '22', label: '张原创塔罗牌', en: 'TAROT CARDS' },
              { n: '22', label: '位文学女性', en: 'LITERARY FIGURES' },
              { n: '22', label: '种理解世界的方式', en: 'WAYS OF SEEING' },
            ].map((item) => (
              <div key={item.en}>
                <p className="font-display text-4xl tracking-[0.06em] text-[#722f36] sm:text-5xl">
                  {item.n}
                </p>
                <p className="mt-2 font-serif text-sm tracking-[0.14em] text-[#4a423a]">
                  {item.label}
                </p>
                <p className="mt-1 font-display text-[0.55rem] tracking-[0.3em] text-[#6f655a]/70">
                  {item.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 尾注 ============ */}
      <section className="relative border-t border-[#29241f]/12 px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-serif text-[0.86rem] leading-[2.1] text-[#6f655a]">
            这里没有预言，没有诊断，也没有任何试图被量化的你。
            <br className="hidden sm:block" />
            只有二十二个被写下来的人生，与二十二种活法的可能。
          </p>
          <p className="mt-7 font-display text-[0.6rem] tracking-[0.3em] text-[#6f655a]/60">
            A LITERARY EXPLORATION · NOT A FORTUNE TELLING
          </p>
        </div>
      </section>
    </div>
  );
}
