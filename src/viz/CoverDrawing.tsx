import { CSSProperties } from 'react';

const RIVETS: [number, number][] = [
  [104, 84],
  [150, 150],
  [296, 84],
  [250, 150],
  [258, 90],
  [292, 90],
];

const delay = (seconds: number) => ({ '--d': `${seconds}s` }) as CSSProperties;

/**
 * 표지의 특허 도면풍 라인 드로잉. pathLength=1로 정규화해 CSS만으로 순서대로 그린다.
 * 원본 특허 도면의 복제가 아니라 501 정면을 단순화한 자체 도식이다.
 */
export function CoverDrawing() {
  return (
    <svg className="cover-drawing" viewBox="0 0 400 600" aria-hidden="true">
      <g className="cover-drawing__ink">
        <rect x="90" y="40" width="220" height="34" rx="2" pathLength={1} style={delay(0.1)} />
        <path d="M92,74 L80,540 L188,540 L200,262 L212,540 L320,540 L308,74" pathLength={1} style={delay(0.35)} />
        <path d="M214,74 L214,222 Q214,250 200,258" pathLength={1} style={delay(0.9)} />
        <path d="M100,80 Q142,92 152,152" pathLength={1} style={delay(1.05)} />
        <path d="M300,80 Q258,92 248,152" pathLength={1} style={delay(1.15)} />
        <rect x="258" y="90" width="34" height="40" pathLength={1} style={delay(1.3)} />
        {[112, 160, 240, 288].map((x, i) => (
          <rect key={x} x={x} y="34" width="9" height="46" rx="1" pathLength={1} style={delay(1.4 + i * 0.06)} />
        ))}
        <circle cx="200" cy="57" r="7" pathLength={1} style={delay(1.6)} />
      </g>

      <g className="cover-drawing__rivets">
        {RIVETS.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4.5" style={delay(1.9 + i * 0.08)} />
        ))}
      </g>

      <g className="cover-drawing__notes" style={delay(2.5)}>
        <line x1="296" y1="84" x2="356" y2="30" />
        <text x="360" y="26">A</text>
        <line x1="150" y1="150" x2="40" y2="210" />
        <text x="22" y="216">A</text>
        <text className="cover-drawing__fig" x="200" y="584" textAnchor="middle">
          FIG. 1 — No. 139,121 · MAY 20, 1873
        </text>
      </g>
    </svg>
  );
}
