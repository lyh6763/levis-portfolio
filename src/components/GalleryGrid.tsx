import { LazyBackground } from './LazyBackground';

type GalleryItem = {
  image: string;
  alt: string;
  label?: string;
  large?: boolean;
};

type GalleryGridProps = {
  items: GalleryItem[];
  type: 'home' | 'detail' | 'texture';
};

export function GalleryGrid({ items, type }: GalleryGridProps) {
  const gridClass =
    type === 'home' ? 'gallery__grid' : type === 'detail' ? 'detail-gallery__grid' : 'texture-gallery__grid';

  return (
    <div className={gridClass}>
      {items.map((item) => {
        if (type === 'home') {
          return (
            <div className="gallery__item" key={item.image}>
              <LazyBackground className="gallery__image" src={item.image} role="img" ariaLabel={item.alt} />
            </div>
          );
        }

        if (type === 'detail') {
          return (
            <div className="detail-gallery__item" key={item.image}>
              <LazyBackground className="detail-gallery__image" src={item.image} role="img" ariaLabel={item.alt} />
              <span className="detail-gallery__label">{item.label}</span>
            </div>
          );
        }

        return (
          <div
            className={`texture-gallery__item${item.large ? ' texture-gallery__item--large' : ''}`}
            key={item.image}
          >
            <LazyBackground className="texture-gallery__image" src={item.image} role="img" ariaLabel={item.alt} />
            <span className="texture-gallery__label">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
