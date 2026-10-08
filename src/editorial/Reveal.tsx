import { createElement, ReactNode } from 'react';

import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

type RevealProps = {
  as?: 'div' | 'h2' | 'blockquote';
  className: string;
  children: ReactNode;
};

/** 화면에 들어올 때 한 번 fade-up. reduced-motion에서는 처음부터 보인다. */
export function Reveal({ as = 'div', className, children }: RevealProps) {
  const [ref, isVisible] = useRevealOnScroll<HTMLElement>();
  return createElement(as, { ref, className: `${className} reveal${isVisible ? ' is-visible' : ''}` }, children);
}
