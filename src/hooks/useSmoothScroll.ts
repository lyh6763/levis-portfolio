import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
// 모바일 주소창 show/hide로 인한 리프레시(점프) 방지
ScrollTrigger.config({ ignoreMobileResize: true });

let activeLenis: Lenis | null = null;

/** 라우트 전환·목차 오버레이처럼 Lenis를 직접 다뤄야 하는 곳에서 사용한다. 없으면 null. */
export const getLenis = () => activeLenis;

/** Lenis가 켜져 있으면 Lenis로, 아니면 네이티브로 즉시 스크롤한다. */
export function scrollToImmediate(target: number | HTMLElement, offset = 0) {
  if (activeLenis) {
    activeLenis.scrollTo(target, { immediate: true, force: true, offset });
    return;
  }
  const top = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: 'instant' });
}

/**
 * Lenis 관성 스크롤을 GSAP ticker / ScrollTrigger와 동기화한다.
 * prefers-reduced-motion이면 Lenis를 켜지 않고 네이티브 스크롤을 유지한다.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis();
    activeLenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      activeLenis = null;
    };
  }, []);
}
