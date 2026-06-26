import { ArchiveCulture } from './ArchiveCulture';
import { ArchiveExploded } from './ArchiveExploded';
import { ArchiveGallery } from './ArchiveGallery';
import { ArchiveModels } from './ArchiveModels';

/** Archive 탐색 방: threshold(②) → 501 분해(③) → 라인업·텍스처·문화(② 복귀). */
export function Archive() {
  return (
    <>
      <section className="archive-threshold" id="archive">
        <span className="eyebrow eyebrow--tab">Collection</span>
        <h2>The Archive.</h2>
        <div className="models">
          <span>
            <b>501</b> · 1873
          </span>
          <span>
            <b>505</b> · 1967
          </span>
          <span>
            <b>517</b> · 1969
          </span>
        </div>
        <p className="deconstruct-hint">↓ deconstruct the 501</p>
      </section>

      <ArchiveExploded />
      <ArchiveModels />
      <ArchiveGallery />
      <ArchiveCulture />
    </>
  );
}
