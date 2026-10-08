import { useId, useState } from 'react';

import { describeFeatures, featuresAt, JeanBack, RIVET_LABEL } from './JeanBack';

const MIN_YEAR = 1890;
const MAX_YEAR = 1971;

const EVENTS = [
  { year: 1890, text: 'Lot 501 번호가 붙다' },
  { year: 1901, text: '두 번째 뒷주머니' },
  { year: 1922, text: '벨트 고리 추가' },
  { year: 1936, text: '레드탭 등장' },
  { year: 1937, text: '뒷주머니 리벳이 안쪽으로, 멜빵 단추 제거' },
  { year: 1942, text: '전시 규격 (무렵): 신치·가랑이 리벳 제거, 아큐에이트를 페인트로' },
  { year: 1947, text: '아큐에이트 스티치 복귀' },
  { year: 1955, text: '가죽 패치 → 종이 패치 (무렵)' },
  { year: 1966, text: '숨은 리벳 → 바택 보강' },
  { year: 1971, text: '레드탭 빅 E → 스몰 e' },
];

/** 연도 슬라이더로 501 뒷면 디테일의 변천을 탐색한다. */
export function Lot501Viz() {
  const [year, setYear] = useState(1890);
  const f = featuresAt(year);
  const sliderId = useId();

  return (
    <div className="viz lot">
      <div className="lot__stage">
        <JeanBack year={year} className="lot__svg" />

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
        {`${year}년, ${describeFeatures(year).join(', ')}`}
      </p>
    </div>
  );
}
