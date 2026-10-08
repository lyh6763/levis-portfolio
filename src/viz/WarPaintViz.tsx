import { useRef } from 'react';

import { useScrollScrub } from '../hooks/useScrollScrub';

const POCKET = 'M20,20 L180,20 L172,190 L100,226 L28,190 Z';
const arc = (dy: number) => `M36,${52 + dy} Q68,${118 + dy} 100,${84 + dy} Q132,${118 + dy} 164,${52 + dy}`;

/** 같은 뒷주머니를 1941년(스티치)과 1944년(페인트)으로 나란히 비교한다. */
export function WarPaintViz() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollScrub(ref, (tl, el) => {
    el.querySelectorAll<SVGPathElement>('.warpaint__draw').forEach((path, i) => {
      const length = path.getTotalLength();
      // 스티치는 이미 점선(dasharray)이라 opacity로 드러내고, 페인트만 획을 따라 그린다.
      if (path.classList.contains('is-paint')) {
        path.style.strokeDasharray = `${length}`;
        tl.fromTo(path, { strokeDashoffset: length }, { strokeDashoffset: 0, duration: 0.4 }, 0.45 + i * 0.05);
      } else {
        tl.from(path, { opacity: 0, duration: 0.3 }, i * 0.08);
      }
    });
    tl.from('.warpaint__arrow', { opacity: 0, x: -12, duration: 0.2 }, 0.3);
  });

  return (
    <div className="viz warpaint" ref={ref}>
      <div className="warpaint__panel">
        <svg viewBox="0 0 200 240" role="img" aria-label="1941년 뒷주머니: 실로 꿰맨 이중 곡선 아큐에이트">
          <path className="warpaint__pocket" d={POCKET} />
          <path className="warpaint__draw warpaint__stitch" d={arc(0)} />
          <path className="warpaint__draw warpaint__stitch" d={arc(10)} />
        </svg>
        <p className="warpaint__label">
          <span>1941</span> Thread
        </p>
      </div>
      <p className="warpaint__arrow" aria-hidden="true">
        →
      </p>
      <div className="warpaint__panel">
        <svg viewBox="0 0 200 240" role="img" aria-label="1944년 뒷주머니: 페인트로 그린 아큐에이트">
          <path className="warpaint__pocket" d={POCKET} />
          <path className="warpaint__draw warpaint__paint is-paint" d={arc(4)} />
        </svg>
        <p className="warpaint__label">
          <span>1944</span> Paint
        </p>
      </div>
    </div>
  );
}
