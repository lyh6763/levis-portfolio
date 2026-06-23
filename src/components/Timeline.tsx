import { createRef, RefObject, useMemo, useRef, CSSProperties } from 'react';

import { TimelineItem } from '../data/content';
import { useActiveTimeline } from '../hooks/useActiveTimeline';

type TimelineProps = {
  items: TimelineItem[];
  variant?: 'home' | 'full';
};

export function Timeline({ items, variant = 'home' }: TimelineProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useMemo(
    () => items.map(() => createRef<HTMLElement>() as RefObject<HTMLElement | null>),
    [items],
  );
  const { activeIndex, progress } = useActiveTimeline(listRef, itemRefs);
  const isFull = variant === 'full';
  const listClass = isFull ? 'full-timeline__list' : 'timeline__list';
  const itemClass = isFull ? 'full-timeline__item' : 'timeline__item';
  const yearClass = isFull ? 'full-timeline__year' : 'timeline__year';
  const contentClass = isFull ? 'full-timeline__content' : 'timeline__content';
  const titleClass = isFull ? 'full-timeline__title' : 'timeline__title';
  const descClass = isFull ? 'full-timeline__desc' : 'timeline__desc';
  const style = { '--timeline-progress': `${progress}px` } as CSSProperties;

  return (
    <div ref={listRef} className={listClass} style={style}>
      {items.map((item, index) => (
        <article
          key={`${item.year}-${item.title}`}
          ref={itemRefs[index]}
          className={`${itemClass}${index === activeIndex ? ' is-active' : ''}`}
        >
          {isFull ? (
            <div className="full-timeline__year-wrap">
              <span className={yearClass}>{item.year}</span>
            </div>
          ) : (
            <span className={yearClass}>{item.year}</span>
          )}
          <div className={contentClass}>
            <h3 className={titleClass}>{item.title}</h3>
            <p className={descClass}>{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
