import { useEffect, useState } from 'react';
import { navLinks, siteInfo } from '../data/siteData';
import useActiveSection from '../hooks/useActiveSection';
import scrollToHash from '../utils/scroll';
import Button from './Button';
import logo from '../../asset/image/logo.png';
import './Navbar.css';

const sectionIds = navLinks.map((link) => link.path.replace('#', ''));

const BROCHURE_PATH = '/images/Elegance-Heights-Malad-Brochure.pdf';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1100) {
        setOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavClick = (event, path) => {
    event.preventDefault();
    setOpen(false);
    scrollToHash(path);
  };

  return (
    <header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
    >
      <div className="navbar__inner">
        {/* Logo */}
        <a
          href="#home"
          className="navbar__logo"
          aria-label="Elegance Heights Home"
          onClick={(event) => handleNavClick(event, '#home')}
        >
          <span className="navbar__logo-circle">
            <img
              src={logo}
              alt="Elegance Heights"
              className="navbar__logo-img"
            />
          </span>

          <span className="navbar__logo-text">
            Elegance
            <span>Heights</span>
          </span>
        </a>

        {/* Navigation */}
        <nav
          className={`navbar__links ${open ? 'is-open' : ''}`}
          aria-label="Main navigation"
        >
          {navLinks.map((link, index) => {
            const linkId = link.path.replace('#', '');
            const isActive = activeId === linkId;

            return (
              <a
                key={link.path}
                href={link.path}
                className={`navbar__link ${
                  isActive ? 'is-active' : ''
                }`}
                onClick={(event) =>
                  handleNavClick(event, link.path)
                }
                style={{
                  transitionDelay: open
                    ? `${index * 0.04}s`
                    : '0s',
                }}
              >
                {link.label}
              </a>
            );
          })}

          {/* Mobile actions */}
          <div className="navbar__mobile-cta">
            <a
              href={`tel:${siteInfo.phone.replace(/\s/g, '')}`}
              className="navbar__phone navbar__phone--mobile"
            >
              <span
                className="navbar__phone-icon"
                aria-hidden="true"
              >
                ☎
              </span>

              {siteInfo.phone}
            </a>

            <Button
              href={BROCHURE_PATH}
              download="Elegance-Heights-Malad-Brochure.pdf"
              variant="primary"
              size="sm"
              onClick={() => setOpen(false)}
            >
              Get Brochure
            </Button>
          </div>
        </nav>

        {/* Desktop actions */}
        <div className="navbar__actions">
          <a
            href={`tel:${siteInfo.phone.replace(/\s/g, '')}`}
            className="navbar__phone"
          >
            <span
              className="navbar__phone-icon"
              aria-hidden="true"
            >
              ☎
            </span>

            {siteInfo.phone}
          </a>

          <Button
            href={BROCHURE_PATH}
            download="Elegance-Heights-Malad-Brochure.pdf"
            variant="primary"
            size="sm"
          >
            Get Brochure
          </Button>

          <button
            type="button"
            className={`navbar__toggle ${
              open ? 'is-open' : ''
            }`}
            aria-label={
              open ? 'Close navigation menu' : 'Open navigation menu'
            }
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <button
          type="button"
          className="navbar__scrim"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      )}
    </header>
  );
}