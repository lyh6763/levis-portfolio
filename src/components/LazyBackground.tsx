import { CSSProperties, ReactNode } from 'react';

import { useLazyBackground } from '../hooks/useLazyBackground';

type LazyBackgroundProps = {
  className: string;
  src: string;
  eager?: boolean;
  role?: 'img';
  ariaLabel?: string;
  ariaHidden?: boolean;
  children?: ReactNode;
};

export function LazyBackground({
  className,
  src,
  eager = false,
  role,
  ariaLabel,
  ariaHidden,
  children,
}: LazyBackgroundProps) {
  const [ref, isLoaded] = useLazyBackground<HTMLDivElement>(src, eager);
  const style: CSSProperties | undefined = isLoaded ? { backgroundImage: `url("${src}")` } : undefined;

  return (
    <div
      ref={ref}
      className={`${className}${isLoaded ? ' is-bg-loaded' : ''}`}
      style={style}
      role={role}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      data-bg-loaded={isLoaded ? 'true' : undefined}
    >
      {children}
    </div>
  );
}
