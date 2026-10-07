import { CSSProperties, useState } from 'react';

const COLS = 20;
const ROWS = 12;
const CELL = 20;

// 3/1 우능직: 날실이 씨실 셋 위, 하나 아래. 행마다 한 칸씩 밀려 오른쪽 위로 오르는 사선이 생긴다.
const warpOnFace = (col: number, row: number) => (col + row) % 4 !== 0;

/** 데님 조직도. 뒷면은 좌우가 뒤집히고 날실·씨실이 반전되어 사선이 반대로 흐른다. */
export function LoomViz() {
  const [side, setSide] = useState<'face' | 'back'>('face');
  const isBack = side === 'back';

  const cells = [];
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const warpVisible = isBack ? !warpOnFace(COLS - 1 - col, row) : warpOnFace(col, row);
      cells.push(
        <rect
          key={`${col}-${row}`}
          className={warpVisible ? 'loom__warp' : 'loom__weft'}
          x={col * CELL + 1}
          y={row * CELL + 1}
          width={CELL - 2}
          height={CELL - 2}
          rx="3"
          style={{ '--i': col + row } as CSSProperties}
        />,
      );
    }
  }

  return (
    <div className={`viz loom${isBack ? ' is-back' : ''}`}>
      <div className="loom__toggle" role="group" aria-label="원단 면 선택">
        <button type="button" aria-pressed={!isBack} onClick={() => setSide('face')}>
          앞면 · Face
        </button>
        <button type="button" aria-pressed={isBack} onClick={() => setSide('back')}>
          뒷면 · Back
        </button>
      </div>

      <svg
        className="loom__weave"
        viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`}
        role="img"
        aria-label={
          isBack
            ? '데님 뒷면 조직도: 흰 씨실이 대부분 보이고 사선이 왼쪽 위로 흐른다'
            : '데님 앞면 조직도: 푸른 날실이 대부분 보이고 사선이 오른쪽 위로 흐른다'
        }
      >
        {cells}
      </svg>

      <div className="loom__legend" aria-hidden="true">
        <span>
          <i className="loom__key loom__key--warp" /> 날실 Warp (인디고)
        </span>
        <span>
          <i className="loom__key loom__key--weft" /> 씨실 Weft (흰색)
        </span>
      </div>

      <svg className="loom__widths" viewBox="0 0 420 132" role="img" aria-label="셔틀 직기 원단 폭 약 76cm, 현대 직기 원단 폭 약 150cm 이상 비교">
        <text className="loom__wlabel" x="0" y="14">
          Shuttle loom · ≈ 30in (76cm)
        </text>
        <rect className="loom__bolt" x="0" y="22" width="190" height="28" />
        <rect className="loom__selvedge" x="0" y="22" width="4" height="28" />
        <rect className="loom__selvedge" x="186" y="22" width="4" height="28" />

        <text className="loom__wlabel" x="0" y="84">
          Projectile loom · ≈ 60in+ (150cm+)
        </text>
        <rect className="loom__bolt" x="0" y="92" width="380" height="28" />
        <path className="loom__fray" d="M0,92 l-4,4 l4,4 l-4,4 l4,4 l-4,4 l4,4 l-4,4" />
        <path className="loom__fray" d="M380,92 l4,4 l-4,4 l4,4 l-4,4 l4,4 l-4,4 l4,4" />
      </svg>
    </div>
  );
}
