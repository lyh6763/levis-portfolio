import { ReactNode } from 'react';

import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

/** 진입 시 fade-up 하는 래퍼 (IntersectionObserver, reduced-motion 즉시 표시). */
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const [ref, isVisible] = useRevealOnScroll<HTMLDivElement>();

  return (
    <div ref={ref} className={`reveal${isVisible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  );
}
