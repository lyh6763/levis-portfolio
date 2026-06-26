import { cultureItems } from '../data/content';
import { Reveal } from './Reveal';

/** Archive A4 — 문화 아카이브 (Workwear/Campaign/Music/Street). 내러티브 마지막 light 섹션. */
export function ArchiveCulture() {
  return (
    <section className="archive-section archive-culture">
      <header className="archive-section__head">
        <span className="eyebrow eyebrow--chapter">Culture</span>
        <h2 className="archive-section__title">Beyond the Seam</h2>
      </header>

      <div className="culture-grid">
        {cultureItems.map((item) => (
          <Reveal key={item.title} className="culture-card">
            <div className="culture-card__media">
              <img src={item.image} alt={item.alt} loading="lazy" />
            </div>
            <span className="culture-card__tag">{item.tag}</span>
            <h3 className="culture-card__title">{item.title}</h3>
            <p className="culture-card__desc">{item.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
