import { useEffect } from 'react';
import './Lightbox.css';

// Fullscreen image lightbox with prev/next navigation.
// Props: items [{ image, caption, category? }], index (null = closed),
// onClose, onNext, onPrev
export default function Lightbox({ items, index, onClose, onNext, onPrev }) {
  const open = index !== null && items && items.length > 0;

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose, onNext, onPrev]);

  if (!open) return null;
  const item = items[index % items.length];

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.caption || 'Image preview'} onClick={onClose}>
      <button type="button" className="lightbox__close" aria-label="Close" onClick={onClose}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      {items.length > 1 && (
        <button
          type="button"
          className="lightbox__nav lightbox__nav--prev"
          aria-label="Previous image"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
        <img src={item.image} alt={item.caption || ''} />
        {(item.caption || item.category) && (
          <figcaption>
            {item.category && <span>{item.category}</span>}
            {item.caption && <strong>{item.caption}</strong>}
            {items.length > 1 && <em>{(index % items.length) + 1} / {items.length}</em>}
          </figcaption>
        )}
      </figure>

      {items.length > 1 && (
        <button
          type="button"
          className="lightbox__nav lightbox__nav--next"
          aria-label="Next image"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}