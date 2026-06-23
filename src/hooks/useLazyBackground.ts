import { RefObject, useEffect, useRef, useState } from 'react';

export function useLazyBackground<T extends HTMLElement>(
  src: string,
  eager = false,
): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [isLoaded, setIsLoaded] = useState(eager);

  useEffect(() => {
    const element = ref.current;
    if (!element || isLoaded) {
      return;
    }

    if (eager || !('IntersectionObserver' in window)) {
      setIsLoaded(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '200px 0px',
        threshold: 0.01,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [eager, isLoaded, src]);

  return [ref, isLoaded];
}
