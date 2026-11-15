/**
 * 性格测试题库 — 16 道原创情境题
 *
 * 每题四选项，各自带六维评分向量（范围 -2 ~ +2）。
 * 题目刻意避免「你勇敢吗」这类直问，改为具体情境，
 * 让人在没有意识到自己在被测量的情况下作出选择。
 *
 * ⚠️ 修改题目时无需改动组件：只要保持此文件的结构即可。
 *
 * 📐 调整题目评分时请注意：
 * 六个维度都必须能取到正值与负值，否则该维度无法区分人物。
 * `npm test` 会检查这一点。
 */

import type { PersonalityVector } from './tarotCards';

export interface QuizOption {
  id: string;
  text: string;
  /** 该选项的六维评分 */
  scores: Partial<PersonalityVector>;
}

export interface QuizQuestion {
  id: string;
  /** 题干 */
  prompt: string;
  /** 题干上方的情境提示（可空） */
  context?: string;
  options: QuizOption[];
}

export const questions: QuizQuestion[] = [
  {
    id: 'q01',
    context: '关于规则',
    prompt: '当你发现一直相信的规则正在伤害某个人，你会怎么做？',
    options: [
      { id: 'a', text: '即使付出代价，也要当面公开反对。', scores: { autonomy: 1, order: -1, empathy: 1, reflection: 1 } },
      { id: 'b', text: '先弄清规则是怎么形成的，再寻找能改变它的方式。', scores: { order: 1, reflection: 2, ambition: 1, autonomy: 1, emotionality: -1 } },
      { id: 'c', text: '私下保护那个被伤害的人，不张扬。', scores: { empathy: 2, emotionality: 1, reflection: 1, ambition: -1 } },
      { id: 'd', text: '离开这套规则，为自己创造另一种生活。', scores: { autonomy: 2, order: -2, ambition: 1, empathy: -1, emotionality: -1 } },
    ],
  },
  {
    id: 'q02',
    context: '关于表达',
    prompt: '有一件事你心里想了很久，终于决定要表达出来。你选择——',
    options: [
      { id: 'a', text: '写成文字，因为我想好了才敢说。', scores: { reflection: 2, order: 1, emotionality: -1 } },
      { id: 'b', text: '当面对她说，即使可能会冷场。', scores: { ambition: 1, autonomy: 1, emotionality: 1, reflection: -1 } },
      { id: 'c', text: '先说一半，看她的反应再决定要不要继续。', scores: { empathy: 1, emotionality: 1, reflection: 1, ambition: -1 } },
      { id: 'd', text: '先不说，我还没想清楚它到底意味着什么。', scores: { reflection: 2, emotionality: 1, ambition: -1, order: -1 } },
    ],
  },
  {
    id: 'q03',
    context: '关于关系',
    prompt: '你最不能接受的是哪一种相处方式？',
    options: [
      { id: 'a', text: '被当作理所当然的存在。', scores: { autonomy: 2, reflection: 1, empathy: -1 } },
      { id: 'b', text: '凡事都要解释、都要交代清楚。', scores: { order: 2, autonomy: -1, reflection: 1, emotionality: -1 } },
      { id: 'c', text: '对方从来不肯承认我的付出。', scores: { empathy: 2, emotionality: 2, order: -1 } },
      { id: 'd', text: '关系里没有真正的期待，也没有真正的靠近。', scores: { emotionality: 1, empathy: 1, reflection: 2, ambition: -1 } },
    ],
  },
  {
    id: 'q04',
    context: '关于混乱',
    prompt: '一场突如其来的变故打乱了你所有的计划。你首先做的是——',
    options: [
      { id: 'a', text: '把眼前能做的事一件件做完，秩序会自己回来。', scores: { order: 2, empathy: 1, reflection: 1, emotionality: -1 } },
      { id: 'b', text: '先找到这件事里最要紧的那个部分。', scores: { ambition: 2, reflection: 1, order: 1, emotionality: -1 } },
      { id: 'c', text: '先看看身边谁需要我。', scores: { empathy: 2, emotionality: 1, order: -1 } },
      { id: 'd', text: '允许自己先乱一会儿，之后再说。', scores: { emotionality: 2, reflection: 1, order: -1, ambition: -1 } },
    ],
  },
  {
    id: 'q05',
    context: '关于时间',
    prompt: '如果你的时间突然多出一整年，没有人会知道，你会——',
    options: [
      { id: 'a', text: '用来学一样一直想学的东西。', scores: { reflection: 2, ambition: 1, order: 1, emotionality: -1 } },
      { id: 'b', text: '用来做一件早该做、但一直没空做的事。', scores: { ambition: 2, order: 1, reflection: 1, emotionality: -1 } },
      { id: 'c', text: '和喜欢的人待在一起，什么也不做。', scores: { empathy: 2, emotionality: 2, ambition: -1 } },
      { id: 'd', text: '出走，去一个没有人认识我的地方。', scores: { autonomy: 2, order: -2, reflection: 1, emotionality: -1 } },
    ],
  },
  {
    id: 'q06',
    context: '关于真相',
    prompt: '你发现自己误解了一直信任的人。对方还不知道你已经知道。你会——',
    options: [
      { id: 'a', text: '先独自消化，确认了再说。', scores: { reflection: 2, order: 1, empathy: 1, emotionality: -1 } },
      { id: 'b', text: '立刻摊开讲，哪怕场面会很难看。', scores: { autonomy: 2, reflection: 1, empathy: -1, order: -1, emotionality: 1 } },
      { id: 'c', text: '先观察一阵，也许还有别的解释。', scores: { reflection: 2, empathy: 1, emotionality: 1 } },
      { id: 'd', text: '决定就当不知道了。', scores: { order: 2, empathy: 1, autonomy: -1, reflection: -1, emotionality: -1 } },
    ],
  },
  {
    id: 'q07',
    context: '关于创造',
    prompt: '手里有一段还不错的素材，你打算把它变成——',
    options: [
      { id: 'a', text: '一件完成的作品，哪怕粗糙。', scores: { ambition: 2, reflection: 1, order: 1, emotionality: -1 } },
      { id: 'b', text: '一个足够大胆的想法，先不管可行性。', scores: { ambition: 2, autonomy: 2, order: -2, emotionality: 1 } },
      { id: 'c', text: '留给自己，反复打磨，但暂不示人。', scores: { reflection: 2, order: 1, empathy: -1, ambition: -1, emotionality: -1 } },
      { id: 'd', text: '分给身边的人，看看他们会做出什么。', scores: { empathy: 2, emotionality: 1, reflection: 1 } },
    ],
  },
  {
    id: 'q08',
    context: '关于公平',
    prompt: '有人做错了一件小事，而规则对ta过于严厉。你——',
    options: [
      { id: 'a', text: '替ta说话，规则也该有分寸。', scores: { empathy: 2, emotionality: 1, order: -1 } },
      { id: 'b', text: '认为规则若不能通融，就该被修改。', scores: { order: 1, reflection: 2, autonomy: 1, empathy: 1, emotionality: -1 } },
      { id: 'c', text: '尊重规则。制度的可信度比个案的委屈重要。', scores: { order: 2, ambition: 1, empathy: -1, emotionality: -2 } },
      { id: 'd', text: '会有点难过——这世上的不公，往往就是这么开始的。', scores: { reflection: 2, empathy: 2, emotionality: 2, ambition: -1 } },
    ],
  },
  {
    id: 'q09',
    context: '关于等待',
    prompt: '你等了很久的一件事终于有消息了，但结果并不如愿。你的第一反应是——',
    options: [
      { id: 'a', text: '找下一个可以立刻开始的路。', scores: { ambition: 2, autonomy: 2, reflection: -1, emotionality: -1 } },
      { id: 'b', text: '把这结果好好收起来，它只是还没到时候。', scores: { order: 2, reflection: 1, ambition: -1, empathy: 1, emotionality: -1 } },
      { id: 'c', text: '允许自己难过一阵子。', scores: { emotionality: 2, empathy: 1, order: -1 } },
      { id: 'd', text: '想弄清楚，到底是哪一步出了错。', scores: { reflection: 2, order: 1, ambition: 1, emotionality: -1 } },
    ],
  },
  {
    id: 'q10',
    context: '关于独处',
    prompt: '连续几天没有人可以说话。你的状态是——',
    options: [
      { id: 'a', text: '安静下来，正好想清楚一些事。', scores: { reflection: 2, autonomy: 1, empathy: -1, emotionality: -1 } },
      { id: 'b', text: '有点空，但不至于难受。', scores: { emotionality: 1, order: 1, reflection: 1 } },
      { id: 'c', text: '难受，会想找人说说话。', scores: { empathy: 2, emotionality: 2, autonomy: -1 } },
      { id: 'd', text: '开始写、开始做点什么，把时间填满。', scores: { ambition: 2, reflection: 1, emotionality: 1 } },
    ],
  },
  {
    id: 'q11',
    context: '关于代价',
    prompt: '一件消耗极大的事摆在你面前。它值得吗，取决于——',
    options: [
      { id: 'a', text: '它能不能做成，有没有可能。', scores: { ambition: 2, order: 1, reflection: 1, emotionality: -1 } },
      { id: 'b', text: '它对我意味着什么，我是否能承受。', scores: { reflection: 2, emotionality: 2 } },
      { id: 'c', text: '会不会因此错过更值得的东西。', scores: { order: 1, reflection: 2, empathy: 1, emotionality: -1 } },
      { id: 'd', text: '只要我还想做，就不需要理由。', scores: { autonomy: 2, ambition: 1, order: -1, reflection: -1, emotionality: 1 } },
    ],
  },
  {
    id: 'q12',
    context: '关于家庭',
    prompt: '家人问你一个很难回答的问题。你会——',
    options: [
      { id: 'a', text: '认真回答，哪怕他们未必接受。', scores: { autonomy: 1, reflection: 2, empathy: 1, emotionality: -1 } },
      { id: 'b', text: '先让场面过去，之后再慢慢说。', scores: { order: 2, empathy: 2, autonomy: -1, ambition: -1, emotionality: -1 } },
      { id: 'c', text: '给一个让人安心的答案。', scores: { empathy: 2, emotionality: 1, order: 1, autonomy: -1 } },
      { id: 'd', text: '岔开话题，或者干脆离开。', scores: { autonomy: 2, order: -2, empathy: -1, reflection: 1, emotionality: -1 } },
    ],
  },
  {
    id: 'q13',
    context: '关于失败',
    prompt: '你认真投入的事情没有成功。之后你更可能——',
    options: [
      { id: 'a', text: '迅速转向下一个机会。', scores: { ambition: 2, autonomy: 2, reflection: -1, emotionality: -1 } },
      { id: 'b', text: '把它反复复盘，弄清问题出在哪。', scores: { reflection: 2, order: 1, ambition: 1, emotionality: -1 } },
      { id: 'c', text: '需要一段时间，才有力气重新开始。', scores: { emotionality: 2, reflection: 1, order: -1 } },
      { id: 'd', text: '把这次的失败和之前的失败放在一起看。', scores: { reflection: 2, order: 2, empathy: 1, emotionality: -1 } },
    ],
  },
  {
    id: 'q14',
    context: '关于给予',
    prompt: '你手里有一件很好的东西，而另一个人更需要它。你——',
    options: [
      { id: 'a', text: '给。对方需要，比我攥着更有意义。', scores: { empathy: 2, emotionality: 1, ambition: -1 } },
      { id: 'b', text: '给，但想清楚怎么给才不会让对方难堪。', scores: { empathy: 2, order: 2, reflection: 1, emotionality: -1 } },
      { id: 'c', text: '留着。这不是可以随便给出的东西。', scores: { autonomy: 2, order: 1, empathy: -1, reflection: -1, emotionality: -1 } },
      { id: 'd', text: '先问对方需不需要，再决定。', scores: { reflection: 2, empathy: 1, order: 1, emotionality: -1 } },
    ],
  },
  {
    id: 'q15',
    context: '关于活法',
    prompt: '回顾自己走过的路，你更认同哪一种活法？',
    options: [
      { id: 'a', text: '把一件事做到极致，其余的交给命运。', scores: { ambition: 2, reflection: 2, order: 1, emotionality: -1 } },
      { id: 'b', text: '把日子过得踏实，具体的幸福最重要。', scores: { empathy: 2, order: 1, ambition: -1 } },
      { id: 'c', text: '保持自由，不把自己钉死在任何地方。', scores: { autonomy: 2, order: -2, ambition: 1, emotionality: -1 } },
      { id: 'd', text: '不断认识新的自己，旧的那个会慢慢过去。', scores: { reflection: 2, autonomy: 1, order: -1 } },
    ],
  },
  {
    id: 'q16',
    context: '关于意义',
    prompt: '如果这一生只能留下一句话，你希望它是什么？',
    options: [
      { id: 'a', text: '我做的事对别人有用。', scores: { empathy: 2, order: 1, ambition: 1, emotionality: -1 } },
      { id: 'b', text: '我始终忠于自己。', scores: { autonomy: 2, reflection: 1, order: -1, emotionality: -1 } },
      { id: 'c', text: '我曾经真正地活过。', scores: { emotionality: 2, ambition: 2, reflection: 1 } },
      { id: 'd', text: '我理解了那些我爱的人。', scores: { empathy: 2, emotionality: 2, reflection: 2, ambition: -1 } },
    ],
  },
];

export const TOTAL_QUESTIONS = questions.length;
