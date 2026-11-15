import Link from 'next/link';
import { SealEmblem, OrnamentDivider } from '@/components/Ornaments';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 py-20 text-center">
      <SealEmblem className="h-16 w-16 opacity-60" />

      <p className="mt-8 font-display text-[0.6rem] tracking-[0.36em] text-[#b18a50]">
        PAGE NOT FOUND
      </p>

      <h1 className="mt-4 font-display text-4xl tracking-[0.08em] text-[#24372f]">
        这一页是空白的
      </h1>

      <OrnamentDivider className="mt-7" />

      <p className="mx-auto mt-7 max-w-md font-serif text-[0.95rem] leading-[2.1] text-[#6f655a] text-pretty">
        你要找的段落，也许在另一本书里。
        <br />
        回到图鉴翻翻，或重新开始一次阅读。
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/arcana"
          className="inline-flex items-center justify-center border border-[#24372f] bg-[#24372f] px-7 py-3.5 font-serif text-[0.88rem] tracking-[0.16em] text-[#f5e9d4] transition-all duration-400 hover:bg-transparent hover:text-[#24372f]"
        >
          翻阅图鉴
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center border border-[#29241f]/25 px-7 py-3.5 font-serif text-[0.88rem] tracking-[0.16em] text-[#4a423a] transition-all duration-400 hover:border-[#b18a50] hover:text-[#722f36]"
        >
          回到扉页
        </Link>
      </div>
    </div>
  );
}
