import type { Metadata } from 'next';
import { Cinzel, Noto_Serif_SC } from 'next/font/google';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import './globals.css';

/**
 * 字体：
 * - Cinzel：罗马碑体，用于牌名、编号等「铭刻感」文字
 * - Noto Serif SC：中文衬线，用于正文阅读
 */
const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const notoSerifSC = Noto_Serif_SC({
  variable: '--font-noto-serif-sc',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
  title: {
    default: '她们的命运之书 · The Literary Arcana',
    template: '%s · 她们的命运之书',
  },
  description:
    '一场关于文学女性的性格测试：回答十六道情境题，与二十二位经典文学女性相遇，并抽取属于你的大阿尔卡那牌面。',
  keywords: ['文学', '塔罗牌', '性格测试', '经典文学', '女性角色', '大阿尔卡那'],
  authors: [{ name: 'The Literary Arcana' }],
  openGraph: {
    title: '她们的命运之书 · The Literary Arcana',
    description:
      '在无数种女性命运之中，你会与谁相遇？二十二张文学塔罗，二十二位女性，二十二种理解世界的方式。',
    locale: 'zh_CN',
    type: 'website',
    siteName: '她们的命运之书',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="zh-CN"
      // 让 Next.js 在路由切换时禁用平滑滚动，避免过渡动画与滚动冲突
      data-scroll-behavior="smooth"
      className={`${cinzel.variable} ${notoSerifSC.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col">
        <SiteHeader />
        <main className="relative z-10 flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
