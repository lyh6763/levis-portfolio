import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { SceneBlock } from './SceneBlock';
import { SelvedgeThread } from './SelvedgeThread';

/**
 * 첫 챕터: Hero → Origin(1853) 핀 + 스크럽.
 * 스크롤 진행 하나가 배경 페이드·마모·실 draw·헤드라인 크로스페이드·연도 매듭을 동시 구동한다.
 * 색은 토큰(--color-indigo-900/500)을 런타임에 읽어 적용한다.
 */
export function HeroOrigin() {
  const root = useRef<HTMLElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) {
      return;
    }

    const tokens = getComputedStyle(document.documentElement);
    const indigoRaw = tokens.getPropertyValue('--color-indigo-900').trim();
    const indigoWash = tokens.getPropertyValue('--color-indigo-500').trim();

    // reduced-motion: 핀/스크럽 없이 raw indigo + 정적 스택
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-static');
      gsap.set(el, { backgroundColor: indigoRaw });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(el, { backgroundColor: indigoRaw });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=1400',
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            if (pctRef.current) {
              pctRef.current.textContent = `${Math.round(self.progress * 100)}%`;
            }
          },
        },
      });

      tl.to(el, { backgroundColor: indigoWash }, 0)
        .to('.hero__wear g', { opacity: 0.45 }, 0)
        .to('.hud--hint', { autoAlpha: 0, duration: 0.08 }, 0)
        .to('.thread__fill', { height: '100%' }, 0)
        .to('.yearmark', { opacity: 0.12 }, 0.35)
        .to('.scene--hero', { yPercent: -18, autoAlpha: 0, duration: 0.22 }, 0.3)
        .fromTo(
          '.scene--origin',
          { yPercent: 10, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.28 },
          0.46,
        )
        .to('.thread__knot', { autoAlpha: 1, duration: 0.06 }, 0.5);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="chapter" ref={root} id="hero">
      <svg className="hero__wear" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
        <g strokeWidth="1.5">
          <line x1="230" y1="-40" x2="140" y2="1040" />
          <line x1="440" y1="-40" x2="360" y2="1040" />
          <line x1="690" y1="-40" x2="790" y2="1040" />
          <line x1="850" y1="-40" x2="940" y2="1040" />
        </g>
      </svg>

      <SelvedgeThread />

      <div className="yearmark" aria-hidden="true">
        53
      </div>

      <SceneBlock variant="hero" eyebrow="Original American Denim" eyebrowVariant="tab">
        <h1 className="hero__title">
          DENIM.
          <br />
          <span className="stitch">SINCE 1873.</span>
        </h1>
        <p className="hero__desc">150년의 역사, 변하지 않는 본질.</p>
      </SceneBlock>

      <SceneBlock variant="origin" eyebrow="Chapter 01 · 1853" eyebrowVariant="chapter">
        <h2 className="origin__title">The Founding.</h2>
        <p className="origin__desc">
          독일 이민자 Levi Strauss가 샌프란시스코에서 직물·건화물 사업을 시작합니다. 한 가닥의 실이
          여기서 풀려 나가기 시작합니다.
        </p>
      </SceneBlock>

      <div className="hud hud--state">
        <span ref={pctRef}>0%</span> worn
      </div>
      <div className="hud hud--hint">스크롤 ↓</div>
    </section>
  );
}
