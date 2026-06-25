import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * 셀비지 실(②) 진행 레일. 전체 페이지 스크롤 진행을 `--rail-progress`(0..1)로 노출하고,
 * 방향(데스크탑=세로 / 모바일=상단 가로)은 CSS가 결정한다.
 * (위치 표시이므로 reduced-motion에서도 동작 — 네이티브 스크롤 기준.)
 */
export function ProgressRail() {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => rail.style.setProperty('--rail-progress', self.progress.toFixed(4)),
    });

    return () => trigger.kill();
  }, []);

  return (
    <div className="rail" ref={railRef} aria-hidden="true">
      <div className="rail__fill" />
      <div className="rail__dot" />
    </div>
  );
}
