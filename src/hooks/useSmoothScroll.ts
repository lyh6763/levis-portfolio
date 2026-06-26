import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
// 모바일 주소창 show/hide로 인한 리프레시(핀 점프) 방지
ScrollTrigger.config({ ignoreMobileResize: true });

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
    lenis.on('scroll', ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);
}
