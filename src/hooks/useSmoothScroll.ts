import { useEffect } from 'react';
import Lenis from 'lenis';

let activeLenis: Lenis | null = null;
const lenisListeners = new Set<(lenis: Lenis) => void>();
let refreshScrollTriggers: (() => void) | null = null;

/** 라우트 전환·목차 오버레이처럼 Lenis를 직접 다뤄야 하는 곳에서 사용한다. 없으면 null. */
export const getLenis = () => activeLenis;

/** 지금과 앞으로 만들어질 Lenis 인스턴스에 연결한다. GSAP를 늦게 불러와도 스크롤 동기화를 붙일 수 있다. */
export function onLenis(listener: (lenis: Lenis) => void) {
  lenisListeners.add(listener);
  if (activeLenis) {
    listener(activeLenis);
  }
}

/** GSAP 모듈이 불러와지면 ScrollTrigger 재계산 함수를 등록한다 (src/lib/scrollTrigger.ts). */
export function registerScrollRefresh(refresh: () => void) {
  refreshScrollTriggers = refresh;
}

/** 스크롤 트리거 위치를 다시 잰다. GSAP를 아직 불러오지 않았다면 할 일이 없다. */
export function refreshScrollPositions() {
  refreshScrollTriggers?.();
}

/**
 * Lenis가 켜져 있으면 Lenis로, 아니면 네이티브로 즉시 스크롤한다.
 * 페이지가 막 바뀐 직후에는 Lenis의 내부 값(스크롤 위치, 최대 스크롤)이 이전 페이지 기준으로 남아 있다.
 * - 요소 위치는 실제 window.scrollY로 직접 계산한다. Lenis에 요소를 넘기면 내부 스크롤 값과 scroll-margin을 더해 목표를 지나친다.
 * - 이동 전에 치수를 다시 재고, 그래도 위치가 어긋나면 네이티브 스크롤로 맞춘다(Lenis는 네이티브 스크롤을 따라온다).
 */
export function scrollToImmediate(target: number | HTMLElement, offset = 0) {
  const top = Math.max(
    0,
    typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY + offset,
  );
  if (activeLenis) {
    activeLenis.resize();
    activeLenis.scrollTo(top, { immediate: true, force: true });
  }
  if (Math.abs(window.scrollY - top) > 1) {
    window.scrollTo({ top, behavior: 'instant' });
  }
}

/**
 * Lenis 관성 스크롤. 자체 requestAnimationFrame 루프(autoRaf)로 돌아 첫 화면에 GSAP가 필요 없다.
 * prefers-reduced-motion이면 Lenis를 켜지 않고 네이티브 스크롤을 유지한다.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({ autoRaf: true });
    activeLenis = lenis;
    lenisListeners.forEach((listener) => listener(lenis));

    return () => {
      lenis.destroy();
      activeLenis = null;
    };
  }, []);
}
