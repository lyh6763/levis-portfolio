import type { ReactElement } from 'react';

/**
 * 장 첫 화면의 도판. 그 장 도식의 한 조각을 표지 도식(CoverDrawing)과 같은 결로 그린다:
 * 인디고 바탕 위 채움 없는 생지색 선, 구리 리벳, 금색 스티치. 색과 선은 CSS 클래스(plate__*)로 준다.
 * 그림 안의 짧은 이름표(SVG 글자)는 도식 주석이라 13px 하한의 예외다. 그림이 말하는 내용은 캡션에 글로 적는다.
 */
export function ChapterPlate({ slug }: { slug: string }) {
  const plate = PLATES[slug];
  if (!plate) {
    return null;
  }
  return (
    <figure className="opener__plate">
      <svg className="plate" viewBox="0 0 320 200" aria-hidden="true">
        {plate.drawing}
      </svg>
      <figcaption className="opener__plate-cap">{plate.caption}</figcaption>
    </figure>
  );
}

export const hasChapterPlate = (slug: string) => slug in PLATES;

type Plate = { caption: string; drawing: ReactElement };

/* 원단 끝에서 되돌아오는 씨실 한 줄기 (06장) */
function weftPath() {
  const rows = [36, 56, 76, 96, 116, 136, 156];
  let d = `M24,${rows[0]}`;
  rows.forEach((y, i) => {
    const toRight = i % 2 === 0;
    d += ` L${toRight ? 276 : 44},${y}`;
    if (i < rows.length - 1) {
      d += toRight ? ` A10,10 0 0 1 276,${y + 20}` : ` A10,10 0 0 0 44,${y + 20}`;
    }
  });
  return d;
}

const PLATES: Record<string, Plate> = {
  'gold-and-canvas': {
    caption: '도식: 뉴욕(1847)에서 배로 파나마 지협을 건너 샌프란시스코(1853)까지',
    drawing: (
      <>
        <path className="plate__dash" d="M276,46 C306,100 252,152 188,160" />
        <path className="plate__ink" d="M188,160 L164,166 M188,152 L188,168 M164,158 L164,174" />
        <path className="plate__dash" d="M164,166 C96,172 32,122 44,58" />
        <circle className="plate__node" cx="276" cy="44" r="4.5" />
        <circle className="plate__node" cx="44" cy="56" r="4.5" />
        <text className="plate__label" x="300" y="28" textAnchor="end">
          NEW YORK · 1847
        </text>
        <text className="plate__label" x="20" y="80">
          SAN FRANCISCO · 1853
        </text>
        <text className="plate__label" x="176" y="192" textAnchor="middle">
          PANAMA
        </text>
      </>
    ),
  },
  'the-patent': {
    caption: '힘이 몰리는 주머니 입구 양 끝의 리벳. 1873년 특허 제139,121호',
    drawing: (
      <>
        <path className="plate__ink" d="M8,24 L312,24 M8,50 L312,50" />
        <rect className="plate__ink" x="52" y="16" width="12" height="42" rx="1" />
        <path className="plate__ink" d="M96,50 Q152,62 168,172" />
        <path className="plate__stitch" d="M108,50 Q160,68 178,172" />
        <circle className="plate__copper" cx="100" cy="55" r="6" />
        <circle className="plate__copper" cx="166" cy="164" r="6" />
        <path className="plate__arrow" d="M158,172 L124,194 M174,172 L208,194" />
        <path className="plate__arrow" d="M124,194 l11,-1 M124,194 l5,-10 M208,194 l-11,-1 M208,194 l-5,-10" />
        <path className="plate__note" d="M174,158 L246,104" />
        <text className="plate__letter" x="250" y="102">
          A
        </text>
      </>
    ),
  },
  'lot-501': {
    caption: '501 뒷면. 이 장에서 차례로 바뀌는 패치, 아큐에이트, 레드탭의 자리',
    drawing: (
      <>
        <rect className="plate__ink" x="16" y="16" width="288" height="22" />
        {[40, 150, 192].map((x) => (
          <rect key={x} className="plate__ink" x={x} y="10" width="10" height="34" rx="1" />
        ))}
        <rect className="plate__ink" x="232" y="12" width="52" height="30" rx="1" />
        <path className="plate__ink-thin" d="M240,22 L276,22 M240,30 L268,30" />
        <path className="plate__ink" d="M16,38 L16,200 M304,38 L304,200 M160,38 L160,200 M16,72 Q88,88 160,82 Q232,88 304,72" />
        <path className="plate__ink" d="M42,100 L132,100 L128,172 L87,192 L46,172 Z M188,100 L278,100 L274,172 L233,192 L192,172 Z" />
        <path className="plate__stitch" d="M52,114 Q70,146 87,128 Q104,146 122,114 M198,114 Q216,146 233,128 Q250,146 268,114" />
        <rect className="plate__red" x="181" y="118" width="8" height="20" />
      </>
    ),
  },
  'war-and-rebellion': {
    caption: '전쟁 기간, 실 대신 페인트로 그린 아큐에이트. 점선은 원래 박던 자리',
    drawing: (
      <>
        <path className="plate__ink" d="M80,18 L240,18 L234,150 L160,188 L86,150 Z" />
        <path className="plate__dash" d="M98,58 Q129,114 160,88 Q191,114 222,58" />
        <path className="plate__paint" d="M98,42 Q129,98 160,72 Q191,98 222,42" />
        <path className="plate__note" d="M222,46 L270,92" />
        <text className="plate__letter" x="274" y="100">
          A
        </text>
      </>
    ),
  },
  indigo: {
    caption: '실 단면: 푸른 겉층 안에 흰 심이 남는 링 염색',
    drawing: (
      <>
        <circle className="plate__dyed" cx="110" cy="100" r="80" />
        <circle className="plate__core" cx="110" cy="100" r="46" />
        {[
          [96, 84],
          [122, 82],
          [134, 104],
          [114, 122],
          [90, 112],
          [110, 102],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} className="plate__fiber" cx={cx} cy={cy} r="9" />
        ))}
        <path className="plate__note" d="M166,48 L222,36 M128,118 L222,146" />
        <text className="plate__label-ko" x="228" y="40">
          물든 겉층
        </text>
        <text className="plate__label-ko" x="228" y="150">
          흰 심
        </text>
      </>
    ),
  },
  'the-loom': {
    caption: '원단 끝에서 되돌아오는 씨실. 그 끝선이 셀비지다',
    drawing: (
      <>
        {Array.from({ length: 12 }, (_, i) => 52 + i * 20).map((x) => (
          <path key={x} className="plate__warp" d={`M${x},20 L${x},172`} />
        ))}
        <path className="plate__ink" d={weftPath()} />
        <path className="plate__red-line" d="M14,20 L14,172 M290,20 L290,172" />
        <text className="plate__label" x="290" y="192" textAnchor="middle">
          SELVEDGE
        </text>
      </>
    ),
  },
  'the-spread': {
    caption: '서부 목장의 차림이 동부와 유럽의 도시로, 1959년에는 모스크바 박람회까지',
    drawing: (
      <>
        <path className="plate__dash" d="M50,150 Q96,82 148,118 M148,118 Q190,58 236,86 M236,86 Q264,40 290,56" />
        {[
          [50, 150],
          [148, 118],
          [236, 86],
          [290, 56],
        ].map(([cx, cy]) => (
          <circle key={cx} className="plate__node" cx={cx} cy={cy} r="4.5" />
        ))}
        <text className="plate__label-ko" x="50" y="174" textAnchor="middle">
          서부 목장
        </text>
        <text className="plate__label-ko" x="148" y="142" textAnchor="middle">
          동부
        </text>
        <text className="plate__label-ko" x="236" y="110" textAnchor="middle">
          유럽
        </text>
        <text className="plate__label-ko" x="304" y="38" textAnchor="end">
          모스크바 1959
        </text>
      </>
    ),
  },
  anatomy: {
    caption: '부품과 처음 등장한 해',
    drawing: (
      <>
        <path className="plate__ink" d="M112,58 L212,58 L208,142 L162,168 L116,142 Z" />
        <path className="plate__stitch" d="M122,74 Q142,108 162,92 Q182,108 202,74" />
        <circle className="plate__copper" cx="52" cy="44" r="6" />
        <path className="plate__note" d="M58,47 L113,60" />
        <text className="plate__label-ko" x="36" y="26">
          리벳 1873
        </text>
        <path className="plate__note" d="M202,74 L262,40" />
        <text className="plate__label-ko" x="226" y="28">
          아큐에이트 1873
        </text>
        <rect className="plate__red" x="44" y="112" width="9" height="22" />
        <path className="plate__note" d="M53,122 L116,118" />
        <text className="plate__label-ko" x="22" y="156">
          레드탭 1936
        </text>
      </>
    ),
  },
  worn: {
    caption: '501 한 벌이 생애 동안 쓰는 물, 약 3,781리터 (2015 전 과정 평가)',
    drawing: (
      <>
        <path className="plate__ink" d="M140,14 C140,14 84,94 84,130 A56,56 0 0 0 196,130 C196,94 140,14 140,14 Z" />
        <path className="plate__dash" d="M98,136 q10.5,-6 21,0 t21,0 t21,0 t21,0 M102,154 q9.5,-6 19,0 t19,0 t19,0 t19,0" />
        <text className="plate__figure" x="214" y="104">
          3,781 L
        </text>
      </>
    ),
  },
};
