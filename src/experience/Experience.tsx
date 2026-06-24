import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { Hero } from './Hero';

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
          <a href="#origin">Heritage</a>
          <a href="#craft">Craft</a>
          <a href="#archive">Archive</a>
        </div>
      </nav>

      <Hero />

      {/* Stage B에서 Origin·Patent·Culture·Craft 챕터로 대체될 자리 */}
      <section className="placeholder" id="origin">
        <div>
          <h2>The story continues.</h2>
          <p>여기서부터 wear-in 내러티브 챕터(Origin 1853 → Today)가 스크럽으로 이어집니다. (Stage B)</p>
        </div>
      </section>
    </div>
  );
}
