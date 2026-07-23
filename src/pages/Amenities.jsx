import { useMemo, useState } from 'react';
import PageHero from '../components/PageHero';
import Lightbox from '../components/Lightbox';
import CoverflowCarousel from '../components/CoverflowCarousel';
import { amenities } from '../data/siteData';
import './Amenities.css';

const categories = ['All', ...Array.from(new Set(amenities.map((a) => a.category)))];

export default function Amenities() {
  const [active, setActive] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const visible = useMemo(
    () => (active === 'All' ? amenities : amenities.filter((a) => a.category === active)),
    [active]
  );

  const carouselItems = useMemo(
    () => visible.map((a) => ({ image: a.image, title: a.title, category: a.category })),
    [visible]
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

      <section className="section amenities-grid-section">
        <div className="container">
          <div className="amenities-filters" role="tablist" aria-label="Filter amenities by category">
            {categories.map((cat, i) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active === cat}
                className={`amenities-chip ${active === cat ? 'amenities-chip--active' : ''}`}
                style={{ animationDelay: `${i * 60}ms` }}
                onClick={() => handleFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 3D coverflow showcase of the filtered amenities */}
          <CoverflowCarousel
            items={carouselItems}
            onSelect={(i) => openLightbox(i)}
            autoPlayMs={1000}
          />
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