import { useEffect, useMemo, useRef, useState } from 'react';
import PageHero from '../components/PageHero';
import Lightbox from '../components/Lightbox';
import Icon from '../components/Icon';
import { amenities } from '../data/siteData';
import './Amenities.css';

const categories = ['All', ...Array.from(new Set(amenities.map((a) => a.category)))];

function AmenityCard({ item, index, onOpen, onHoverStart, onHoverEnd }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="am-card-wrap" ref={wrapRef} style={{ '--i': index % 12 }}>
      <button
        type="button"
        className="am-card"
        onClick={onOpen}
        onMouseEnter={() => onHoverStart(item)}
        onMouseLeave={onHoverEnd}
        onFocus={() => onHoverStart(item)}
        onBlur={onHoverEnd}
      >
        <span className="am-card__photo">
          <img src={item.image} alt={item.title} loading="lazy" />
        </span>
        <span className="am-card__info">
          <span className="am-card__icon">
            <Icon title={item.title} size={22} gold />
          </span>
          <span className="am-card__text">
            <span className="am-card__title">{item.title}</span>
            <span className="am-card__category">{item.category}</span>
          </span>
        </span>
      </button>
    </div>
  );
}

export default function Amenities() {
  const [active, setActive] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [hoverItem, setHoverItem] = useState(null);
  const hoverTimer = useRef(null);

  const visible = useMemo(
    () => (active === 'All' ? amenities : amenities.filter((a) => a.category === active)),
    [active]
  );

  const lightboxItems = useMemo(
    () => visible.map((a) => ({ image: a.image, caption: a.title, category: a.category })),
    [visible]
  );

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const showNext = () => setLightboxIndex((i) => (i === null ? i : (i + 1) % lightboxItems.length));
  const showPrev = () => setLightboxIndex((i) => (i === null ? i : (i - 1 + lightboxItems.length) % lightboxItems.length));

  const handleFilter = (cat) => {
    setActive(cat);
    setLightboxIndex(null);
    setHoverItem(null);
  };

  // Small delay before showing the preview so a quick mouse pass-over
  // across the grid doesn't flicker a popup for every card.
  const handleHoverStart = (item) => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setHoverItem(item), 120);
  };

  const handleHoverEnd = () => {
    clearTimeout(hoverTimer.current);
    setHoverItem(null);
  };

  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  return (
    <>
      <PageHero
        eyebrow="World-Class Amenities"
        title="Designed for an"
        accent="Elevated Lifestyle"
        description="Elegance Heights offers a thoughtfully curated range of lifestyle amenities that bring comfort, wellness, recreation, and community together — all elevated above the ordinary."
        bgImage="/images/SkylineView.png"
      />

      <section className="section am-section">
        <div className="container">
          <div className="am-filters" role="tablist" aria-label="Filter amenities by category">
            {categories.map((cat, i) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active === cat}
                className={`am-chip ${active === cat ? 'am-chip--active' : ''}`}
                style={{ '--d': `${i * 55}ms` }}
                onClick={() => handleFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="am-grid">
            {visible.map((item, i) => (
              <AmenityCard
                key={item.title}
                item={item}
                index={i}
                onOpen={() => openLightbox(i)}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Fixed-position hover preview — escapes any parent overflow clipping,
          so the image reliably opens large on hover regardless of device. */}
      <div className={`am-preview ${hoverItem ? 'is-open' : ''}`} aria-hidden={!hoverItem}>
        {hoverItem && (
          <div className="am-preview__card">
            <img src={hoverItem.image} alt={hoverItem.title} className="am-preview__img" />
            <div className="am-preview__caption">
              <strong>{hoverItem.title}</strong>
              <span>{hoverItem.category}</span>
            </div>
          </div>
        )}
      </div>

      <Lightbox
        items={lightboxItems}
        index={lightboxIndex}
        onClose={closeLightbox}
        onNext={showNext}
        onPrev={showPrev}
      />
    </>
  );
}