import { useRef } from 'react';

import { useScrollScrub } from '../hooks/useScrollScrub';

const START = 1870;
const END = 1990;
const LEFT = 150;
const RIGHT = 880;
const ROW_H = 58;
const TOP = 46;

const x = (year: number) => LEFT + ((year - START) / (END - START)) * (RIGHT - LEFT);

// year는 점의 위치, label은 표기. 연대만 알 수 있는 계기는 '1930s'처럼 연대로 적는다.
const ROWS = [
  { region: '미국 서부', from: 1873, marks: [{ year: 1873, label: '1873 작업복' }] },
  { region: '미국 동부', from: 1932, marks: [{ year: 1932, label: '1930s 관광 목장' }] },
  { region: '서유럽', from: 1944, marks: [{ year: 1944, label: '1940s 미군 병사' }] },
  { region: '일본 · 아시아', from: 1946, marks: [{ year: 1946, label: '1940s 미군 주둔' }] },
  {
    region: '소련 · 동유럽',
    from: 1959,
    marks: [
      { year: 1959, label: '1959 박람회' },
      { year: 1975, label: '1970s 암시장' },
    ],
  },
];

const DECADES = Array.from({ length: (END - START) / 10 + 1 }, (_, i) => START + i * 10);

/** 지역별 확산 타임라인. 막대는 '일상복으로 퍼지기 시작한 시점'부터 오른쪽으로 자란다. */
export function SpreadViz() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollScrub(ref, (tl) => {
    tl.from('.spread__bar', { scaleX: 0, transformOrigin: 'left center', stagger: 0.12, duration: 0.5 }, 0);
    tl.from('.spread__mark', { opacity: 0, y: 6, stagger: 0.1, duration: 0.15 }, 0.15);
  });

  const height = TOP + ROWS.length * ROW_H + 10;

  return (
    <div className="viz spread" ref={ref}>
      <div className="spread__scroller">
        <svg viewBox={`0 0 900 ${height}`} role="img" aria-labelledby="spread-desc">
          <desc id="spread-desc">
            {ROWS.map((row) => `${row.region}: ${row.marks.map((m) => m.label).join(', ')}`).join('. ')}
          </desc>
          {DECADES.map((decade) => (
            <g key={decade} className="spread__axis">
              <line x1={x(decade)} y1={TOP - 14} x2={x(decade)} y2={height - 6} />
              <text x={x(decade)} y={TOP - 22} textAnchor="middle">
                {decade}
              </text>
            </g>
          ))}
          {ROWS.map((row, i) => {
            const cy = TOP + i * ROW_H + ROW_H / 2;
            return (
              <g key={row.region}>
                <text className="spread__region" x={0} y={cy + 5}>
                  {row.region}
                </text>
                <rect className="spread__bar" x={x(row.from)} y={cy - 7} width={RIGHT - x(row.from)} height="14" rx="2" />
                {row.marks.map((mark) => (
                  <g key={mark.year} className="spread__mark">
                    <circle cx={x(mark.year)} cy={cy} r="6" />
                    <text x={x(mark.year)} y={cy - 14} textAnchor="middle">
                      {mark.label}
                    </text>
                  </g>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
