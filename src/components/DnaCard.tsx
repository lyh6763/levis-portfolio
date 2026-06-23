import { dnaCards } from '../data/content';

type IconType = (typeof dnaCards)[number]['icon'];

function DnaIcon({ type }: { type: IconType }) {
  if (type === 'tab') {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="8" y="16" width="32" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 24h32" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  if (type === 'stitch') {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M12 36c6-8 12-16 24-24" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M12 12c12 8 12 16 24 24" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="24" r="4" fill="currentColor" />
    </svg>
  );
}

export function DnaCard({ card }: { card: (typeof dnaCards)[number] }) {
  return (
    <article className="dna__card">
      <div className="dna__icon">
        <DnaIcon type={card.icon} />
      </div>
      <h3 className="dna__title">{card.title}</h3>
      <p className="dna__desc">{card.description}</p>
    </article>
  );
}
