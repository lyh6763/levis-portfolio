import { models } from '../data/content';
import { Reveal } from './Reveal';

/** Archive A1 — 501/505/517 모델 라인업. */
export function ArchiveModels() {
  return (
    <section className="archive-section archive-models">
      <header className="archive-section__head">
        <span className="eyebrow eyebrow--chapter">The Lineup</span>
        <h2 className="archive-section__title">501 · 505 · 517</h2>
      </header>

      <div className="model-list">
        {models.map((model) => (
          <Reveal key={model.title} className="model-row">
            <div className="model-row__media">
              <img src={model.image} alt={model.alt} loading="lazy" />
            </div>
            <div className="model-row__info">
              <span className="model-row__year">{model.year}</span>
              <h3 className="model-row__title">{model.title}</h3>
              <p className="model-row__desc">{model.description}</p>
              <ul className="model-row__specs">
                {model.specs.map((spec) => (
                  <li key={spec}>{spec}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
