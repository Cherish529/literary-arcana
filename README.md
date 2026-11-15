# 她们的命运之书 · The Literary Arcana

> 二十二张大阿尔卡那，二十二位经典文学中的女性，二十二种理解世界的方式。

一个可实际运行的互动文学性格测试网站：回答 16 道情境题，与 22 位文学女性中的一位相遇，并得到属于你的那一张塔罗牌。

塔罗在这里是一套**象征性的叙事框架**，用于文学化的自我探索。它不是命运预测，也不具备任何科学诊断效力。

**🌐 在线体验：<https://cherish529.github.io/literary-arcana/>**

**代码仓库：<https://github.com/Cherish529/literary-arcana>**

---

## 目录

- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [页面说明](#页面说明)
- [如何替换卡牌图片](#如何替换卡牌图片)
- [如何修改人物介绍与解牌](#如何修改人物介绍与解牌)
- [如何修改测试题目](#如何修改测试题目)
- [如何修改人物原型向量与匹配权重](#如何修改人物原型向量与匹配权重)
- [匹配算法是怎么工作的](#匹配算法是怎么工作的)
- [引文与出处规范](#引文与出处规范)
- [分享与结果链接](#分享与结果链接)
- [设计与视觉体系](#设计与视觉体系)
- [运行、构建与部署](#运行构建与部署)
- [常见问题](#常见问题)

---

## 快速开始

环境要求：**Node.js 20 或更高版本**。

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev
```

打开 <http://localhost:3000>。

其他常用命令：

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 启动开发服务器（热更新） |
| `npm run build` | 生产构建 |
| `npm start` | 运行生产构建 |
| `npm run lint` | ESLint 检查 |
| `npm run typecheck` | TypeScript 类型检查（不产出文件） |
| `npm test` | 运行单元测试（Vitest） |
| `npm run verify` | 依次执行 lint → 类型检查 → 测试 → 构建 |
| `npm run cards:prepare` | 把 `Figure/` 里的 PNG 转成 `public/cards/` 里的 WebP |
| `npm run sync:vectors` | 把原型向量在两个数据文件之间同步 |

---

## 项目结构

```
Tarot Design/
├── Figure/                     # 你的原始卡牌 PNG（1024×1536），仅作素材源
├── public/
│   └── cards/                  # 网站实际使用的 22 张 WebP 卡面
├── scripts/
│   ├── prepare-cards.mjs       # PNG → WebP 转换脚本
│   └── sync-vectors.mjs        # 人物向量同步脚本
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 根布局：字体、页头页脚、SEO metadata
│   │   ├── globals.css         # 设计系统（配色、纸张肌理、排版、动画）
│   │   ├── page.tsx            # 首页（扉页）
│   │   ├── quiz/
│   │   │   ├── page.tsx
│   │   │   ├── QuizIntro.tsx   # 测试介绍页
│   │   │   └── QuizClient.tsx  # 逐题作答主体
│   │   ├── result/
│   │   │   ├── page.tsx
│   │   │   └── ResultClient.tsx# 卡牌揭晓 + 文学信件 + 分享
│   │   ├── arcana/
│   │   │   ├── page.tsx
│   │   │   ├── ArcanaGallery.tsx # 22 张牌网格 + 搜索 + 筛选
│   │   │   └── [id]/page.tsx     # 卡牌详情（静态预渲染）
│   │   ├── about/page.tsx      # 关于本项目
│   │   └── not-found.tsx       # 404
│   ├── components/
│   │   ├── TarotCardImage.tsx  # 卡面组件（占位 / 加载 / 失败三态）
│   │   ├── SiteHeader.tsx      # 页头导航
│   │   ├── SiteFooter.tsx      # 页脚
│   │   └── Ornaments.tsx       # 手工 SVG 雕版装饰
│   ├── data/                   # ★ 所有内容都在这里
│   │   ├── tarotCards.ts       #   22 张牌的完整数据
│   │   ├── questions.ts        #   16 道情境题
│   │   └── personalityProfiles.ts # 22 个人物原型向量
│   ├── lib/
│   │   ├── matching.ts         # 匹配算法
│   │   ├── results.ts          # 结果生成、URL 编解码、本地存储
│   │   └── shareImage.ts       # Canvas 分享图生成
│   └── tests/  (实际在根目录 tests/)
└── tests/matching.test.ts      # 自动化测试
```

---

## 页面说明

| 路由 | 内容 |
| --- | --- |
| `/` | 扉页：标题、引言、3 张精选卡牌、两个入口、统计 |
| `/quiz` | 介绍页 → 16 道情境题 → 结果页 |
| `/result` | 卡牌揭晓、文学信件、正逆位解读、优势/阴影/建议、相近角色、分享 |
| `/arcana` | 22 张牌网格，按大阿尔卡那编号排序，支持搜索与按作品筛选 |
| `/arcana/[id]` | 单张牌的完整解读，含上一张/下一张导航 |
| `/about` | 项目缘起、女性形象的复杂性、免责声明 |

---

## 如何替换卡牌图片

**你不需要改动任何页面代码。**

### 步骤 1：把图片放进 `Figure/`

支持 `PNG` / `WebP` / `JPEG`。推荐 2:3 比例（当前素材为 1024×1536）。

`Figure/` 里的文件按「编号-中文名.png」命名，当前素材为：

```
Figure/0-愚者.png        Figure/1-魔术师.png      Figure/2-女祭司.png
Figure/3-女皇.png        Figure/6-皇帝.png       Figure/5-教皇.png
Figure/6-恋人.png        Figure/7-战车.png       Figure/8-力量.png
Figure/9-隐者.png        Figure/10-命运之轮.png  Figure/11-正义.png
Figure/12-倒吊人.png      Figure/13-死神.png      Figure/14-节制.png
Figure/15-恶魔.png        Figure/16-高塔.png      Figure/17-星星.png
Figure/18-月亮.png        Figure/19-太阳.png      Figure/20-审判.png
Figure/21-世界.png
```

> 注意：`6-皇帝.png` 与 `6-恋人.png` 的编号在素材里重复了（应为 `4-皇帝`）。
> 脚本已按内容归位，无需改名。

### 步骤 2：运行转换脚本

```bash
npm run cards:prepare
```

脚本会用 [sharp](https://sharp.pixelplumbing.com/) 把 PNG 转成 WebP（质量 82），输出到 `public/cards/`，文件名固定为：

```
00-fool.webp              01-magician.webp
02-high-priestess.webp    03-empress.webp
04-emperor.webp           05-hierophant.webp
06-lovers.webp            07-chariot.webp
08-strength.webp          09-hermit.webp
10-wheel-of-fortune.webp  11-justice.webp
12-hanged-man.webp        13-death.webp
14-temperance.webp        15-devil.webp
16-tower.webp             17-star.webp
18-moon.webp              19-sun.webp
20-judgement.webp         21-world.webp
```

如果你的原图文件名和上面不一致，直接编辑 `scripts/prepare-cards.mjs` 里的映射表即可：

```js
const SOURCE_MAP = {
  '0-愚者.png': '00-fool.webp',
  '6-皇帝.png': '04-emperor.webp', // 源文件编号笔误，按内容归位
  // …
};
```

### 步骤 3：单独替换某一张

如果你只想换掉一张卡面，**跳过脚本**也可以：

1. 把新图转成 WebP，或直接用 WebP（`public/cards/` 里的文件会按原样提供）。
2. 覆盖 `public/cards/` 下对应的文件，例如 `public/cards/17-star.webp`。
3. 刷新页面即可。

> 文件名必须完全一致，否则该张牌会显示占位纹理。

### 图片还没准备好怎么办？

`TarotCardImage` 组件有三态：

- **加载中** — 显示与真实卡牌同比例（2:3）的雕版底纹，**不会产生布局跳动**；
- **加载完成** — 淡入显示真实图片；
- **加载失败** — 显示「此张卡面尚未制版」的优雅缺失状态，**不会出现破损图片标志**。

---

## 如何修改人物介绍与解牌

**所有文案都在 `src/data/tarotCards.ts` 的一个数组里。** 每个元素是一张牌：

```ts
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
  keywords: ['喜悦', '分享', '感染力'],
  archetype: '喜悦与分享',

  shortDescription: '她一开口唱歌，屋里的空气就变了。',   // 图鉴卡片、分享图
  characterBiography: '莎格是西莉生命里的一道光……',        // 详情页「人物与故事」
  uprightMeaning: '正位的太阳是毫无保留的喜悦与分享……',     // 详情页「正位」
  reversedMeaning: '逆位时，光被云遮住……',                // 详情页「逆位」
  personalityDescription: '你有一种天然的感染力……',        // 结果页「人格侧写」

  strengths: ['强大的感染力，能让他人重燃希望', '……'],
  shadowTraits: ['把自己照得太亮，容易被消耗', '……'],
  growthAdvice: '你给出去的爱已经够多了……',

  literaryQuote: '她一开口唱歌，屋里的空气就变了。',
  quoteAttribution: '原创文学箴言',
  quoteType: 'original',          // 'novel' | 'film' | 'original'
  visualSymbolism: '孩童骑白马踞于向日葵之间……',
  personalityVector: {            // 见下文「匹配算法」
    autonomy: 0.8, emotionality: 0.9, order: -0.2,
    ambition: 0.3, empathy: 0.9, reflection: 0.1,
  },
}
```

改完直接保存，页面会热更新。

### 各字段显示在哪里

| 字段 | 出现位置 |
| --- | --- |
| `shortDescription` | 图鉴卡片、分享图 |
| `uprightMeaning` / `reversedMeaning` | 详情页、结果页 |
| `personalityDescription` | 结果页「人格侧写」 |
| `strengths` / `shadowTraits` / `growthAdvice` | 结果页、详情页 |
| `characterBiography` | 详情页「人物与故事」 |
| `visualSymbolism` | 详情页「卡面符号」 |
| `literaryQuote` / `quoteAttribution` / `quoteType` | 详情页、结果页、分享图 |

### 特别提醒

- `id` 是路由的一部分（`/arcana/sun`）。**改 `id` 会改变网址**，图鉴里的链接也会自动跟着变。
- `number` 决定大阿尔卡那的排序，务必与官方配对表一致。
- `image` 就是 `public/cards/` 下的路径，只改这里就能换图。

---

## 如何修改测试题目

题目在 `src/data/questions.ts`。每一题的结构：

```ts
{
  id: 'q01',
  context: '关于规则',          // 小标题（可省略）
  prompt: '当你发现一直相信的规则正在伤害某个人，你会怎么做？',
  options: [
    {
      id: 'a',
      text: '即使付出代价，也要当面公开反对。',
      scores: { autonomy: 1, emotionality: 0, order: -1, ambition: 1, empathy: 0.4, reflection: 0.2 },
    },
    // B / C / D …
  ],
}
```

### 各维度含义

| 键 | 含义 | 取值范围 |
| --- | --- | --- |
| `autonomy` | 自主与独立 | -2 … +2 |
| `emotionality` | 情感表达与敏感度 | -2 … +2 |
| `order` | 秩序、稳定与规则倾向 | -2 … +2 |
| `ambition` | 行动、野心与目标导向 | -2 … +2 |
| `empathy` | 共情、关怀与关系倾向 | -2 … +2 |
| `reflection` | 自省、直觉与精神探索 | -2 … +2 |

### 加题的正确做法

1. 在 `questions` 数组里新增一个对象，**`id` 必须唯一**（建议 `q17`、`q18`…）。
2. 每个选项的 `scores` 要填满 6 个维度（缺省视为 0 也可以，但填全更清晰）。
3. **不需要**改任何页面代码 —— 题目数量、进度指示器（`05 / 16`）会自动跟随。
4. 但**强烈建议**改完后跑一次测试：

```bash
npm test
```

测试里有一项叫「所有角色都可达」的检查，会用模拟退火搜索验证 22 位角色都能被匹配到。如果你把某个角色的向量改得和别的角色太像，测试会失败并告诉你是谁。

测试还包含一组**叙述文案质量检查**（`describe('结果叙述生成')`），它们会遍历全部 22 张牌并断言：

- 每一段叙述都非空、且以完整标点收尾；
- 不出现未替换的模板占位（`undefined` / `${...}` / `NaN`）；
- 不出现重复助词（如「把把」「有有」）—— 这类问题最容易在改文案后引入；
- 不出现「《秀拉》里的秀拉」这类书名与角色名重复；
- 作品名被当作书名引用时必须带书名号。

> 如果你改了 `strengths` / `shadowTraits` 等字段的措辞，务必跑一次 `npm test`。
> 这些字段会被拼进固定句式里，带「把」「有」开头的短语容易和句式打架。

### 答案选项的写法建议

- 不要写成「好答案 / 坏答案」—— 每个选项都应当是**一种合理的生活选择**。
- 尽量让四个选项在六个维度上形成**有区分度**的分布，否则该题几乎不影响结果。
- 保持题目的文学气质：写情境，不写「你勇敢吗」。

---

## 如何修改人物原型向量与匹配权重

### 人物向量

在 `src/data/personalityProfiles.ts` 里（这是一个**数组**，每项一位角色）：

```ts
export const personalityProfiles: PersonalityProfile[] = [
  {
    id: 'sun',                          // 与 tarotCards.id 一致
    characterNameZh: '莎格',
    novelName: '紫色',
    archetype: '喜悦与分享',
    // 六维原型向量，范围 -2 ~ +2
    vector: { autonomy: 0.8, emotionality: 0.9, order: -0.2, ambition: 0.3, empathy: 0.9, reflection: 0.1 },
    // 该角色的「可达区域」：玩家在什么答题倾向下会得到她
    // 自动化测试会验证这个区域真实存在
    reachability: {
      high: ['emotionality', 'empathy'],
      low: ['order'],
    },
  },
  // …另外 21 位
];
```

改完运行：

```bash
npm run sync:vectors
```

这个脚本会把 `personalityProfiles.ts` 里的向量**同步回** `tarotCards.ts` 的 `personalityVector` 字段（两张牌里各存一份，是有意的冗余：前者是「编辑视图」，后者是「渲染视图」）。同步后再跑一次测试。

### 匹配权重

在 `src/lib/matching.ts`：

```ts
const DIMENSION_WEIGHTS: Record<DimensionKey, number> = {
  reflection: 1.1,
  order: 1.05,
  ambition: 1.05,
  autonomy: 1.0,
  emotionality: 1.0,
  empathy: 1.0,
};
```

- 权重越高，该维度对最终结果的影响越大。
- 全部改成 `1.0` 就是等权。
- **注意**：改完权重后，22 位角色的可达性可能变化，务必跑 `npm test`。

---

## 匹配算法是怎么工作的

`src/lib/matching.ts` 里是一套**确定性**的多维匹配：

1. **累积** — 把 16 道题各选项的六维分相加，得到原始向量。
2. **归一化** — 根据本次作答的实际最小/最大值，把六个维度各自缩放到 `[-1, 1]`。
   （这一步很重要：否则某个维度即使大家都答得很极端，也不会对结果产生区分。）
3. **加权余弦相似度** — 把玩家向量与 22 个人物向量分别算加权余弦相似度，取最高分。
4. **确定性的平局处理** — 分数相同时，按塔罗编号从小到大取。**同样的答案永远得到同样的结果**，没有任何随机成分。
5. **相近角色** — 取第 2、3 名作为「命运之书还翻到了这两页」。

结果说明文字由 `src/lib/results.ts` 的 `buildNarrative()` 生成：它会根据你**实际得分最高和最低的维度**挑对应的句子，所以不同的人拿到的解读措辞不同。

---

## 引文与出处规范

每张牌有一组引文字段：

```ts
literaryQuote: '「……」',
quoteAttribution: '《紫色》',     // 或 '《紫色》(2003) 电影'
quoteType: 'novel',              // 'novel' 原著台词 | 'film' 影视台词 | 'original' 原创箴言
```

**规则：**

- `quoteType: 'novel'` — 必须是你能核实出处的原著原话，`quoteAttribution` 写明作品名。
- `quoteType: 'film'` — 影视改编中的台词，`quoteAttribution` 写明影片与年份。
- `quoteType: 'original'` — 依据人物精神气质撰写的原创文字。
  页面会自动显示提示：「本句为本站原创的文学箴言……并非原著中的原话。」

**不要把原创句子标成 `novel`。** 网站的「关于」页与每条引文下方都会明确标注类型，宁可诚实标注，也不制造假出处。

---

## 分享与结果链接

- **复制结果链接** — 答案被编码成 `?r=q01:b,q02:c,...`，任何设备打开同一个链接都会得到相同结果。
- **下载分享图** — 用纯 HTML5 Canvas 在浏览器端绘制 1080×1620 的竖版图片（纸张质感、双线金框、卡面、牌名、人物名、结果短句），导出为 PNG。无需服务器、无需第三方库。
- **本地保存** — 最近一次结果存在 `localStorage` 的 `literary-arcana:last-result`。
- **测试进度** — 存在 `literary-arcana:quiz-progress`，刷新页面后可以「继续作答」。

这些都只在**你自己的浏览器里**，不上传任何数据。

---

## 设计与视觉体系

全部定义在 `src/app/globals.css` 的 `@theme` 里：

| 变量 | 色值 | 用途 |
| --- | --- | --- |
| `--color-paper` | `#E8D4AC` | 古董纸黄（主背景） |
| `--color-forest` | `#24372F` | 深墨绿（正文 / 深色块） |
| --color-wine | `#722F36` | 陈年酒红（强调、选中态） |
| `--color-brass` | `#B18A50` | 古铜金（边框、装饰） |
| `--color-ink` | `#29241F` | 炭黑（文字） |
| `--color-cream` | `#F5E9D4` | 奶油白（卡片底） |

字体：`Cinzel`（罗马碑体，用于牌名与编号）+ `Noto Serif SC`（中文衬线，用于正文）。

装饰全部是手写 SVG（`src/components/Ornaments.tsx`）：分隔线、卷草、角饰、徽章。没有使用任何 emoji 或图标库符号。

动画用 `framer-motion`，全部尊重 `prefers-reduced-motion`（在 `globals.css` 里统一降级）。

---

## 运行、构建与部署

### 生产构建

```bash
npm run build
npm start
```

构建会静态预渲染 22 张卡牌详情页 + 图鉴 + 首页，页面加载很快。

### 部署到 GitHub Pages（本站当前部署方式）

线上地址：<https://cherish529.github.io/literary-arcana/>

本项目没有任何服务端动态功能（没有 `cookies` / `headers` / `useSearchParams`），
所以可以整站预渲染成纯静态文件，直接托管在 GitHub Pages 上。

**部署已完全自动化 —— 你只需要 push。**

`.github/workflows/ci.yml` 里配置了两个作业：

| 作业 | 作用 |
| --- | --- |
| `Lint · Typecheck · Test · Build` | lint → 类型检查 → 单元测试 → 生产构建，任一步失败则不会部署 |
| `部署到 GitHub Pages` | 依赖上一个作业成功后，构建静态站点并发布 |

**日常发布流程**

```bash
git add .
git commit -m "你的修改说明"
git push origin main
```

推上去之后，GitHub Actions 会自动跑完整套检查，全绿后自动重新部署，
通常 1–2 分钟生效。可以在仓库的 **Actions** 标签页看进度。

> 如果你换了新的仓库，需要在 **Settings → Pages → Build and deployment**
> 里把 Source 设为 **GitHub Actions**（不是 "Deploy from a branch"），
> 否则自动部署作业会拿不到部署目标。

**注意**：`next.config.ts` 里已经开启了 `output: 'export'`。
这意味着 **`cacheComponents`（PPR）无法使用**——它与 export 模式不兼容，
构建时会报 `Invariant: PPR cannot be enabled in export mode`。
本地 `npm run dev` 不受影响；但如果你以后想改回服务器端渲染模式，
需要把 `output: 'export'` 和 `images.unoptimized` 一并删掉，并恢复 `cacheComponents: true`。

**两个容易踩的坑（都已在 CI 里修好）**

1. `typecheck` 脚本是 `next typegen && tsc --noEmit`。
   Next.js 16 的 `LayoutProps<'/'>` 等全局类型由 `.next/types` 生成，
   全新检出时 `.next/` 还不存在，必须先生成再检查。
2. `@types/node` 必须是 `^22` 或更高。`vitest@5` 的 peer 依赖要求这一点，
   用 `^20` 会导致 `npm ci` 解析失败。

### 部署到 Vercel

最简单的方式：把项目推到 GitHub，然后在 <https://vercel.com/new> 导入仓库。

- Framework Preset：**Next.js**（自动识别）
- Build Command：`npm run build`（默认）
- Install Command：`npm install`（默认）

> 用 Vercel 部署时，建议先把 `next.config.ts` 里的 `output: 'export'` 移除，
> 让 Vercel 用标准的 Next.js 构建流程（性能更好，也支持完整功能）。

可选环境变量：

```
NEXT_PUBLIC_SITE_URL=https://你的域名
```

用于生成正确的分享链接与社交卡片绝对地址。

### 部署到自己的服务器

```bash
npm ci
npm run build
npm start          # 默认监听 3000 端口
```

前面挂 Nginx 或 Caddy 做反向代理即可。`public/` 和 `.next/` 是运行时需要的目录。

---

## 常见问题

**Q：改了图片但页面没变？**
A：检查文件名是否完全一致（`public/cards/17-star.webp`）；浏览器可能缓存了旧图，强制刷新（Ctrl/Cmd + Shift + R）。

**Q：推送到 GitHub 失败，提示连接超时？**
A：多半是网络无法直连 `github.com`。本项目部署时遇到过这个问题——
如果你的机器上有 Clash Verge / v2ray 之类的本地代理，需要给 git 配上代理：

```bash
git config --global http.proxy  http://127.0.0.1:7897
git config --global https.proxy http://127.0.0.1:7897
```

用完记得取消：

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

另外，如果 `gh` 提示 `refusing to allow an OAuth App to create or update workflow`
之类的错误，说明 token 缺少 `workflow` 权限，需要执行 `gh auth refresh -h github.com -s workflow` 重新授权。

**Q：想加更多题，但进度显示还是「/ 16」？**
A：进度显示是自动的，题数来自 `questions` 数组长度。如果你看到旧的数字，说明改动没被保存或 dev server 没热更新成功，刷新一下即可。

**Q：测试报「某个角色无法被匹配」？**
A：说明你修改题目分值或人物向量后，该角色被其他角色「盖住」了。运行 `npm test` 看具体是谁，然后调整该角色的 `personalityProfiles.ts` 向量，或调整对应题目的选项分值。

**Q：手机上排版乱了吗？**
A：所有页面都针对移动端单独调整过（不是简单缩小）。如果发现某个页面有问题，先看它是不是用了固定 `width` 而不是 `max-w-*` / `w-full`。

**Q：可以在页面上加广告或者用户注册吗？**
A：可以，但目前项目刻意保持零依赖、零后端。加注册/数据库会引入服务端与迁移成本，建议先把内容与体验做完整。

**Q：部署后字体变成了默认字体？**
A：`next/font` 在构建时会下载并自托管字体。如果构建环境没有网络访问字体源，字体可能回退。可以在有网络的环境执行一次 `npm run build` 后再部署，或改用本地字体文件。

---

## 许可与致谢

- 二十二张卡面由本站作者独立绘制，版权属于作者。
- 文学人物形象与原著的版权归原作者与出版方所有，本项目仅作文学批评性质的引用。
- 本站是文学互动体验，不提供心理诊断，不预测命运。
