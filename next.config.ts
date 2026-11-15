import type { NextConfig } from 'next';

// GitHub Pages 把项目发布在子路径 /literary-arcana/ 下，
// 而非域名根目录。basePath 会让 next/link、next/image 等
// 自动补上这段前缀——这是 Next.js 官方推荐的子路径托管方案。
//
// 若要部署到域名根目录（自有域名 / Vercel），
// 在构建时传入 NEXT_PUBLIC_BASE_PATH='' 即可。
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/literary-arcana';

const nextConfig: NextConfig = {
  // 静态导出：产物输出到 out/，可直接部署到 GitHub Pages。
  // 本项目没有任何服务端动态功能（无 cookies / headers / useSearchParams），
  // 因此全站可预渲染为纯静态文件。
  output: 'export',
  // Pages 不提供图片优化服务，导出模式下需要关闭
  images: { unoptimized: true },
  basePath,
  // 把 basePath 注入为 NEXT_PUBLIC_BASE_PATH，
  // 供 src/lib/assetPath.ts 在客户端为 public/ 下的资源补前缀
  // （next/image 在 unoptimized 模式下不会自动处理这部分）。
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // 注意：cacheComponents（PPR）无法与 export 模式共存，
  // 因此静态导出时不启用；本地 `npm run dev` 的表现不受影响。
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
};

export default nextConfig;
