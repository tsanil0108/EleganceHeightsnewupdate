import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import './SectionDivider.css';

const toId = (text) => text.toLowerCase().trim().replace(/\s+/g, '-');

export default function SectionDivider({
  from = 'Home',
  label = 'SGF',
  bgImage = '/images/building.png',
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`section-divider ${visible ? 'is-visible' : ''}`}
      role="presentation"
    >
      <div className="section-divider__stage">
        {/* Right-side faded background photo, diagonally clipped */}
        <div
          className="section-divider__photo"
          style={{ backgroundImage: `url(${bgImage})` }}
          aria-hidden="true"
        />
        <div className="section-divider__scrim" aria-hidden="true" />

        {/* Faint concentric arcs on the left */}
        <svg
          className="section-divider__arcs"
          viewBox="0 0 200 200"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <circle cx="10" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="10" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <circle cx="10" cy="100" r="120" fill="none" stroke="currentColor" strokeWidth="0.3" />
        </svg>

        {/* Diagonal gold divider line */}
        <svg
          className="section-divider__diagonal"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line x1="34" y1="0" x2="16" y2="100" />
        </svg>

        <div className="section-divider__row">
          <a href={`#${toId(from)}`} className="section-divider__nav section-divider__nav--left">
            <span className="section-divider__nav-icon">
              <Icon name="home" size={18} />
            </span>
            <span className="section-divider__nav-text">{from}</span>
            <span className="section-divider__nav-line" />
          </a>

          <div className="section-divider__center">
            <span className="section-divider__ornament section-divider__ornament--top">
              <span className="section-divider__ornament-line" />
              <span className="section-divider__ornament-dot" />
              <svg
                className="section-divider__leaf"
                viewBox="0 0 40 30"
                aria-hidden="true"
              >
                <path d="M20 2c0 8-5 13-5 18a5 5 0 0010 0c0-5-5-10-5-18z" />
                <path d="M20 8c-6 2-11 6-14 12a4.5 4.5 0 006 6c4-3 6-10 8-18z" />
                <path d="M20 8c6 2 11 6 14 12a4.5 4.5 0 01-6 6c-4-3-6-10-8-18z" />
              </svg>
              <span className="section-divider__ornament-dot" />
              <span className="section-divider__ornament-line" />
            </span>

            <h2 className="section-divider__title">{label}</h2>

            <span className="section-divider__ornament section-divider__ornament--bottom">
              <span className="section-divider__ornament-line" />
              <span className="section-divider__ornament-mark" />
              <span className="section-divider__ornament-line" />
            </span>
          </div>

          <a href={`#${toId(label)}`} className="section-divider__nav section-divider__nav--right">
            <span className="section-divider__nav-line" />
            <span className="section-divider__nav-text">{label}</span>
            <span className="section-divider__nav-icon">
              <Icon name="chevronRight" size={18} />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}