import type { Metadata } from 'next';
import { ArcanaGallery } from './ArcanaGallery';

export const metadata: Metadata = {
  title: '文学塔罗图鉴',
  description:
    '二十二张大阿尔卡那文学塔罗，与二十二位经典文学女性。完整解读、正逆位含义、人物分析与卡面符号。',
};

export default function ArcanaPage() {
  return (
    <div className="pt-12 sm:pt-16">
      {/* 页首 */}
      <div className="px-5 text-center sm:px-8">
        <p className="font-display text-[0.58rem] tracking-[0.38em] text-[#b18a50]">
          THE ARCANA
        </p>
        <h1 className="mt-4 font-display text-3xl tracking-[0.1em] text-[#24372f] sm:text-[2.7rem]">
          文学塔罗图鉴
        </h1>
        <p className="mx-auto mt-5 max-w-lg font-serif text-[0.92rem] leading-[2.05] text-[#6f655a] text-pretty sm:text-[0.98rem]">
          大阿尔卡那二十二张牌，与二十二位被写进文学史的女性。
          <br className="hidden sm:block" />
          每一张都是一种活法——它不必被模仿，只供辨认。
        </p>
      </div>

      <ArcanaGallery />
    </div>
  );
}
