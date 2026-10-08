import { CSSProperties, useCallback, useId, useRef, useState } from 'react';

import { useScrollScrub } from '../hooks/useScrollScrub';

const MAX_DIPS = 8;
const CORE_R = 58;

// 담금 횟수에 따른 인디고 농도: 옅은 청 → 원단색(indigo-900)
const DIP_COLORS = ['#7d93b8', '#6a82ab', '#58719d', '#47608e', '#3a527f', '#2e4470', '#22355c', '#12213d'];

/** 링 염색 도식: 스크롤로 염색 횟수가 늘고, 슬라이더로 겉층을 마모시킨다. */
export function IndigoViz() {
  const ref = useRef<HTMLDivElement>(null);
  const [dips, setDips] = useState(1);
  const [wear, setWear] = useState(0);
  const wearId = useId();

  const onProgress = useCallback((progress: number) => {
    setDips(Math.min(MAX_DIPS, 1 + Math.floor(progress * MAX_DIPS)));
  }, []);
  useScrollScrub(ref, () => {}, { start: 'top 80%', end: 'center 45%', onProgress });

  const color = DIP_COLORS[dips - 1];
  const ringFull = 10 + dips * 2.2;
  const ring = ringFull * (1 - wear / 100);
  // 원단 견본: 마모될수록 흰 심이 섞여 밝아진다.
  const swatchMix = Math.round(wear * 0.75);

  return (
    <div className="viz indigo" ref={ref}>
      <div className="indigo__panel">
        <svg viewBox="0 0 220 220" role="img" aria-label={`실 단면: 염색 ${dips}회, 마모 ${wear}%`}>
          {/* key를 바꿔 담글 때마다 초록 → 파랑 산화 애니메이션을 다시 재생한다. */}
          <circle
            key={dips}
            className="indigo__ring"
            cx="110"
            cy="110"
            r={CORE_R + ring}
            style={{ '--ring': color } as CSSProperties}
          />
          <circle className="indigo__core" cx="110" cy="110" r={CORE_R} />
          <g className="indigo__fibers" aria-hidden="true">
            {[-30, -10, 10, 30].map((dx) =>
              [-30, -10, 10, 30].map((dy) =>
                Math.hypot(dx, dy) < 44 ? <circle key={`${dx}${dy}`} cx={110 + dx} cy={110 + dy} r="7" /> : null,
              ),
            )}
          </g>
        </svg>
        <p className="indigo__label">Cross-section</p>
      </div>

      <div className="indigo__panel indigo__panel--data">
        <p className="indigo__dips">
          <span className="indigo__big">{dips}</span>
          <span className="indigo__unit">/ {MAX_DIPS} dips</span>
        </p>
        <p className="indigo__hint">담글 때마다 초록에서 파랑으로 산화하며 색이 깊어집니다.</p>

        <div
          className="indigo__swatch"
          style={{ background: `color-mix(in srgb, ${color}, #f3ead7 ${swatchMix}%)` }}
          aria-hidden="true"
        />
        <label className="indigo__wear-label" htmlFor={wearId}>
          마모 <output htmlFor={wearId}>{wear}%</output>
        </label>
        <input
          id={wearId}
          className="indigo__range"
          type="range"
          min={0}
          max={100}
          step={1}
          value={wear}
          aria-valuetext={`마모 ${wear}%`}
          onChange={(event) => setWear(Number(event.target.value))}
        />
      </div>
    </div>
  );
}
