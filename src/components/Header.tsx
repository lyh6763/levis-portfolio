import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/heritage', label: 'Heritage' },
  { to: '/craft', label: 'Craft' },
  { to: '/archive', label: 'Archive' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  const closeMenu = (restoreFocus = false) => {
    setIsMenuOpen(false);

    if (restoreFocus) {
      toggleRef.current?.focus();
    }
  };

  useEffect(() => {
    document.body.classList.toggle('nav-open', isMenuOpen);

    return () => {
      document.body.classList.remove('nav-open');
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 100);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (!isMenuOpen || window.innerWidth >= 768 || !navRef.current) {
        return;
      }

      if (!navRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    document.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isMenuOpen]);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      closeMenu(true);
      return;
    }

    if (event.key !== 'Tab' || !isMenuOpen || window.innerWidth >= 768 || !navRef.current) {
      return;
    }

    const focusableItems = [
      toggleRef.current,
      ...Array.from(navRef.current.querySelectorAll<HTMLAnchorElement>('.nav__link')),
    ].filter(Boolean) as HTMLElement[];

    const firstFocusable = focusableItems[0];
    const lastFocusable = focusableItems[focusableItems.length - 1];

    if (event.shiftKey && document.activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
  };

  return (
    <header className={`header${isScrolled ? ' is-scrolled' : ''}`}>
      <div className="container">
        <nav className="nav" ref={navRef} onKeyDown={handleKeyDown}>
          <Link to="/" className="nav__logo" onClick={() => closeMenu()}>
            <span className="nav__logo-text">LEVI'S</span>
            <span className="red-tab">EST. 1873</span>
          </Link>

          <button
            ref={toggleRef}
            className="nav__toggle"
            type="button"
            aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={isMenuOpen}
            aria-controls="nav-menu"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span className="nav__toggle-line" />
            <span className="nav__toggle-line" />
            <span className="nav__toggle-line" />
          </button>

          <ul className={`nav__menu${isMenuOpen ? ' is-active' : ''}`} id="nav-menu">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => `nav__link${isActive ? ' nav__link--active' : ''}`}
                  onClick={() => closeMenu()}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
