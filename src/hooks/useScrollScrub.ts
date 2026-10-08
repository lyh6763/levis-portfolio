import { RefObject, useLayoutEffect } from 'react';

import { gsap } from '../lib/scrollTrigger';
import { refreshScrollPositions } from './useSmoothScroll';

type ScrubOptions = {
  start?: string;
  end?: string;
  /** 진행률(0–1)을 직접 받아야 하는 시각화용. */
  onProgress?: (progress: number) => void;
};

/**
 * 시각화 공용 스크럽. `build`가 타임라인에 from/to 트윈을 쌓는다.
 * reduced-motion이면 타임라인을 만들지 않으므로, 마크업 자체가 최종 상태여야 한다.
 */
export function useScrollScrub<T extends HTMLElement>(
  ref: RefObject<T | null>,
  build: (tl: gsap.core.Timeline, el: T) => void,
  { start = 'top 75%', end = 'bottom 60%', onProgress }: ScrubOptions = {},
) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onProgress?.(1);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: 0.6,
          onUpdate: onProgress ? (self) => onProgress(self.progress) : undefined,
        },
      });
      build(tl, el);
    }, el);
    // 시각화는 지연 로딩되어 늦게 끼어들므로, 들어온 뒤 페이지 전체의 트리거 위치를 다시 잰다.
    refreshScrollPositions();

    return () => ctx.revert();
    // build/onProgress는 마운트 시점의 정의로 고정한다.
  }, [ref, start, end]);
}
