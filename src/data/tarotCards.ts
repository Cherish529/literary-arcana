/**
 * 22 张文学塔罗 — 官方配对表
 *
 * ⚠️ 这是唯一的权威数据源。人物与塔罗的对应关系不可更改。
 * 若需替换图片，只需修改 image 字段，或按 README 的命名约定放入
 * public/cards/ 后重新运行 `npm run cards:prepare`。
 */

/** 台词类型 */
export type QuoteType =
  | 'novel'      // 已核实原著台词
  | 'film'       // 影视台词
  | 'original';  // 原创文学箴言（本站创作，非原作出处）

/** 人格维度 */
export interface PersonalityVector {
  autonomy: number;    // 自主与独立
  emotionality: number; // 情感表达与敏感度
  order: number;       // 秩序、稳定与规则倾向
  ambition: number;    // 行动、野心与目标导向
  empathy: number;     // 共情、关怀与关系倾向
  reflection: number;  // 自省、直觉与精神探索
}

export interface TarotCard {
  id: string;
  number: number;
  romanNumeral: string;
  tarotNameZh: string;
  tarotNameEn: string;
  characterNameZh: string;
  characterNameEn: string;
  novelName: string;
  image: string;
  keywords: string[];
  archetype: string;
  shortDescription: string;
  characterBiography: string;
  uprightMeaning: string;
  reversedMeaning: string;
  personalityDescription: string;
  strengths: string[];
  shadowTraits: string[];
  growthAdvice: string;
  literaryQuote: string;
  quoteAttribution: string;
  quoteType: QuoteType;
  visualSymbolism: string;
  personalityVector: PersonalityVector;
}

export const tarotCards: TarotCard[] = [
  {
    id: 'fool',
    number: 0,
    romanNumeral: '0',
    tarotNameZh: '愚者',
    tarotNameEn: 'The Fool',
    characterNameZh: '伊姬',
    characterNameEn: 'Idgie Threadgoode',
    novelName: '油炸绿番茄',
    image: '/cards/00-fool.webp',
    keywords: ['自由', '冒险', '纯真', '未知', '可能性'],
    archetype: '自由与冒险',
    shortDescription:
      '她不等许可就出发，把别人的规矩留在身后。厄尼的小屋与油炸绿番茄的铁锅，是她为自己发明的生存方式。',
    characterBiography:
      '在弟弟的葬礼上，她编出自己并没有死去的谎言，从此在众人的目光之外生活。她拒绝成为某个人的妹妹、妻子或受害者，宁愿带着一罐番茄在河岸上独居。她不追求宏大的意义，只要求每一天都能自己决定。',
    uprightMeaning:
      '正位的愚者是一份尚未被解释的邀请——世界还没有告诉她该怎么活，而她愿意在还不知道的时候先走一步。伊姬代表那种轻盈的勇气：相信只要还年轻、只要还笑着，世界就允许多种活法。',
    reversedMeaning:
      '逆位时，天真变成了逃避责任的自由。害怕被承诺、害怕失去，于是把每一次关系的结束都解释成对方的错。愚者若拒绝长大，就只剩下一场漫长的流浪。',
    personalityDescription:
      '你身上有一种让人放松的坦率。你不急着定义自己，也不认为人生必须有一条主线；你的价值感不来自成就，而来自「我有自己的主意」这件事本身。你在别人眼里的散漫，其实是极其罕见的自主。',
    strengths: [
      '不被既有规则束缚，能想到常规之外的解法',
      '有极强的感染力，能让他人恢复对生活的兴趣',
      '在动荡中保持弹性，不容易被失败击垮',
      '忠于自己的感受，不为迎合而放弃底线',
    ],
    shadowTraits: [
      '把逃避与自由混为一谈',
      '不愿为承诺承担后续责任',
      '活在当下，但当下常常很短',
      '面对需要长期坚持的事容易失去兴趣',
    ],
    growthAdvice:
      '保留你随时出发的能力，但要为某些人、某些事留下来一次。你并不缺少可能性，缺的是让可能性变成经历的那段耐心。',
    literaryQuote: '我不想当任何人的妹妹、妻子或受害者。',
    quoteAttribution: '原创文学箴言 · 依据伊姬的人物精神撰写',
    quoteType: 'original',
    visualSymbolism:
      '画面中少女提灯立于断崖边缘，脚下是深谷，身后是来时的路。灯是她的机敏——不照亮别人，只照亮自己下一步踩到哪里；悬崖不是威胁，而是她选择的自由的价格。',
    personalityVector: { autonomy: 2, emotionality: 1, order: -2, ambition: 0, empathy: 1, reflection: -2 },
  },
  {
    id: 'magician',
    number: 1,
    romanNumeral: 'I',
    tarotNameZh: '魔术师',
    tarotNameEn: 'The Magician',
    characterNameZh: '乔·马奇',
    characterNameEn: 'Jo March',
    novelName: '小妇人',
    image: '/cards/01-magician.webp',
    keywords: ['创造', '表达', '才华', '行动', '不拘一格'],
    archetype: '创造与表达',
    shortDescription:
      '她想当海纳尔·贝的船长，把纸笔当成航海图，用写作替自己造出一片海。',
    characterBiography:
      '乔不像她的姐姐们那样温顺地接受「女孩该成为什么样的人」。她想要才华与远方，于是拼命写作、投稿、被拒绝、再写。她最终成了一名作家，却没有因此变成淑女——她用一辈子证明创造与体面可以同时属于一个人。',
    uprightMeaning:
      '正位的魔术师掌握着全部工具，并且已经决定使用它们。乔代表一种主动的创造冲动：天赋不是用来被赞叹的，是用来被使用的。她的力量在于把脑中的东西变成纸上真实存在的东西。',
    reversedMeaning:
      '逆位时，创造力可能被技巧本身遮蔽。乔一度以为写作只是通往某个目的的手段，或者用才华换取被喜欢的资格。当「我要成为作家」变成「我要成为作家那样的人」，魔术就变成了戏法。',
    personalityDescription:
      '你有一种很难被模仿的冲动——把模糊的感受变成明确的形式。你不满足于「大概是这样」，你一定要写出、做出、做出一个能拿在手里的东西。你的自信来自「我能做到」，而不是「别人认可我」。',
    strengths: [
      '极强的创造冲动，能把想法落实为具体作品',
      '不被常规路径束缚，敢做少数派的选择',
      '行动力强，想到就去做，不长期停留在设想',
      '以作品而非身份定义自己',
    ],
    shadowTraits: [
      '把「独立」演成「必须一个人扛」',
      '容易因过度投入而忽略身体的警告',
      '有时用才华掩盖了不愿被理解的部分',
      '对被规训的敏感，可能变成对他人的苛刻',
    ],
    growthAdvice:
      '你的才华需要读者，也需要同伴。别把「独立」误当成「只能自己」——能与人合作的人，往往能完成更复杂的东西。',
    literaryQuote: '我讨厌女子被关在家里。我要做海纳尔·贝的船长。',
    quoteAttribution: '原创文学箴言 · 依据乔·马奇的人物精神撰写',
    quoteType: 'original',
    visualSymbolism:
      '一桌工具铺陈：一支笔、一卷纸、一柄小刀、一把琴。无限与四元素环绕其身——正代表「材料齐备，只欠动手」。桌上的玫瑰与白鸦，则指向灵感与危险同源的事实。',
    personalityVector: { autonomy: 2, emotionality: 1, order: -2, ambition: 2, empathy: 0, reflection: -1 },
  },
  {
    id: 'high-priestess',
    number: 2,
    romanNumeral: 'II',
    tarotNameZh: '女祭司',
    tarotNameEn: 'The High Priestess',
    characterNameZh: '克拉拉',
    characterNameEn: 'Clara del Valle',
    novelName: '幽灵之家',
    image: '/cards/02-high-priestess.webp',
    keywords: ['直觉', '精神世界', '秘密', '宁静', '内在'],
    archetype: '直觉与精神世界',
    shortDescription:
      '她的钢琴是通向他人的门。克拉拉以音乐与梦抵达那些语言无法抵达的地方。',
    characterBiography:
      '克拉拉生来便能听见并非用耳朵听见的声音。她的琴声能越过孤独的围墙，抵达塞巴斯蒂安无法抵达的地方；她的梦能预言尚未发生的相遇。她几乎不为自己争取什么，她活在一种极深的精神专注里——像一座不喧哗的灯塔。',
    uprightMeaning:
      '正位的女祭司守着尚未说出口的真相。她的智慧不来自辩论，而来自某种更安静的来源——直觉、梦境、预感、与内在的对话。克拉拉代表一种被动却深刻的洞察：你知道的比你以为能证明的更多。',
    reversedMeaning:
      '逆位时，直觉被压回水面之下。你可能已经感觉到答案，却因为无法证实它而否定了它；也可能相反，过度依赖直觉而绕过了必要的验证。沉默有时是智慧，有时只是回避。',
    personalityDescription:
      '你的理解力多半发生在语言之前。你有一种安静的敏锐，能捕捉到别人忽略的气息与弦外之音。你不急着表达，也不急于被理解——在你看来，有些东西一旦说出口反而会失真。',
    strengths: [
      '对细微情绪与氛围有极高的辨识力',
      '在喧闹中保持内在的宁静',
      '直觉可靠，常常在事情发生前就有预感',
      '不靠强势维护自己，靠深度赢得尊重',
    ],
    shadowTraits: [
      '把退缩当作含蓄，把回避当作体贴',
      '太容易用「说出来也没用」放弃争取',
      '容易在关系中扮演永远理解别人的那一个',
      '长期等待被理解，会积累未被表达的委屈',
    ],
    growthAdvice:
      '你的直觉需要出口。试着把至少一件「只是感觉」的事说出来，看看它是不是真的没有依据——你的沉默有时保护了别人，却关住了自己。',
    literaryQuote: '音乐是我唯一不必解释的语言。',
    quoteAttribution: '原创文学箴言 · 依据克拉拉的人物精神撰写',
    quoteType: 'original',
    visualSymbolism:
      '她端坐于双柱之间，身后是石榴幕布——知识与被遮蔽之物。脚下的新月与手中的卷轴，指向潜意识与尚未揭开的真理。幕布之后究竟有什么，是这张牌永恒的悬念。',
    personalityVector: { autonomy: 0, emotionality: 1, order: 0, ambition: -2, empathy: 1, reflection: 2 },
  },
  {
    id: 'empress',
    number: 3,
    romanNumeral: 'III',
    tarotNameZh: '皇后',
    tarotNameEn: 'The Empress',
    characterNameZh: '露丝',
    characterNameEn: 'Ruth Jamison',
    novelName: '油炸绿番茄',
    image: '/cards/03-empress.webp',
    keywords: ['丰饶', '滋养', '感官', '孕育', '生命力'],
    archetype: '滋养与丰盛',
    shortDescription:
      '露丝把乱世里的一餐饭做成了值得被记住的事。她的天赋不宏大，而是具体到一口锅。',
    characterBiography:
      '在战争与动荡的年代，露丝与一群无家可归的人挤在铁皮车厢里，用有限的食材做出热汤。她后来成了小城里的传奇人物。她不懂什么宏大的道理，她只知道：人饿了的时候，需要的是一勺实实在在的东西。',
    uprightMeaning:
      '正位的皇后代表丰盛与滋养——不是占有，而是使事物生长。露丝代表一种具体的慷慨：把资源变成温饱，把混乱变成可以坐下来吃饭的时刻。生命力的最高形态，往往不是燃烧，而是让周围的人也能活。',
    reversedMeaning:
      '逆位时，滋养会滑向消耗。你可能通过照顾别人来回避自己的需要，也可能过度依赖某个人的给予而失去生长的能力。付出若没有边界，会变成另一种形式的索取。',
    personalityDescription:
      '你有很强的「使事情变好」的能力：无论是食物、空间还是一段关系的氛围，你进入之后，它通常会变得更可居住。你的影响力不来自强势，而来自让人愿意留下来。',
    strengths: [
      '极强的照顾能力，能把资源转化为实际的温饱',
      '临场务实，在匮乏条件下也能有所作为',
      '有让人放松的亲和力，容易获得信任',
      '生命力旺盛，能熬过艰难时期',
    ],
    shadowTraits: [
      '用付出换取存在感，价值感依赖被需要',
      '容易忽略自己的疲惫与需求',
      '过度承担，习惯性地替别人收拾',
      '在动荡中倾向于停留在熟悉的位置',
    ],
    growthAdvice:
      '先确保自己也在餐桌上。滋养若是单向外流，终会枯竭——你同样需要被喂养。',
    literaryQuote: '人饿了的时候，需要的是一勺实实在在的东西。',
    quoteAttribution: '原创文学箴言 · 依据露丝的人物精神撰写',
    quoteType: 'original',
    visualSymbolism:
      '皇后侧身倚于华垫之上，麦穗与石榴从衣褶间溢出，是丰收与多子。脚下的星冠与身侧的松柏，则指出这份丰盛是长年累月、而非一夜得来的。',
    personalityVector: { autonomy: -1, emotionality: 1, order: 2, ambition: 0, empathy: 2, reflection: -1 },
  },
  {
    id: 'emperor',
    number: 4,
    romanNumeral: 'IV',
    tarotNameZh: '皇帝',
    tarotNameEn: 'The Emperor',
    characterNameZh: '贾探春',
    characterNameEn: 'Jia Tanchun',
    novelName: '红楼梦',
    image: '/cards/04-emperor.webp',
    keywords: ['秩序', '治理', '权威', '远见', '责任'],
    archetype: '秩序与治理',
    shortDescription:
      '探春在家园倾覆之前，已经把整顿的方案写好了。她才二十岁，就知道一个家要怎样才撑得住。',
    characterBiography:
      '探春是贾府里最有决断的姑娘。她发起改革、裁撤冗员、开办新政，在混乱中承担起本不属于她的责任。她清楚自己是庶出，因此格外不能靠身份办事，只能靠才具。改革最终失败，但她提出问题的方式，在一群混乱的人里显得格外清醒。',
    uprightMeaning:
      '正位的皇帝是结构、边界与责任。探春代表那种在别人还在争吵时已经开始整理问题的人：你相信制度、相信秩序、相信一件事要有章法才能长久。她的权威不来自血统，来自能力与承担。',
    reversedMeaning:
      '逆位时，秩序变成压制。制度若只服务于维系现状，就会冻结所有改变的可能；掌权者也可能被自己的位置绑架，忘了当初为什么要改革。探春的悲剧正在于此：她的方案是对的，但没有人和她站在同一边。',
    personalityDescription:
      '你有一种把混乱整理成秩序的能力。你看事情习惯性地先找结构——哪里出了问题、该由谁负责、规则应该怎么改。你不轻易动摇，也不喜欢含糊其辞的「大家都这样」。',
    strengths: [
      '极强的结构感，能把混乱梳理成可执行的方案',
      '有担当，愿意承担本可推卸的责任',
      '判断清晰，不受一时的情绪左右',
      '善于管理资源与人事',
    ],
    shadowTraits: [
      '容易把「正确」等同于「应该被执行」',
      '对不配合的他人缺乏耐心',
      '承担过多，却不擅长争取理解',
      '可能因过度自律而显得疏离',
    ],
    growthAdvice:
      '你的方案需要盟友。一个人推行的改革，往往会失败不是因为方案错，而是因为没有人愿意跟你一起承担它的代价。',
    literaryQuote: '一个家要撑住，先要有章法。',
    quoteAttribution: '原创文学箴言 · 依据探春的人物精神撰写',
    quoteType: 'original',
    visualSymbolism:
      '皇帝端坐石铸王座，扶手雕着公羊头——意志与统御的象征。铠甲与红袍之下，脚踏的却是坚实大地：他的力量不在于想象，而在于落地。',
    personalityVector: { autonomy: 1, emotionality: -2, order: 2, ambition: 2, empathy: -1, reflection: 1 },
  },
  {
    id: 'hierophant',
    number: 5,
    romanNumeral: 'V',
    tarotNameZh: '教皇',
    tarotNameEn: 'The Hierophant',
    characterNameZh: '苔丝',
    characterNameEn: 'Tess Durbeyfield',
    novelName: '德伯家的苔丝',
    image: '/cards/05-hierophant.webp',
    keywords: ['良知', '道德', '纯洁', '牺牲', '教条'],
    archetype: '良知与道德权威',
    shortDescription:
      '她没有做错什么。哈代让一个纯洁的人扮演罪人，而整个社会都相信了。',
    characterBiography:
      '苔丝出生在一个相信自己「高贵的血统」的家族，却因失贞而永远无法被体面社会接纳。她经历的每一次不幸，都被她所属的阶层记在了她身上。厄姆布鲁姆镇的审判，本该由安吉儿保护她，最终救赎却来自她自己的坚持——她独自走进荒原，接受惩罚，不肯牵连他人。',
    uprightMeaning:
      '正位的教皇指向良知与被授予的道德权威。苔丝代表一种朴素的伦理：即使所有人都说你的命运是你的错，你仍可以相信自己心里有一条不能越过的线。她的纯粹不是天真，而是明知代价仍不改变。',
    reversedMeaning:
      '逆位时，教条反过来成为她的枷锁。当道德由他人判定，当纯洁只由名声衡量，信仰就成了伤人的工具。苔丝故事的残酷在于：审判她的不只是安吉儿，还有她自己也相信的那套东西。',
    personalityDescription:
      '你有一种不肯妥协的道德直觉。你能分辨什么是对的，哪怕代价由你一个人承担。你不太擅长灵活变通，也不喜欢把原则说成「看情况」。你的固执有时被看成天真，但很少被说错。',
    strengths: [
      '内在标准清晰，不因舆论而改变底线',
      '有承担后果的勇气',
      '对他人的痛苦有深切体察',
      '诚实到近乎固执',
    ],
    shadowTraits: [
      '容易把自我惩罚当作担当',
      '不擅长为自己辩护',
      '过分依赖道德判断衡量自身价值',
      '固执可能变成对他人苦难的盲视',
    ],
    growthAdvice:
      '仁慈也需要对自己。你不必用受苦来证明自己的清白——放过自己，同样是一种正当。',
    literaryQuote: '我并没有做错什么。',
    quoteAttribution: '原创文学箴言 · 依据苔丝的人物精神撰写',
    quoteType: 'original',
    visualSymbolism:
      '教皇高坐台座，两名侍僧执冠左右。脚下交叉的双钥，是解开与束缚的双重可能；头顶的三重冠冕，则意味着信仰、教义与制度的层层叠叠。',
    personalityVector: { autonomy: 0, emotionality: 1, order: 1, ambition: -2, empathy: 2, reflection: 2 },
  },
  {
    id: 'lovers',
    number: 6,
    romanNumeral: 'VI',
    tarotNameZh: '恋人',
    tarotNameEn: 'The Lovers',
    characterNameZh: '梅格·马奇',
    characterNameEn: 'Meg March',
    novelName: '小妇人',
    image: '/cards/06-lovers.webp',
    keywords: ['结合', '选择', '价值', '承诺', '归属'],
    archetype: '结合与选择',
    shortDescription:
      '她想要的是一个家，不是一段传奇。梅格在众多可能性里，选了那个能一起过日子的人。',
    characterBiography:
      '梅格·马奇是四姐妹中最像「社会期待的那个」的一个。她放弃了或许可以拥有的虚荣，选择了并不富裕但为人可靠的约翰尼。她爱得务实、具体，会为柴米油盐吵架，也会在最困难的时候撑住整个家。',
    uprightMeaning:
      '正位的恋人是关于选择的：站在岔路口的人必须承认，两条路各有其美，而你只能选一条。梅格代表那种不追求传奇、但认真经营承诺的人。她清楚地知道自己放弃了什么，并愿意为此负责。',
    reversedMeaning:
      '逆位时，选择变成摇摆，或者结合变成将就。梅格的风险在于：她的务实有时会慢慢变成「凑合也行」，而她真正看重的家，会在这种妥协里变得空心。',
    personalityDescription:
      '你重视归属，也愿意为所选的人付出实际的东西。你不迷恋「可能性」，你更相信「在一起把日子过好」。你的可靠不是被动的稳定，而是一种每天都在做的选择。',
    strengths: [
      '极高的可靠度，承诺过的事会做到',
      '能把抽象的爱落实为具体的生活',
      '在困境中能撑住场面',
      '务实，有经营日常的能力',
    ],
    shadowTraits: [
      '可能把「务实」慢慢滑成「将就」',
      '容易用付出换取被认可',
      '在意他人眼光，容易低估自己的选择',
      '习惯性承担，容易忘记自己也需要被照顾',
    ],
    growthAdvice:
      '值得争取的生活，不会因为务实就变得廉价。别把「实际一点」当作放弃野心的借口——你值得的，是一个你也心动的家。',
    literaryQuote: '我想要的是一个家，不是一段传奇。',
    quoteAttribution: '原创文学箴言 · 依据梅格·马奇的人物精神撰写',
    quoteType: 'original',
    visualSymbolism:
      '天使张开双翼笼罩两位裸身之人，下方是伊甸园的深林。天使之上、太阳之下的位置，代表这不只是本能的结合，而是高于本能的抉择。',
    personalityVector: { autonomy: -2, emotionality: 2, order: 1, ambition: -1, empathy: 2, reflection: 0 },
  },
  {
    id: 'chariot',
    number: 7,
    romanNumeral: 'VII',
    tarotNameZh: '战车',
    tarotNameEn: 'The Chariot',
    characterNameZh: '斯嘉丽',
    characterNameEn: "Scarlett O'Hara",
    novelName: '飘',
    image: '/cards/07-chariot.webp',
    keywords: ['意志', '生存', '不屈', '掌控', '前进'],
    archetype: '生存意志',
    shortDescription:
      '塔拉的红土烧成了灰，她用双手把家重新盖起来。斯嘉丽不肯认输——哪怕认输意味着承认自己曾经错。',
    characterBiography:
      '战火烧毁了她的世界，她守住了塔拉。一次婚姻失败、一次北方的胜利、一场谁都以为她会失去的分娩，她都撑了过来。她的生命力近乎强悍，代价是：她常常先行动，再思考；常常赢下战役，却输掉了她原本想守住的东西。',
    uprightMeaning:
      '正位的战车是意志力的胜利——不是没有阻碍，而是把两种相反的力量同时驾驭。斯嘉丽代表那种在废墟上照样能站起来的生命力。她不等待许可，也不接受「已经来不及了」的说法。',
    reversedMeaning:
      '逆位时，向前的动力可能变成对方向的遗忘。战车若只管奔跑，不管去哪里，就会在自己的惯性里耗尽。斯嘉丽保住了许多，却把最该保住的那几样留在了身后。',
    personalityDescription:
      '你有非常强的意志力与恢复力。别人觉得已经完了的时候，你还能找到一条路。你的行动力常常先于思考——这既是你的优势，也让你容易事后才发现自己走错了方向。',
    strengths: [
      '极强的逆境恢复力，绝不轻易认输',
      '行动迅速，能抓住别人犹豫时错过的机会',
      '在混乱中有维持秩序的能力',
      '有不服输的骄傲，这份骄傲支撑着你',
    ],
    shadowTraits: [
      '先行动后思考，容易用蛮力替代判断',
      '习惯用胜利回答一切问题',
      '容易把自己逼到孤立',
      '不肯示弱，也因此不肯求助',
    ],
    growthAdvice:
      '偶尔停下来看看自己在往哪里去。战车能穿过任何地形，但如果方向错了，跑得再快也只是离想去的地方越来越远。',
    literaryQuote: '明天又是新的一天。',
    quoteAttribution: '原创文学箴言 · 依据斯嘉丽的人物精神撰写',
    quoteType: 'original',
    visualSymbolism:
      '战车由两匹黑白相间的狮与马拉着，一黑一白，两种相反的力量被同一双手勒住。肩上的新月徽记，是意志在变动中的定力。',
    personalityVector: { autonomy: 2, emotionality: 0, order: -1, ambition: 2, empathy: -2, reflection: -2 },
  },
  {
    id: 'strength',
    number: 8,
    romanNumeral: 'VIII',
    tarotNameZh: '力量',
    tarotNameEn: 'Strength',
    characterNameZh: '梅兰妮',
    characterNameEn: 'Melanie Hamilton',
    novelName: '飘',
    image: '/cards/08-strength.webp',
    keywords: ['温柔', '勇气', '耐心', '内在力量', '慈悲'],
    archetype: '温柔的勇气',
    shortDescription:
      '她可以原谅，也可以温柔——但那不是软弱。梅兰妮在所有人都在做正确的事时，做了最难的正确的事。',
    characterBiography:
      '梅兰妮是那种在道德上无法被指摘的人：她爱着不值得爱的人，在个人悲剧里仍保持体面与温柔。她用柔韧而非强硬回应世界，一次次承受本不必承受的重担。她的善良不是天真——她清楚地知道代价是什么，仍然选择温柔。',
    uprightMeaning:
      '正位的力量不是压制，而是驯服：真正的强大是温柔。梅兰妮代表那种在极危险处仍能保持柔软的能力。你不必先变成坚硬的人，才配得到你想要的东西。',
    reversedMeaning:
      '逆位时，温柔会变成自我消耗。你可能把「不要伤害任何人」当成必须遵守的规则，最后连自己也被耗空了；也可能反过来，因为一次被辜负，就再也不肯柔软。',
    personalityDescription:
      '你有一种罕见的韧性，但它的来源不是坚硬而是柔软。你能在被伤害之后仍然选择温柔，这是极难的能力，也极容易被消耗。你需要分清：温柔是选择，不是义务。',
    strengths: [
      '极强的情绪稳定，能在最乱的局面里保持清醒',
      '有包容他人的容量',
      '道德感强，且不流于说教',
      '能给人安全感，是他人的支柱',
    ],
    shadowTraits: [
      '习惯性牺牲，忘记自己也在其中',
      '过度宽容，容易被利用',
      '把「不责怪」当成唯一的美德',
      '长期压抑，委屈积累到无法表达',
    ],
    growthAdvice:
      '你的温柔值得被同等对待。学会说「不」，并把它看作对自己的慈悲，而不是对别人的背叛。',
    literaryQuote: '我可以温柔，也可以有原则。',
    quoteAttribution: '原创文学箴言 · 依据梅兰妮的人物精神撰写',
    quoteType: 'original',
    visualSymbolism:
      '少女双手轻抚狮子的上下颌，动作是安抚而非压制。无限符号系于腰间，狮子与人的意志合而为一——最强的力量不需要搏斗。',
    personalityVector: { autonomy: -2, emotionality: 2, order: 0, ambition: -1, empathy: 2, reflection: -1 },
  },
  {
    id: 'hermit',
    number: 9,
    romanNumeral: 'IX',
    tarotNameZh: '隐士',
    tarotNameEn: 'The Hermit',
    characterNameZh: '莱农',
    characterNameEn: 'Elena Greco / Lenù',
    novelName: '我的天才女友',
    image: '/cards/09-hermit.webp',
    keywords: ['知识', '自省', '独处', '求索', '真相'],
    archetype: '知识与自我审视',
    shortDescription:
      '她离开那不勒斯的小巷，考进大学，成为医生。莱农用一生的距离，换来了一双看清的眼睛。',
    characterBiography:
      '埃莱娜·格雷科从小在城中长大，与莉拉既亲密又彼此伤害。她走出街区，考入大学，成为一位以专业与学识立身的医生。她一生都在观察、思考、修正自己——她既不属于她出生的那个世界，也没有真正原谅过那些年。',
    uprightMeaning:
      '正位的隐者是一盏独自提着的灯。莱农代表通过教育与距离获得的清醒：她通过知识获得了选择权，也通过持续的自我审视保持着诚实。这张牌问的是：你愿意为了看清真相，付出多少独处的代价？',
    reversedMeaning:
      '逆位时，独处会变成封闭，求索变成逃避。莱农的风险在于：她可能用「我已经看清了」来关闭进一步的改变，也可能把当年的伤当作永久的判决——但人是可以被重新理解的。',
    personalityDescription:
      '你有强烈的求知欲，也习惯独自思考。你不轻易下结论，但一旦想清楚就很难动摇。你重视诚实——包括对自己的诚实，这让你比大多数人更了解自己，也更孤独。',
    strengths: [
      '独立思考，不轻易被共识带走',
      '有持续学习与自我修正的能力',
      '诚实面对自己的欲望与软弱',
      '能在复杂处境中保持清醒判断',
    ],
    shadowTraits: [
      '用距离保护自己，代价是亲近',
      '容易把审视变成对人的审判',
      '可能因过度自省而陷入僵化',
      '难以原谅，也难以重新开始',
    ],
    growthAdvice:
      '你的清醒值得被分享。把一部分你看到的真相告诉在乎的人——被理解不会削弱你的判断力。',
    literaryQuote: '我用一生的距离，换来了一双看清的眼睛。',
    quoteAttribution: '原创文学箴言 · 依据莱农的人物精神撰写',
    quoteType: 'original',
    visualSymbolism:
      '老人伛立山巅，一手提灯一手持杖。灯只照亮方寸之地——隐者不求照亮世界，只求看清脚下一步。背景的雪线，是尚未翻越的距离。',
    personalityVector: { autonomy: 2, emotionality: -2, order: 1, ambition: 1, empathy: -1, reflection: 2 },
  },
  {
    id: 'wheel-of-fortune',
    number: 10,
    romanNumeral: 'X',
    tarotNameZh: '命运之轮',
    tarotNameEn: 'Wheel of Fortune',
    characterNameZh: '蓓基',
    characterNameEn: 'Becky Sharp',
    novelName: '名利场',
    image: '/cards/10-wheel-of-fortune.webp',
    keywords: ['野心', '机变', '生存', '攀升', '世事'],
    archetype: '野心与机变',
    shortDescription:
      '她一无所有，只有一样东西：她很清楚自己要什么。蓓基·夏普把出身的不公，一点点换成了自己的位置。',
    characterBiography:
      '蓓基·夏普是攀爬者。她做家庭教师、进入上流社会、以机敏周旋于每一个可能的缝隙里。她不像斯嘉丽那样有土地可以失去，所以她的每一步都是重新开始。她的生命证明了 talents 可以让人跨越出身——也证明了这种跨越会付出什么代价。',
    uprightMeaning:
      '正位的命运之轮是转机与攀升——机会在转动，能抓住的人就往上走。蓓基代表一种务实的进取：她清楚规则并不公平，所以她不打算遵守那些规则来惩罚自己。她的野心是真实的生命力。',
    reversedMeaning:
      '逆位时，攀升会显出它真正的代价。当向上攀爬成为唯一的目标，你可能会在抵达时发现自己已经认不出脚下的人了。蓓基晚年那句关于两个孩子的请求，是这张牌最锋利的反转。',
    personalityDescription:
      '你有一种非常务实的进取心。你不迷信资历、出身或他人的评价，你相信能力与胆量可以被兑现。你的头脑灵活，能在复杂局面里找到缝隙——这既是你的天赋，也让你容易低估关系与信任的价值。',
    strengths: [
      '极强的目标感与行动力',
      '头脑灵活，能在不利局面中找到出路',
      '不因出身低微而自我设限',
      '有强烈的自尊，不甘于被安排',
    ],
    shadowTraits: [
      '容易把关系也当作交换来计算',
      '过于务实，理想与柔软的部分被挤压',
      '成就之后可能发现代价太大',
      '难以真正信任他人',
    ],
    growthAdvice:
      '你一路赢得很漂亮。试着留一点位置给不是「有用」的人和事——那些不为你所用的温暖，恰恰是人之所以为人的部分。',
    literaryQuote: '我一无所有，但我清楚自己要什么。',
    quoteAttribution: '原创文学箴言 · 依据蓓基的人物精神撰写',
    quoteType: 'original',
    visualSymbolism:
      '巨轮悬于云间，四角各有人或兽在读它的天意。轮轴上的新月与飞鸟，暗示这转动既非全然在人，亦非全然在人之外。',
    personalityVector: { autonomy: 2, emotionality: -1, order: -2, ambition: 2, empathy: -2, reflection: 0 },
  },
  {
    id: 'justice',
    number: 11,
    romanNumeral: 'XI',
    tarotNameZh: '正义',
    tarotNameEn: 'Justice',
    characterNameZh: '伊丽莎白',
    characterNameEn: 'Elizabeth Bennet',
    novelName: '傲慢与偏见',
    image: '/cards/11-justice.webp',
    keywords: ['公正', '清醒', '修正', '真诚', '判断'],
    archetype: '公正与修正偏见',
    shortDescription:
      '她一度因为自信而判断错了人。但当她发现自己错了，她改得比谁都快。',
    characterBiography:
      '伊丽莎白·班纳特聪明、活泼，拒绝被安排。她最初认定达西傲慢而冷漠——这个判断是错的。当她放下成见去看他，她迅速修正了自己；这份修正不是屈服于地位，而是出于对事实的尊重。',
    uprightMeaning:
      '正义的正义是清醒与公正：不偏袒自己，也不放过自己。伊丽莎白代表一种可贵的自我修正能力——发现错了就改，不需要台阶。她的锋利与公正，本质上是同一件事。',
    reversedMeaning:
      '逆位时，天平会偏。公正若带着优越感，就成了另一种傲慢；自信若拒绝被纠正，就会变成偏见本身。伊丽莎白最动人的地方，是她愿意承认自己看错了人。',
    personalityDescription:
      '你有清晰的价值判断，也愿意接受事实修正自己的看法。你不因对方的地位而改变态度，也不因自己的确信而拒绝检视。你会为坚持原则发声，也会在发现自己错了时坦然承认。',
    strengths: [
      '判断清晰，不轻易随波逐流',
      '勇于承认错误，不维护面子',
      '看重实质，不崇拜地位',
      '有原则，且原则是讲道理的',
    ],
    shadowTraits: [
      '自信过头时，判断会先于了解',
      '说话过于直接，容易伤人',
      '有时把「我判断对」看得比关系更重要',
      '对虚伪的厌恶可能变成对人的厌恶',
    ],
    growthAdvice:
      '你的清醒需要一个缓冲层。在给出结论之前，多问一句「我还缺什么信息」——这不会削弱你的判断力，只会让它更准。',
    literaryQuote: '我见过太多自信的错误，我愿意承认自己也会犯。',
    quoteAttribution: '原创文学箴言 · 依据伊丽莎白的人物精神撰写',
    quoteType: 'original',
    visualSymbolism:
      '正义端坐于双柱之间，右手竖剑——意志的直刃；左手天平——不加偏私的衡量。背后是紫色的帷幕，代表尚未公开的真相。',
    personalityVector: { autonomy: 1, emotionality: -1, order: 1, ambition: 0, empathy: 0, reflection: 2 },
  },
  {
    id: 'hanged-man',
    number: 12,
    romanNumeral: 'XII',
    tarotNameZh: '倒吊人',
    tarotNameEn: 'The Hanged Man',
    characterNameZh: '阿米莉亚',
    characterNameEn: 'Amelia Sedley',
    novelName: '名利场',
    image: '/cards/12-hanged-man.webp',
    keywords: ['等待', '悬置', '牺牲', '换位', '从容'],
    archetype: '从容与等待',
    shortDescription:
      '在所有人都乱成一团的时候，阿米莉亚安静地待在自己的位置上，等事情自己过去。',
    characterBiography:
      '阿米莉亚·塞德利是塞德利家族里那个最不引人注目的女儿。她温和、笨拙、心怀秘密，在家族与社会的动荡中，她几乎不抵抗。她常常是最后一个离开的人，也是唯一没有在风暴中失态的人。',
    uprightMeaning:
      '正位的倒吊人是自愿的悬置：把自己放低，才能从高处看清。倒悬的姿态换来了视角。阿米莉亚代表一种从容——不是没有痛苦，而是知道有些事不必此刻解决。她的安静不是空白，是一种选择。',
    reversedMeaning:
      '逆位时，等待变成拖延，牺牲变成消耗。长期的悬而未决会磨损一个人；把「我什么都不参与」当作策略，最终会发现自己已经不在场了。',
    personalityDescription:
      '你有一种少见的从容，能在动荡里保持位置感。你不急于表态，也不轻易被推着走。你的价值感不完全来自「有所成就」，某种程度上来自「不慌不忙地待在自己该在的地方」。',
    strengths: [
      '在混乱中保持稳定，能成为他人的锚点',
      '有耐心，不轻易被短期得失动摇',
      '善于等待，不为错过而焦躁',
      '在长期压力下仍能维持正常运转',
    ],
    shadowTraits: [
      '把顺从当成不动声色',
      '回避本可以参与的场合',
      '容易在等待中耗尽热情',
      '不被注意，也逐渐不表达自己',
    ],
    growthAdvice:
      '从容是一种力量，被动是一种状态。分辨这两者——你不必参与每一场风暴，但至少要选择你要守住的那一个位置。',
    literaryQuote: '有些事不必此刻解决，风会自己过去。',
    quoteAttribution: '原创文学箴言 · 依据阿米莉亚的人物精神撰写',
    quoteType: 'original',
    visualSymbolism:
      '男子被 T 形木架吊起，双手却安适地交叠——那是自愿的悬置。头顶的光环与脸上的平静，说明这姿态不是受难，而是选择。',
    personalityVector: { autonomy: -2, emotionality: 0, order: 2, ambition: -2, empathy: 1, reflection: 1 },
  },
  {
    id: 'death',
    number: 13,
    romanNumeral: 'XIII',
    tarotNameZh: '死神',
    tarotNameEn: 'Death',
    characterNameZh: '秀拉',
    characterNameEn: 'Sula Peace',
    novelName: '秀拉',
    image: '/cards/13-death.webp',
    keywords: ['终结', '重塑', '断裂', '自我', '不可逆'],
    archetype: '终结旧身份',
    shortDescription:
      '她烧掉了自己的房子，剪掉了自己的头发，然后活着走出了那个地方。秀拉拒绝成为任何人定义的样子。',
    characterBiography:
      '秀拉·皮斯成长在滑铁匠镇，拒绝了成为她母亲那样的人的命运。她用一场在教堂前的大火烧掉了自己童年的房子，用离家出走切断了所有牵连。后来她回到镇上，与旧日情人的婚姻毁了她——最后她病死在雪中，脸色发白，像来时一样安静。',
    uprightMeaning:
      '正义的死神是彻底的终结：有些身份必须先死掉，新的自己才可能生长。秀拉代表那种拒绝被定义的勇气。她的问题从来不是「她做了什么」，而是「谁规定她必须是谁」。',
    reversedMeaning:
      '逆位时，终结变得拖沓。你可能明知某段身份、某段关系、某种活法已经结束了，却一直不肯放手。旧的不死，新的就长不出来。',
    personalityDescription:
      '你有一种强烈的自我定义欲。你不轻易接受别人给你的角色，即使那个角色看起来很合理。你敢做别人不敢做的决定，代价是常常要独自承担「不像好人」的名声。',
    strengths: [
      '极强的自我定义能力，不接受他人安排',
      '有勇气一刀切断不健康的关系',
      '在污名中保持自己的标准',
      '诚实到近乎冷酷',
    ],
    shadowTraits: [
      '切割容易伤到自己想留住的人',
      '用疏离保护自己，代价是无法被爱',
      '反叛有时只是为了反叛',
      '内心深处的孤独无法被行动填满',
    ],
    growthAdvice:
      '你可以不按别人的剧本活，但不必用孤独来证明。你可以既是自己，也不必把所有人推开。',
    literaryQuote: '谁规定我必须是谁？',
    quoteAttribution: '原创文学箴言 · 依据秀拉的人物精神撰写',
    quoteType: 'original',
    visualSymbolism:
      '白骨骑士执黑旗骑行，旗上是白玫瑰——盛开与凋零同时存在。河上的船与远处的城堡，是尚未抵达与已经离开的两端。',
    personalityVector: { autonomy: 2, emotionality: 0, order: -2, ambition: 0, empathy: -2, reflection: 1 },
  },
  {
    id: 'temperance',
    number: 14,
    romanNumeral: 'XIV',
    tarotNameZh: '节制',
    tarotNameEn: 'Temperance',
    characterNameZh: '薛宝钗',
    characterNameEn: 'Xue Baochai',
    novelName: '红楼梦',
    image: '/cards/14-temperance.webp',
    keywords: ['调和', '克制', '分寸', '周全', '长线'],
    archetype: '调和与克制',
    shortDescription:
      '她什么都懂，什么都不争。宝钗的锋利藏在最妥帖的分寸里，藏在每一次不动声色的成全里。',
    characterBiography:
      '薛宝钗生于商家，深知人情冷暖，因此早早就学会了两件事：看准场合说话，把事情办得妥帖。她待人滴水不漏，轻易不得罪人。她对黛玉并无敌意，多次暗中化解冲突；即便自己的婚事不遂意，她也未曾迁怒于人。',
    uprightMeaning:
      '正位的节制是调和：把两个极端倒进同一个杯子里，调出一个恰当的比例。宝钗代表一种难得的能力——在任何局面里找到那个让所有人都能继续的位置。她的克制不是懦弱，是长期的修炼。',
    reversedMeaning:
      '逆位时，克制成了一种计算。太习惯揣度他人心意的人，会渐渐分不清哪些在意是真心、哪些只是策略。当周全变成习惯，本心就可能被一点点抹平。',
    personalityDescription:
      '你有极好的分寸感。你知道什么时候该说话、什么时候该退让，什么时候该替别人把台阶铺好。你很会照顾场面，也因此常被评价为「懂事」。但你的懂事里，藏着一个很少被问到的愿望——被真正看见。',
    strengths: [
      '极强的人际敏感度与协调能力',
      '有长线思维，能为将来布局',
      '在冲突中能有效降温',
      '自我克制，情绪稳定可靠',
    ],
    shadowTraits: [
      '习惯以退为进，却很少承认自己想要什么',
      '长期周全，容易积压未被满足的需求',
      '被称赞为「懂事」，却少有真正的亲近',
      '可能把真诚简化成合适',
    ],
    growthAdvice:
      '你不需要永远得体。偶尔失衡、偶尔说错、偶尔让别人不舒服——那不是你的失败，那是你终于不以功能存在。',
    literaryQuote: '什么都懂，什么都不争。',
    quoteAttribution: '原创文学箴言 · 依据薛宝钗的人物精神撰写',
    quoteType: 'original',
    visualSymbolism:
      '天使一脚踏水一脚踏地，将两只壶中的水缓缓互倾。三角与方形的光环、太阳与方块，指向在变化与稳定之间保持的精确配比。',
    personalityVector: { autonomy: 0, emotionality: -2, order: 2, ambition: 1, empathy: 1, reflection: 2 },
  },
  {
    id: 'devil',
    number: 15,
    romanNumeral: 'XV',
    tarotNameZh: '恶魔',
    tarotNameEn: 'The Devil',
    characterNameZh: '爱玛',
    characterNameEn: 'Emma Bovary',
    novelName: '包法利夫人',
    image: '/cards/15-devil.webp',
    keywords: ['欲望', '幻想', '沉溺', '压抑', '幻灭'],
    archetype: '欲望与幻想',
    shortDescription:
      '她把自己的一生活成了小说里的情节。爱玛的悲剧不是她有野心，而是她把幻想当成了现实的标准。',
    characterBiography:
      '爱玛·包法利厌倦了庸常的乡镇生活，把自己想象成一位悲剧女主角。她用债务、谎言与一场场不存在的私情去填充生活，最后在无法偿还的债务与幻觉破灭中吞下砒霜。福楼拜写得很冷静：他从不嘲笑她，他只是把账单摆在那里。',
    uprightMeaning:
      '正位的恶魔是束缚——而锁链其实是松的。爱玛代表欲望与幻想的吸引力，也代表它们最终会收取的代价。这张牌不是道德训诫，是一句实话：把想象当作生活的替代品，账总会找上门来。',
    reversedMeaning:
      '逆位时，锁链松开了。你可能正在从某种执念、某个不切实际的剧本里脱身；也可能相反——幻象仍在，只是换了新形式继续。',
    personalityDescription:
      '你有丰富的想象力，也有强烈的渴望被某种更强烈的生活打动。你的浪漫是真实的，不是幼稚。但你有一个倾向：用「应该有的样子」来衡量「真实的样子」，而这个尺度往往过于严苛，也过于遥远。',
    strengths: [
      '想象力丰沛，能看见别人忽略的可能',
      '对美与意义有强烈的追求',
      '有感受力，情感体验丰富',
      '敢于追求不被常规认可的生活',
    ],
    shadowTraits: [
      '容易把幻想当作现实的标准',
      '难以忍受平庸，哪怕平庸是安全的',
      '因不甘而承担超出的风险',
      '常在幻灭后才真正看清脚下的路',
    ],
    growthAdvice:
      '你的生命力是真实的，问题只在于它被投向了远方。试着把这份渴望用在具体的人与事上——真实能容纳的幸福，比虚构的多。',
    literaryQuote: '我把自己的一生活成了小说里的情节。',
    quoteAttribution: '原创文学箴言 · 依据爱玛的人物精神撰写',
    quoteType: 'original',
    visualSymbolism:
      '恶魔踞坐高台，两人颈上套着宽松的颈圈。颈圈并未锁紧，恶魔的权杖上长着叶子——束缚看似牢固，其实随时可以脱落。',
    personalityVector: { autonomy: 0, emotionality: 2, order: -2, ambition: 1, empathy: -1, reflection: -2 },
  },
  {
    id: 'tower',
    number: 16,
    romanNumeral: 'XVI',
    tarotNameZh: '高塔',
    tarotNameEn: 'The Tower',
    characterNameZh: '莉拉',
    characterNameEn: 'Lila Cerullo',
    novelName: '我的天才女友',
    image: '/cards/16-tower.webp',
    keywords: ['崩塌', '敏锐', '决裂', '觉醒', '裂隙'],
    archetype: '结构崩塌与敏锐洞察',
    shortDescription:
      '那不勒斯的小巷被拆掉了，莉拉彻底疯了。而在那之前，她早已看见了所有人看不见的东西。',
    characterBiography:
      '莉拉·赛鲁洛聪明得让人害怕，她能看见钱藏在鞋底、看出谁在说谎。她与丈夫的关系最终以暴力收场，她精神崩溃，被送进精神病院。而她的老城区随着现代化被拆除——一个时代的崩塌与一个人的崩塌，就这样并行。',
    uprightMeaning:
      '正位的高塔是突然的崩塌：那些你以为稳固的东西，在一瞬间显出它本来就不牢靠。莉拉代表那种能看见结构裂缝的目光——她的危险，也来自同一个地方。真相有时就是一把锤子。',
    reversedMeaning:
      '逆位时，崩塌是缓慢的、无声的。没有闪电，没有巨响，只有一层层剥落。莉拉的结局不是爆炸，是慢慢熄灭——这可能比轰然倒塌更难熬。',
    personalityDescription:
      '你有一种结构性的洞察力，能看穿表面之下的运作方式。这让你在人群中常感到孤独——你看见了别人看不见的裂缝，包括他们身上的和自己的。你对虚假的容忍度极低。',
    strengths: [
      '洞察力极强，能识破伪装与自欺',
      '有独立于环境的思考能力',
      '对不公与虚伪极度敏感',
      '敢于直面让人不安的真相',
    ],
    shadowTraits: [
      '看穿一切，也因此难以与人共处',
      '容易用敏锐把自己隔离起来',
      '与世界缺少可操作的连接方式',
      '长期的清醒可能滑向耗竭',
    ],
    growthAdvice:
      '看穿之后要有去处。你的洞察若只用于拆毁，就只剩废墟；试着也用它去建造一点什么，哪怕很小。',
    literaryQuote: '我看见了所有人看不见的东西。',
    quoteAttribution: '原创文学箴言 · 依据莉拉的人物精神撰写',
    quoteType: 'original',
    visualSymbolism:
      '高塔被闪电击中，塔顶的王冠坠落。坠落的人身上有天使的翅膀——这并非单纯的毁灭，而是结构的终结与某种解放同时发生。',
    personalityVector: { autonomy: 1, emotionality: 1, order: -2, ambition: -1, empathy: -2, reflection: 2 },
  },
  {
    id: 'star',
    number: 17,
    romanNumeral: 'XVII',
    tarotNameZh: '星星',
    tarotNameEn: 'The Star',
    characterNameZh: '简·班纳特',
    characterNameEn: 'Jane Bennet',
    novelName: '傲慢与偏见',
    image: '/cards/17-star.webp',
    keywords: ['温柔', '纯真', '希望', '笃定', '照亮'],
    archetype: '温柔与希望',
    shortDescription:
      '她几乎不为自己争取什么，却在所有人都失去方向时，成了那个让大家安心的人。',
    characterBiography:
      '简·班纳特是五姐妹中最温厚的那个。她总是理解别人、总是替家里化解难堪，连她的婚姻理想也只是「能让我爱上的人就好」。她看似没有野心，但正是这份不设防的笃定，让她在关键时刻成为全家的支点。',
    uprightMeaning:
      '正位的星星是风暴之后的希望：不是最强的力量，而是最不肯熄灭的那一点光。简代表一种罕见的笃定——不因为得不到就不真诚。她给别人的不是建议，是安心。',
    reversedMeaning:
      '逆位时，光开始变暗。可能是持续付出后失去了自我，也可能是那份不设防在某些关系里被当成了理所当然。温柔的过量，会变成对自己的亏待。',
    personalityDescription:
      '你身上有一种近乎天真的笃定。你不急着评判谁好谁坏，你更愿意先理解。你的存在会让周围的人松一口气——因为你从不制造压力。你真诚到有时会忘记为自己设限。',
    strengths: [
      '真诚，能让人卸下防备',
      '情绪稳定，是他人的安心所在',
      '有强烈的家庭观念与归属感',
      '不因得不到而变得刻薄',
    ],
    shadowTraits: [
      '过度迁就，容易失去自己的立场',
      '不争取，因此常被低估',
      '把「不给人添麻烦」当作美德',
      '期待回报，却从不开口',
    ],
    growthAdvice:
      '你的温柔是最珍贵的东西，但请你也把它分一点给自己。你不必永远是那个让所有人舒服的人。',
    literaryQuote: '我没有那么大的野心，我只希望真诚地对待人和事。',
    quoteAttribution: '原创文学箴言 · 依据简·班纳特的人物精神撰写',
    quoteType: 'original',
    visualSymbolism:
      '赤身女子跪于池畔，将水倒入大地与池中。一脚踩地、一脚踩水，接纳与给予同时发生。天上的八角星与七颗小星，指向更高处的指引。',
    personalityVector: { autonomy: -1, emotionality: 2, order: 1, ambition: -2, empathy: 2, reflection: -1 },
  },
  {
    id: 'moon',
    number: 18,
    romanNumeral: 'XVIII',
    tarotNameZh: '月亮',
    tarotNameEn: 'The Moon',
    characterNameZh: '林黛玉',
    characterNameEn: 'Lin Daiyu',
    novelName: '红楼梦',
    image: '/cards/18-moon.webp',
    keywords: ['敏感', '潜意识', '忧郁', '幻象', '诗性'],
    archetype: '敏感与潜意识',
    shortDescription:
      '她的心思像水底的月影——看得见轮廓，摸不到实体。黛玉把整个世界都读成了诗。',
    characterBiography:
      '林黛玉寄居在荣国府，天性聪敏、体弱多病。她的心思极其细腻，能从一句话里听出弦外之音；她的才情让她成为大观园里最亮的那个名字，却也让她把每一分在意都放大成伤害。她的多愁善感与孤高，最终把她的世界收得越来越小。',
    uprightMeaning:
      '正位的月亮是潜意识与幻象：道路在月光下失真，你所见的未必是实。黛玉代表那种高度敏感的灵性——她能捕捉到别人忽略的美与痛，代价是难以生活在确定之中。',
    reversedMeaning:
      '逆位时，迷雾开始消散，恐惧被命名。有些被放大的情绪，在被说出口、看清来处之后，会还原成它本来的大小。',
    personalityDescription:
      '你的感受系统极其敏锐。你能捕捉到语气、气氛、没说出口的部分——这份敏感让你有极强的艺术感受力，也让你的世界容易失真。你常在别人的话里听见针对你的意思，哪怕对方并没有。',
    strengths: [
      '敏锐到近乎通感的艺术感受力',
      '极强的语言与诗意天赋',
      '对美与情感有深切体察',
      '内心有一块不为外界所动的领地',
    ],
    shadowTraits: [
      '容易把模糊的感受固化成受伤',
      '长期自伤，消耗自己的元气',
      '用才情与清高抵挡亲近',
      '不愿开口求助，把痛苦说成风流',
    ],
    growthAdvice:
      '你的敏锐是天赋，但需要出口。把它写成、唱出、做出来——让感受有去处，它才不会回到身上。',
    literaryQuote: '我的心思像水底的月影，看得见轮廓，摸不到实体。',
    quoteAttribution: '原创文学箴言 · 依据林黛玉的人物精神撰写',
    quoteType: 'original',
    visualSymbolism:
      '月下犬与狼向月长嗥，月亮的两面分别印着滴水与新月。道路隐没于沼泽——潜意识引路，而所引之处未必可靠。',
    personalityVector: { autonomy: 0, emotionality: 2, order: -1, ambition: -1, empathy: 1, reflection: 2 },
  },
  {
    id: 'sun',
    number: 19,
    romanNumeral: 'XIX',
    tarotNameZh: '太阳',
    tarotNameEn: 'The Sun',
    characterNameZh: '莎格',
    characterNameEn: 'Shug Avery',
    novelName: '紫色',
    image: '/cards/19-sun.webp',
    keywords: ['喜悦', '热情', '分享', '坦荡', '光照'],
    archetype: '喜悦与分享',
    shortDescription:
      '她一开口唱歌，屋里的空气就变了。莎格把光分给所有的人，包括那些她其实帮不上忙的人。',
    characterBiography:
      '莎格是西丽生命里的一道光。她会为一桩无法解决的事开一小时的车，只因为「想去看看」；她教会西丽唱歌，把一个句子改成关于大地的句子。她后来病了，她把那份感染力留在了西丽身上，成为西丽起身的力量。',
    uprightMeaning:
      '正位的太阳是毫无保留的喜悦与分享。莎格代表一种不计较回报的光：她给出的东西——歌、笑、一段不计后果的陪伴——本质上不是给予，是她自己活着的状态。',
    reversedMeaning:
      '逆位时，光被云遮住。可能是持续付出之后热情耗竭，也可能是不得不收起光芒以自保——曾经照亮别人的人，也可能需要被照一次。',
    personalityDescription:
      '你有一种天然的感染力。你能点亮一个房间，也能让人忘记原本在担心什么。你不吝惜给出，也不太会计算给出去的东西值多少。',
    strengths: [
      '强大的感染力，能让他人重燃希望',
      '慷慨，不计较回报',
      '真诚直接，不绕弯子',
      '有把沉重时刻变轻的能力',
    ],
    shadowTraits: [
      '把自己照得太亮，容易被消耗',
      '不愿承认自己也需要支持',
      '乐观有时会绕开真正的问题',
      '离去时会留下很大的空缺',
    ],
    growthAdvice:
      '你给出去的爱已经够多了。让自己也站在光里——接受别人的照顾，不会减损你的明亮。',
    literaryQuote: '她一开口唱歌，屋里的空气就变了。',
    quoteAttribution: '原创文学箴言 · 依据莎格的人物精神撰写',
    quoteType: 'original',
    visualSymbolism:
      '孩童骑白马踞于向日葵之间，旗帜与横幅飘扬。白马、太阳与成熟的麦穗，指向纯真、显明与丰收——一切在此刻是敞开的。',
    personalityVector: { autonomy: 1, emotionality: 2, order: -2, ambition: 0, empathy: 2, reflection: -1 },
  },
  {
    id: 'judgement',
    number: 20,
    romanNumeral: 'XX',
    tarotNameZh: '审判',
    tarotNameEn: 'Judgement',
    characterNameZh: '阿尔芭',
    characterNameEn: 'Alba',
    novelName: '幽灵之家',
    image: '/cards/20-judgement.webp',
    keywords: ['觉醒', '召唤', '清算', '重生', '回应'],
    archetype: '觉醒与召唤',
    shortDescription:
      '那场发生在悬崖边的地震，让她第一次听见了自己内心的声音。阿尔芭醒来，并决定不再沉睡。',
    characterBiography:
      '阿尔芭一直活在别人的目光与安排里：家族的期待、塞巴斯蒂安的爱、她自己的顺从。悬崖边的地震与母亲的去世，把这一切打断了。她第一次清楚地知道自己要什么——不是塞巴斯蒂安的庇护，而是作为一个完整的人去经历自己的人生。',
    uprightMeaning:
      '正义的审判是觉醒与被召唤：号角响起，过去的自己被唤回来。阿尔芭代表那种终于听见了自己声音的时刻。这张牌问的是：你准备好面对被自己推迟的那件事了吗？',
    reversedMeaning:
      '逆位时，拒绝被唤醒。可能是自我审判变成了自我惩罚——把自己的每一个选择都算成罪；也可能相反，迟迟不肯作出那个决定。',
    personalityDescription:
      '你有一种内在的清醒正在成形。你曾长期按别人的期待生活，而现在你开始能分辨：哪些声音是外来的，哪些是自己的。这个过程不轻松，但它是真实的。',
    strengths: [
      '正在形成独立于他人的价值判断',
      '有直面真相的勇气',
      '觉醒之后行动力强',
      '对内心召唤的反应敏锐',
    ],
    shadowTraits: [
      '觉醒初期容易与旧环境全面冲突',
      '自我要求过严，容易苛责自己',
      '需要时间才能做出重大决定',
      '被压抑太久，一旦开口可能过于激烈',
    ],
    growthAdvice:
      '清醒之后还需要耐心。把选择拆成可以一步步走的小段——不必一次就抵达你要成为的人。',
    literaryQuote: '我听见了自己的声音，我要按它活下去。',
    quoteAttribution: '原创文学箴言 · 依据阿尔芭的人物精神撰写',
    quoteType: 'original',
    visualSymbolism:
      '天使自云中吹响号角，众人自石棺中起身仰望。羽翼、号角与旗幡，是召回与宣判；灰白的大地，则是被清算过的旧世界。',
    personalityVector: { autonomy: 1, emotionality: 0, order: 0, ambition: 2, empathy: 1, reflection: 2 },
  },
  {
    id: 'world',
    number: 21,
    romanNumeral: 'XXI',
    tarotNameZh: '世界',
    tarotNameEn: 'The World',
    characterNameZh: '西莉',
    characterNameEn: 'Celie',
    novelName: '紫色',
    image: '/cards/21-world.webp',
    keywords: ['完成', '整合', '命名', '自由', '新生'],
    archetype: '自我完成与自由',
    shortDescription:
      '她从一开始就在写信——只是写给自己。后来她学会了写给世界，也学会了给自己取名字。',
    characterBiography:
      '西丽被当作孩子卖掉，被迫成为某个男人的妻子与母亲，她甚至不知道自己的真名。她的妹妹希莉教她写字，她开始写信；信写给自己、写着写着就成了书。她出走、成为独立的制衣人、最终与妹妹和解——她把自己的名字从「被使用的编号」变成了「自己选择的名字」。',
    uprightMeaning:
      '正位的世界是完成与整合：一个循环走完了，所有散落的碎片归位。西丽代表那种从最底层一路走到自己名字面前的人。她的完成不是功成名就，是终于成为自己。',
    reversedMeaning:
      '逆位时，收尾被拖延。你可能已经走完了大部分路，却迟迟不肯给这段旅程一个正式的句点——或者，不敢用新身份站上去。',
    personalityDescription:
      '你有一种从底层向上生长的韧性。你被低估过、限制过，但你没有让这些定义你的上限。你的完成感不来自别人的认可，而来自「这是我给自己定的名字」。',
    strengths: [
      '极强的复原力，从困境中重新起步',
      '掌握技艺，以劳动赢得尊严',
      '通过书写完成自我表达',
      '能与过去的自己达成和解',
    ],
    shadowTraits: [
      '信任建立得很慢，需要长期验证',
      '早期经历留下深刻的安全感缺口',
      '容易独自承担而不愿求助',
      '对「属于自己的东西」格外敏感',
    ],
    growthAdvice:
      '你终于有了名字，也终于有了自己人。别再把自己活成一件工具——你值得被当作目的，而不只是手段。',
    literaryQuote: '我终于有了自己的名字，也终于有了自己人。',
    quoteAttribution: '原创文学箴言 · 依据西莉的人物精神撰写',
    quoteType: 'original',
    visualSymbolism:
      '舞者披着轻纱居于月桂花环之中，四角是人、鹰、狮、牛四个生灵。四者各据一方却被同一条绳索系住——万物整合，不是各自为政。',
    personalityVector: { autonomy: 2, emotionality: 1, order: 0, ambition: 1, empathy: 1, reflection: 1 },
  },
];

/** 按编号排序的牌组（图鉴默认顺序） */
export const cardsByNumber = [...tarotCards].sort((a, b) => a.number - b.number);

/** 按 id 索引的牌组 */
export const cardById = new Map(tarotCards.map((c) => [c.id, c]));

/** 图鉴筛选项：所有出现过的文学作品 */
export const allNovels = Array.from(new Set(tarotCards.map((c) => c.novelName))).sort(
  (a, b) => a.localeCompare(b, 'zh-Hans-CN'),
);
