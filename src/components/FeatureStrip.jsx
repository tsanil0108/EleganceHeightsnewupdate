import Icon from './Icon';
import useScrollReveal from '../hooks/useScrollReveal';
import scrollToHash from '../utils/scroll';
import './FeatureStrip.css';

export default function FeatureStrip({ features, phone }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.3 });

  return (
    <div ref={ref} className={`feature-strip ${isVisible ? 'is-visible' : ''}`}>
      <div className="feature-strip__icons">
        {features.map((f, i) => (
          <div className="feature-strip__item" key={f.label} style={{ transitionDelay: `${i * 70}ms` }}>
            <Icon name={f.icon} size={20} />
            <span>{f.label}</span>
          </div>
        ))}
      </div>

      <div className="feature-strip__cta">
        <a
          href="#contact"
          className="feature-strip__enquire"
          onClick={(e) => {
            e.preventDefault();
            scrollToHash('#contact');
          }}
        >
          Enquire Now for Best Offers
          <Icon name="arrow" size={16} className="feature-strip__enquire-arrow" />
        </a>
        {phone && (
          <a href={`tel:${phone.replace(/\s+/g, '')}`} className="feature-strip__phone">
            <Icon name="phone" size={18} />
            {phone}
          </a>
        )}
      </div>
    </div>
  );
}