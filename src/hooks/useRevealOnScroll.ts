import { RefObject, useEffect, useRef, useState } from 'react';

import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export function useRevealOnScroll<T extends HTMLElement>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      // 움직임 줄이기 설정과 IntersectionObserver 지원 여부는 브라우저에서만 알 수 있다.
      // 빌드 때 미리 그린 HTML(숨김 상태)과 첫 렌더를 맞추려고 화면에 붙은 뒤 바꾼다.
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate 뒤 브라우저 전용 값 반영
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  return [ref, isVisible];
}
