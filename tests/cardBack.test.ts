import { describe, expect, it } from 'vitest';
import { CARD_BACK_SRC } from '@/components/FlipTarotCard';
import { assetPath } from '@/lib/assetPath';
import { tarotCards } from '@/data/tarotCards';

describe('统一卡背《命运的镜子》', () => {
  it('卡背路径固定为 /cards/card-back.webp', () => {
    expect(CARD_BACK_SRC).toBe('/cards/card-back.webp');
  });

  it('卡背走同样的 basePath 解析（子路径托管不 404）', () => {
    expect(assetPath(CARD_BACK_SRC)).toBe(assetPath('/cards/card-back.webp'));
    expect(assetPath(CARD_BACK_SRC).endsWith('/cards/card-back.webp')).toBe(true);
  });

  it('22 张正面都不与卡背重复', () => {
    expect(tarotCards).toHaveLength(22);
    for (const card of tarotCards) {
      expect(card.image).not.toBe(CARD_BACK_SRC);
    }
  });
});
