import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { isWebGLAvailable } from './archive3d/webgl';

const JeanCanvas = lazy(() => import('./archive3d/JeanCanvas'));

// Shared exploded offsets for the SVG fallback and the 3D canvas progress.
const PARTS = [
  { id: 'gBody', dx: 0, dy: 70 },
  { id: 'gWaist', dx: 0, dy: -72 },
  { id: 'gPatch', dx: 125, dy: 14 },
  { id: 'gPocketL', dx: -156, dy: 186 },
  { id: 'gPocketR', dx: 150, dy: 44 },
  { id: 'gArc', dx: 128, dy: -90 },
  { id: 'gTab', dx: 186, dy: 106 },
  { id: 'gRivets', dx: 160, dy: 196 },
];

export function ArchiveExploded() {
  const root = useRef<HTMLElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const explodeRef = useRef<number>(0);

  const [use3D] = useState(
    () =>
      typeof window !== 'undefined' &&
      isWebGLAvailable() &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      window.innerWidth > 768,
  );
  const [near, setNear] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) {
      return;
    }

    const tokens = getComputedStyle(document.documentElement);
    const ecru = tokens.getPropertyValue('--color-ecru-200').trim();
    const blueprint = tokens.getPropertyValue('--color-blueprint-bg').trim();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-static');
      gsap.set(el, { backgroundColor: blueprint });
      PARTS.forEach((part) => {
        el.querySelector(`#${part.id}`)?.setAttribute('transform', `translate(${part.dx},${part.dy})`);
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(el, { backgroundColor: ecru });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=1600',
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const explode = Math.min(Math.max((self.progress - 0.18) / 0.62, 0), 1);
            explodeRef.current = explode;
            if (pctRef.current) {
              pctRef.current.textContent = `${Math.round(explode * 100)}%`;
            }
          },
        },
      });

      tl.to(el, { backgroundColor: blueprint, duration: 0.18 }, 0)
        .to('#archGrid', { opacity: 1, duration: 0.18 }, 0)
        .fromTo('.arch-jean', { scale: 0.96, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.18 }, 0);

      if (!use3D) {
        PARTS.forEach((part) =>
          tl.to(`#${part.id}`, { x: part.dx, y: part.dy, ease: 'power1.out', duration: 0.62 }, 0.18),
        );
      }

      tl.to('#archLabels', { opacity: 1, duration: 0.3 }, 0.4).to('#archHint', { opacity: 1, duration: 0.3 }, 0.45);
      tl.to({}, { duration: 0.2 });
    }, root);

    return () => ctx.revert();
  }, [use3D]);

  useEffect(() => {
    if (!use3D) {
      return;
    }
    const el = root.current;
    if (!el) {
      return;
    }
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      once: true,
      onEnter: () => setNear(true),
    });
    return () => st.kill();
  }, [use3D]);

  return (
    <section className={`archive-stage${canvasReady ? ' archive-stage--3d' : ''}`} ref={root}>
      <div className="arch-title">
        <span className="eyebrow eyebrow--tab">Deconstructed · 1873</span>
        <h3>Anatomy of a 501.</h3>
      </div>

      <svg className="arch-jean" viewBox="0 0 680 470" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <g id="archGrid" opacity="0">
          <line className="arch-grid-l" x1="120" y1="0" x2="120" y2="470" />
          <line className="arch-grid-l" x1="240" y1="0" x2="240" y2="470" />
          <line className="arch-grid-l" x1="360" y1="0" x2="360" y2="470" />
          <line className="arch-grid-l" x1="480" y1="0" x2="480" y2="470" />
          <line className="arch-grid-l" x1="600" y1="0" x2="600" y2="470" />
          <line className="arch-grid-l" x1="0" y1="120" x2="680" y2="120" />
          <line className="arch-grid-l" x1="0" y1="240" x2="680" y2="240" />
          <line className="arch-grid-l" x1="0" y1="360" x2="680" y2="360" />
        </g>

        <g id="archLabels" opacity="0">
          <line className="arch-lead" x1="392" y1="44" x2="400" y2="80" />
          <text className="arch-callout" x="300" y="40">Waistband + belt loops</text>
          <text className="arch-callout" x="540" y="60">Arcuate stitch · 1873</text>
          <text className="arch-callout" x="556" y="116">Leather patch · 1886</text>
          <text className="arch-callout" x="556" y="196">Back pocket</text>
          <text className="arch-callout arch-callout--red" x="556" y="258">Red Tab · 1936</text>
          <text className="arch-callout" x="520" y="342">Copper rivet · 1873</text>
          <text className="arch-callout" x="150" y="338">Back pocket</text>
          <text className="arch-callout" x="320" y="456">Selvedge denim · 501</text>
        </g>

        <g className="arch-parts">
          <g id="gBody">
            <path
              className="arch-denim"
              d="M322,120 L312,162 L300,432 L372,432 L399,250 L426,432 L498,432 L486,162 L478,120 Z"
            />
            <line className="arch-stitch" x1="399" y1="126" x2="399" y2="250" strokeDasharray="4 3" />
          </g>
          <g id="gWaist">
            <rect className="arch-denim-2" x="320" y="92" width="160" height="30" rx="3" />
            <rect className="arch-denim-2" x="330" y="84" width="7" height="12" rx="1" />
            <rect className="arch-denim-2" x="372" y="84" width="7" height="12" rx="1" />
            <rect className="arch-denim-2" x="420" y="84" width="7" height="12" rx="1" />
            <rect className="arch-denim-2" x="462" y="84" width="7" height="12" rx="1" />
            <line className="arch-stitch" x1="324" y1="116" x2="476" y2="116" strokeDasharray="4 3" />
          </g>
          <g id="gPatch">
            <rect className="arch-patch" x="440" y="86" width="36" height="24" rx="2" />
            <line className="arch-patch-l" x1="445" y1="95" x2="471" y2="95" />
            <line className="arch-patch-l" x1="445" y1="101" x2="471" y2="101" />
          </g>
          <g id="gPocketL">
            <path className="arch-denim-2" d="M334,132 L386,132 L386,166 L360,184 L334,166 Z" />
          </g>
          <g id="gPocketR">
            <path className="arch-denim-2" d="M414,132 L466,132 L466,166 L440,184 L414,166 Z" />
          </g>
          <g id="gArc">
            <path className="arch-stitch" d="M337,141 Q360,164 383,141" strokeWidth="1.6" />
            <path className="arch-stitch" d="M337,149 Q360,172 383,149" strokeWidth="1.6" />
            <path className="arch-stitch" d="M417,141 Q440,164 463,141" strokeWidth="1.6" />
            <path className="arch-stitch" d="M417,149 Q440,172 463,149" strokeWidth="1.6" />
          </g>
          <g id="gTab">
            <rect className="arch-tab" x="410" y="140" width="6" height="17" rx="1" />
          </g>
          <g id="gRivets">
            <circle className="arch-rivet" cx="334" cy="132" r="3.4" />
            <circle className="arch-rivet" cx="386" cy="132" r="3.4" />
            <circle className="arch-rivet" cx="414" cy="132" r="3.4" />
            <circle className="arch-rivet" cx="466" cy="132" r="3.4" />
            <circle className="arch-rivet" cx="312" cy="160" r="3.4" />
            <circle className="arch-rivet" cx="486" cy="160" r="3.4" />
          </g>
        </g>
      </svg>

      {use3D && near && (
        <div className="arch-canvas" aria-hidden="true">
          <Suspense fallback={null}>
            <JeanCanvas explodeRef={explodeRef} onReady={() => setCanvasReady(true)} />
          </Suspense>
        </div>
      )}

      <ul className="arch-captions" aria-label="501 구성 요소">
        <li>
          <span className="dot dot--denim" aria-hidden="true" />
          Selvedge denim · 501
        </li>
        <li>
          <span className="dot dot--stitch" aria-hidden="true" />
          Arcuate stitch · 1873
        </li>
        <li>
          <span className="dot dot--tab" aria-hidden="true" />
          Red Tab · 1936
        </li>
        <li>
          <span className="dot dot--rivet" aria-hidden="true" />
          Copper rivet · 1873
        </li>
        <li>
          <span className="dot dot--patch" aria-hidden="true" />
          Leather patch · 1886
        </li>
        <li>
          <span className="dot dot--denim" aria-hidden="true" />
          Back pocket
        </li>
      </ul>

      <div className="arch-hud arch-hud--state">
        <span ref={pctRef}>0%</span> exploded
      </div>
      <div className="arch-hud arch-hud--hint" id="archHint">
        {use3D ? 'drag to rotate' : 'scroll to deconstruct'}
      </div>
    </section>
  );
}
