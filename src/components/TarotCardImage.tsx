'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';

/**
 * 塔罗牌图片
 *
 * - 图片未加载时显示占位纹理（保持真实 2:3 比例，不产生布局跳动）
 * - 加载失败时显示优雅的缺失状态，而不是破损图片标志
 * - 传入 romanNumeral 用于生成占位装饰
 *
 * ⚠️ 关于加载状态的判定：
 * next/image 的图片若已被浏览器缓存，load 事件可能在 React 挂载
 * onLoad 处理器之前就已触发。这里用 ref 回调在图片元素挂载时检查
 * complete 状态，确保「已缓存」与「正常加载」两种情况都能正确显示。
 *
 * ⚠️ 关于状态存储：
 * 状态记录的是「哪个 src 已加载 / 出错」，而不是单纯的 loading/loaded，
 * 因此 src 变化时会自动回到 loading，无需在 effect 里 setState。
 */

interface TarotCardImageProps {
  src: string;
  alt: string;
  cardId?: string;
  romanNumeral?: string;
  /** 显示尺寸类名，控制容器宽高 */
  className?: string;
  /** 是否优先加载（首屏大图） */
  priority?: boolean;
  /** 图片本身的 class */
  imageClassName?: string;
  sizes?: string;
}

export function TarotCardImage({
  src,
  alt,
  cardId,
  romanNumeral,
  className = '',
  priority = false,
  imageClassName = '',
  sizes,
}: TarotCardImageProps) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [errorSrc, setErrorSrc] = useState<string | null>(null);

  // 状态由「已加载 / 出错的 src」推导得出，
  // 因此 src 变化时会自动回到 loading，无需在 effect 里 setState。
  const status: 'loading' | 'loaded' | 'error' =
    errorSrc === src ? 'error' : loadedSrc === src ? 'loaded' : 'loading';

  // 图片元素挂载时检查一次：
  // 若浏览器已缓存该图片，load 事件可能早于 React 绑定 onLoad 而触发，
  // 此时需要手动补上「已加载」状态。
  const attachImg = useCallback(
    (node: HTMLImageElement | null) => {
      if (!node) return;
      if (node.complete) {
        if (node.naturalWidth > 0) {
          setLoadedSrc(src);
        } else {
          setErrorSrc(src);
        }
      }
    },
    [src],
  );

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* 占位层：始终存在于下方，图片加载后被覆盖 */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[linear-gradient(160deg,#e8d4ac_0%,#dcc59a_45%,#cdb389_100%)]"
        aria-hidden={status === 'loaded'}
      >
        <div
          className="absolute inset-[6%] rounded-sm border border-[#29241f]/20"
          aria-hidden
        />
        <div
          className="absolute inset-[9%] rounded-sm border border-[#b18a50]/45"
          aria-hidden
        />
        {romanNumeral && (
          <span className="relative z-10 font-display text-2xl tracking-[0.2em] text-[#722f36]/70">
            {romanNumeral}
          </span>
        )}
        {status === 'loading' && cardId && (
          <span className="relative z-10 max-w-[70%] text-center font-serif text-xs tracking-widest text-[#29241f]/45">
            待制版
          </span>
        )}
        {/* 细密横向刻线，模拟版画底纹 */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          aria-hidden
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(41,36,31,1) 0 1px, transparent 1px 5px)',
          }}
        />
      </div>

      {status !== 'error' && (
        <Image
          ref={attachImg}
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          onLoad={() => setLoadedSrc(src)}
          onError={() => setErrorSrc(src)}
          className={`object-contain transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          } ${imageClassName}`}
        />
      )}

      {/* 加载失败状态 */}
      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#e8d4ac]/90 px-4 text-center">
          <div className="h-12 w-px bg-[#722f36]/40" aria-hidden />
          <p className="font-serif text-sm tracking-[0.2em] text-[#29241f]/70">
            此张卡面尚未制版
          </p>
          <p className="max-w-[80%] font-serif text-xs leading-relaxed text-[#29241f]/45">
            图像文件缺失时，站点会以占位纹理保持版面完整。
          </p>
          {romanNumeral && (
            <span className="font-display text-lg tracking-[0.25em] text-[#722f36]/60">
              {romanNumeral}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
