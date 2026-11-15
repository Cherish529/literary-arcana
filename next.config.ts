import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 静态导出：产物输出到 out/，可直接部署到 GitHub Pages。
  // 本项目没有任何服务端动态功能（无 cookies / headers / useSearchParams），
  // 因此全站可预渲染为纯静态文件。
  output: 'export',
  // Pages 不提供图片优化服务，导出模式下需要关闭
  images: { unoptimized: true },
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
