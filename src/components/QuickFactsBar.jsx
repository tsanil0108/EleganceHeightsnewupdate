import Icon from './Icon';
import useScrollReveal from '../hooks/useScrollReveal';
import './QuickFactsBar.css';

export default function QuickFactsBar({ facts }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.3 });

  return (
    <div ref={ref} className={`quick-facts ${isVisible ? 'is-visible' : ''}`}>
      {facts.map((fact, i) => (
        <div className="quick-facts__item" key={fact.label} style={{ transitionDelay: `${i * 90}ms` }}>
          <span className="quick-facts__icon">
            <Icon name={fact.icon} size={22} />
          </span>
          <span className="quick-facts__label">{fact.label}</span>
        </div>
      ))}
    </div>
  );
}