/**
 * 静态资源路径解析
 *
 * GitHub Pages 把项目发布在子路径（/literary-arcana/）下，
 * 而 `public/` 下的静态资源在导出时不会被 Next.js 自动加上 basePath。
 * 如果直接写 `/cards/00-fool.webp`，浏览器会去域名的根目录找，
 * 结果 404，卡面显示为「待制版」占位。
 *
 * 这里统一把数据里保存的「站内绝对路径」（以 / 开头）
 * 转换为带 basePath 前缀的路径。
 */

/** 读取构建时注入的 basePath；本地开发与根路径部署时为空串 */
function getBasePath(): string {
  if (typeof process === 'undefined') return '';
  // NEXT_PUBLIC_* 变量会被 Next.js 在构建时内联进客户端 bundle
  return process.env.NEXT_PUBLIC_BASE_PATH ?? '';
}

/**
 * 把站内绝对路径转换为可直接用于 <img src> / new Image().src 的地址。
 *
 * - `/cards/00-fool.webp` → `/literary-arcana/cards/00-fool.webp`（GitHub Pages）
 * - `/cards/00-fool.webp` → `/cards/00-fool.webp`（根路径部署）
 *
 * 已经带 basePath 前缀的路径不会被重复添加。
 */
export function assetPath(path: string): string {
  if (!path.startsWith('/')) return path;

  const basePath = getBasePath();
  if (!basePath) return path;
  if (path === basePath || path.startsWith(`${basePath}/`)) return path;

  return `${basePath}${path}`;
}
