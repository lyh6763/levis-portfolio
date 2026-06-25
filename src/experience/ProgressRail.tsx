import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * 셀비지 실(②)을 전 구간 진행 레일로 격상.
 * 좌측 고정, 전체 페이지 스크롤 진행을 fill(scaleY) + dot으로 표시한다.
 * (모션이 아닌 위치 표시이므로 reduced-motion에서도 동작 — 네이티브 스크롤 기준.)
 */
export function ProgressRail() {
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    const dot = dotRef.current;
    if (!fill || !dot) {
      return;
    }

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        fill.style.transform = `scaleY(${self.progress})`;
        dot.style.top = `${(self.progress * 100).toFixed(2)}%`;
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div className="rail" aria-hidden="true">
      <div className="rail__fill" ref={fillRef} />
      <div className="rail__dot" ref={dotRef} />
    </div>
  );
}
