import type { Metadata } from 'next';
import Link from 'next/link';
import { OrnamentDivider, BotanicalSprig, SealEmblem } from '@/components/Ornaments';

export const metadata: Metadata = {
  title: '关于本项目',
  description:
    '为什么把经典文学女性与大阿尔卡那结合：这是一套象征性叙事框架，用于自我探索，而非心理诊断或命运预测。',
};

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden px-5 py-14 sm:px-8 sm:py-20">
      <BotanicalSprig className="pointer-events-none absolute -right-4 top-40 h-64 w-auto scale-x-[-1] opacity-20 sm:right-8" />

      <div className="relative mx-auto max-w-2xl">
        {/* 页首 */}
        <div className="text-center">
          <SealEmblem className="mx-auto h-14 w-14 opacity-65" />
          <p className="mt-7 font-display text-[0.58rem] tracking-[0.38em] text-[#b18a50]">
            ABOUT
          </p>
          <h1 className="mt-4 font-display text-3xl tracking-[0.1em] text-[#24372f] sm:text-[2.6rem]">
            关于这本命运之书
          </h1>
          <OrnamentDivider className="mt-7" />
        </div>

        {/* 正文 */}
        <div className="mt-12 space-y-11 font-serif text-[0.99rem] leading-[2.18] text-[#4a423a] text-pretty sm:text-[1.03rem]">
          <section>
            <h2 className="font-display text-[0.62rem] tracking-[0.28em] text-[#722f36]">
              为什么是文学与塔罗
            </h2>
            <p className="mt-4">
              塔罗有一种特殊的结构：二十二张牌，恰好二十二个位置，从「愚者」到「世界」，
              从最纯粹的空白到最完整的自我实现。它不是用来预测的——它的价值在于
              <strong className="font-medium text-[#24372f]">提供一套可以借用的词汇</strong>
              ，让你说出自己身上那些说不清的东西。
            </p>
            <p className="mt-4">
              而文学里的女性，恰恰是这套词汇最丰富的来源。她们不是符号，她们是
              <span className="text-[#722f36]">被写下来的人</span>
              ——有具体的处境、具体的代价、具体的软肋。把她们放进大阿尔卡那的位置，
              不是要把谁压缩成一个标签，而是给她们一个位置，
              好让我们从旁边走过去，看清她们，也看清自己。
            </p>
          </section>

          <section>
            <h2 className="font-display text-[0.62rem] tracking-[0.28em] text-[#722f36]">
              女性形象的复杂性
            </h2>
            <p className="mt-4">
              这套牌里的每一位女性，都同时拥有两种读法。
              正位与逆位不是「好」与「坏」，而是同一个人的两种可能状态：
              苔丝的良知既是她的坚持也是她的枷锁，爱玛的激情既是她的生命也是她的毁灭，
              宝钗的周全既是她的智慧也是她从未被真正看见的原因。
            </p>
            <p className="mt-4">
              我们刻意不把任何一位塑造成完整无缺的形象。文学里真实的人都不是那样，
              她们身上的矛盾才是她们之所以值得阅读的地方。
            </p>
          </section>

          <section>
            <h2 className="font-display text-[0.62rem] tracking-[0.28em] text-[#722f36]">
              文学与自我认识
            </h2>
            <p className="mt-4">
              读小说的乐趣之一，是在别人的处境里认出自己。测试所做的不过是把这件事
              <span className="text-[#722f36]">变得更结构化一点</span>
              ：用十六个情境，代替你在深夜翻书时那一下「如果是我呢」。
            </p>
            <p className="mt-4">
              匹配算法是确定性的——同样的答案，永远得到同样的结果。
              我们不追求百分比，也不声称测出了什么，只是把「最接近的文学原型」
              这个说法，交给一个透明的、可复现的计算过程。
            </p>
          </section>

          <section>
            <h2 className="font-display text-[0.62rem] tracking-[0.28em] text-[#722f36]">
              这不是什么
            </h2>
            <div className="mt-4 space-y-3 border border-[#29241f]/15 bg-[#f5e9d4]/50 p-5 sm:p-6">
              {[
                '它不是心理测验，也不具备任何科学诊断效力。',
                '它不预测命运，不声称预测准确，也不为此负责。',
                '它不要求你与某个角色一致——「像」本身就是一种相遇。',
                '它不收集、不上传你的任何作答；进度与结果只保存在你自己的浏览器里。',
              ].map((item) => (
                <p key={item} className="flex items-start gap-3">
                  <span
                    className="mt-[0.72rem] h-1 w-1 shrink-0 rotate-45 bg-[#722f36]/60"
                    aria-hidden
                  />
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-[0.62rem] tracking-[0.28em] text-[#722f36]">
              关于卡面
            </h2>
            <p className="mt-4">
              二十二张卡面由本站作者独立绘制，采用复古木刻与铜版蚀刻的视觉语言：
              有限色阶、细密排线、手工装帧的金线边框。
              我们没有使用任何现成塔罗牌图库或自动生成的图像，
              因为这套牌的意义在于它是为这些人物专门画出来的。
            </p>
          </section>

          <section>
            <h2 className="font-display text-[0.62rem] tracking-[0.28em] text-[#722f36]">
              引文说明
            </h2>
            <p className="mt-4">
              站内所有引文均已标明类型。经核实的原著台词会注明出处与作品；
              影视台词注明影片；无法可靠核实的，一律标为
              <span className="text-[#722f36]">「原创文学箴言」</span>
              ——它们是依据人物精神撰写的原创文字，不是任何人的原话。
              我们宁可诚实地标注，也不制造假出处。
            </p>
          </section>
        </div>

        {/* 入口 */}
        <div className="mt-14 flex flex-col items-center gap-4 border-t border-[#29241f]/12 pt-10">
          <Link
            href="/quiz"
            className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden border border-[#24372f] bg-[#24372f] px-8 py-4 font-serif text-[0.92rem] tracking-[0.2em] text-[#f5e9d4] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-transparent hover:text-[#24372f] sm:w-auto"
          >
            <span className="absolute inset-0 -translate-x-full bg-[#722f36] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
            <span className="relative z-10">开始寻找你的文学原型</span>
          </Link>

          <Link
            href="/arcana"
            className="font-serif text-xs tracking-[0.16em] text-[#6f655a] underline decoration-[#b18a50]/45 underline-offset-4 transition-colors hover:text-[#722f36]"
          >
            或者，先翻阅图鉴
          </Link>
        </div>
      </div>
    </div>
  );
}
