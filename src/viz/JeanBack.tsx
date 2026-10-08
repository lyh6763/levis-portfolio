/**
 * 연도별 501 뒷면 도식. 03장 연도 슬라이더와 Heritage Line 상품 도식이 함께 쓴다.
 * 연도 경계는 lsco-coverup2017, lsco-beltloops2022, lsco-ww2, lsco-501 기준.
 * 전시 규격(신치·가랑이 리벳 제거, 페인트 아큐에이트)은 자료마다 1941~1944년으로 엇갈려 1942년으로 대표한다.
 */

export type RivetStyle = 'exposed' | 'hidden' | 'bartack';

export function featuresAt(year: number) {
  const rivets: RivetStyle = year < 1937 ? 'exposed' : year < 1966 ? 'hidden' : 'bartack';
  return {
    secondPocket: year >= 1901,
    beltLoops: year >= 1922,
    suspenderButtons: year < 1937,
    cinch: year < 1942,
    crotchRivet: year < 1942,
    redTab: year >= 1936 ? (year >= 1971 ? "Levi's" : "LEVI'S") : null,
    rivets,
    paintedArcuate: year >= 1942 && year < 1947,
    paperPatch: year >= 1955,
  };
}

export const RIVET_LABEL: Record<RivetStyle, string> = {
  exposed: '드러난 리벳',
  hidden: '숨은 리벳',
  bartack: '바택',
};

/** 사람이 읽는 디테일 목록. 상품 상세의 '이 해의 디테일'과 슬라이더 요약에 쓴다. */
export function describeFeatures(year: number): string[] {
  const f = featuresAt(year);
  return [
    f.secondPocket ? '뒷주머니 둘' : '뒷주머니 하나',
    f.beltLoops ? '벨트 고리' : null,
    f.suspenderButtons ? '멜빵 단추' : null,
    f.cinch ? '허리 뒤 신치' : null,
    f.crotchRivet ? '가랑이 리벳' : null,
    f.redTab ? `레드탭 ${f.redTab}` : '레드탭 없음',
    RIVET_LABEL[f.rivets],
    f.paintedArcuate ? '페인트 아큐에이트' : '스티치 아큐에이트',
    f.paperPatch ? '종이 패치' : '가죽 패치',
  ].filter((item): item is string => Boolean(item));
}

const POCKETS = {
  right: { d: 'M222,160 L310,160 L306,250 L266,272 L226,250 Z', rivets: [[224, 162], [308, 162]], arcX: 230 },
  left: { d: 'M178,160 L90,160 L94,250 L134,272 L174,250 Z', rivets: [[92, 162], [176, 162]], arcX: 98 },
};

function Arcuate({ x, painted }: { x: number; painted: boolean }) {
  const arc = (dy: number) => `M${x},${176 + dy} Q${x + 18},${212 + dy} ${x + 36},${194 + dy} Q${x + 54},${212 + dy} ${x + 72},${176 + dy}`;
  return (
    <g className={`lot__arc${painted ? ' is-painted' : ''}`}>
      <path d={arc(0)} />
      {!painted && <path d={arc(8)} />}
    </g>
  );
}

function Rivet({ x, y, style }: { x: number; y: number; style: RivetStyle }) {
  if (style === 'bartack') {
    return <line className="lot__bartack" x1={x - 5} y1={y + 2} x2={x + 5} y2={y + 2} />;
  }
  return <circle className={`lot__rivet lot__rivet--${style}`} cx={x} cy={y} r="4.2" />;
}

type JeanBackProps = {
  year: number;
  className?: string;
  /** 장식용이면 생략(aria-hidden). 의미가 있으면 대체 텍스트를 준다. */
  label?: string;
};

export function JeanBack({ year, className = '', label }: JeanBackProps) {
  const f = featuresAt(year);
  const pockets = f.secondPocket ? [POCKETS.right, POCKETS.left] : [POCKETS.right];
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true };

  return (
    <svg className={`jean-back ${className}`} viewBox="0 0 400 540" {...a11y}>
      <path className="lot__body" d="M72,76 L60,520 L186,520 L200,250 L214,520 L340,520 L328,76 Z" />
      <path className="lot__seam" d="M72,118 L200,150 L328,118 M200,150 L200,250" />
      <rect className="lot__waist" x="70" y="40" width="260" height="36" rx="2" />
      <line className="lot__seam" x1="74" y1="70" x2="326" y2="70" />

      {f.beltLoops &&
        [88, 150, 196, 246, 304].map((x) => <rect key={x} className="lot__loop" x={x} y="34" width="9" height="46" rx="1" />)}
      {f.suspenderButtons && [150, 250].map((x) => <circle key={x} className="lot__button" cx={x} cy="58" r="6" />)}
      {f.cinch && (
        <g className="lot__cinch">
          <rect x="116" y="84" width="84" height="14" rx="1" />
          <rect className="lot__buckle" x="182" y="80" width="20" height="22" rx="2" />
        </g>
      )}

      <rect className={`lot__patch${f.paperPatch ? ' is-paper' : ''}`} x="268" y="46" width="52" height="26" rx="1" />

      {pockets.map((pocket) => (
        <g key={pocket.d}>
          <path className="lot__pocket" d={pocket.d} />
          <Arcuate x={pocket.arcX} painted={f.paintedArcuate} />
          {pocket.rivets.map(([x, y]) => (
            <Rivet key={x} x={x} y={y} style={f.rivets} />
          ))}
        </g>
      ))}

      {f.redTab && <rect className="lot__tab" x="222" y="196" width="7" height="18" rx="1" />}
      {f.crotchRivet && <circle className="lot__rivet lot__rivet--exposed" cx="200" cy="252" r="4.2" />}
    </svg>
  );
}
