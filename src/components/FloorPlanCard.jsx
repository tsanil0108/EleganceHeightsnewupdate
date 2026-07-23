import Icon from './Icon';
import scrollToHash from '../utils/scroll';
import './FloorPlanCard.css';

export default function FloorPlanCard({ plan, index = 0 }) {
  return (
    <div className="floor-plan-card" style={{ transitionDelay: `${index * 100}ms` }}>
      <div className="floor-plan-card__image">
        <img src={plan.image} alt={`${plan.type} floor plan`} loading="lazy" />
        <span className="floor-plan-card__badge">{plan.type}</span>
      </div>
      <div className="floor-plan-card__body">
        <div className="floor-plan-card__meta">
          <span className="floor-plan-card__area">{plan.carpetArea}</span>
          <span className="floor-plan-card__dot" aria-hidden="true" />
          <span className="floor-plan-card__config">{plan.configuration}</span>
        </div>
        <a
          href="#floor-plans"
          className="floor-plan-card__link"
          onClick={(e) => {
            e.preventDefault();
            scrollToHash('#floor-plans');
          }}
        >
          View Plan
          <Icon name="arrow" size={15} />
        </a>
      </div>
    </div>
  );
}