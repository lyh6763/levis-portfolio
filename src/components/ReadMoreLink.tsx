import { Link } from 'react-router-dom';

type ReadMoreLinkProps = {
  to: string;
  children: string;
};

export function ReadMoreLink({ to, children }: ReadMoreLinkProps) {
  return (
    <Link to={to} className="read-more">
      {children}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
