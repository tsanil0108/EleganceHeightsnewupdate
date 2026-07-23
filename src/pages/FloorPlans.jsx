import { useEffect, useState } from 'react';
import PageHero from '../components/PageHero';
import ImagePlaceholder from '../components/ImagePlaceholder';
import Button from '../components/Button';
import Icon from '../components/Icon';
import useScrollReveal from '../hooks/useScrollReveal';
import scrollToHash from '../utils/scroll';
import './FloorPlans.css';

// ============================================================
// 1 BHK plan
// ============================================================
const plan1bhk = {
  id: '1bhk-343',
  type: '1 BHK',
  sqft: '343 sq.ft.',
  image: '/images/1_BHK_Layout.png',
  configuration: 'Living / Kitchen, 1 Bedroom, 1 Bathroom',
  description:
    '1 BHK — 343 sq.ft. RERA carpet area. Efficient layout with living/kitchen, a comfortable bedroom and a modern bathroom.',
  beds: 1,
  baths: 1,
  price: 'On Request',
};

// ============================================================
// 2 BHK size variants — har size ki APNI image aur description.
// IMAGE BADALNE KE LIYE: har size ke `image` mein apni file ka
// path daalo, jaise '/images/2BHK_456.png'
// (file public/images folder mein honi chahiye).
// ============================================================
const plans2bhk = [
  {
    id: '2bhk-456',
    type: '2 BHK',
    sqft: '456 sq.ft.',
    image: '/images/2_BHK_Layout.png',
    configuration: 'Living / Kitchen, 2 Bedrooms, 2 Bathrooms',
    description:
      '2 BHK — 456 sq.ft. RERA carpet area. Compact yet efficient layout with living/dining, well-planned kitchen, 2 bedrooms and 2 modern toilets.',
    beds: 2,
    baths: 2,
    price: 'On Request',
  },
  {
    id: '2bhk-479',
    type: '2 BHK',
    sqft: '479 sq.ft.',
    image: '/images/2_BHK_Layout.png',
    configuration: 'Living / Kitchen, 2 Bedrooms, 2 Bathrooms',
    description:
      '2 BHK — 479 sq.ft. RERA carpet area. Balanced layout with a wider living space, 2 bedrooms, 2 toilets and smart storage throughout.',
    beds: 2,
    baths: 2,
    price: 'On Request',
  },
  {
    id: '2bhk-488',
    type: '2 BHK',
    sqft: '488 sq.ft.',
    image: '/images/2_BHK_Layout.png',
    configuration: 'Living / Kitchen, 2 Bedrooms, 2 Bathrooms',
    description:
      '2 BHK — 488 sq.ft. RERA carpet area. Spacious living & dining, well-planned kitchen, 2 bedrooms with cross-ventilation and 2 toilets.',
    beds: 2,
    baths: 2,
    price: 'On Request',
  },
  {
    id: '2bhk-489',
    type: '2 BHK',
    sqft: '489 sq.ft.',
    image: '/images/2_BHK_Layout.png',
    configuration: 'Living / Kitchen, 2 Bedrooms, 2 Bathrooms',
    description:
      '2 BHK — 489 sq.ft. RERA carpet area. Thoughtful layout with generous bedroom sizes, modern kitchen and 2 toilets.',
    beds: 2,
    baths: 2,
    price: 'On Request',
  },
  {
    id: '2bhk-495',
    type: '2 BHK',
    sqft: '495 sq.ft.',
    image: '/images/2_BHK_Layout.png',
    configuration: 'Living / Kitchen, 2 Bedrooms, 2 Bathrooms',
    description:
      '2 BHK — 495 sq.ft. RERA carpet area. Premium corner layout with extra natural light, spacious living/dining and 2 bedrooms.',
    beds: 2,
    baths: 2,
    price: 'On Request',
  },
  {
    id: '2bhk-498',
    type: '2 BHK',
    sqft: '498 sq.ft.',
    image: '/images/2_BHK_Layout.png',
    configuration: 'Living / Kitchen, 2 Bedrooms, 2 Bathrooms',
    description:
      '2 BHK — 498 sq.ft. RERA carpet area. The largest 2 BHK layout — expansive living area, 2 spacious bedrooms, 2 toilets and smart storage.',
    beds: 2,
    baths: 2,
    price: 'On Request',
  },
];

// ---------- Zoom viewer (click image → fullscreen with +/− zoom) ----------
function ZoomViewer({ src, alt, onClose }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const zoomIn = () => setScale((s) => Math.min(4, +(s + 0.5).toFixed(2)));
  const zoomOut = () => setScale((s) => Math.max(1, +(s - 0.5).toFixed(2)));

  return (
    <div className="zoomview" role="dialog" aria-modal="true" aria-label={alt} onClick={onClose}>
      <div className="zoomview__controls" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={zoomOut} aria-label="Zoom out">−</button>
        <span>{Math.round(scale * 100)}%</span>
        <button type="button" onClick={zoomIn} aria-label="Zoom in">+</button>
        <button type="button" onClick={() => setScale(1)} aria-label="Reset zoom">Reset</button>
        <button type="button" className="zoomview__close" onClick={onClose} aria-label="Close">✕</button>
      </div>
      <div className="zoomview__stage" onClick={(e) => e.stopPropagation()}>
        <img
          src={src}
          alt={alt}
          style={{ width: `${scale * 100}%` }}
          onDoubleClick={() => setScale((s) => (s === 1 ? 2 : 1))}
          draggable="false"
        />
      </div>
      <p className="zoomview__hint">Double-click image to zoom • Scroll to pan • Esc to close</p>
    </div>
  );
}

export default function FloorPlans() {
  const [mainTab, setMainTab] = useState('1bhk'); // '1bhk' | '2bhk'
  const [activeId, setActiveId] = useState(plan1bhk.id);
  const [zoomSrc, setZoomSrc] = useState(null);
  const [masterRef, masterVisible] = useScrollReveal({ threshold: 0.1 });

  const is2bhk = mainTab === '2bhk';
  const current = is2bhk
    ? plans2bhk.find((p) => p.id === activeId) || plans2bhk[0]
    : plan1bhk;

  const handleMainTab = (tab) => {
    setMainTab(tab);
    setActiveId(tab === '2bhk' ? plans2bhk[0].id : plan1bhk.id);
  };

  return (
    <>
      <PageHero
        eyebrow="Floor Plans"
        title="Thoughtfully Designed"
        accent="Homes for Modern Living"
        description="Choose between 1 BHK and 2 BHK layouts, each planned for cross-ventilation, natural light, and a sense of space rarely found at this price point."
        bgImage="/images/FloorPlanOverview.png"
      />

      <section className="section floorplans-section">
        <div className="container">
          {/* Main divs: 1 BHK — 343 | 2 BHK — 456–498 */}
          <div className="floorplans-tabs" role="tablist" aria-label="Select floor plan type">
            <button
              type="button"
              role="tab"
              aria-selected={!is2bhk}
              className={`floorplans-tab ${!is2bhk ? 'is-active' : ''}`}
              onClick={() => handleMainTab('1bhk')}
            >
              <span className="floorplans-tab__icon">
                <Icon name="floorplan" size={18} />
              </span>
              <span className="floorplans-tab__text">
                <strong>1 BHK</strong>
                <em>343 sq.ft.</em>
              </span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={is2bhk}
              className={`floorplans-tab ${is2bhk ? 'is-active' : ''}`}
              onClick={() => handleMainTab('2bhk')}
            >
              <span className="floorplans-tab__icon">
                <Icon name="floorplan" size={18} />
              </span>
              <span className="floorplans-tab__text">
                <strong>2 BHK</strong>
                <em>456 sq.ft. – 498 sq.ft.</em>
              </span>
            </button>
          </div>

          {/* 2 BHK par click hote hi — har size ka apna card */}
          {is2bhk && (
            <div className="floorplans-tabs floorplans-tabs--sub" role="tablist" aria-label="Select 2 BHK size">
              {plans2bhk.map((fp) => (
                <button
                  key={fp.id}
                  type="button"
                  role="tab"
                  aria-selected={activeId === fp.id}
                  className={`floorplans-tab floorplans-tab--sub ${activeId === fp.id ? 'is-active' : ''}`}
                  onClick={() => setActiveId(fp.id)}
                >
                  <span className="floorplans-tab__icon">
                    <Icon name="floorplan" size={16} />
                  </span>
                  <span className="floorplans-tab__text">
                    <strong>{fp.type}</strong>
                    <em>{fp.sqft}</em>
                  </span>
                </button>
              ))}
            </div>
          )}

          <div className="floorplans-detail" key={current.id}>
            <button
              type="button"
              className="floorplans-detail__image"
              onClick={() => setZoomSrc(current.image)}
              aria-label={`Zoom ${current.type} ${current.sqft} floor plan`}
            >
              <span className="floorplans-detail__badge">
                <Icon name="floorplan" size={14} />
                {current.sqft} Carpet Area
              </span>
              <span className="floorplans-detail__zoomhint" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M11 8v6M8 11h6M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                Zoom
              </span>
              <ImagePlaceholder
                label={`${current.type} — Layout`}
                src={current.image}
                alt={`${current.type} ${current.sqft} floor plan layout`}
                ratio="4/3"
              />
            </button>

            <div className="floorplans-detail__specs">
              <span className="eyebrow">Configuration</span>
              <h2>{current.type} — {current.sqft}</h2>
              <p className="floorplans-detail__config">{current.configuration}</p>
              <p className="floorplans-detail__desc">{current.description}</p>

              <div className="floorplans-detail__pills">
                <div className="floorplans-pill">
                  <span className="floorplans-pill__icon">
                    <Icon name="bed" size={18} />
                  </span>
                  <div>
                    <strong>{current.beds}</strong>
                    <span>{current.beds > 1 ? 'Bedrooms' : 'Bedroom'}</span>
                  </div>
                </div>
                <div className="floorplans-pill">
                  <span className="floorplans-pill__icon">
                    <Icon name="bath" size={18} />
                  </span>
                  <div>
                    <strong>{current.baths}</strong>
                    <span>{current.baths > 1 ? 'Bathrooms' : 'Bathroom'}</span>
                  </div>
                </div>
                <a
                  href="#contact"
                  className="floorplans-pill floorplans-pill--link"
                  aria-label="Enquire about price — open contact form"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHash('#contact');
                  }}
                >
                  <span className="floorplans-pill__icon">
                    <Icon name="rupee" size={18} />
                  </span>
                  <div>
                    <strong>{current.price}</strong>
                    <span>Price — Tap to Enquire</span>
                  </div>
                </a>
                <div className="floorplans-pill">
                  <span className="floorplans-pill__icon">
                    <Icon name="calendar" size={18} />
                  </span>
                  <div>
                    <strong>Dec 2029</strong>
                    <span>Possession</span>
                  </div>
                </div>
              </div>

              <Button to="#contact" variant="primary" size="lg">Request Full Layout &amp; Pricing</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section floorplans-master">
        <div className="container" ref={masterRef}>
          <div className={`section-head center reveal ${masterVisible ? 'in-view' : ''}`}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Master Plan</span>
            <h2>Tower Layout &amp; Unit Distribution</h2>
          </div>
          <button
            type="button"
            className={`floorplans-master__frame reveal ${masterVisible ? 'in-view' : ''}`}
            onClick={() => setZoomSrc('/images/FloorPlanOverview.png')}
            aria-label="Zoom master floor plate"
          >
            <ImagePlaceholder label="Master Floor Plate — All Units" src="/images/FloorPlanOverview.png" ratio="21/9" />
          </button>
        </div>
      </section>

      {zoomSrc && (
        <ZoomViewer src={zoomSrc} alt="Floor plan — zoom view" onClose={() => setZoomSrc(null)} />
      )}
    </>
  );
}