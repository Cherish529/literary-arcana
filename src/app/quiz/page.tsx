import type { Metadata } from 'next';
import { QuizClient } from './QuizClient';

export const metadata: Metadata = {
  title: '性格测试',
  description:
    '十六道文学情境题，六维人格评估，与二十二位经典文学女性相遇。确定性匹配，同样的答案得到同样的结果。',
};

export default function QuizPage() {
  return <QuizClient />;
}
