/**
 * 匹配算法与数据完整性测试
 *
 * 运行：npm test
 *
 * 重点验证：
 * 1. 22 张牌的数据完整性
 * 2. 题目与人物原型的结构正确性
 * 3. 匹配算法的确定性
 * 4. **每个角色都有实际可达的答题区域**（不会有人永远匹配不到）
 */

import { describe, it, expect } from 'vitest';
import { tarotCards, cardsByNumber } from '@/data/tarotCards';
import { personalityProfiles } from '@/data/personalityProfiles';
import { questions } from '@/data/questions';
import {
  match,
  matchByVector,
  computeRanges,
  accumulateScores,
  normalizeScores,
  DIMENSIONS,
} from '@/lib/matching';
import type { AnswerSet } from '@/lib/matching';
import type { PersonalityVector } from '@/data/tarotCards';
import { buildNarrative } from '@/lib/results';

/* ------------------------------------------------------------------ */
/* 数据完整性                                                          */
/* ------------------------------------------------------------------ */

describe('牌组数据', () => {
  it('恰好有 22 张牌', () => {
    expect(tarotCards).toHaveLength(22);
  });

  it('编号 0-21 连续且无重复', () => {
    const numbers = cardsByNumber.map((c) => c.number);
    expect(numbers).toEqual([...Array(22).keys()]);
  });

  it('所有 id 唯一', () => {
    const ids = tarotCards.map((c) => c.id);
    expect(new Set(ids).size).toBe(22);
  });

  it('官方配对表与规格完全一致', () => {
    const expected: Array<[number, string, string, string]> = [
      [0, '愚者', 'The Fool', '伊姬'],
      [1, '魔术师', 'The Magician', '乔·马奇'],
      [2, '女祭司', 'The High Priestess', '克拉拉'],
      [3, '皇后', 'The Empress', '露丝'],
      [4, '皇帝', 'The Emperor', '贾探春'],
      [5, '教皇', 'The Hierophant', '苔丝'],
      [6, '恋人', 'The Lovers', '梅格·马奇'],
      [7, '战车', 'The Chariot', '斯嘉丽'],
      [8, '力量', 'Strength', '梅兰妮'],
      [9, '隐士', 'The Hermit', '莱农'],
      [10, '命运之轮', 'Wheel of Fortune', '蓓基'],
      [11, '正义', 'Justice', '伊丽莎白'],
      [12, '倒吊人', 'The Hanged Man', '阿米莉亚'],
      [13, '死神', 'Death', '秀拉'],
      [14, '节制', 'Temperance', '薛宝钗'],
      [15, '恶魔', 'The Devil', '爱玛'],
      [16, '高塔', 'The Tower', '莉拉'],
      [17, '星星', 'The Star', '简·班纳特'],
      [18, '月亮', 'The Moon', '林黛玉'],
      [19, '太阳', 'The Sun', '莎格'],
      [20, '审判', 'Judgement', '阿尔芭'],
      [21, '世界', 'The World', '西莉'],
    ];

    for (const [num, zh, en, character] of expected) {
      const card = cardsByNumber.find((c) => c.number === num);
      expect(card, `缺少编号 ${num} 的牌`).toBeDefined();
      expect(card!.tarotNameZh).toBe(zh);
      expect(card!.tarotNameEn).toBe(en);
      expect(card!.characterNameZh).toBe(character);
    }
  });

  it('17 号是简·班纳特，6 号是梅格·马奇', () => {
    expect(cardsByNumber.find((c) => c.number === 17)!.characterNameZh).toBe('简·班纳特');
    expect(cardsByNumber.find((c) => c.number === 6)!.characterNameZh).toBe('梅格·马奇');
  });

  it('每张牌都有完整的解读字段', () => {
    for (const card of tarotCards) {
      expect(card.shortDescription.length, `${card.id} 缺少 shortDescription`).toBeGreaterThan(10);
      expect(card.characterBiography.length, `${card.id} 缺少 characterBiography`).toBeGreaterThan(30);
      expect(card.uprightMeaning.length, `${card.id} 缺少 uprightMeaning`).toBeGreaterThan(20);
      expect(card.reversedMeaning.length, `${card.id} 缺少 reversedMeaning`).toBeGreaterThan(20);
      expect(card.personalityDescription.length, `${card.id} 缺少 personalityDescription`).toBeGreaterThan(20);
      expect(card.growthAdvice.length, `${card.id} 缺少 growthAdvice`).toBeGreaterThan(10);
      expect(card.visualSymbolism.length, `${card.id} 缺少 visualSymbolism`).toBeGreaterThan(20);
      expect(card.literaryQuote.length, `${card.id} 缺少 literaryQuote`).toBeGreaterThan(5);
      expect(card.quoteAttribution.length, `${card.id} 缺少 quoteAttribution`).toBeGreaterThan(5);
      expect(card.keywords.length, `${card.id} 缺少 keywords`).toBeGreaterThanOrEqual(3);
      expect(card.strengths.length, `${card.id} 缺少 strengths`).toBeGreaterThanOrEqual(3);
      expect(card.shadowTraits.length, `${card.id} 缺少 shadowTraits`).toBeGreaterThanOrEqual(3);
      expect(['novel', 'film', 'original']).toContain(card.quoteType);
    }
  });

  it('原创箴言不得标注为角色原话', () => {
    for (const card of tarotCards) {
      if (card.quoteType === 'original') {
        expect(
          card.quoteAttribution,
          `${card.id} 的原创箴言必须标明出处为原创`,
        ).toContain('原创');
      }
    }
  });

  it('图片路径符合命名约定', () => {
    for (const card of tarotCards) {
      expect(card.image).toMatch(/^\/cards\/\d{2}-[a-z-]+\.webp$/);
      const prefix = String(card.number).padStart(2, '0');
      expect(card.image.startsWith(`/cards/${prefix}-`)).toBe(true);
    }
  });
});

/* ------------------------------------------------------------------ */
/* 题目数据                                                            */
/* ------------------------------------------------------------------ */

describe('题库', () => {
  it('有 16 道题', () => {
    expect(questions).toHaveLength(16);
  });

  it('每题有 4 个选项', () => {
    for (const q of questions) {
      expect(q.options, `${q.id} 选项数不对`).toHaveLength(4);
      // 题干应是一个完整的问题（含问号），而不是短语
      expect(q.prompt.length, `${q.id} 题干太短`).toBeGreaterThanOrEqual(12);
      // 以问号结尾，或以「——」引出选项（两种都是完整的提问形式）
      expect(
        q.prompt,
        `${q.id} 题干应是以问句或破折号引出选项的形式`,
      ).toMatch(/[？?]$|——$/);
    }
  });

  it('选项 id 唯一且评分向量在 -2~+2 内', () => {
    for (const q of questions) {
      const ids = q.options.map((o) => o.id);
      expect(new Set(ids).size, `${q.id} 选项 id 重复`).toBe(4);

      for (const o of q.options) {
        for (const dim of DIMENSIONS) {
          const v = o.scores[dim] ?? 0;
          expect(v, `${q.id}/${o.id} 的 ${dim} 超出范围`).toBeGreaterThanOrEqual(-2);
          expect(v, `${q.id}/${o.id} 的 ${dim} 超出范围`).toBeLessThanOrEqual(2);
        }
      }
    }
  });

  it('每个维度上题目的评分存在差异（否则该维度无区分力）', () => {
    const ranges = computeRanges();
    for (const dim of DIMENSIONS) {
      expect(ranges[dim].max, `${dim} 无法产生正向得分`).toBeGreaterThan(0);
      expect(ranges[dim].min, `${dim} 无法产生负向得分`).toBeLessThan(0);
    }
  });
});

/* ------------------------------------------------------------------ */
/* 人物原型                                                            */
/* ------------------------------------------------------------------ */

describe('人物原型', () => {
  it('22 个原型与牌组一一对应', () => {
    expect(personalityProfiles).toHaveLength(22);
    expect(new Set(personalityProfiles.map((p) => p.id)).size).toBe(22);

    for (const card of tarotCards) {
      expect(
        personalityProfiles.some((p) => p.id === card.id),
        `${card.id} 缺少原型向量`,
      ).toBe(true);
    }
  });

  it('原型向量与卡牌中的向量一致', () => {
    for (const profile of personalityProfiles) {
      const card = tarotCards.find((c) => c.id === profile.id)!;
      expect(profile.vector).toEqual(card.personalityVector);
    }
  });
});

/* ------------------------------------------------------------------ */
/* 匹配算法                                                            */
/* ------------------------------------------------------------------ */

describe('匹配算法', () => {
  it('同样的答案永远得到同样的结果', () => {
    const answers = Object.fromEntries(
      questions.map((q, i) => [q.id, q.options[i % 4].id]),
    );

    const a = match(answers);
    const b = match(answers);
    expect(a.primary.id).toBe(b.primary.id);
    expect(a.alternates.map((x) => x.id)).toEqual(b.alternates.map((x) => x.id));
  });

  it('结果不含随机性——重复运行分数完全一致', () => {
    const answers = Object.fromEntries(
      questions.map((q, i) => [q.id, q.options[(i + 1) % 4].id]),
    );

    const scores1 = match(answers).scores.map((s) => s.similarity);
    const scores2 = match(answers).scores.map((s) => s.similarity);

    expect(scores1).toEqual(scores2);
  });

  it('返回的主结果与两个参考结果互不相同', () => {
    const answers = Object.fromEntries(
      questions.map((q, i) => [q.id, q.options[(i + 2) % 4].id]),
    );

    const result = match(answers);
    const ids = [result.primary.id, ...result.alternates.map((a) => a.id)];
    expect(new Set(ids).size).toBe(3);
  });

  it('归一化后的向量落在 [-1, 1]', () => {
    const answers = Object.fromEntries(questions.map((q) => [q.id, q.options[0].id]));
    const result = match(answers);

    for (const dim of DIMENSIONS) {
      expect(result.playerVector[dim]).toBeGreaterThanOrEqual(-1.0001);
      expect(result.playerVector[dim]).toBeLessThanOrEqual(1.0001);
    }
  });

  it('分数相同时按卡牌编号稳定排序', () => {
    // 全零向量：所有角色相似度相同
    const zero: PersonalityVector = {
      autonomy: 0,
      emotionality: 0,
      order: 0,
      ambition: 0,
      empathy: 0,
      reflection: 0,
    };

    const ranked = matchByVector(zero);
    expect(ranked.map((c) => c.number)).toEqual([...Array(22).keys()]);
  });

  it('累加得分与归一化结果一致', () => {
    const answers = Object.fromEntries(questions.map((q) => [q.id, q.options[0].id]));
    const raw = accumulateScores(answers);
    const ranges = computeRanges();
    const normalized = normalizeScores(raw, ranges);
    const result = match(answers);

    expect(result.playerVector).toEqual(normalized);
  });
});

/* ------------------------------------------------------------------ */
/* 可达性 —— 核心保证                                                  */
/* ------------------------------------------------------------------ */

describe('角色可达性', () => {
  /**
   * 模拟退火搜索：寻找一组答案，使目标角色成为匹配结果。
   *
   * 关键点：优化目标不是「目标角色分数最高」，
   * 而是「目标角色分数 − 当前第一名分数」的**差距最大**。
   * 只有最大化差距，才能让目标角色真正登顶。
   *
   * 使用模拟退火以跳出局部最优。
   * 伪随机数由固定种子生成（不使用 Math.random），保证测试可复现。
   */
  function searchFor(targetId: string, startSeed: number): boolean {
    /** 目标角色分数 − 当前最高分（差距越大越好） */
    const margin = (answers: Record<string, string>): number => {
      const result = match(answers);
      const target = result.scores.find((s) => s.card.id === targetId);
      if (!target) return -Infinity;
      const top = result.scores[0];
      return target.similarity - (top.card.id === targetId ? 0 : top.similarity);
    };

    // 确定性的伪随机数发生器（线性同余），保证测试可复现
    let seed = startSeed;
    const rand = (): number => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    const best = { answers: {} as Record<string, string>, score: -Infinity };

    // 多起点，每个起点跑一次退火
    for (let attempt = 0; attempt < 60; attempt++) {
      const current: Record<string, string> = {};
      for (const q of questions) {
        current[q.id] = q.options[Math.floor(rand() * q.options.length)].id;
      }
      let currentMargin = margin(current);

      if (currentMargin > best.score) {
        best.answers = { ...current };
        best.score = currentMargin;
      }
      if (currentMargin > 0) break;

      // 模拟退火：温度随迭代下降
      const ITERATIONS = 1200;
      for (let iter = 0; iter < ITERATIONS && currentMargin <= 0; iter++) {
        const temperature = 0.08 * (1 - iter / ITERATIONS) + 0.0005;

        // 随机挑一题，随机换它的选项
        const q = questions[Math.floor(rand() * questions.length)];
        const original = current[q.id];
        const options = q.options.filter((o) => o.id !== original);
        if (options.length === 0) continue;

        current[q.id] = options[Math.floor(rand() * options.length)].id;
        const newMargin = margin(current);

        const delta = newMargin - currentMargin;
        if (delta > 0 || rand() < Math.exp(delta / temperature)) {
          currentMargin = newMargin;
          if (currentMargin > best.score) {
            best.answers = { ...current };
            best.score = currentMargin;
          }
        } else {
          current[q.id] = original;
        }
      }

      if (currentMargin > 0) break;
    }

    // 检查最佳候选是否真的让目标角色成为第一名
    return match(best.answers).primary.id === targetId;
  }

  it('每个角色都能通过某种答题组合被匹配到', () => {
    const unreachable: string[] = [];

    for (const profile of personalityProfiles) {
      let reached = false;

      // 不同的起点覆盖不同区域
      for (let seed = 1; seed <= 4 && !reached; seed++) {
        reached = searchFor(profile.id, seed * 7919);
      }

      if (!reached) {
        unreachable.push(`${profile.id}(${profile.characterNameZh})`);
      }
    }

    expect(
      unreachable,
      `以下角色在穷举搜索下仍无法被匹配到：${unreachable.join(', ')}`,
    ).toHaveLength(0);
  });

  it('每个角色都能在其「原型向量」上排名第一', () => {
    // 直接以角色自身的原型向量参与匹配，它应当排名第一——
    // 这保证了每个角色都占据一个真实的、可达的空间区域。
    const failures: string[] = [];

    for (const profile of personalityProfiles) {
      const ranked = matchByVector(profile.vector);
      if (ranked[0].id !== profile.id) {
        failures.push(`${profile.id} → ${ranked[0].id}`);
      }
    }

    expect(
      failures,
      `以下角色在自身原型向量上不是最优匹配：${failures.join(', ')}`,
    ).toHaveLength(0);
  });

  it('遍历全部单一选项组合时，能覆盖到多个角色', () => {
    // 穷举「每题都选第 i 个选项」的 4 种组合，
    // 确认算法不会塌缩到极少的几个角色上。
    const reached = new Set<string>();

    for (let i = 0; i < 4; i++) {
      const answers = Object.fromEntries(
        questions.map((q) => [q.id, q.options[i].id]),
      );
      reached.add(match(answers).primary.id);
    }

    expect(reached.size, '固定选项组合应覆盖多个不同角色').toBeGreaterThan(1);
  });
});

/* ------------------------------------------------------------------ */
/* 结果文案质量                                                       */
/* ------------------------------------------------------------------ */

describe('结果叙述生成', () => {
  /** 构造一组能稳定命中指定角色的答案 */
  function answersFor(cardId: string): AnswerSet {
    const profile = personalityProfiles.find((p) => p.id === cardId)!;
    const answers: AnswerSet = {};
    for (const q of questions) {
      // 找出在该角色原型向量上得分最高的选项
      let bestId = q.options[0].id;
      let bestScore = -Infinity;
      for (const opt of q.options) {
        let score = 0;
        for (const [dim, value] of Object.entries(opt.scores) as [
          keyof PersonalityVector,
          number,
        ][]) {
          score += value * profile.vector[dim];
        }
        if (score > bestScore) {
          bestScore = score;
          bestId = opt.id;
        }
      }
      answers[q.id] = bestId;
    }
    return answers;
  }

  it('每一张牌都能生成结构完整的叙述', () => {
    for (const card of tarotCards) {
      const narrative = buildNarrative(match(answersFor(card.id)));

      for (const [key, value] of Object.entries(narrative)) {
        expect(value, `${card.id} 的 ${key} 不应为空`).toBeTruthy();
        expect(value.length, `${card.id} 的 ${key} 过短`).toBeGreaterThan(10);
      }
    }
  });

  it('叙述中不出现空占位或重复的书名', () => {
    const problems: string[] = [];

    for (const card of tarotCards) {
      const result = match(answersFor(card.id));
      // 用实际匹配到的角色来检查——叙述是针对 primary 生成的
      const primary = result.primary;
      const n = buildNarrative(result);
      const all = [n.opening, n.whyMatched, n.strengths, n.shadows, n.advice];

      for (const text of all) {
        // 「：。」这种空占位
        if (/：\s*[。，、]/.test(text)) {
          problems.push(`${primary.id}: 空占位 → ${text.slice(0, 40)}`);
        }
        // 「《X》里的X」这种重复——当作品名与角色名相同时会出现
        if (
          primary.novelName.includes(primary.characterNameZh) &&
          new RegExp(`《${primary.novelName}》里的${primary.characterNameZh}`).test(
            text,
          )
        ) {
          problems.push(`${primary.id}: 书名与角色名重复 → ${text.slice(0, 40)}`);
        }
        // 「《X》里遇见了X」这种重复
        if (
          primary.novelName.includes(primary.characterNameZh) &&
          new RegExp(`《${primary.novelName}》里遇见了${primary.characterNameZh}`).test(
            text,
          )
        ) {
          problems.push(`${primary.id}: 书名与角色名重复 → ${text.slice(0, 40)}`);
        }
        // 未替换的模板占位
        if (/\$\{[^}]+\}|undefined|null|NaN/.test(text)) {
          problems.push(`${primary.id}: 模板未替换 → ${text.slice(0, 40)}`);
        }
        // 出现「你你」「在在」这类叠字
        if (/你你|在在|了了|是是/.test(text)) {
          problems.push(`${primary.id}: 叠字 → ${text.slice(0, 40)}`);
        }
        // 「你+名词短语」造成的病句，例如「你极强的自我定义能力」
        if (/你(?:极强|强烈的|巨大的)/.test(text)) {
          problems.push(`${primary.id}: 病句 → ${text.slice(0, 40)}`);
        }
        // 重复助词：模板已提供「把」或「有」，数据里不应再带一遍
        if (/把把|把可能|把容易|有有|把会/.test(text)) {
          problems.push(`${primary.id}: 重复助词 → ${text.slice(0, 40)}`);
        }
      }
    }

    expect(problems, `叙述文案存在问题：\n${problems.join('\n')}`).toHaveLength(0);
  });

  it('每一段叙述都以完整标点收尾', () => {
    const problems: string[] = [];

    for (const card of tarotCards) {
      const result = match(answersFor(card.id));
      const n = buildNarrative(result);

      for (const [key, value] of Object.entries(n)) {
        if (!/[。！？]$/.test(value.trim())) {
          problems.push(`${card.id}.${key} 未以标点收尾`);
        }
      }
    }

    expect(problems, `叙述收尾存在问题：\n${problems.join('\n')}`).toHaveLength(0);
  });

  it('叙述会引用作品名时带上书名号', () => {
    for (const card of tarotCards) {
      const result = match(answersFor(card.id));
      const primary = result.primary;
      const n = buildNarrative(result);

      // 只有当作品名被当作「书名」引用时才检查书名号。
      // 角色名与作品名同字时（《秀拉》），叙述里可能出现裸的作品名，
      // 这不算错误。
      if (primary.novelName.includes(primary.characterNameZh)) continue;

      if (n.opening.includes(primary.novelName)) {
        expect(
          n.opening.includes(`《${primary.novelName}》`),
          `${primary.id}: 作品名应写作《${primary.novelName}》`,
        ).toBe(true);
      }
    }
  });
});
