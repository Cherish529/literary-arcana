/**
 * 将 Figure/ 中的 PNG 卡面转换为 public/cards/ 下的 WebP。
 *
 * 用法：node scripts/prepare-cards.mjs
 *
 * 命名映射表在下方 SOURCE_MAP 中显式列出，
 * 因此即使源文件被重命名，只要在这里改一行即可。
 */
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'Figure');
const OUT_DIR = path.join(ROOT, 'public', 'cards');

/**
 * 源文件 → 目标文件名
 * 目标文件名遵循约定：NN-slug.webp
 */
const SOURCE_MAP = {
  '大阿尔卡那/0-愚者.png': '00-fool.webp',
  '大阿尔卡那/1-魔术师.png': '01-magician.webp',
  '大阿尔卡那/2-女祭司.png': '02-high-priestess.webp',
  '大阿尔卡那/3-女皇.png': '03-empress.webp',
  '大阿尔卡那/4-皇帝.png': '04-emperor.webp',
  '大阿尔卡那/5-教皇.png': '05-hierophant.webp',
  '大阿尔卡那/6-恋人.png': '06-lovers.webp',
  '大阿尔卡那/7-战车.png': '07-chariot.webp',
  '大阿尔卡那/8-力量.png': '08-strength.webp',
  '大阿尔卡那/9-隐者.png': '09-hermit.webp',
  '大阿尔卡那/10-命运之轮.png': '10-wheel-of-fortune.webp',
  '大阿尔卡那/11-正义.png': '11-justice.webp',
  '大阿尔卡那/12-倒吊人.png': '12-hanged-man.webp',
  '大阿尔卡那/13-死神.png': '13-death.webp',
  '大阿尔卡那/14-节制.png': '14-temperance.webp',
  '大阿尔卡那/15-恶魔.png': '15-devil.webp',
  '大阿尔卡那/16-高塔.png': '16-tower.webp',
  '大阿尔卡那/17-星星.png': '17-star.webp',
  '大阿尔卡那/18-月亮.png': '18-moon.webp',
  '大阿尔卡那/19-太阳.png': '19-sun.webp',
  '大阿尔卡那/20-审判.png': '20-judgement.webp',
  '大阿尔卡那/21-世界.png': '21-world.webp',
};

const WIDTH = 1024;

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const available = await fs.readdir(SRC_DIR);
  const pngs = available.filter((f) => f.toLowerCase().endsWith('.png'));

  const missingFromMap = pngs.filter((f) => !(f in SOURCE_MAP));
  if (missingFromMap.length) {
    console.warn('⚠ 以下源文件未在 SOURCE_MAP 中登记：', missingFromMap.join(', '));
  }

  let count = 0;
  for (const [src, dest] of Object.entries(SOURCE_MAP)) {
    const srcPath = path.join(SRC_DIR, src);
    try {
      await fs.access(srcPath);
    } catch {
      console.warn(`⚠ 缺少源文件，跳过：${src}`);
      continue;
    }
    const outPath = path.join(OUT_DIR, dest);
    await sharp(srcPath)
      .resize({ width: WIDTH, withoutEnlargement: true })
      .webp({ quality: 88, effort: 6 })
      .toFile(outPath);
    count++;
    console.log(`✓ ${src} → ${dest}`);
  }

  console.log(`\n完成：${count}/22 张卡面已输出到 public/cards/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
