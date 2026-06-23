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
