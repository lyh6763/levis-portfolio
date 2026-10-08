import { useRef } from 'react';

import { useScrollScrub } from '../hooks/useScrollScrub';

const CALLOUTS = [
  { n: '1', title: '힘이 몰리는 모서리', text: '연장과 광석을 넣은 주머니는 입구 모서리부터 찢어졌다.' },
  { n: '2', title: '구리 리벳', text: '말 담요에 쓰던 리벳으로 모서리를 관통해 고정한다.' },
  { n: '3', title: 'No. 139,121', text: '1873년 5월 20일 등록. 블루진의 생일.' },
];

/** 특허의 핵심 원리 도식. 주머니 모서리 확대 → 리벳 → 특허 번호 순으로 드러난다. */
export function PatentViz() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollScrub(ref, (tl) => {
    tl.from('.patent__stress', { opacity: 0, scale: 0.6, transformOrigin: 'center', duration: 0.25 }, 0)
      .from('.patent__rivet', { scale: 0, transformOrigin: 'center', stagger: 0.05, duration: 0.2 }, 0.25)
      .from('.patent__stamp', { opacity: 0, rotate: -8, transformOrigin: 'center', duration: 0.2 }, 0.6);
    tl.from('.patent__callout', { opacity: 0, x: 16, stagger: 0.25, duration: 0.2 }, 0.05);
  });

  return (
    <div className="viz patent" ref={ref}>
      <svg
        className="patent__svg"
        viewBox="0 0 480 420"
        role="img"
        aria-label="바지 앞주머니 모서리를 구리 리벳으로 고정한 구조 도식"
      >
        <defs>
          <pattern id="patent-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" />
          </pattern>
        </defs>
        <g className="patent__ink">
          <path d="M40,40 L440,40 L440,90 L40,90 Z" />
          <path className="patent__fabric" d="M40,90 L440,90 L440,400 L40,400 Z" />
          <path d="M190,90 Q170,220 40,270" />
          <path className="patent__seam" d="M202,90 Q182,232 40,284" />
          <path d="M70,90 L70,160 L140,160 L140,90" />
          <path className="patent__seam" d="M400,90 L400,316 Q400,356 440,362" />
        </g>
        <circle className="patent__stress" cx="46" cy="270" r="40" />
        <circle className="patent__stress" cx="190" cy="95" r="30" />
        <g>
          {[
            [46, 268],
            [189, 96],
            [72, 96],
            [138, 96],
          ].map(([cx, cy]) => (
            <g className="patent__rivet" key={`${cx}-${cy}`}>
              <circle cx={cx} cy={cy} r="9" />
              <circle className="patent__rivet-core" cx={cx} cy={cy} r="3.5" />
            </g>
          ))}
        </g>
        <g className="patent__labels" aria-hidden="true">
          <text x="96" y="318">1</text>
          <text x="214" y="122">2</text>
        </g>
        <g className="patent__stamp">
          <rect x="200" y="330" width="176" height="44" rx="2" />
          <text x="288" y="350" textAnchor="middle">
            PAT. No. 139,121
          </text>
          <text x="288" y="366" textAnchor="middle">
            MAY 20 1873
          </text>
        </g>
      </svg>
      <ol className="patent__callouts">
        {CALLOUTS.map((callout) => (
          <li className="patent__callout" key={callout.n}>
            <span className="patent__n">{callout.n}</span>
            <span>
              <strong>{callout.title}</strong>
              {callout.text}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
