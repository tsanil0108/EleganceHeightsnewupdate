import { useEffect, useState } from 'react';
import ImagePlaceholder from '../components/ImagePlaceholder';
import Button from '../components/Button';
import Icon from '../components/Icon';
import scrollToHash from '../utils/scroll';
import './FloorPlans.css';

// ============================================================
// 1 BHK plan
// ============================================================
const plan1bhk = {
  id: '1bhk-343',
  type: '1 BHK',
  sqft: '343 sq.ft.',
  image: '/images/1_BHK-343sq.png',
  configuration: 'Living / Kitchen, 1 Bedroom, 1 Bathroom',
  description:
    '1 BHK — 343 sq.ft. RERA carpet area. Efficient layout with living/kitchen, a comfortable bedroom and a modern bathroom.',
  beds: 1,
  baths: 1,
  price: 'On Request',
};

const plans2bhk = [
  {
    id: '2bhk-456',
    type: '2 BHK',
    sqft: '456 sq.ft.',
    image: '/images/2_BHK-456sq.png',
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
    image: '/images/2_BHK-479sq.png',
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
    image: '/images/2_BHK-488sq.png',
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
    image: '/images/2_BHK-489sq.png',
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
    image: '/images/2_BHK-495sq.png',
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
    image: '/images/2_BHK-498sq.png',
    configuration: 'Living / Kitchen, 2 Bedrooms, 2 Bathrooms',
    description:
      '2 BHK — 498 sq.ft. RERA carpet area. The largest 2 BHK layout — expansive living area, 2 spacious bedrooms, 2 toilets and smart storage.',
    beds: 2,
    baths: 2,
    price: 'On Request',
  },
];

// ============================================================
// Zoom viewer
// ============================================================
function ZoomViewer({ src, alt, onClose }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const zoomIn = () => {
    setScale((currentScale) => Math.min(4, +(currentScale + 0.5).toFixed(2)));
  };

  const zoomOut = () => {
    setScale((currentScale) => Math.max(1, +(currentScale - 0.5).toFixed(2)));
  };

  const resetZoom = () => {
    setScale(1);
  };

  const handleDoubleClick = () => {
    setScale((currentScale) => (currentScale === 1 ? 2 : 1));
  };

  return (
    <div
      className="zoomview"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <div className="zoomview__controls" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={zoomOut} aria-label="Zoom out" disabled={scale <= 1}>
          −
        </button>
        <span>{Math.round(scale * 100)}%</span>
        <button type="button" onClick={zoomIn} aria-label="Zoom in" disabled={scale >= 4}>
          +
        </button>
        <button type="button" onClick={resetZoom} aria-label="Reset zoom">
          Reset
        </button>
        <button type="button" className="zoomview__close" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>

      <div className="zoomview__stage" onClick={(event) => event.stopPropagation()}>
        <img
          src={src}
          alt={alt}
          style={{ width: `${scale * 100}%` }}
          onDoubleClick={handleDoubleClick}
          draggable={false}
        />
      </div>

      <p className="zoomview__hint">
        Double-click image to zoom • Scroll to pan • Esc to close
      </p>
    </div>
  );
}

// ============================================================
// Floor Plans page/section
// ============================================================
export default function FloorPlans() {
  const [mainTab, setMainTab] = useState('1bhk');
  const [activeId, setActiveId] = useState(plan1bhk.id);
  const [zoomSrc, setZoomSrc] = useState(null);

  // Router nahi hai — FloorPlanCard "View Plan" click karne par
  // sessionStorage mein planId chhod jaata hai. Mount hote hi
  // yahan padh kar sahi tab + card select kar lete hain, phir clear.
  useEffect(() => {
    const incomingId = sessionStorage.getItem('selectedFloorPlanId');
    if (!incomingId) return;

    const is2bhkPlan = plans2bhk.some((plan) => plan.id === incomingId);
    setMainTab(is2bhkPlan ? '2bhk' : '1bhk');
    setActiveId(incomingId);
    sessionStorage.removeItem('selectedFloorPlanId');
  }, []);

  const is2bhk = mainTab === '2bhk';

  const current = is2bhk
    ? plans2bhk.find((plan) => plan.id === activeId) || plans2bhk[0]
    : plan1bhk;

  const handleMainTab = (tab) => {
    setMainTab(tab);
    setActiveId(tab === '2bhk' ? plans2bhk[0].id : plan1bhk.id);
  };

  const handlePriceEnquiry = (event) => {
    event.preventDefault();
    scrollToHash('#contact');
  };

  return (
    <>
      <section className="fp-hero" id="floor-plans">
        <div className="container fp-hero__inner">
          <div className="fp-hero__text">
            <span className="eyebrow eyebrow--light">Floor Plans</span>
            <h1>
              Thoughtfully Designed{' '}
              <span className="text-accent">Homes for Modern Living</span>
            </h1>
            <p>
              Choose between 1 BHK and 2 BHK layouts, each planned for
              cross-ventilation, natural light, and a sense of space rarely
              found at this price point.
            </p>
          </div>

          <button
            type="button"
            className="fp-hero__plate"
            onClick={() => setZoomSrc('/images/FloorPlanOverview.png')}
            aria-label="Zoom typical floor plan"
          >
            <span className="fp-hero__plate-label">Typical Floor Plate</span>
            <span className="fp-hero__plate-zoom" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                <path d="M11 8v6M8 11h6M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Zoom
            </span>
            <img src="/images/FloorPlanOverview.png" alt="Typical floor plate layout" />
          </button>
        </div>
      </section>

      <section className="section floorplans-section">
        <div className="container">
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

          {is2bhk && (
            <div className="floorplans-tabs floorplans-tabs--sub" role="tablist" aria-label="Select 2 BHK size">
              {plans2bhk.map((floorPlan) => (
                <button
                  key={floorPlan.id}
                  type="button"
                  role="tab"
                  aria-selected={activeId === floorPlan.id}
                  className={`floorplans-tab floorplans-tab--sub ${
                    activeId === floorPlan.id ? 'is-active' : ''
                  }`}
                  onClick={() => setActiveId(floorPlan.id)}
                >
                  <span className="floorplans-tab__icon">
                    <Icon name="floorplan" size={16} />
                  </span>
                  <span className="floorplans-tab__text">
                    <strong>{floorPlan.type}</strong>
                    <em>{floorPlan.sqft}</em>
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
              <h2>
                {current.type} — {current.sqft}
              </h2>
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
                  onClick={handlePriceEnquiry}
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

              <Button to="#contact" variant="primary" size="lg">
                Request Full Layout &amp; Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {zoomSrc && (
        <ZoomViewer src={zoomSrc} alt="Floor plan — zoom view" onClose={() => setZoomSrc(null)} />
      )}
    </>
  );
}