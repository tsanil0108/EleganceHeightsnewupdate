import { useState } from 'react';
import Icon from './Icon';
import scrollToHash from '../utils/scroll';
import './FloorPlanCard.css';

export default function FloorPlanCard({ plan, index = 0 }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleViewPlan = (event) => {
    event.preventDefault();
    event.stopPropagation();
    sessionStorage.setItem('selectedFloorPlanId', plan.id);
    scrollToHash('#floor-plans');
  };

  const handleEnquire = (event) => {
    event.preventDefault();
    event.stopPropagation();
    scrollToHash('#contact');
  };

  // FloorPlans.jsx ke detail page jaisi fields — Project.jsx ki preview
  // list mein yeh na ho to sensible fallback dikhate hain.
  const description = plan.description || plan.configuration;
  const price = plan.price || 'On Request';
  const possession = plan.possession || 'Dec 2029';

  return (
    <div
      className={`floor-plan-card ${isOpen ? 'is-open' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="floor-plan-card__image">
        <img src={plan.image} alt={`${plan.type} floor plan`} loading="lazy" />
        <span className="floor-plan-card__badge">{plan.type}</span>
      </div>

      {/* Base info — hamesha visible */}
      <div className="floor-plan-card__body">
        <div className="floor-plan-card__meta">
          <span className="floor-plan-card__area">{plan.carpetArea}</span>
          <span className="floor-plan-card__dot" aria-hidden="true" />
          <span className="floor-plan-card__config">{plan.configuration}</span>
        </div>

        <a href="#floor-plans" className="floor-plan-card__link" onClick={handleViewPlan}>
          View Plan
          <Icon name="arrow" size={15} />
        </a>
      </div>

      {/* Hover / tap pe khulne wala poora detail panel — image 2 jaisa */}
      <div className="floor-plan-card__details">
        <div className="floor-plan-card__details-inner">
          <span className="eyebrow floor-plan-card__eyebrow">Configuration</span>
          <h4 className="floor-plan-card__title">
            {plan.type} — {plan.carpetArea}
          </h4>
          <p className="floor-plan-card__desc">{description}</p>

          <div className="floor-plan-card__pills">
            {plan.beds != null && (
              <div className="floor-plan-card__pill">
                <Icon name="bed" size={16} />
                <div>
                  <strong>{plan.beds}</strong>
                  <span>{plan.beds > 1 ? 'Beds' : 'Bed'}</span>
                </div>
              </div>
            )}
            {plan.baths != null && (
              <div className="floor-plan-card__pill">
                <Icon name="bath" size={16} />
                <div>
                  <strong>{plan.baths}</strong>
                  <span>{plan.baths > 1 ? 'Baths' : 'Bath'}</span>
                </div>
              </div>
            )}
            <a
              href="#contact"
              className="floor-plan-card__pill floor-plan-card__pill--link"
              onClick={handleEnquire}
            >
              <Icon name="rupee" size={16} />
              <div>
                <strong>{price}</strong>
                <span>Tap to Enquire</span>
              </div>
            </a>
            <div className="floor-plan-card__pill">
              <Icon name="calendar" size={16} />
              <div>
                <strong>{possession}</strong>
                <span>Possession</span>
              </div>
            </div>
          </div>

          <button type="button" className="floor-plan-card__cta" onClick={handleViewPlan}>
            Request Full Layout &amp; Pricing
          </button>
        </div>
      </div>
    </div>
  );
}