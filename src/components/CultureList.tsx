import { CultureItem } from '../data/content';

import { LazyBackground } from './LazyBackground';

export function CultureList({ items }: { items: CultureItem[] }) {
  return (
    <div className="culture-full__list">
      {items.map((item) => (
        <article className="culture-full__item" key={item.title}>
          <div className="culture-full__image-wrap">
            <LazyBackground className="culture-full__image" src={item.image} role="img" ariaLabel={item.alt} />
          </div>
          <div className="culture-full__content">
            <span className="culture-full__tag">{item.tag}</span>
            <h3 className="culture-full__title">{item.title}</h3>
            <p className="culture-full__desc">{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
