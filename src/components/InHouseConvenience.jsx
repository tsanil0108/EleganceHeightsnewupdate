import { useEffect, useRef } from 'react';
import './InHouseConvenience.css';

// ============================================================
// In-House Convenience — alternating editorial rows.
// IMAGE BADALNE KE LIYE: har item ke `image` mein apni file ka
// path daalo, jaise '/images/milk-vendor.png' (public/images me).
// ============================================================
const conveniences = [
  {
    title: 'Milk Vendor',
    image: '/images/MilkVendor.jpeg',
    icon: 'M6 2h6l1 3v2a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V5l1-3zM7 10v10a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V10',
    description: 'Fresh dairy delivered daily to your doorstep — never run out of milk again.',
  },
  {
    title: 'Vegetable Vendor',
    image: '/images/vegetables.png',
    icon: 'M12 2c1 3 4 4 4 8a4 4 0 0 1-8 0c0-4 3-5 4-8zM12 6v14',
    description: 'Farm-fresh vegetables available in-house, handpicked every single morning.',
  },
  {
    title: 'Fresh Fruits',
    image: '/images/Fruits.png',
    icon: 'M12 6c2-2 6-1 6 3 0 5-4 11-6 11S6 14 6 9c0-4 4-5 6-3zM12 6c0-2 1-3 3-4',
    description: 'Seasonal fruits sourced fresh, right within your residential complex.',
  },
  {
    title: 'Laundry Service',
    image: '/images/Laundary.png',
    icon: 'M5 3h14v18H5zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM8 6h.01',
    description: 'Professional wash, dry and fold — pickup and delivery from your floor.',
  },
  {
    title: 'Daily Grocery',
    image: '/images/DailyGrocery.png',
    icon: 'M4 6h16l-1.5 10.5a2 2 0 0 1-2 1.5H7.5a2 2 0 0 1-2-1.5L4 6zM9 10v4M15 10v4',
    description: 'A well-stocked mini-mart for all your everyday household needs.',
  },
];

export default function InHouseConvenience() {
  const rootRef = useRef(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return undefined;
    const rows = node.querySelectorAll('.ihc-row');

    const fallback = setTimeout(() => rows.forEach((r) => r.classList.add('is-in')), 500);

    if (!('IntersectionObserver' in window)) {
      rows.forEach((r) => r.classList.add('is-in'));
      return () => clearTimeout(fallback);
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    rows.forEach((r) => obs.observe(r));

    return () => {
      clearTimeout(fallback);
      obs.disconnect();
    };
  }, []);

  return (
    <section className="section ihc" ref={rootRef}>
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>In-House Convenience</span>
          <h2>Everyday Essentials, Right Downstairs</h2>
          <p className="ihc__sub">
            No more running errands across town. Elegance Heights brings daily needs
            right inside your community.
          </p>
        </div>

        <div className="ihc-rows">
          {conveniences.map((item, i) => (
            <div className={`ihc-row ${i % 2 === 1 ? 'ihc-row--rev' : ''}`} key={item.title}>
              <div className="ihc-row__media">
                <img src={item.image} alt={item.title} loading="lazy" className="ihc-row__img" />
                <span className="ihc-row__num">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="ihc-row__content">
                <span className="ihc-row__icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d={item.icon} />
                  </svg>
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="ihc-row__line" aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}