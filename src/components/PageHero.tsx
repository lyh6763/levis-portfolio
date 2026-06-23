import { LazyBackground } from './LazyBackground';

type PageHeroProps = {
  label: string;
  title: string;
  description: string;
  image: string;
};

export function PageHero({ label, title, description, image }: PageHeroProps) {
  return (
    <section className="page-hero">
      <LazyBackground className="page-hero__bg" src={image} eager ariaHidden />
      <div className="container page-hero__content">
        <span className="red-tab">{label}</span>
        <h1 className="page-hero__title">{title}</h1>
        <p className="page-hero__desc">{description}</p>
      </div>
    </section>
  );
}
