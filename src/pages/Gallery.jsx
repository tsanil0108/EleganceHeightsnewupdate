import { useEffect, useMemo, useRef, useState } from 'react';
import PageHero from '../components/PageHero';
import Lightbox from '../components/Lightbox';
import SlitShowcase from '../components/SlitShowcase';
import { galleryImages } from '../data/siteData';
import './Gallery.css';

const categories = ['All', 'Exterior', 'Interior', 'Amenity'];

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const gridRef = useRef(null);

  const filtered = useMemo(
    () => (filter === 'All' ? galleryImages : galleryImages.filter((g) => g.category === filter)),
    [filter]
  );

  // Photo count per category, shown on the filter buttons
  const counts = useMemo(() => {
    const map = { All: galleryImages.length };
    galleryImages.forEach((g) => {
      map[g.category] = (map[g.category] || 0) + 1;
    });
    return map;
  }, []);

  // Memoized so the showcase only resets when the filter actually changes
  const carouselItems = useMemo(
    () => filtered.map((g) => ({ image: g.image, title: g.caption, category: g.category })),
    [filtered]
  );

  const lightboxItems = useMemo(
    () => filtered.map((g) => ({ image: g.image, caption: g.caption, category: g.category })),
    [filtered]
  );

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const showNext = () => setLightboxIndex((i) => (i === null ? i : (i + 1) % lightboxItems.length));
  const showPrev = () => setLightboxIndex((i) => (i === null ? i : (i - 1 + lightboxItems.length) % lightboxItems.length));

  const handleFilter = (cat) => {
    setFilter(cat);
    setLightboxIndex(null);
  };

  // Scroll-reveal for the thumbnail grid — items fade in one by one
  useEffect(() => {
    const node = gridRef.current;
    if (!node) return undefined;
    const items = node.querySelectorAll('.gallery-item');

    // Fallback: guarantee visibility even if the observer never fires
    const fallback = setTimeout(() => {
      items.forEach((el) => el.classList.add('is-visible'));
    }, 500);

    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return () => clearTimeout(fallback);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    );
    items.forEach((el) => observer.observe(el));

    return () => {
      clearTimeout(fallback);
      observer.disconnect();
    };
  }, [filtered]);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Elegance in"
        accent="Every Frame"
        description="A closer look at the facade, interiors, and amenity spaces that make Elegance Heights feel like home from the first walkthrough."
        bgImage="/images/SkylineView.png"
      />

      <section className="section gallery-section">
        <div className="container">
          <div className="gallery-filters" role="tablist" aria-label="Filter gallery by category">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={filter === c}
                className={`gallery-filter ${filter === c ? 'is-active' : ''}`}
                onClick={() => handleFilter(c)}
              >
                {c} ({counts[c] || 0})
              </button>
            ))}
          </div>

          {/* Cinematic slit-reveal showcase of the filtered gallery images */}
          <SlitShowcase
            items={carouselItems}
            onSelect={(i) => openLightbox(i)}
            autoPlayMs={1000}
          />

          {/* Browse all — thumbnail masonry grid, click any photo for fullscreen */}
          <div className="section-head center" style={{ marginTop: 'var(--space-xl)' }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Browse All</span>
            <h2>Every Photo, One Glance</h2>
          </div>

          <div className="gallery-grid" ref={gridRef} key={filter}>
            {filtered.map((g, i) => (
              <button
                type="button"
                className="gallery-item"
                key={g.id || `${g.caption}-${i}`}
                style={{ '--i': i }}
                onClick={() => openLightbox(i)}
                aria-label={`View ${g.caption} full size`}
              >
                <img
                  src={g.image}
                  alt={g.caption}
                  className="img-placeholder__img"
                  loading="lazy"
                />
                <span className="gallery-item__caption">
                  <span className="gallery-item__category">{g.category}</span>
                  {g.caption}
                </span>
                <span className="gallery-item__expand" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 3H4a1 1 0 0 0-1 1v5M15 3h5a1 1 0 0 1 1 1v5M9 21H4a1 1 0 0 1-1-1v-5M15 21h5a1 1 0 0 0 1-1v-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
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