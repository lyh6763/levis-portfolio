import { useCallback, useRef } from 'react';

import { useScrollScrub } from '../hooks/useScrollScrub';

const TOTAL = 3781;
// 2015 LCA: 목화 재배 68%, 소비자 사용(세탁) 23%, 나머지 공정 9%
const SEGMENTS = [
  { key: 'cotton', label: '목화 재배', share: 68 },
  { key: 'care', label: '소비자 세탁', share: 23 },
  { key: 'other', label: '원단 · 봉제 · 기타', share: 9 },
];

const liters = (share: number) => Math.round((TOTAL * share) / 100).toLocaleString('ko-KR');

/** 501 한 벌의 생애 물 사용량. 숫자가 올라가고 구성 막대가 차례로 채워진다. */
export function WaterViz() {
  const ref = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  const onProgress = useCallback((progress: number) => {
    if (numberRef.current) {
      const value = Math.round(TOTAL * Math.min(progress / 0.5, 1));
      numberRef.current.textContent = value.toLocaleString('ko-KR');
    }
  }, []);

  useScrollScrub(
    ref,
    (tl) => {
      tl.from('.water__seg', { scaleX: 0, transformOrigin: 'left center', stagger: 0.18, duration: 0.3 }, 0.3);
      tl.from('.water__row', { opacity: 0, stagger: 0.18, duration: 0.2 }, 0.35);
    },
    { onProgress },
  );

  return (
    <div className="viz water" ref={ref}>
      <p className="water__total">
        <span ref={numberRef} className="water__number">
          {TOTAL.toLocaleString('ko-KR')}
        </span>
        <span className="water__unit">L</span>
      </p>
      <div className="water__bar" aria-hidden="true">
        {SEGMENTS.map((seg) => (
          <span key={seg.key} className={`water__seg water__seg--${seg.key}`} style={{ flexBasis: `${seg.share}%` }} />
        ))}
      </div>
      <dl className="water__rows">
        {SEGMENTS.map((seg) => (
          <div key={seg.key} className="water__row">
            <dt>
              <span className={`water__dot water__seg--${seg.key}`} aria-hidden="true" />
              {seg.label}
            </dt>
            <dd>
              {seg.share}% · 약 {liters(seg.share)}L
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
