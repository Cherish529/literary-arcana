import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cardsByNumber } from '@/data/tarotCards';
import { TarotCardImage } from '@/components/TarotCardImage';
import { OrnamentDivider, CornerOrnaments } from '@/components/Ornaments';
import { CardDetailNav } from './CardDetailNav';

interface PageProps {
  params: Promise<{ id: string }>;
}

/** 生成静态参数：22 张牌全部预渲染 */
export function generateStaticParams() {
  return cardsByNumber.map((card) => ({ id: card.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const card = cardsByNumber.find((c) => c.id === id);

  if (!card) {
    return { title: '未找到卡牌' };
  }

  return {
    title: `${card.tarotNameZh} · ${card.characterNameZh}`,
    description: `${card.tarotNameEn} —— ${card.characterNameZh}《${card.novelName}》。${card.shortDescription}`,
    openGraph: {
      title: `${card.tarotNameZh} · ${card.characterNameZh} — 她们的命运之书`,
      description: card.shortDescription,
      images: [{ url: card.image }],
    },
  };
}

export default async function CardDetailPage({ params }: PageProps) {
  const { id } = await params;
  const card = cardsByNumber.find((c) => c.id === id);

  if (!card) notFound();

  const index = cardsByNumber.findIndex((c) => c.id === card.id);
  const prev = cardsByNumber[(index - 1 + cardsByNumber.length) % cardsByNumber.length];
  const next = cardsByNumber[(index + 1) % cardsByNumber.length];

  return (
    <div className="relative px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-5xl">
        {/* ============ 顶部 ============ */}
        <nav className="flex items-center justify-between gap-4">
          <Link
            href="/arcana"
            className="group inline-flex items-center gap-2 font-serif text-[0.82rem] tracking-[0.14em] text-[#6f655a] transition-colors hover:text-[#722f36]"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-0.5">←</span>
            图鉴
          </Link>
          <p className="font-display text-[0.6rem] tracking-[0.28em] text-[#6f655a]">
            {card.romanNumeral} / {cardsByNumber.length}
          </p>
        </nav>

        {/* ============ 主区 ============ */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-14">
          {/* 卡面 */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="mx-auto w-full max-w-[300px] lg:max-w-none">
              <div className="relative border border-[#b18a50]/50 p-2 shadow-[0_24px_50px_-24px_rgba(41,36,31,0.55)] sm:p-2.5">
                <div className="relative border border-[#29241f]/20">
                  <TarotCardImage
                    src={card.image}
                    alt={`${card.tarotNameZh} · ${card.characterNameZh}`}
                    cardId={card.id}
                    romanNumeral={card.romanNumeral}
                    priority
                    className="aspect-[2/3] w-full"
                    sizes="(max-width: 1024px) 300px, 340px"
                  />
                </div>
              </div>

              {/* 关键词 */}
              <div className="mt-6 flex flex-wrap justify-center gap-1.5">
                {card.keywords.map((k) => (
                  <span
                    key={k}
                    className="border border-[#29241f]/15 px-2.5 py-1 font-serif text-[0.72rem] tracking-[0.1em] text-[#6f655a]"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 文字内容 */}
          <div className="min-w-0">
            {/* 牌名 */}
            <div>
              <p className="font-display text-[0.6rem] tracking-[0.32em] text-[#b18a50]">
                {card.romanNumeral} · {card.tarotNameEn.toUpperCase()}
              </p>
              <h1 className="mt-3 font-display text-4xl tracking-[0.08em] text-[#24372f] sm:text-5xl">
                {card.tarotNameZh}
              </h1>

              <OrnamentDivider className="mt-6 !justify-start" />

              <p className="mt-6 font-serif text-[1.3rem] tracking-[0.06em] text-[#722f36] sm:text-[1.45rem]">
                {card.characterNameZh}
              </p>
              <p className="mt-1 font-serif text-[0.86rem] tracking-[0.1em] text-[#6f655a]">
                {card.characterNameEn}
              </p>
              <p className="mt-2.5 font-serif text-[0.92rem] tracking-[0.12em] text-[#6f655a]/85">
                《{card.novelName}》
              </p>

              {/* 原型 */}
              <div className="mt-6 inline-block border border-[#b18a50]/45 px-4 py-2">
                <p className="font-display text-[0.54rem] tracking-[0.26em] text-[#6f655a]">
                  ARCHETYPE
                </p>
                <p className="mt-1 font-serif text-[1.02rem] tracking-[0.08em] text-[#24372f]">
                  {card.archetype}
                </p>
              </div>
            </div>

            {/* 简介 */}
            <p className="mt-9 font-serif text-[1rem] leading-[2.15] text-[#4a423a] text-pretty sm:text-[1.05rem] sm:leading-[2.2]">
              {card.shortDescription}
            </p>

            {/* 正逆位 */}
            <div className="mt-10 grid gap-px overflow-hidden border border-[#29241f]/15 bg-[#29241f]/12 sm:grid-cols-2">
              <div className="bg-[#f5e9d4]/80 p-5 sm:p-6">
                <p className="font-display text-[0.58rem] tracking-[0.26em] text-[#24372f]">
                  UPRIGHT · 正位
                </p>
                <p className="mt-3.5 font-serif text-[0.91rem] leading-[2.05] text-[#4a423a] text-pretty">
                  {card.uprightMeaning}
                </p>
              </div>
              <div className="bg-[#f5e9d4]/80 p-5 sm:p-6">
                <p className="font-display text-[0.58rem] tracking-[0.26em] text-[#722f36]">
                  REVERSED · 逆位
                </p>
                <p className="mt-3.5 font-serif text-[0.91rem] leading-[2.05] text-[#4a423a] text-pretty">
                  {card.reversedMeaning}
                </p>
              </div>
            </div>

            {/* 人格解读 */}
            <section className="relative mt-10 border border-[#29241f]/15 bg-[#f5e9d4]/50 p-6 sm:p-8">
              <CornerOrnaments />

              <h2 className="font-display text-[0.62rem] tracking-[0.28em] text-[#722f36]">
                PERSONA · 人格侧写
              </h2>
              <p className="mt-4 font-serif text-[0.98rem] leading-[2.12] text-[#4a423a] text-pretty">
                {card.personalityDescription}
              </p>

              <div className="mt-8 grid gap-7 sm:grid-cols-2">
                <div>
                  <p className="font-serif text-[0.82rem] tracking-[0.14em] text-[#722f36]">
                    优势
                  </p>
                  <ul className="mt-3.5 space-y-2.5">
                    {card.strengths.map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <span
                          className="mt-[0.62rem] h-1 w-1 shrink-0 rotate-45 bg-[#b18a50]"
                          aria-hidden
                        />
                        <span className="font-serif text-[0.92rem] leading-[1.9] text-[#4a423a]/90">
                          {s}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-serif text-[0.82rem] tracking-[0.14em] text-[#722f36]">
                    阴影面
                  </p>
                  <ul className="mt-3.5 space-y-2.5">
                    {card.shadowTraits.map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <span
                          className="mt-[0.62rem] h-1 w-1 shrink-0 rotate-45 bg-[#722f36]/55"
                          aria-hidden
                        />
                        <span className="font-serif text-[0.92rem] leading-[1.9] text-[#4a423a]/90">
                          {s}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 border-t border-[#29241f]/12 pt-6">
                <p className="font-serif text-[0.82rem] tracking-[0.14em] text-[#722f36]">
                  成长建议
                </p>
                <p className="mt-3 font-serif text-[0.95rem] leading-[2.08] text-[#4a423a] text-pretty">
                  {card.growthAdvice}
                </p>
              </div>
            </section>

            {/* 人物介绍 */}
            <section className="mt-10">
              <h2 className="flex items-center gap-3 font-display text-[0.62rem] tracking-[0.28em] text-[#722f36]">
                <span className="h-px w-6 bg-[#b18a50]" aria-hidden />
                LITERARY FIGURE · 人物与故事
              </h2>
              <p className="mt-4 font-serif text-[0.98rem] leading-[2.12] text-[#4a423a] text-pretty">
                {card.characterBiography}
              </p>
            </section>

            {/* 视觉符号 */}
            <section className="mt-10">
              <h2 className="flex items-center gap-3 font-display text-[0.62rem] tracking-[0.28em] text-[#722f36]">
                <span className="h-px w-6 bg-[#b18a50]" aria-hidden />
                VISUAL SYMBOLISM · 卡面符号
              </h2>
              <p className="mt-4 font-serif text-[0.95rem] leading-[2.08] text-[#6f655a] text-pretty">
                {card.visualSymbolism}
              </p>
            </section>

            {/* 引文 */}
            <section className="mt-10 border-l-2 border-[#b18a50]/60 pl-5 sm:pl-6">
              <blockquote>
                <p className="font-serif text-[1.05rem] italic leading-[2.05] text-[#24372f] text-pretty sm:text-[1.12rem]">
                  「{card.literaryQuote}」
                </p>
                <footer className="mt-3 font-serif text-[0.8rem] tracking-[0.08em] text-[#8a8075]">
                  — {card.quoteAttribution}
                </footer>
                {card.quoteType === 'original' && (
                  <p className="mt-2.5 font-serif text-[0.72rem] leading-relaxed text-[#8a8075]/80">
                    本句为本站原创的文学箴言，灵感来自该人物的精神气质，
                    并非原著中的原话。
                  </p>
                )}
              </blockquote>
            </section>

            {/* 导航 */}
            <CardDetailNav
              prev={{ id: prev.id, label: prev.tarotNameZh, sub: prev.characterNameZh }}
              next={{ id: next.id, label: next.tarotNameZh, sub: next.characterNameZh }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
