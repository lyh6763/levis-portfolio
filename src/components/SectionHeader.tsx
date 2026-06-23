type SectionHeaderProps = {
  label: string;
  title: string;
  description?: string;
  centered?: boolean;
};

export function SectionHeader({ label, title, description, centered = false }: SectionHeaderProps) {
  return (
    <header className={`section-header${centered ? ' text-center' : ''}`}>
      <span className="section-header__label">{label}</span>
      <h2 className="section-header__title">{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
  );
}
