import { useLayoutEffect, useRef } from 'react';

import { useScrollScrub } from '../hooks/useScrollScrub';

// 분해 시 각 부품 그룹의 이동량 (viewBox 680x470 기준)
const PARTS = [
  { id: 'anBody', dx: 0, dy: 70 },
  { id: 'anWaist', dx: 0, dy: -72 },
  { id: 'anPatch', dx: 125, dy: 14 },
  { id: 'anPocketL', dx: -156, dy: 186 },
  { id: 'anPocketR', dx: 150, dy: 44 },
  { id: 'anArc', dx: 128, dy: -90 },
  { id: 'anTab', dx: 186, dy: 106 },
  { id: 'anRivets', dx: 160, dy: 196 },
];

const LEGEND = [
  { swatch: 'denim', text: 'XX 데님 · 1873' },
  { swatch: 'stitch', text: '아큐에이트 스티치 · 1873' },
  { swatch: 'rivet', text: '구리 리벳 · 1873' },
  { swatch: 'patch', text: '투 호스 패치 · 1886' },
  { swatch: 'denim', text: '두 번째 뒷주머니 · 1901' },
  { swatch: 'denim', text: '벨트 고리 · 1922' },
  { swatch: 'tab', text: '레드탭 · 1936' },
];

const isNarrow = () => window.matchMedia('(max-width: 900px)').matches;

/** 501 분해도. 스티키 무대 위에서 스크롤 진행에 따라 부품이 흩어지고 연도 라벨이 붙는다. */
export function AnatomyViz() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const el = ref.current;
    PARTS.forEach((part) => {
      el?.querySelector(`#${part.id}`)?.setAttribute('transform', `translate(${part.dx},${part.dy})`);
    });
  }, []);

  useScrollScrub(
    ref,
    (tl) => {
      tl.from('.anatomy__grid', { opacity: 0, duration: 0.15 }, 0);
      PARTS.forEach((part) => {
        tl.to(`#${part.id}`, { x: part.dx, y: part.dy, ease: 'power1.out', duration: 0.6 }, 0.12);
      });
      tl.from('.anatomy__labels', { opacity: 0, duration: 0.2 }, 0.7);
      tl.to({}, { duration: 0.1 });
    },
    // 데스크톱은 스티키 무대 전체 구간을, 좁은 화면(스티키 없음)은 화면을 지나가는 구간을 쓴다.
    isNarrow() ? { start: 'top 70%', end: 'bottom 70%' } : { start: 'top top', end: 'bottom bottom' },
  );

  return (
    <div className="viz anatomy" ref={ref}>
      <div className="anatomy__sticky">
        <svg className="anatomy__svg" viewBox="0 0 680 470" role="img" aria-label="501 청바지를 부품별로 분해한 도식">
          <g className="anatomy__grid" aria-hidden="true">
            {[120, 240, 360, 480, 600].map((gx) => (
              <line key={gx} x1={gx} y1="0" x2={gx} y2="470" />
            ))}
            {[120, 240, 360].map((gy) => (
              <line key={gy} x1="0" y1={gy} x2="680" y2={gy} />
            ))}
          </g>

          <g className="anatomy__labels" aria-hidden="true">
            <text x="300" y="40">Waistband + belt loops · 1922</text>
            <text x="540" y="60">Arcuate · 1873</text>
            <text x="556" y="116">Two Horse patch · 1886</text>
            <text x="556" y="196">Back pocket</text>
            <text className="is-red" x="556" y="258">
              Red Tab · 1936
            </text>
            <text x="520" y="342">Copper rivet · 1873</text>
            <text x="150" y="338">Second pocket · 1901</text>
            <text x="320" y="456">XX denim · 1873</text>
          </g>

          <g id="anBody">
            <path className="anatomy__denim" d="M322,120 L312,162 L300,432 L372,432 L399,250 L426,432 L498,432 L486,162 L478,120 Z" />
            <line className="anatomy__stitch" x1="399" y1="126" x2="399" y2="250" />
          </g>
          <g id="anWaist">
            <rect className="anatomy__denim-2" x="320" y="92" width="160" height="30" rx="3" />
            {[330, 372, 420, 462].map((lx) => (
              <rect key={lx} className="anatomy__denim-2" x={lx} y="84" width="7" height="12" rx="1" />
            ))}
            <line className="anatomy__stitch" x1="324" y1="116" x2="476" y2="116" />
          </g>
          <g id="anPatch">
            <rect className="anatomy__patch" x="440" y="86" width="36" height="24" rx="2" />
          </g>
          <g id="anPocketL">
            <path className="anatomy__denim-2" d="M334,132 L386,132 L386,166 L360,184 L334,166 Z" />
          </g>
          <g id="anPocketR">
            <path className="anatomy__denim-2" d="M414,132 L466,132 L466,166 L440,184 L414,166 Z" />
          </g>
          <g id="anArc" className="anatomy__arc">
            <path d="M337,141 Q360,164 383,141" />
            <path d="M337,149 Q360,172 383,149" />
            <path d="M417,141 Q440,164 463,141" />
            <path d="M417,149 Q440,172 463,149" />
          </g>
          <g id="anTab">
            <rect className="anatomy__tab" x="410" y="140" width="6" height="17" rx="1" />
          </g>
          <g id="anRivets">
            {[
              [334, 132],
              [386, 132],
              [414, 132],
              [466, 132],
              [312, 160],
              [486, 160],
            ].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} className="anatomy__rivet" cx={cx} cy={cy} r="3.4" />
            ))}
          </g>
        </svg>

        <ul className="anatomy__legend">
          {LEGEND.map((item) => (
            <li key={item.text}>
              <span className={`anatomy__dot anatomy__dot--${item.swatch}`} aria-hidden="true" />
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
