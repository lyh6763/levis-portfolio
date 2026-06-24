import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { HeroOrigin } from './HeroOrigin';

export function Experience() {
  useSmoothScroll();

  return (
    <div className="experience">
      <nav className="nav">
        <div className="nav__brand">
          <span className="nav__logo">LEVI&apos;S</span>
          <span className="nav__tab">EST. 1853</span>
        </div>
        <div className="nav__links">
          <a href="#hero">Heritage</a>
          <a href="#craft">Craft</a>
          <a href="#archive">Archive</a>
        </div>
      </nav>

      <HeroOrigin />

      {/* Stage C에서 Patent 1873 · Culture · Craft · Today 챕터로 대체될 자리 */}
      <section className="placeholder" id="craft">
        <div>
          <h2>The story continues.</h2>
          <p>다음 챕터(Patent 1873 → Today)가 이어집니다. (Stage C)</p>
        </div>
      </section>
    </div>
  );
}
