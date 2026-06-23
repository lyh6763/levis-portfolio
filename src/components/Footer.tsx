import { Link } from 'react-router-dom';

const footerLinks = [
  { to: '/heritage', label: 'Heritage' },
  { to: '/craft', label: 'Craft' },
  { to: '/archive', label: 'Archive' },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <Link to="/" className="footer__logo">
            <span className="footer__logo-text">LEVI'S</span>
            <span className="footer__logo-sub">Archive</span>
          </Link>

          <nav className="footer__nav" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <Link key={link.to} to={link.to} className="footer__link">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="stitch-line" />

        <div className="footer__bottom">
          <p className="footer__copy">&copy; 2026 Levi's Heritage Project</p>
          <p className="footer__note">This is a portfolio project, not affiliated with Levi Strauss & Co.</p>
        </div>
      </div>
    </footer>
  );
}
