import { useEffect, useMemo, useRef, useState } from 'react';
import PageHero from '../components/PageHero';
import Lightbox from '../components/Lightbox';
import Icon from '../components/Icon';
import { amenities } from '../data/siteData';
import './Amenities.css';

const categories = ['All', ...Array.from(new Set(amenities.map((a) => a.category)))];

const MAX_TILT = 10; // degrees
const isCoarsePointer =
  typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches;

function AmenityCard({ item, index, onOpen }) {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const frame = useRef(null);

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

  const handleMouseMove = (e) => {
    if (isCoarsePointer) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0 → 1
    const py = (e.clientY - rect.top) / rect.height; // 0 → 1

    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const ry = (px - 0.5) * MAX_TILT * 2;
      const rx = (0.5 - py) * MAX_TILT * 2;
      card.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
      card.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
      card.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      card.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  };

  return (
    <div className="am-card-wrap" ref={wrapRef} style={{ '--i': index % 12 }}>
      <button
        type="button"
        ref={cardRef}
        className="am-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onOpen}
      >
        <span className="am-card__glare" aria-hidden="true" />
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
  };

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
              <AmenityCard key={item.title} item={item} index={i} onOpen={() => openLightbox(i)} />
            ))}
          </div>
        </div>
      </section>

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