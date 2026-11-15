/**
 * 人物原型向量 — 匹配算法的另一端
 *
 * 每个角色在六维人格空间中的位置。
 * 向量与 src/data/tarotCards.ts 中的 personalityVector 保持一致，
 * 但单独存放，便于日后单独调参而不影响卡片文案。
 *
 * ⚠️ 设计原则：
 * 1. 每个角色都必须落在六维空间中一个**独特**的位置上，
 *    不能与任何其他角色的余弦相似度接近 1（否则永远分不出来）。
 * 2. 角色的位置必须忠于她在文学中的性格，而不是为了好看硬凑。
 * 3. `npm test` 会校验：每个角色都能在某种答题组合下被匹配到。
 */

import type { PersonalityVector } from './tarotCards';

export interface PersonalityProfile {
  /** 与 tarotCards.id 一致 */
  id: string;
  characterNameZh: string;
  novelName: string;
  /** 一句话原型描述 */
  archetype: string;
  /** 六维原型向量，范围 -2 ~ +2 */
  vector: PersonalityVector;
  /**
   * 该角色的「可达区域」——玩家在什么样的答题倾向下会得到她。
   * 用于自动化测试：确保 22 个角色都存在实际可达的答题组合。
   */
  reachability: {
    /** 高分维度：这些维度得分越高，越容易匹配到该角色 */
    high: (keyof PersonalityVector)[];
    /** 低分维度：这些维度得分越低，越容易匹配到该角色 */
    low: (keyof PersonalityVector)[];
  };
}

export const personalityProfiles: PersonalityProfile[] = [
  {
    id: 'fool',
    characterNameZh: '伊姬',
    novelName: '油炸绿番茄',
    archetype: '自由与冒险',
    // 极度自由、随性，对规则与深度反思都不耐烦
    vector: { autonomy: 2, emotionality: 1, order: -2, ambition: 0, empathy: 1, reflection: -2 },
    reachability: { high: ['autonomy'], low: ['order', 'reflection'] },
  },
  {
    id: 'magician',
    characterNameZh: '乔·马奇',
    novelName: '小妇人',
    archetype: '创造与表达',
    // 创造欲与进取心都拉满，不受规则约束
    vector: { autonomy: 2, emotionality: 1, order: -2, ambition: 2, empathy: 0, reflection: -1 },
    reachability: { high: ['autonomy', 'ambition'], low: ['order'] },
  },
  {
    id: 'high-priestess',
    characterNameZh: '克拉拉',
    novelName: '幽灵之家',
    archetype: '直觉与精神世界',
    // 极深的内省与直觉，几乎不求现实成就
    vector: { autonomy: 0, emotionality: 1, order: 0, ambition: -2, empathy: 1, reflection: 2 },
    reachability: { high: ['reflection'], low: ['ambition'] },
  },
  {
    id: 'empress',
    characterNameZh: '露丝',
    novelName: '油炸绿番茄',
    archetype: '滋养与丰盛',
    // 滋养他人是核心，但同时极重秩序与务实（做饭、维持运转）
    vector: { autonomy: -1, emotionality: 1, order: 2, ambition: 0, empathy: 2, reflection: -1 },
    reachability: { high: ['empathy', 'order'], low: ['autonomy'] },
  },
  {
    id: 'emperor',
    characterNameZh: '贾探春',
    novelName: '红楼梦',
    archetype: '秩序与治理',
    // 秩序与进取的化身，冷硬、讲结构
    vector: { autonomy: 1, emotionality: -2, order: 2, ambition: 2, empathy: -1, reflection: 1 },
    reachability: { high: ['order', 'ambition'], low: ['emotionality'] },
  },
  {
    id: 'hierophant',
    characterNameZh: '苔丝',
    novelName: '德伯家的苔丝',
    archetype: '良知与道德权威',
    // 良知、共情、克制并行，不图进取
    vector: { autonomy: 0, emotionality: 1, order: 1, ambition: -2, empathy: 2, reflection: 2 },
    reachability: { high: ['empathy', 'reflection'], low: ['ambition'] },
  },
  {
    id: 'lovers',
    characterNameZh: '梅格·马奇',
    novelName: '小妇人',
    archetype: '结合与选择',
    // 归属与陪伴优先，靠关系而非成就定义价值
    vector: { autonomy: -2, emotionality: 2, order: 1, ambition: -1, empathy: 2, reflection: 0 },
    reachability: { high: ['empathy', 'emotionality'], low: ['autonomy'] },
  },
  {
    id: 'chariot',
    characterNameZh: '斯嘉丽',
    novelName: '飘',
    archetype: '生存意志',
    // 意志与野心压倒一切，拒绝内省也不迁就他人
    vector: { autonomy: 2, emotionality: 0, order: -1, ambition: 2, empathy: -2, reflection: -2 },
    reachability: { high: ['ambition', 'autonomy'], low: ['empathy', 'reflection'] },
  },
  {
    id: 'strength',
    characterNameZh: '梅兰妮',
    novelName: '飘',
    archetype: '温柔的勇气',
    // 极强的共情与情感，代价是几乎不为自己争取
    vector: { autonomy: -2, emotionality: 2, order: 0, ambition: -1, empathy: 2, reflection: -1 },
    reachability: { high: ['empathy'], low: ['autonomy', 'ambition'] },
  },
  {
    id: 'hermit',
    characterNameZh: '莱农',
    novelName: '我的天才女友',
    archetype: '知识与自我审视',
    // 以学识建立距离，清醒、孤独
    vector: { autonomy: 2, emotionality: -2, order: 1, ambition: 1, empathy: -1, reflection: 2 },
    reachability: { high: ['reflection', 'autonomy'], low: ['empathy', 'emotionality'] },
  },
  {
    id: 'wheel-of-fortune',
    characterNameZh: '蓓基',
    novelName: '名利场',
    archetype: '野心与机变',
    // 纯粹的向上攀爬，不信规则也不动感情
    vector: { autonomy: 2, emotionality: -1, order: -2, ambition: 2, empathy: -2, reflection: 0 },
    reachability: { high: ['ambition', 'autonomy'], low: ['order', 'empathy'] },
  },
  {
    id: 'justice',
    characterNameZh: '伊丽莎白',
    novelName: '傲慢与偏见',
    archetype: '公正与修正偏见',
    // 判断清晰、敢于修正，情绪上保持距离
    vector: { autonomy: 1, emotionality: -1, order: 1, ambition: 0, empathy: 0, reflection: 2 },
    reachability: { high: ['reflection'], low: ['emotionality'] },
  },
  {
    id: 'hanged-man',
    characterNameZh: '阿米莉亚',
    novelName: '名利场',
    archetype: '从容与等待',
    // 顺从秩序、安于等待、暗自内省
    vector: { autonomy: -2, emotionality: 0, order: 2, ambition: -2, empathy: 1, reflection: 1 },
    reachability: { high: ['order'], low: ['ambition', 'autonomy'] },
  },
  {
    id: 'death',
    characterNameZh: '秀拉',
    novelName: '秀拉',
    archetype: '终结旧身份',
    // 决绝的自我定义，切断一切牵连
    vector: { autonomy: 2, emotionality: 0, order: -2, ambition: 0, empathy: -2, reflection: 1 },
    reachability: { high: ['autonomy'], low: ['order', 'empathy'] },
  },
  {
    id: 'temperance',
    characterNameZh: '薛宝钗',
    novelName: '红楼梦',
    archetype: '调和与克制',
    // 极致的分寸感与长线布局，情绪收得最干净
    vector: { autonomy: 0, emotionality: -2, order: 2, ambition: 1, empathy: 1, reflection: 2 },
    reachability: { high: ['order', 'reflection'], low: ['emotionality'] },
  },
  {
    id: 'devil',
    characterNameZh: '爱玛',
    novelName: '包法利夫人',
    archetype: '欲望与幻想',
    // 浪漫而脱离现实，渴望强烈而不顾代价
    vector: { autonomy: 0, emotionality: 2, order: -2, ambition: 1, empathy: -1, reflection: -2 },
    reachability: { high: ['emotionality'], low: ['order', 'reflection'] },
  },
  {
    id: 'tower',
    characterNameZh: '莉拉',
    novelName: '我的天才女友',
    archetype: '结构崩塌与敏锐洞察',
    // 极端的洞察力，看穿一切却与世界失联
    vector: { autonomy: 1, emotionality: 1, order: -2, ambition: -1, empathy: -2, reflection: 2 },
    reachability: { high: ['reflection'], low: ['order', 'empathy'] },
  },
  {
    id: 'star',
    characterNameZh: '简·班纳特',
    novelName: '傲慢与偏见',
    archetype: '温柔与希望',
    // 极致的温柔与包容，笃定而不争
    vector: { autonomy: -1, emotionality: 2, order: 1, ambition: -2, empathy: 2, reflection: -1 },
    reachability: { high: ['empathy', 'emotionality'], low: ['ambition'] },
  },
  {
    id: 'moon',
    characterNameZh: '林黛玉',
    novelName: '红楼梦',
    archetype: '敏感与潜意识',
    // 极度的感受力与内省，才气外露而现实疏离
    vector: { autonomy: 0, emotionality: 2, order: -1, ambition: -1, empathy: 1, reflection: 2 },
    reachability: { high: ['reflection', 'emotionality'], low: ['order', 'ambition'] },
  },
  {
    id: 'sun',
    characterNameZh: '莎格',
    novelName: '紫色',
    archetype: '喜悦与分享',
    // 把光分给所有人，不计较回报
    vector: { autonomy: 1, emotionality: 2, order: -2, ambition: 0, empathy: 2, reflection: -1 },
    reachability: { high: ['emotionality', 'empathy'], low: ['order'] },
  },
  {
    id: 'judgement',
    characterNameZh: '阿尔芭',
    novelName: '幽灵之家',
    archetype: '觉醒与召唤',
    // 从顺从中觉醒，自主与内省同步上升
    vector: { autonomy: 1, emotionality: 0, order: 0, ambition: 2, empathy: 1, reflection: 2 },
    reachability: { high: ['reflection', 'ambition'], low: ['order'] },
  },
  {
    id: 'world',
    characterNameZh: '西莉',
    novelName: '紫色',
    archetype: '自我完成与自由',
    // 从底层走完一整圈，终结旧身份并获得自己的名字
    vector: { autonomy: 2, emotionality: 1, order: 0, ambition: 1, empathy: 1, reflection: 1 },
    reachability: { high: ['autonomy'], low: ['order'] },
  },
];
