/**
 * 把 personalityProfiles.ts 中的向量同步到 tarotCards.ts
 *
 * 人物原型向量在两处维护容易出错，这个脚本保证它们永远一致。
 *
 * 运行：npm run sync:vectors
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const CARDS_FILE = path.join(ROOT, 'src', 'data', 'tarotCards.ts');
const PROFILES_FILE = path.join(ROOT, 'src', 'data', 'personalityProfiles.ts');

/** 从 personalityProfiles.ts 解析出 id → vector 字符串 */
function parseProfiles(source) {
  const map = new Map();
  const re =
    /id:\s*'([^']+)',[\s\S]*?vector:\s*\{\s*autonomy:\s*(-?\d+),\s*emotionality:\s*(-?\d+),\s*order:\s*(-?\d+),\s*ambition:\s*(-?\d+),\s*empathy:\s*(-?\d+),\s*reflection:\s*(-?\d+),?\s*\},/g;

  let m;
  while ((m = re.exec(source)) !== null) {
    const [, id, autonomy, emotionality, order, ambition, empathy, reflection] = m;
    map.set(
      id,
      `{ autonomy: ${autonomy}, emotionality: ${emotionality}, order: ${order}, ambition: ${ambition}, empathy: ${empathy}, reflection: ${reflection} }`,
    );
  }

  return map;
}

function main() {
  const profiles = parseProfiles(fs.readFileSync(PROFILES_FILE, 'utf-8'));
  if (profiles.size !== 22) {
    console.error(`解析到 ${profiles.size} 个原型，应为 22 个`);
    process.exit(1);
  }

  let cards = fs.readFileSync(CARDS_FILE, 'utf-8');
  let updated = 0;

  for (const [id, vector] of profiles) {
    const idIndex = cards.indexOf(`id: '${id}',`);
    if (idIndex === -1) {
      console.error(`在 tarotCards.ts 中找不到 id: '${id}'`);
      process.exit(1);
    }

    const vectorIndex = cards.indexOf('personalityVector: {', idIndex);
    if (vectorIndex === -1) {
      console.error(`找不到 ${id} 的 personalityVector`);
      process.exit(1);
    }

    const start = vectorIndex + 'personalityVector: '.length;
    const end = cards.indexOf('}', start) + 1;

    cards = cards.slice(0, start) + vector + cards.slice(end);
    updated++;
  }

  fs.writeFileSync(CARDS_FILE, cards, 'utf-8');
  console.log(`已同步 ${updated} 个原型向量到 tarotCards.ts`);
}

main();
