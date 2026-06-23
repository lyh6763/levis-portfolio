import { RefObject, useCallback, useEffect, useState } from 'react';

type TimelineState = {
  activeIndex: number;
  progress: number;
};

export function useActiveTimeline(
  listRef: RefObject<HTMLElement | null>,
  itemRefs: RefObject<HTMLElement | null>[],
) {
  const [state, setState] = useState<TimelineState>({ activeIndex: 0, progress: 0 });

  const updateTimeline = useCallback(() => {
    const list = listRef.current;
    const items = itemRefs.map((itemRef) => itemRef.current).filter(Boolean) as HTMLElement[];

    if (!list || items.length === 0) {
      return;
    }

    const viewportAnchor = window.innerHeight * 0.42;
    const visibleItems = items.filter((item) => {
      const rect = item.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    });

    const activeItem =
      visibleItems.length > 0
        ? visibleItems.reduce((closestItem, currentItem) => {
            const currentRect = currentItem.getBoundingClientRect();
            const closestRect = closestItem.getBoundingClientRect();
            const currentDistance = Math.abs(currentRect.top + currentRect.height / 2 - viewportAnchor);
            const closestDistance = Math.abs(closestRect.top + closestRect.height / 2 - viewportAnchor);
            return currentDistance < closestDistance ? currentItem : closestItem;
          })
        : list.getBoundingClientRect().top > viewportAnchor
          ? items[0]
          : items[items.length - 1];

    const activeIndex = items.indexOf(activeItem);
    const listRect = list.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const dotOffset = parseFloat(getComputedStyle(list).getPropertyValue('--timeline-dot-offset')) || 0;
    const progress = Math.max(0, Math.min(list.scrollHeight, itemRect.top - listRect.top + dotOffset));

    setState({ activeIndex, progress: Math.round(progress) });
  }, [itemRefs, listRef]);

  useEffect(() => {
    let ticking = false;
    const requestTimelineUpdate = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        updateTimeline();
        ticking = false;
      });
    };

    updateTimeline();
    window.addEventListener('scroll', requestTimelineUpdate, { passive: true });
    window.addEventListener('resize', requestTimelineUpdate);

    return () => {
      window.removeEventListener('scroll', requestTimelineUpdate);
      window.removeEventListener('resize', requestTimelineUpdate);
    };
  }, [updateTimeline]);

  return state;
}
