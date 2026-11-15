/**
 * 结果生成与分享
 *
 * 负责：
 * 1. 依据玩家实际的维度得分，生成针对性的结果说明
 * 2. 结果在 URL 中的编码与解码（保证链接可在其他设备打开）
 * 3. 本地存储最近一次结果
 */

import type { TarotCard } from '@/data/tarotCards';
import type { AnswerSet, Dimension, MatchResult } from './matching';
import { DIMENSION_LABELS, match } from './matching';

/* ------------------------------------------------------------------ */
/* 个性化文案生成                                                      */
/* ------------------------------------------------------------------ */

/** 维度 → 该维度高分时的描述 */
const HIGH_SELF: Record<Dimension, string> = {
  autonomy: '你有很强的自主意识——即使那意味着要独自承担许多事',
  emotionality: '你的感受系统相当灵敏，能捕捉到别人忽略的情绪纹理',
  order: '你习惯先把事情理出章法，再开始行动',
  ambition: '你身上有一根不肯熄灭的引线，总在朝着某个目标推',
  empathy: '你很自然地把别人的处境放在自己的天平上',
  reflection: '你习惯在行动之前，先在心里把这件事翻转几遍',
};

/** 维度 → 该维度低分时的描述 */
const LOW_SELF: Record<Dimension, string> = {
  autonomy: '你并不急着划清界限，让关系来定义你也是可以的',
  emotionality: '你习惯把情绪收好再示人，这让你显得可靠',
  order: '你对现成的框架不太留恋，更愿意即兴应对',
  ambition: '你不靠目标衡量日子，很多事对你来说顺其自然就好',
  empathy: '你习惯先照顾好自己，这并不代表你不关心',
  reflection: '你更相信当下的判断，而不是反复的推演',
};

export interface ResultNarrative {
  /** 结果导语：叙述这次相遇 */
  opening: string;
  /** 为什么与你匹配 */
  whyMatched: string;
  /** 你的优势 */
  strengths: string;
  /** 容易陷入的困境 */
  shadows: string;
  /** 成长建议 */
  advice: string;
}

/**
 * 依据匹配结果与玩家实际得分，生成针对性的叙述。
 *
 * 说明：这些文字是对作答倾向的文学化描述，
 * 不构成心理诊断或科学测量结论。
 */
export function buildNarrative(result: MatchResult): ResultNarrative {
  const { primary, strongest, weakest, playerVector } = result;

  // 主导维度：取归一化得分绝对值最高的两个维度
  const ranked = Object.entries(playerVector).sort(
    (a, b) => Math.abs(b[1]) - Math.abs(a[1]),
  );
  const leadDims = ranked.slice(0, 2).map(([k]) => k as Dimension);
  const leadHigh = leadDims.map((d) => playerVector[d] > 0);

  const highDims = leadDims.filter((_, i) => leadHigh[i]);
  const lowDims = leadDims.filter((_, i) => !leadHigh[i]);

  const highSentence = highDims.map((d) => HIGH_SELF[d]).join('；');
  const lowSentence = lowDims.map((d) => LOW_SELF[d]).join('；');

  // 主导维度里，若两个都是「低分侧」，则整句走安静质地的写法；
  // 否则只要有高分侧，就用高分侧的描述开头。
  //
  // 特殊情况：作品名与角色名相同时（《秀拉》与秀拉），
  // 「翻开《秀拉》里的秀拉」读起来重复，需要换一种说法。
  const sameName = primary.novelName.includes(primary.characterNameZh);
  const meetPhrase = sameName
    ? `直到你翻开《${primary.novelName}》，看见${primary.characterNameZh}——她站在同样的位置上。`
    : `直到你翻开《${primary.novelName}》里的${primary.characterNameZh}——她站在同样的位置上。`;

  const opening = highSentence
    ? `你身上最鲜明的部分，是这样一件事：${highSentence}。这样的气质，在文学的长廊里并不常见，${meetPhrase}`
    : `你的答案里有一种安静的质地：${lowDims
        .map((d) => DIMENSION_LABELS[d].low)
        .join('、')}。这样的底色，让你遇见了${primary.characterNameZh}。`;

  const whyParts: string[] = [];

  // shortDescription 是一句完整的话，不能直接塞进「她是那个……的人」这样的句式里，
  // 否则会出现语法断裂。这里把它作为独立的引述使用。
  whyParts.push(
    `她不是最响亮的那一个，也不是最幸运的那一个。${primary.shortDescription.replace(/。$/, '')}——这种位置，需要你也在意同一件事时才认得出来。`,
  );

  if (highDims.length) {
    whyParts.push(
      `你比多数人更${highDims.map((d) => DIMENSION_LABELS[d].high).join('、')}，而${primary.characterNameZh}正是靠这一点立住了自己。`,
    );
  }

  if (lowSentence) {
    // 低分维度是「你比她更克制」的一侧，
    // 写成差异点，而不是「更接近」——那会与上一句矛盾。
    whyParts.push(
      `同时，你在${lowDims.map((d) => DIMENSION_LABELS[d].low).join('、')}这一侧比她更克制——这往往是那些相似的人最终会分道扬镳的地方。`,
    );
  }

  if (strongest.length && weakest.length) {
    whyParts.push(
      `你偏向${strongest.slice(0, 2).map((d) => DIMENSION_LABELS[d].zh).join('与')}，而在${weakest.slice(0, 2).map((d) => DIMENSION_LABELS[d].zh).join('与')}上，你的答案更克制。`,
    );
  }

  // strengths 里既有动词短语（「不被既有规则束缚」），
  // 也有名词短语（「极强的自我定义能力」）。
  // 这里按首字判断该用「你…」还是「你有…」，避免出现「你极强的…」这种病句。
  //
  // 同时：
  //  - 复句型优势（「不被既有规则束缚，能想到常规之外的解法」）需要补一个「的」，
  //    否则「你有不被既有规则束缚，能想到…」读起来断裂；
  //  - 第二条优势若本身以「有」开头，句式里就不能再加一个「有」，
  //    否则会出现「有有极强的感染力」。
  const firstStrength = primary.strengths[0] ?? '';
  const isCompoundStrength = firstStrength.includes('，');
  const strengthLead = /^(有|极|强|真诚|坚定|难以|不易|不会|不能|不)/.test(firstStrength)
    ? '你有'
    : '你';
  const firstStrengthText = isCompoundStrength
    ? `${firstStrength.replace(/，/g, '、')}的能力`
    : firstStrength;

  const secondStrength = primary.strengths[1] ?? '坚持';
  // 句式是「在需要……的场合」，若优势短语自带「有」，需去掉重复的「有」，
  // 否则会出现「在需要有有极强的感染力」。
  // 短语内部的逗号改成分号，避免与外层「……的场合」产生歧义。
  const secondStrengthText = secondStrength.replace(/^有/, '').trim().replace(/，/g, '；');

  const strengths = `${primary.characterNameZh}身上最像你的，是${strengthLead}${firstStrengthText}。这意味着在需要${secondStrengthText}的场合，你不会先退。`;

  // shadowTraits 常以「把…」「可能把…」「容易把…」开头，
  // 而句式已经提供了「把」，直接拼接会得到「把把…」「把可能把…」这样的病句。
  // 这里剥掉这些冗余的前缀动词，再统一补上一个「把」。
  const shadowTrait = (primary.shadowTraits[0] ?? '把在意变成束缚')
    .replace(/^(可能|容易|常常|总是|会)?把/, '')
    .trim();
  // 阴影短语若含逗号，说明它是「前半句，后半句」的结构；
  // 直接接在「把」后面会读成「把习惯性牺牲，忘记自己也在其中」。
  // 这里拆开，用「把……，进而……」重新组织。
  const shadowBody = shadowTrait.includes('，')
    ? shadowTrait.replace(/，/, '，进而')
    : shadowTrait;
  const shadows = `但这张牌有它的暗面。你可能会像她一样，把${shadowBody}——这在旁人眼里或许叫「有分寸」，只有你自己知道有多累。`;

  const advice = `${primary.growthAdvice} 对${primary.characterNameZh}而言，这条路走到最后并不容易；对你而言，它同样值得一试。`;

  return {
    opening,
    whyMatched: whyParts.join(' '),
    strengths,
    shadows,
    advice,
  };
}

/* ------------------------------------------------------------------ */
/* URL 编解码                                                          */
/* ------------------------------------------------------------------ */

const RESULT_PARAM = 'r';

/**
 * 把答案编码成简短、可放进 URL 的字符串。
 *
 * 格式：`题号:选项,题号:选项,...`
 * 例：`q01:b,q02:a,q03:d`
 *
 * 因为答案是从固定题目里选出的 id，所以这个串很紧凑，
 * 且完全可还原——这保证了链接在其他设备上打开能得到相同结果。
 */
export function encodeAnswers(answers: AnswerSet): string {
  return Object.keys(answers)
    .sort()
    .map((qid) => `${qid}:${answers[qid]}`)
    .join(',');
}

export function decodeAnswers(encoded: string | null): AnswerSet | null {
  if (!encoded) return null;

  const answers: AnswerSet = {};

  for (const pair of encoded.split(',')) {
    const [qid, oid] = pair.split(':');
    if (!qid || !oid) continue;
    answers[qid] = oid;
  }

  return Object.keys(answers).length > 0 ? answers : null;
}

/** 生成可分享的结果链接 */
export function buildShareUrl(answers: AnswerSet): string {
  const encoded = encodeAnswers(answers);
  const base =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}`
      : '/result';
  return `${base}?${RESULT_PARAM}=${encodeURIComponent(encoded)}`;
}

/** 从当前 URL 解析出结果 */
export function parseResultFromUrl(): { answers: AnswerSet; result: MatchResult } | null {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  const answers = decodeAnswers(params.get(RESULT_PARAM));
  if (!answers) return null;

  return { answers, result: match(answers) };
}

/* ------------------------------------------------------------------ */
/* 本地存储                                                            */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = 'literary-arcana:last-result';

/** 保存最近一次结果 */
export function saveLastResult(answers: AnswerSet): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, encodeAnswers(answers));
  } catch {
    // 隐私模式下 localStorage 可能不可用，静默降级
  }
}

/** 读取最近一次结果 */
export function loadLastResult(): { answers: AnswerSet; result: MatchResult } | null {
  if (typeof window === 'undefined') return null;
  try {
    const encoded = window.localStorage.getItem(STORAGE_KEY);
    const answers = decodeAnswers(encoded);
    if (!answers) return null;
    return { answers, result: match(answers) };
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* 分享图                                                              */
/* ------------------------------------------------------------------ */

/** 分享图上显示的简短结果文字 */
export function buildShareCaption(card: TarotCard): string {
  return `${card.tarotNameZh} · ${card.characterNameZh}｜${card.archetype}`;
}
