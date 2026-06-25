import { ArchiveExploded } from './ArchiveExploded';

/** Archive 탐색 방: 에디토리얼 threshold(②) → 501 분해 폭발도(③). */
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
    </>
  );
}
