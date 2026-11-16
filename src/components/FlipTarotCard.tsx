'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { TarotCardImage } from './TarotCardImage';
import { assetPath } from '@/lib/assetPath';

/**
 * 全站统一卡背 ——《命运的镜子》
 *
 * 22 张文学塔罗共用这一张牌背。原图由站主提供，
 * 存放于 `public/cards/card-back.webp`，组件内只做原样引用，
 * 不做任何重绘、裁切或装饰叠加。
 */
export const CARD_BACK_SRC = '/cards/card-back.webp';

interface FlipTarotCardProps {
  /** 正面：文学人物原创牌面 */
  frontSrc: string;
  frontAlt: string;
  cardId?: string;
  romanNumeral?: string;
  /** 首屏大图优先加载 */
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** 非受控初始状态：false = 显示牌背（默认） */
  defaultFlipped?: boolean;
  /** 受控状态（传入即为受控模式） */
  controlledFlipped?: boolean;
  onFlipChange?: (flipped: boolean) => void;
  /** 挂载后延迟自动翻到正面（毫秒）。传入即启用，与 autoFlipOnView 互斥。 */
  autoFlipDelay?: number;
  /** 进入视口时自动翻到正面（默认 true）。只触发一次，只翻过去不翻回来。 */
  autoFlipOnView?: boolean;
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function')
    return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function FlipTarotCard({
  frontSrc,
  frontAlt,
  cardId,
  romanNumeral,
  priority = false,
  sizes = '(max-width: 640px) 45vw, 300px',
  className = '',
  defaultFlipped = false,
  controlledFlipped,
  onFlipChange,
  autoFlipDelay,
  autoFlipOnView = true,
}: FlipTarotCardProps) {
  const [internal, setInternal] = useState(defaultFlipped);
  const flipped = controlledFlipped ?? internal;
  const flippedRef = useRef(flipped);
  useEffect(() => {
    flippedRef.current = flipped;
  }, [flipped]);

  const rootRef = useRef<HTMLButtonElement>(null);
  const [backLoaded, setBackLoaded] = useState(false);
  const [backError, setBackError] = useState(false);
  const backSrc = assetPath(CARD_BACK_SRC);

  const flipToFront = useCallback(() => {
    if (flippedRef.current) return;
    if (controlledFlipped === undefined) setInternal(true);
    onFlipChange?.(true);
  }, [controlledFlipped, onFlipChange]);

  // 挂载后延迟自动翻（首页三张、结果揭晓用）
  useEffect(() => {
    if (autoFlipDelay === undefined) return;
    const t = window.setTimeout(
      flipToFront,
      prefersReducedMotion() ? 0 : autoFlipDelay,
    );
    return () => window.clearTimeout(t);
  }, [autoFlipDelay, flipToFront]);

  // 进入视口自动翻（图鉴长列表用，移动端滚动到才翻）
  useEffect(() => {
    if (!autoFlipOnView || autoFlipDelay !== undefined) return;
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      // 不支持则直接翻，避免永远停在牌背
      flipToFront();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          if (prefersReducedMotion()) flipToFront();
          else window.setTimeout(flipToFront, 150);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [autoFlipOnView, autoFlipDelay, flipToFront]);

  const toggle = useCallback(() => {
    const next = !flippedRef.current;
    if (controlledFlipped === undefined) setInternal(next);
    onFlipChange?.(next);
  }, [controlledFlipped, onFlipChange]);

  return (
    <button
      ref={rootRef}
      type="button"
      onClick={toggle}
      aria-pressed={flipped}
      aria-label={flipped ? `收起卡面：${frontAlt}` : `翻开卡面：${frontAlt}`}
      className={`flip-scene block aspect-[2/3] w-full cursor-pointer touch-manipulation select-none ${className}`}
    >
      <span
        className="flip-inner block h-full w-full"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* 背面：统一卡背（未翻开时可见） */}
        <span
          className="flip-face absolute inset-0 block overflow-hidden bg-[#e8d4ac]"
          aria-hidden={flipped}
        >
          {!backError ? (
            <Image
              src={backSrc}
              alt=""
              fill
              sizes={sizes}
              priority={priority}
              draggable={false}
              onLoad={() => setBackLoaded(true)}
              onError={() => setBackError(true)}
              className={`object-contain transition-opacity duration-500 ${
                backLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-xs tracking-[0.3em] text-[#29241f]/45">
                命运之书
              </span>
            </span>
          )}
        </span>

        {/* 正面：文学人物原创牌面（翻开后可见，已预旋转 180° 避免镜像） */}
        <span
          className="flip-face flip-face-front absolute inset-0 block overflow-hidden"
          aria-hidden={!flipped}
        >
          <TarotCardImage
            src={frontSrc}
            alt={frontAlt}
            cardId={cardId}
            romanNumeral={romanNumeral}
            priority={priority}
            sizes={sizes}
            className="h-full w-full"
          />
        </span>
      </span>
    </button>
  );
}
