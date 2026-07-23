import { useEffect, useRef, useState } from 'react';
import './InHouseConvenience.css';

// ============================================================
// In-House Convenience — interactive split showcase.
// IMAGE BADALNE KE LIYE: har item ke `image` mein apni file ka
// path daalo, jaise '/images/milk-vendor.png' (public/images me).
// ============================================================
const conveniences = [
  {
    title: 'Milk Vendor',
    image: '/images/LivingRoom.png',
    icon: 'M6 2h6l1 3v2a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V5l1-3zM7 10v10a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V10',
    description: 'Fresh dairy delivered daily to your doorstep — never run out of milk again.',
  },
  {
    title: 'Vegetable Vendor',
    image: '/images/Garden.png',
    icon: 'M12 2c1 3 4 4 4 8a4 4 0 0 1-8 0c0-4 3-5 4-8zM12 6v14',
    description: 'Farm-fresh vegetables available in-house, handpicked every single morning.',
  },
  {
    title: 'Fresh Fruits',
    image: '/images/KidsPlayArea.png',
    icon: 'M12 6c2-2 6-1 6 3 0 5-4 11-6 11S6 14 6 9c0-4 4-5 6-3zM12 6c0-2 1-3 3-4',
    description: 'Seasonal fruits sourced fresh, right within your residential complex.',
  },
  {
    title: 'Laundry Service',
    image: '/images/Lobby.png',
    icon: 'M5 3h14v18H5zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM8 6h.01',
    description: 'Professional wash, dry and fold — pickup and delivery from your floor.',
  },

  {
    title: 'Daily Grocery',
    image: '/images/InfinityPool.png',
    icon: 'M4 6h16l-1.5 10.5a2 2 0 0 1-2 1.5H7.5a2 2 0 0 1-2-1.5L4 6zM9 10v4M15 10v4',
    description: 'A well-stocked mini-mart for all your everyday household needs.',
  },
];

export default function InHouseConvenience() {
  const rootRef = useRef(null);
  const [active, setActive] = useState(0);
  const cur = conveniences[active];

  // Reveal the whole block on scroll
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return undefined;
    const fallback = setTimeout(() => node.classList.add('is-in'), 500);
    if (!('IntersectionObserver' in window)) {
      node.classList.add('is-in');
      return () => clearTimeout(fallback);
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            node.classList.add('is-in');
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(node);
    return () => {
      clearTimeout(fallback);
      obs.disconnect();
    };
  }, []);

  return (
    <section className="section ihc">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>In-House Convenience</span>
          <h2>Everyday Essentials, Right Downstairs</h2>
          <p className="ihc__sub">
            No more running errands across town. Elegance Heights brings daily needs
            right inside your community.
          </p>
        </div>

        <div className="ihc__split" ref={rootRef}>
          {/* LEFT — big crossfading image */}
          <div className="ihc__visual">
            {conveniences.map((item, i) => (
              <img
                key={item.title}
                src={item.image}
                alt={item.title}
                className={`ihc__img ${i === active ? 'is-active' : ''}`}
                loading="lazy"
                draggable="false"
              />
            ))}
            <span className="ihc__visual-shade" aria-hidden="true" />

            {/* Floating info chip over the image */}
            <div className="ihc__chip" key={active}>
              <span className="ihc__chip-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d={cur.icon} />
                </svg>
              </span>
              <div>
                <strong>{cur.title}</strong>
                <p>{cur.description}</p>
              </div>
            </div>

            <span className="ihc__count" aria-hidden="true">
              {String(active + 1).padStart(2, '0')}
              <i>/ {String(conveniences.length).padStart(2, '0')}</i>
            </span>
          </div>

          {/* RIGHT — interactive list */}
          <ul className="ihc__list" role="tablist" aria-label="In-house services">
            {conveniences.map((item, i) => (
              <li key={item.title}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  className={`ihc__row ${i === active ? 'is-active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span className="ihc__row-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ihc__row-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d={item.icon} />
                    </svg>
                  </span>
                  <span className="ihc__row-text">
                    <strong>{item.title}</strong>
                    <em>{item.description}</em>
                  </span>
                  <span className="ihc__row-arrow" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                  <i className="ihc__row-line" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}