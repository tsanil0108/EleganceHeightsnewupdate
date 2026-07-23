import { useCallback, useEffect, useState } from 'react';
import './CoverflowCarousel.css';

// 3D coverflow carousel — center card large & front-facing, side cards
// angled back in perspective. Auto-advances, pauses on hover,
// arrows + dots to navigate.
//
// Props:
//   items      [{ image, title, category? }]  (memoize the array!)
//   onSelect   (index) => void   — called when the CENTER card is clicked
//   autoPlayMs number, default 3200 — time between auto-advances
export default function CoverflowCarousel({ items, onSelect, autoPlayMs = 3200 }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = items.length;

  const go = useCallback((dir) => setCurrent((c) => (c + dir + n) % n), [n]);

  // Reset only when the item SET actually changes (filter change) —
  // stable even if the array identity changes every render.
  const itemsSig = items.map((it) => it.image).join('|');
  useEffect(() => {
    setCurrent(0);
  }, [itemsSig]);

  // Auto-advance, paused while the cursor is over the carousel
  useEffect(() => {
    if (paused || n < 2) return undefined;
    const t = setInterval(() => setCurrent((c) => (c + 1) % n), autoPlayMs);
    return () => clearInterval(t);
  }, [paused, n, autoPlayMs]);

  // Keyboard navigation while hovered
  useEffect(() => {
    if (!paused) return undefined;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [paused, go]);

  if (!n) return null;
  const active = items[current % n];

  // Signed circular distance from the current slide: 0 = center,
  // ±1 = immediate neighbours, ±2 = far neighbours, beyond = hidden.
  const relOf = (i) => {
    let rel = (i - current + n) % n;
    if (rel > n / 2) rel -= n;
    return rel;
  };

  return (
    <div
      className="coverflow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Blurred backdrop of the active image */}
      <div className="coverflow__bg" style={{ backgroundImage: `url(${active.image})` }} />
      <div className="coverflow__bg-overlay" />

      <div className="coverflow__stage">
        {items.map((item, i) => {
          const rel = relOf(i);
          const hidden = Math.abs(rel) > 2;
          return (
            <button
              key={`${item.title}-${i}`}
              type="button"
              className={`coverflow__card ${rel === 0 ? 'is-center' : ''}`}
              data-rel={hidden ? (rel > 0 ? 'far-right' : 'far-left') : rel}
              tabIndex={hidden ? -1 : 0}
              aria-hidden={hidden}
              onClick={() => (rel === 0 ? onSelect && onSelect(i) : setCurrent(i))}
              aria-label={rel === 0 ? `View ${item.title} full size` : `Show ${item.title}`}
            >
              <img src={item.image} alt={item.title} loading="lazy" draggable="false" />
            </button>
          );
        })}

        {/* Center title — always one horizontal line */}
        <div className="coverflow__title" key={`title-${current}`} aria-live="polite">
          {active.category && <span className="coverflow__title-eyebrow">{active.category}</span>}
          <h3>{active.title}</h3>
          <i className="coverflow__title-rule" aria-hidden="true" />
        </div>
      </div>

      {n > 1 && (
        <>
          <button type="button" className="coverflow__nav coverflow__nav--prev" onClick={() => go(-1)} aria-label="Previous">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="coverflow__nav coverflow__nav--next" onClick={() => go(1)} aria-label="Next">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="coverflow__dots" role="tablist" aria-label="Choose slide">
            {items.map((item, i) => (
              <button
                key={`dot-${i}`}
                type="button"
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to ${item.title}`}
                className={`coverflow__dot ${i === current ? 'is-active' : ''}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}