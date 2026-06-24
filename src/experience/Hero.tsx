export function Hero() {
  return (
    <section className="hero" id="hero">
      <svg className="hero__wear" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
        <g strokeWidth="1.5">
          <line x1="230" y1="-40" x2="140" y2="1040" />
          <line x1="440" y1="-40" x2="360" y2="1040" />
          <line x1="690" y1="-40" x2="790" y2="1040" />
          <line x1="850" y1="-40" x2="940" y2="1040" />
        </g>
      </svg>

      <div className="scene">
        <span className="eyebrow eyebrow--tab">Original American Denim</span>
        <h1 className="hero__title">
          DENIM.
          <br />
          <span className="stitch">SINCE 1873.</span>
        </h1>
        <p className="hero__desc">150년의 역사, 변하지 않는 본질.</p>
      </div>

      <div className="hud hud--hint">스크롤 ↓</div>
    </section>
  );
}
