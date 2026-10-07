import { useId, useState } from 'react';

const MIN_YEAR = 1890;
const MAX_YEAR = 1971;

const EVENTS = [
  { year: 1890, text: 'Lot 501 번호가 붙다' },
  { year: 1901, text: '두 번째 뒷주머니' },
  { year: 1922, text: '벨트 고리 추가' },
  { year: 1936, text: '레드탭 등장' },
  { year: 1937, text: '뒷주머니 리벳이 안쪽으로, 멜빵 단추 제거' },
  { year: 1941, text: '가랑이 리벳 제거' },
  { year: 1942, text: '신치 제거, 아큐에이트를 페인트로' },
  { year: 1947, text: '아큐에이트 스티치 복귀' },
  { year: 1955, text: '가죽 패치 → 종이 패치' },
  { year: 1966, text: '숨은 리벳 → 바택 보강' },
  { year: 1971, text: '레드탭 빅 E → 스몰 e' },
];

type RivetStyle = 'exposed' | 'hidden' | 'bartack';

function featuresAt(year: number) {
  const rivets: RivetStyle = year < 1937 ? 'exposed' : year < 1966 ? 'hidden' : 'bartack';
  return {
    secondPocket: year >= 1901,
    beltLoops: year >= 1922,
    suspenderButtons: year < 1937,
    cinch: year < 1942,
    crotchRivet: year < 1941,
    redTab: year >= 1936 ? (year >= 1971 ? "Levi's" : "LEVI'S") : null,
    rivets,
    paintedArcuate: year >= 1942 && year < 1947,
    paperPatch: year >= 1955,
  };
}

const RIVET_LABEL: Record<RivetStyle, string> = {
  exposed: '드러난 리벳',
  hidden: '숨은 리벳',
  bartack: '바택',
};

function describe(year: number) {
  const f = featuresAt(year);
  return [
    `${year}년`,
    f.secondPocket ? '뒷주머니 둘' : '뒷주머니 하나',
    f.beltLoops ? '벨트 고리' : null,
    f.suspenderButtons ? '멜빵 단추' : null,
    f.cinch ? '신치' : null,
    f.crotchRivet ? '가랑이 리벳' : null,
    f.redTab ? `레드탭 ${f.redTab}` : null,
    RIVET_LABEL[f.rivets],
    f.paintedArcuate ? '페인트 아큐에이트' : '스티치 아큐에이트',
    f.paperPatch ? '종이 패치' : '가죽 패치',
  ]
    .filter(Boolean)
    .join(', ');
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

/** 연도 슬라이더로 501 뒷면 디테일의 변천을 탐색한다. */
export function Lot501Viz() {
  const [year, setYear] = useState(1890);
  const f = featuresAt(year);
  const sliderId = useId();
  const pockets = f.secondPocket ? [POCKETS.right, POCKETS.left] : [POCKETS.right];

  return (
    <div className="viz lot">
      <div className="lot__stage">
        <svg className="lot__svg" viewBox="0 0 400 540" aria-hidden="true">
          <path className="lot__body" d="M72,76 L60,520 L186,520 L200,250 L214,520 L340,520 L328,76 Z" />
          <path className="lot__seam" d="M72,118 L200,150 L328,118 M200,150 L200,250" />
          <rect className="lot__waist" x="70" y="40" width="260" height="36" rx="2" />
          <line className="lot__seam" x1="74" y1="70" x2="326" y2="70" />

          {f.beltLoops &&
            [88, 150, 196, 246, 304].map((x) => <rect key={x} className="lot__loop" x={x} y="34" width="9" height="46" rx="1" />)}
          {f.suspenderButtons &&
            [150, 250].map((x) => <circle key={x} className="lot__button" cx={x} cy="58" r="6" />)}
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

        <div className="lot__readout">
          <p className="lot__year" aria-hidden="true">
            {year}
          </p>
          <dl className="lot__specs">
            <div>
              <dt>Red Tab</dt>
              <dd>{f.redTab ? <span className="lot__tabtext">{f.redTab}</span> : '—'}</dd>
            </div>
            <div>
              <dt>Back rivets</dt>
              <dd>{RIVET_LABEL[f.rivets]}</dd>
            </div>
            <div>
              <dt>Arcuate</dt>
              <dd>{f.paintedArcuate ? '페인트' : '스티치'}</dd>
            </div>
            <div>
              <dt>Patch</dt>
              <dd>{f.paperPatch ? '종이' : '가죽'}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="lot__control">
        <label className="lot__label" htmlFor={sliderId}>
          연도
        </label>
        <input
          id={sliderId}
          className="lot__range"
          type="range"
          min={MIN_YEAR}
          max={MAX_YEAR}
          step={1}
          value={year}
          aria-valuetext={`${year}년`}
          onChange={(event) => setYear(Number(event.target.value))}
        />
        <div className="lot__ticks" aria-hidden="true">
          <span>{MIN_YEAR}</span>
          <span>{MAX_YEAR}</span>
        </div>
      </div>

      <ol className="lot__events">
        {EVENTS.map((event) => (
          <li key={event.year}>
            <button
              type="button"
              className={`lot__event${event.year <= year ? ' is-past' : ''}${event.year === year ? ' is-current' : ''}`}
              aria-pressed={event.year === year}
              onClick={() => setYear(event.year)}
            >
              <span className="lot__event-year">{event.year}</span>
              {event.text}
            </button>
          </li>
        ))}
      </ol>

      <p className="visually-hidden" aria-live="polite">
        {describe(year)}
      </p>
    </div>
  );
}
