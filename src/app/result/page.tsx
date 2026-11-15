import type { Metadata } from 'next';
import { ResultClient } from './ResultClient';

export const metadata: Metadata = {
  title: '你的文学原型',
  description:
    '你最接近的文学原型，以及与之对应的塔罗牌、正逆位解读与人物分析。',
};

export default function ResultPage() {
  return <ResultClient />;
}
