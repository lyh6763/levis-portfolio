import { textureGallery } from '../data/content';
import { Reveal } from './Reveal';

type Texture = { image: string; alt: string; label: string; large?: boolean };

/** Archive A3 — 텍스처 갤러리 (보존 이미지 재활용). */
export function ArchiveGallery() {
  return (
    <section className="archive-section archive-gallery">
      <header className="archive-section__head">
        <span className="eyebrow eyebrow--chapter">Textures</span>
        <h2 className="archive-section__title">Surface Study</h2>
      </header>

      <div className="texture-grid">
        {(textureGallery as Texture[]).map((texture) => (
          <Reveal
            key={texture.label}
            className={`texture-item${texture.large ? ' texture-item--large' : ''}`}
          >
            <figure>
              <img src={texture.image} alt={texture.alt} loading="lazy" />
              <figcaption>{texture.label}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
