import { ReactNode } from 'react';

import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

type RevealSectionProps = {
  className: string;
  children: ReactNode;
};

export function RevealSection({ className, children }: RevealSectionProps) {
  const [ref, isVisible] = useRevealOnScroll<HTMLElement>();

  return (
    <section ref={ref} className={`${className} fade-section${isVisible ? ' is-visible' : ''}`}>
      {children}
    </section>
  );
}
