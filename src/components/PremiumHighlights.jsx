import Icon from './Icon';
import useScrollReveal from '../hooks/useScrollReveal';
import './PremiumHighlights.css';

// Premium luxury USP grid. Pass any array shaped like `premiumUSPs` from
// siteData.js — items with `featured: true` render as the larger,
// badge-highlighted signature card (used for the valet-parking USP).
export default function PremiumHighlights({ items }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.08 });

  return (
    <div ref={ref} className={`premium-highlights ${isVisible ? 'is-visible' : ''}`}>
      {items.map((item, i) => (
        <div
          className={`premium-highlights__card ${item.featured ? 'premium-highlights__card--featured' : ''}`}
          key={item.title}
          style={{ transitionDelay: `${Math.min(i, 6) * 70}ms` }}
        >
          {item.badge && <span className="premium-highlights__badge">{item.badge}</span>}
          <span className="premium-highlights__icon">
            <Icon name={item.icon} size={item.featured ? 26 : 22} />
          </span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          {item.note && <p className="premium-highlights__note">{item.note}</p>}
        </div>
      ))}
    </div>
  );
}