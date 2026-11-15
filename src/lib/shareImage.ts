/**
 * 分享图生成
 *
 * 在浏览器端用 Canvas 绘制一张 1080×1620 的分享卡片，
 * 包含卡面、牌名、人物名与简短结果文字。
 *
 * 不依赖第三方库，避免额外体积与字体加载问题。
 */

import type { TarotCard } from '@/data/tarotCards';
import { buildShareCaption } from './results';

const W = 1080;
const H = 1620;

/** 等待字体加载完成，保证 Canvas 文字排版正确 */
async function ensureFonts(): Promise<void> {
  if (typeof document === 'undefined' || !document.fonts) return;
  try {
    await document.fonts.ready;
  } catch {
    // 忽略字体加载失败
  }
}

/** 把图片 URL 转成 HTMLImageElement */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`无法加载卡面：${src}`));
    img.src = src;
  });
}

/** 文字按最大宽度折行 */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
): number {
  const chars = Array.from(text);
  let line = '';
  let currentY = y;

  for (const char of chars) {
    const test = line + char;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      line = char;
      currentY += lineHeight;
    } else {
      line = test;
    }
  }

  if (line) {
    ctx.fillText(line, x, currentY);
    currentY += lineHeight;
  }

  return currentY;
}

/**
 * 生成分享图并触发下载。
 * @returns 生成的 data URL（便于预览）
 */
export async function generateShareImage(card: TarotCard): Promise<string> {
  await ensureFonts();

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('无法创建画布上下文');

  /* ---------- 背景：纸张底色 + 渐变 ---------- */
  ctx.fillStyle = '#f5e9d4';
  ctx.fillRect(0, 0, W, H);

  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, 'rgba(232, 212, 172, 0.85)');
  bg.addColorStop(0.45, 'rgba(245, 233, 212, 0.4)');
  bg.addColorStop(1, 'rgba(114, 47, 54, 0.10)');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  /* ---------- 外框 ---------- */
  const margin = 54;
  ctx.strokeStyle = 'rgba(177, 138, 80, 0.75)';
  ctx.lineWidth = 2;
  ctx.strokeRect(margin, margin, W - margin * 2, H - margin * 2);

  ctx.strokeStyle = 'rgba(41, 36, 31, 0.28)';
  ctx.lineWidth = 1;
  ctx.strokeRect(margin + 12, margin + 12, W - (margin + 12) * 2, H - (margin + 12) * 2);

  /* ---------- 顶部标题 ---------- */
  ctx.textAlign = 'center';
  ctx.fillStyle = '#24372f';
  ctx.font = '600 30px "Noto Serif SC", "Songti SC", serif';
  ctx.fillText('她们的命运之书', W / 2, margin + 76);

  ctx.fillStyle = '#6f655a';
  ctx.font = '400 15px "Cinzel", Georgia, serif';
  ctx.fillText('THE LITERARY ARCANA', W / 2, margin + 104);

  // 分隔线
  ctx.strokeStyle = 'rgba(177, 138, 80, 0.6)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 110, margin + 132);
  ctx.lineTo(W / 2 + 110, margin + 132);
  ctx.stroke();

  /* ---------- 卡面 ---------- */
  const cardWidth = 480;
  const cardHeight = cardWidth * 1.5;
  const cardX = (W - cardWidth) / 2;
  const cardY = margin + 176;

  let image: HTMLImageElement | null = null;
  try {
    image = await loadImage(card.image);
  } catch {
    // 卡面加载失败时跳过，版面仍完整
  }

  if (image) {
    ctx.save();
    ctx.shadowColor = 'rgba(41, 36, 31, 0.45)';
    ctx.shadowBlur = 34;
    ctx.shadowOffsetY = 14;
    ctx.drawImage(image, cardX, cardY, cardWidth, cardHeight);
    ctx.restore();

    // 卡框
    ctx.strokeStyle = 'rgba(177, 138, 80, 0.9)';
    ctx.lineWidth = 3;
    ctx.strokeRect(cardX - 12, cardY - 12, cardWidth + 24, cardHeight + 24);
    ctx.strokeStyle = 'rgba(41, 36, 31, 0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(cardX - 20, cardY - 20, cardWidth + 40, cardHeight + 40);
  } else {
    // 占位
    ctx.fillStyle = '#e8d4ac';
    ctx.fillRect(cardX, cardY, cardWidth, cardHeight);
    ctx.strokeStyle = 'rgba(41, 36, 31, 0.3)';
    ctx.strokeRect(cardX, cardY, cardWidth, cardHeight);
  }

  /* ---------- 卡面下方信息 ---------- */
  let y = cardY + cardHeight + 92;

  // 编号 + 牌名
  ctx.fillStyle = '#722f36';
  ctx.font = '600 42px "Noto Serif SC", "Songti SC", serif';
  ctx.fillText(card.tarotNameZh, W / 2, y);

  y += 40;
  ctx.fillStyle = '#6f655a';
  ctx.font = '400 19px "Cinzel", Georgia, serif';
  ctx.fillText(`${card.romanNumeral} · ${card.tarotNameEn.toUpperCase()}`, W / 2, y);

  y += 58;
  ctx.fillStyle = '#24372f';
  ctx.font = '500 34px "Noto Serif SC", "Songti SC", serif';
  ctx.fillText(card.characterNameZh, W / 2, y);

  y += 38;
  ctx.fillStyle = '#6f655a';
  ctx.font = '400 22px "Noto Serif SC", "Songti SC", serif';
  ctx.fillText(`《${card.novelName}》`, W / 2, y);

  /* ---------- 原型标签 ---------- */
  y += 66;
  ctx.fillStyle = '#b18a50';
  ctx.font = '400 20px "Noto Serif SC", "Songti SC", serif';
  ctx.fillText(`— ${card.archetype} —`, W / 2, y);

  /* ---------- 分隔线 ---------- */
  y += 54;
  ctx.strokeStyle = 'rgba(41, 36, 31, 0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(margin + 90, y);
  ctx.lineTo(W - margin - 90, y);
  ctx.stroke();

  /* ---------- 引文 ---------- */
  y += 62;
  ctx.fillStyle = '#4a423a';
  ctx.font = 'italic 400 25px "Noto Serif SC", "Songti SC", serif';
  y = wrapText(ctx, `「${card.literaryQuote}」`, margin + 110, y, W - (margin + 110) * 2, 44);

  y += 26;
  ctx.fillStyle = '#8a8075';
  ctx.font = '400 17px "Noto Serif SC", "Songti SC", serif';
  ctx.fillText(card.quoteAttribution, W / 2, y);

  /* ---------- 底部 ---------- */
  ctx.fillStyle = '#6f655a';
  ctx.font = '400 15px "Cinzel", Georgia, serif';
  ctx.fillText('LITERARY ARCANA · NOT A FORTUNE TELLING', W / 2, H - margin - 44);

  return canvas.toDataURL('image/png');
}

/** 生成并下载分享图 */
export async function downloadShareImage(card: TarotCard): Promise<void> {
  const dataUrl = await generateShareImage(card);

  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = `literary-arcana-${card.id}-${card.characterNameZh}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/** 分享图的文字摘要（供预览与复制使用） */
export function shareSummary(card: TarotCard): string {
  return `${card.tarotNameZh}（${card.tarotNameEn}）· ${card.characterNameZh}《${card.novelName}》——${buildShareCaption(card)}`;
}
