import type { ReactElement } from 'react';

/**
 * 선택지마다의 선 그림. 표지 도식(CoverDrawing)과 같은 결로, 채움 없는 잉크 선에 구리 리벳과 빨간 탭만 색을 쓴다.
 * 없는 부품은 점선(draw__ghost)으로 자리만 그린다. 색과 선 굵기는 CSS 클래스(draw__*)로 준다.
 */
export function OptionDrawing({ clue, value }: { clue: string; value: string }) {
  const drawing = DRAWINGS[`${clue}:${value}`];
  if (!drawing) {
    return null;
  }
  return (
    <svg className="draw" viewBox="0 0 96 72" aria-hidden="true">
      {drawing}
    </svg>
  );
}

export const hasOptionDrawing = (clue: string, value: string) => `${clue}:${value}` in DRAWINGS;

/* 뒷주머니 */
const POCKET = <path className="draw__ink" d="M22,8 L74,8 L72,50 L48,64 L24,50 Z" />;
const TAB_SPOT = { x: 17, y: 24, width: 9, height: 18 };
const CORNERS: [number, number][] = [
  [26, 12],
  [70, 12],
];

/* 앞판 가랑이와 앞섶 박음질 */
const FRONT = (
  <>
    <path className="draw__ink" d="M14,6 L82,6 L84,68 L56,68 L48,34 L40,68 L12,68 Z" />
    <path className="draw__stitch" d="M55,6 L55,26 Q55,32 48,34" />
  </>
);

/* 뒤 허리띠와 뒷주머니 윗선 */
const BACK_WAIST = (
  <>
    <rect className="draw__ink" x="8" y="8" width="80" height="12" />
    <path className="draw__ink" d="M8,20 L8,68 M88,20 L88,68 M14,50 L40,50 M56,50 L82,50" />
  </>
);
const CINCH = (
  <>
    <rect x="26" y="25" width="18" height="7" />
    <rect x="52" y="25" width="18" height="7" />
    <rect x="43" y="22" width="10" height="13" rx="1.5" />
  </>
);

/* 원단 안쪽의 능직 사선. (x0, 64)에서 (x0 + 22, 8)로 오르는 선을 x 8..right 안으로 자른다. */
function twill(right: number) {
  const y = (x0: number, x: number) => (64 - ((x - x0) / 22) * 56).toFixed(1);
  const lines: string[] = [];
  for (let x0 = -16; x0 < right; x0 += 8) {
    const from = Math.max(x0, 8);
    const to = Math.min(x0 + 22, right);
    if (to > from) {
      lines.push(`M${from},${y(x0, from)} L${to},${y(x0, to)}`);
    }
  }
  return <path className="draw__twill" d={lines.join(' ')} />;
}

/* 허리 안쪽 */
const INNER_WAIST = <path className="draw__ink" d="M6,8 L90,8 L90,20 L6,20 Z M6,20 L6,68 M90,20 L90,68" />;
const LABEL = { x: 36, y: 26, width: 26, height: 36 };

const DRAWINGS: Record<string, ReactElement> = {
  'tab:none': (
    <>
      {POCKET}
      <rect className="draw__ghost" {...TAB_SPOT} />
    </>
  ),
  'tab:bigE': (
    <>
      {POCKET}
      <rect className="draw__red" {...TAB_SPOT} />
      <text className="draw__tab-letter" x="21.5" y="37" textAnchor="middle">
        E
      </text>
    </>
  ),
  'tab:smallE': (
    <>
      {POCKET}
      <rect className="draw__red" {...TAB_SPOT} />
      <text className="draw__tab-letter" x="21.5" y="36" textAnchor="middle">
        e
      </text>
    </>
  ),

  'rivet:exposed': (
    <>
      {POCKET}
      {CORNERS.map(([cx, cy]) => (
        <circle key={cx} className="draw__copper" cx={cx} cy={cy} r="3.5" />
      ))}
    </>
  ),
  'rivet:hidden': (
    <>
      {POCKET}
      {CORNERS.map(([cx, cy]) => (
        <circle key={cx} className="draw__ghost" cx={cx} cy={cy} r="3.5" />
      ))}
    </>
  ),
  'rivet:bartack': (
    <>
      {POCKET}
      <path className="draw__bartack" d="M22,14 L30,9 M66,9 L74,14" />
    </>
  ),

  'crotch:yes': (
    <>
      {FRONT}
      <circle className="draw__copper" cx="48" cy="35" r="3.5" />
    </>
  ),
  'crotch:no': (
    <>
      {FRONT}
      <circle className="draw__ghost" cx="48" cy="35" r="3.5" />
    </>
  ),

  'cinch:yes': (
    <>
      {BACK_WAIST}
      <g className="draw__ink">{CINCH}</g>
    </>
  ),
  'cinch:no': (
    <>
      {BACK_WAIST}
      <g className="draw__ghost">{CINCH}</g>
    </>
  ),

  'patch:leather': (
    <>
      <rect className="draw__ink" x="12" y="10" width="72" height="52" rx="3" />
      <rect className="draw__stitch" x="17" y="15" width="62" height="42" rx="2" />
      <path className="draw__grain" d="M24,26 q6,-3 12,0 M50,22 q5,3 10,0 M28,44 q7,3 13,-1 M56,40 q6,-3 12,1 M40,34 q4,2 8,0" />
    </>
  ),
  'patch:paper': (
    <>
      <path className="draw__ink" d="M12,10 L72,10 L84,22 L84,62 L12,62 Z M72,10 L72,22 L84,22" />
      <path className="draw__ink-thin" d="M22,32 L62,32 M22,40 L74,40 M22,48 L54,48" />
    </>
  ),

  'arcuate:stitched': (
    <>
      {POCKET}
      <path className="draw__stitch" d="M28,18 Q38,36 48,26 Q58,36 68,18 M28,24 Q38,42 48,32 Q58,42 68,24" />
    </>
  ),
  'arcuate:painted': (
    <>
      {POCKET}
      <path className="draw__paint" d="M28,20 Q38,38 48,28 Q58,38 68,20" />
    </>
  ),

  'selvedge:selvedge': (
    <>
      {twill(70)}
      <rect className="draw__weft" x="70" y="8" width="16" height="56" />
      <path className="draw__red-line" d="M79,8 L79,64" />
      <path className="draw__ink" d="M8,8 L86,8 M8,64 L86,64 M86,8 L86,64" />
    </>
  ),
  'selvedge:overlock': (
    <>
      {twill(72)}
      <path className="draw__ink" d="M8,8 L78,8 M8,64 L78,64" />
      <path
        className="draw__overlock"
        d={'M72,8 ' + Array.from({ length: 14 }, (_, i) => `L${i % 2 ? 72 : 84},${12 + i * 4}`).join(' ')}
      />
    </>
  ),

  'label:none': (
    <>
      {INNER_WAIST}
      <rect className="draw__ghost" {...LABEL} />
    </>
  ),
  'label:yes': (
    <>
      {INNER_WAIST}
      <rect className="draw__ink" {...LABEL} />
      {/* 세탁 기호: 빨래통, 다림질, 표백 금지 */}
      <path className="draw__ink-thin" d="M40,32 L42,40 L56,40 L58,32 M41,35 q2.5,-2 5,0 q2.5,2 5,0 q2.5,-2 5,0" />
      <path className="draw__ink-thin" d="M41,54 L57,54 L55,48 L45,48 Q41,48 41,54 Z M44,58 L54,58" />
    </>
  ),
};
