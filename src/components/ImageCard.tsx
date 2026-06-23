import { ImageContent } from '../data/content';

import { LazyBackground } from './LazyBackground';

type ImageCardProps = {
  item: ImageContent;
  className?: string;
};

export function ImageCard({ item, className = '' }: ImageCardProps) {
  return (
    <article className={`card${className ? ` ${className}` : ''}`}>
      <LazyBackground className="card__image" src={item.image} role="img" ariaLabel={item.alt} />
      <div className="card__content">
        <h3 className="card__title">{item.title}</h3>
        {item.description ? <p className="card__desc">{item.description}</p> : null}
      </div>
    </article>
  );
}
