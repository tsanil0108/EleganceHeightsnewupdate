import useScrollReveal from '../hooks/useScrollReveal';
import './StatStrip.css';

export default function StatStrip({ stats, variant = 'light' }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`stat-strip stat-strip--${variant} ${isVisible ? 'is-visible' : ''}`}
      style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}
    >
      {stats.map((stat, i) => (
        <div
          className="stat-strip__item"
          key={i}
          style={{ transitionDelay: `${i * 90}ms` }}
        >
          <span className="stat-strip__value">{stat.value}</span>
          <span className="stat-strip__label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}