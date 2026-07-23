import { useCallback, useEffect, useRef, useState } from 'react';
import './SlitShowcase.css';

// Spotlight Slider v2 — cinematic, animation-rich showcase:
// • diagonal wipe reveal + slow Ken Burns zoom on every slide
// • mouse parallax (image gently follows the cursor)
// • gold sweep line on each change
// • giant ghost number (01, 02…) behind the caption
// • staggered caption entrance, thumbnails, progress bar, arrows
//
// Props (same as before — Gallery.jsx needs no changes):
//   items      [{ image, title, category? }]
//   onSelect   (index) => void — called when the main image is clicked
//   autoPlayMs number — time each photo stays before auto-advancing
export default function SlitShowcase({ items, onSelect, autoPlayMs = 3500 }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef(null);
  const n = items.length;

  const go = useCallback((dir) => setCurrent((c) => (c + dir + n) % n), [n]);

  // Reset only when the item SET actually changes (filter change)
  const itemsSig = items.map((it) => it.image).join('|');
  useEffect(() => {
    setCurrent(0);
  }, [itemsSig]);

  // Auto-advance, paused while hovered
  useEffect(() => {
    if (paused || n < 2) return undefined;
    const t = setInterval(() => setCurrent((c) => (c + 1) % n), autoPlayMs);
    return () => clearInterval(t);
  }, [paused, n, autoPlayMs, itemsSig]);

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

  // Mouse parallax — image gently follows the cursor
  const handleMove = (e) => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width - 0.5) * 2; // -1..1
    const my = ((e.clientY - r.top) / r.height - 0.5) * 2;
    el.style.setProperty('--mx', mx.toFixed(3));
    el.style.setProperty('--my', my.toFixed(3));
  };

  const handleLeave = () => {
    const el = rootRef.current;
    if (el) {
      el.style.setProperty('--mx', 0);
      el.style.setProperty('--my', 0);
    }
    setPaused(false);
  };

  if (!n) return null;
  const active = items[current % n];

  return (
    <div
      ref={rootRef}
      className="spotlight"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
    >
      {/* Progress bar — fills over autoPlayMs, pauses on hover */}
      {n > 1 && (
        <div className="spotlight__progress" aria-hidden="true">
          <span
            key={`bar-${current}-${itemsSig}`}
            style={{ animationDuration: `${autoPlayMs}ms` }}
            className={paused ? 'is-paused' : ''}
          />
        </div>
      )}

      {/* Stage — stacked slides with wipe reveal + Ken Burns + parallax */}
      <button
        type="button"
        className="spotlight__stage"
        onClick={() => onSelect && onSelect(current)}
        aria-label={`View ${active.title} full size`}
      >
        {items.map((item, i) => (
          <img
            key={`${item.image}-${i}`}
            src={item.image}
            alt={i === current ? item.title : ''}
            className={`spotlight__img ${i === current ? 'is-active' : ''}`}
            draggable="false"
            loading={Math.abs(i - current) <= 1 || i === n - 1 ? 'eager' : 'lazy'}
          />
        ))}
        <span className="spotlight__shade" aria-hidden="true" />
        {/* Gold sweep line on each slide change */}
        <span className="spotlight__sweep" key={`sweep-${current}`} aria-hidden="true" />
      </button>

      {/* Giant ghost number behind the caption */}
      <span className="spotlight__num" key={`num-${current}`} aria-hidden="true">
        {String(current + 1).padStart(2, '0')}
      </span>

      {/* Caption — staggered entrance, bottom-left */}
      <div className="spotlight__caption" key={`cap-${current}`} aria-live="polite">
        {active.category && <span className="spotlight__eyebrow">{active.category}</span>}
        <span className="spotlight__title-mask">
          <h3>{active.title}</h3>
        </span>
        <em>
          <i className="spotlight__count-line" aria-hidden="true" />
          {current + 1} / {n}
        </em>
      </div>

      {/* Thumbnails — bottom right */}
      {n > 1 && (
        <div className="spotlight__thumbs" role="tablist" aria-label="Choose photo">
          {items.map((item, i) => (
            <button
              key={`th-${i}`}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={`Show ${item.title}`}
              className={`spotlight__thumb ${i === current ? 'is-active' : ''}`}
              onClick={() => setCurrent(i)}
            >
              <img src={item.image} alt="" draggable="false" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {/* Arrows */}
      {n > 1 && (
        <>
          <button type="button" className="spotlight__nav spotlight__nav--prev" onClick={() => go(-1)} aria-label="Previous">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="spotlight__nav spotlight__nav--next" onClick={() => go(1)} aria-label="Next">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}