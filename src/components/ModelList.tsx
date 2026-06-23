import { ModelItem } from '../data/content';

import { LazyBackground } from './LazyBackground';

export function ModelList({ items }: { items: ModelItem[] }) {
  return (
    <div className="models__list">
      {items.map((item) => (
        <article className="models__item" key={item.title}>
          <div className="models__image-wrap">
            <LazyBackground className="models__image" src={item.image} role="img" ariaLabel={item.alt} />
          </div>
          <div className="models__content">
            <span className="models__year">{item.year}</span>
            <h3 className="models__title">{item.title}</h3>
            <p className="models__desc">{item.description}</p>
            <ul className="models__specs">
              {item.specs.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
