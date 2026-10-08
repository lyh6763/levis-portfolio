import type { ReactElement } from 'react';

import type { Clue } from '../data/insideOut';

/** 단서별 작은 도식. 색은 CSS 클래스(glyph__*)로 준다. */
export function ClueGlyph({ glyph, small = false }: { glyph: Clue['glyph']; small?: boolean }) {
  return (
    <svg className={`glyph${small ? ' glyph--small' : ''}`} viewBox="0 0 64 64" aria-hidden="true">
      {GLYPHS[glyph]}
    </svg>
  );
}

const POCKET = <path className="glyph__denim" d="M10,8 L54,8 L52,44 L32,56 L12,44 Z" />;

const GLYPHS: Record<Clue['glyph'], ReactElement> = {
  tab: (
    <>
      {POCKET}
      <rect className="glyph__red" x="8" y="22" width="9" height="18" rx="1" />
      <path className="glyph__ink-light" d="M10.5,27 L10.5,35 M10.5,27 L14.5,27 M10.5,31 L13.5,31 M10.5,35 L14.5,35" />
    </>
  ),
  rivet: (
    <>
      {POCKET}
      <circle className="glyph__copper" cx="12" cy="10" r="4" />
      <circle className="glyph__hidden" cx="52" cy="10" r="4" />
    </>
  ),
  crotch: (
    <>
      <path className="glyph__denim" d="M8,4 L56,4 L58,60 L38,60 L32,30 L26,60 L6,60 Z" />
      <path className="glyph__stitch" d="M36,4 L36,22 Q36,28 32,30" />
      <circle className="glyph__copper" cx="32" cy="31" r="3.5" />
    </>
  ),
  cinch: (
    <>
      <rect className="glyph__denim" x="4" y="14" width="56" height="12" rx="1" />
      <rect className="glyph__denim-2" x="10" y="30" width="44" height="10" rx="1" />
      <rect className="glyph__buckle" x="34" y="27" width="12" height="16" rx="2" />
    </>
  ),
  patch: (
    <>
      <rect className="glyph__leather" x="8" y="14" width="48" height="34" rx="2" />
      <path className="glyph__ink-light" d="M16,24 L48,24 M16,31 L48,31 M16,38 L36,38" />
    </>
  ),
  arcuate: (
    <>
      {POCKET}
      <path className="glyph__stitch" d="M16,18 Q24,34 32,26 Q40,34 48,18" />
      <path className="glyph__stitch" d="M16,24 Q24,40 32,32 Q40,40 48,24" />
    </>
  ),
  selvedge: (
    <>
      <rect className="glyph__weft" x="6" y="6" width="40" height="52" />
      <rect className="glyph__denim" x="40" y="6" width="18" height="52" />
      <line className="glyph__red-line" x1="43" y1="6" x2="43" y2="58" />
    </>
  ),
  label: (
    <>
      <rect className="glyph__tag" x="14" y="8" width="36" height="48" rx="2" />
      <path className="glyph__ink" d="M20,20 L26,30 L32,20 M36,22 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 M20,40 L44,40 M20,46 L38,46" />
    </>
  ),
};
