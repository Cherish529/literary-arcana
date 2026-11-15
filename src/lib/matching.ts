/**
 * 人格匹配算法
 *
 * 设计原则：
 * 1. 完全确定性——同样的答案永远得到同样的结果，绝不使用随机数。
 * 2. 可解释——分数高低的来源可以逐项说清。
 * 3. 可扩展——题目、人物向量、权重都是独立数据。
 *
 * 算法：
 *   a. 累加玩家在 16 题中的六维得分
 *   b. 按每个维度的「实际取值范围」归一化到 [-1, 1]
 *   c. 与 22 个角色原型做加权余弦相似度
 *   d. 分数相同时按固定规则排序（见 sortComparator）
 */

import type { PersonalityVector, TarotCard } from '@/data/tarotCards';
import { tarotCards } from '@/data/tarotCards';
import { personalityProfiles } from '@/data/personalityProfiles';
import { questions, type QuizOption } from '@/data/questions';

export const DIMENSIONS = [
  'autonomy',
  'emotionality',
  'order',
  'ambition',
  'empathy',
  'reflection',
] as const;

export type Dimension = (typeof DIMENSIONS)[number];

export const DIMENSION_LABELS: Record<Dimension, { zh: string; high: string; low: string }> = {
  autonomy: { zh: '自主', high: '独立自主', low: '依附随行' },
  emotionality: { zh: '情感', high: '感受丰沛', low: '克制内敛' },
  order: { zh: '秩序', high: '讲究章法', low: '不循规矩' },
  ambition: { zh: '进取', high: '目标导向', low: '顺其自然' },
  empathy: { zh: '共情', high: '关切他人', low: '优先自己' },
  reflection: { zh: '自省', high: '内省深思', low: '凭直觉行事' },
};

/** 答案集合：题号 → 选项 id */
export type AnswerSet = Record<string, string>;

export interface MatchResult {
  /** 匹配度最高的角色 */
  primary: TarotCard;
  /** 另两位最接近的角色 */
  alternates: TarotCard[];
  /** 归一化后的玩家向量，-1 ~ 1 */
  playerVector: Record<Dimension, number>;
  /** 每个维度的原始得分 */
  rawScores: Record<Dimension, number>;
  /** 每个维度的实际可达范围（用于归一化） */
  ranges: Record<Dimension, { min: number; max: number }>;
  /** 玩家得分最高的维度 */
  strongest: Dimension[];
  /** 玩家得分最低的维度 */
  weakest: Dimension[];
  /** 全部角色的相似度（调试与「为什么」说明用） */
  scores: Array<{ card: TarotCard; similarity: number }>;
}

/* ------------------------------------------------------------------ */
/* 步骤 a：累加原始得分                                                */
/* ------------------------------------------------------------------ */

function emptyVector(): Record<Dimension, number> {
  return { autonomy: 0, emotionality: 0, order: 0, ambition: 0, empathy: 0, reflection: 0 };
}

export function accumulateScores(answers: AnswerSet): Record<Dimension, number> {
  const scores = emptyVector();

  for (const question of questions) {
    const optionId = answers[question.id];
    if (!optionId) continue;

    const option: QuizOption | undefined = question.options.find((o) => o.id === optionId);
    if (!option) continue;

    for (const dim of DIMENSIONS) {
      scores[dim] += option.scores[dim] ?? 0;
    }
  }

  return scores;
}

/* ------------------------------------------------------------------ */
/* 步骤 b：计算可达范围并归一化                                        */
/* ------------------------------------------------------------------ */

/**
 * 对每个维度，计算「把所有题都选最高分」与「都选最低分」时能得到的范围。
 * 玩家得分落在 [min, max] 内，归一化后为 [-1, 1]。
 */
export function computeRanges(): Record<Dimension, { min: number; max: number }> {
  const ranges = {} as Record<Dimension, { min: number; max: number }>;

  for (const dim of DIMENSIONS) {
    let min = 0;
    let max = 0;

    for (const question of questions) {
      const values = question.options.map((o) => o.scores[dim] ?? 0);
      min += Math.min(...values);
      max += Math.max(...values);
    }

    ranges[dim] = { min, max };
  }

  return ranges;
}

export function normalizeScores(
  raw: Record<Dimension, number>,
  ranges: Record<Dimension, { min: number; max: number }>,
): Record<Dimension, number> {
  const normalized = {} as Record<Dimension, number>;

  for (const dim of DIMENSIONS) {
    const { min, max } = ranges[dim];
    const span = max - min;

    if (span === 0) {
      normalized[dim] = 0;
      continue;
    }

    // 把 [min, max] 映射到 [-1, 1]，中点为 0
    normalized[dim] = ((raw[dim] - min) / span) * 2 - 1;
  }

  return normalized;
}

/* ------------------------------------------------------------------ */
/* 步骤 c：相似度计算                                                  */
/* ------------------------------------------------------------------ */

/**
 * 维度权重。
 * 六维等权会让「秩序」与「共情」这类相邻维度互相抵消，
 * 这里给每个维度一个略不同的权重，使区分更稳定，
 * 同时保持可解释性（权重是公开常数，可自由调整）。
 */
export const DIMENSION_WEIGHTS: Record<Dimension, number> = {
  autonomy: 1.0,
  emotionality: 1.0,
  order: 1.05,
  ambition: 1.05,
  empathy: 1.0,
  reflection: 1.1,
};

/**
 * 加权余弦相似度。
 * 结果范围 [-1, 1]，越大越接近。
 */
export function cosineSimilarity(
  player: Record<Dimension, number>,
  target: PersonalityVector,
): number {
  let dot = 0;
  let playerNorm = 0;
  let targetNorm = 0;

  for (const dim of DIMENSIONS) {
    const w = DIMENSION_WEIGHTS[dim];
    const p = player[dim] * w;
    const t = target[dim] * w;

    dot += p * t;
    playerNorm += p * p;
    targetNorm += t * t;
  }

  if (playerNorm === 0 || targetNorm === 0) return 0;

  return dot / (Math.sqrt(playerNorm) * Math.sqrt(targetNorm));
}

/* ------------------------------------------------------------------ */
/* 步骤 d：排序与匹配                                                  */
/* ------------------------------------------------------------------ */

/**
 * 固定的、可解释的排序规则：
 *   1. 相似度高者优先
 *   2. 相似度相同时，按卡牌编号升序（愚者 → 世界）
 *
 * 这保证了：
 *   - 同样的答案永远得到同样的结果
 *   - 不会因为数组顺序或引擎差异而漂移
 */
function sortComparator(a: TarotCard, b: TarotCard, scores: Map<string, number>) {
  const diff = scores.get(b.id)! - scores.get(a.id)!;
  if (Math.abs(diff) > 1e-9) return diff;
  return a.number - b.number;
}

export function match(answers: AnswerSet): MatchResult {
  const rawScores = accumulateScores(answers);
  const ranges = computeRanges();
  const playerVector = normalizeScores(rawScores, ranges);

  // 计算所有角色的相似度
  const scores = personalityProfiles.map((profile) => {
    const card = tarotCards.find((c) => c.id === profile.id)!;
    return {
      card,
      similarity: cosineSimilarity(playerVector, profile.vector),
    };
  });

  const scoreMap = new Map(scores.map((s) => [s.card.id, s.similarity]));

  const sorted = [...scores].sort((a, b) => sortComparator(a.card, b.card, scoreMap));

  // 找出最高分与最低分维度
  const ordered = [...DIMENSIONS].sort((a, b) => rawScores[b] - rawScores[a]);
  const strongest = ordered.filter((d) => rawScores[d] > 0);
  const weakest = [...ordered].reverse().filter((d) => rawScores[d] < 0);

  return {
    primary: sorted[0].card,
    alternates: sorted.slice(1, 3).map((s) => s.card),
    playerVector,
    rawScores,
    ranges,
    strongest,
    weakest,
    scores: sorted,
  };
}

/** 供测试使用：直接用向量匹配 */
export function matchByVector(vector: PersonalityVector): TarotCard[] {
  const playerVector = { ...vector };
  const scoreMap = new Map<string, number>();
  const entries = personalityProfiles.map((p) => {
    const card = tarotCards.find((c) => c.id === p.id)!;
    const s = cosineSimilarity(playerVector, p.vector);
    scoreMap.set(card.id, s);
    return { card, similarity: s };
  });
  return entries.sort((a, b) => sortComparator(a.card, b.card, scoreMap)).map((e) => e.card);
}
