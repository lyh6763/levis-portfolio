import { useRef } from 'react';

import { useScrollScrub } from '../hooks/useScrollScrub';

// 라벨은 경로 선과 겹치지 않는 쪽에 둔다 (dx/dy는 점 기준 오프셋).
const STOPS = [
  { x: 820, y: 110, place: 'Buttenheim', note: '1829 출생', anchor: 'middle' as const, dx: 0, dy: 34 },
  { x: 560, y: 130, place: 'New York', note: '1847 이주', anchor: 'end' as const, dx: -16, dy: -14 },
  { x: 340, y: 300, place: 'Panama', note: '지협 횡단', anchor: 'middle' as const, dx: 0, dy: 36 },
  { x: 100, y: 140, place: 'San Francisco', note: '1853 도착', anchor: 'start' as const, dx: 16, dy: -10 },
];

/** 이동 경로 도식. 서쪽이 왼쪽. 스크롤에 따라 선이 그려지고 기착지가 차례로 나타난다. */
export function RouteViz() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollScrub(ref, (tl, el) => {
    const path = el.querySelector<SVGPathElement>('.route__path');
    if (!path) {
      return;
    }
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    tl.fromTo(path, { strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1 }, 0);
    el.querySelectorAll('.route__stop').forEach((stop, i) => {
      tl.from(stop, { opacity: 0, y: 8, duration: 0.12 }, i * 0.29);
    });
    tl.from('.route__legend', { opacity: 0, duration: 0.2 }, 0.2);
  });

  return (
    <div className="viz route" ref={ref}>
      <svg viewBox="0 0 900 380" role="img" aria-label="부텐하임에서 뉴욕, 파나마 지협을 거쳐 샌프란시스코에 이르는 경로 도식">
        <g className="route__grid" aria-hidden="true">
          {[150, 300, 450, 600, 750].map((x) => (
            <line key={x} x1={x} y1="20" x2={x} y2="360" />
          ))}
          {[100, 200, 300].map((y) => (
            <line key={y} x1="20" y1={y} x2="880" y2={y} />
          ))}
        </g>
        <text className="route__sea" x="700" y="240">
          ATLANTIC
        </text>
        <text className="route__sea" x="120" y="320">
          PACIFIC
        </text>
        <path
          className="route__path"
          d="M820,110 C750,40 640,60 560,130 C520,200 430,270 340,300 C250,320 130,250 100,140"
        />
        {STOPS.map((stop) => (
          <g className="route__stop" key={stop.place}>
            <circle cx={stop.x} cy={stop.y} r="7" />
            <text x={stop.x + stop.dx} y={stop.y + stop.dy} textAnchor={stop.anchor} className="route__place">
              {stop.place}
            </text>
            <text x={stop.x + stop.dx} y={stop.y + stop.dy + 18} textAnchor={stop.anchor} className="route__note">
              {stop.note}
            </text>
          </g>
        ))}
      </svg>
      <p className="route__legend">
        <span className="route__swatch" aria-hidden="true" /> 1847 대서양 횡단 · 1853 파나마 지협 경유
      </p>
    </div>
  );
}
