import { useEffect, useRef } from 'react';
import PageHero from '../components/PageHero';
import Icon from '../components/Icon';
import { connectivity, siteInfo } from '../data/siteData';
import './Location.css';

// Real Google Maps embed of the project address — no API key required
const ADDRESS_QUERY = encodeURIComponent(
  'Elegance Heights, Next to Shankar Mandir, Shivaji Nagar, Kurar Village, Malad East, Mumbai 400097'
);

const MAP_EMBED_URL = `https://www.google.com/maps?q=${ADDRESS_QUERY}&output=embed`;

const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${ADDRESS_QUERY}`;

export default function Location() {
  const gridRef = useRef(null);

  useEffect(() => {
    const node = gridRef.current;

    if (!node) return undefined;

    const cards = node.querySelectorAll('.loc-card');

    const fallback = setTimeout(() => {
      cards.forEach((card) => {
        card.classList.add('is-visible');
      });
    }, 500);

    if (!('IntersectionObserver' in window)) {
      cards.forEach((card) => {
        card.classList.add('is-visible');
      });

      return () => clearTimeout(fallback);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    cards.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  const phoneNumber = siteInfo.phone.replace(/\s+/g, '');

  return (
    <>
      <PageHero
        eyebrow="Location"
        title="Well Connected."
        accent="Perfectly Located."
        description="Elegance Heights is strategically located in Malad East, with convenient access to the highway, railway station, schools, hospitals, malls and everyday essentials."
        imageLabel="Location Map — Malad East"
        imageVideo="/images/maplocation.mp4"
      />

      {/* Google Map */}
      <section className="section location-map-section">
        <div className="container">
          <div className="location-map">
            <div className="location-map__frame">
              <iframe
                title="Elegance Heights Location Map"
                src={MAP_EMBED_URL}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Floating address card */}
            <div className="location-map__card">
              <span className="location-map__card-eyebrow">
                Project Address
              </span>

              <h3>Elegance Heights</h3>

              <p>{siteInfo.address}</p>

              <div className="location-map__card-actions">
                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="location-map__btn location-map__btn--gold"
                  aria-label="Get directions to Elegance Heights"
                >
                  <Icon name="pin" size={15} />
                  <span>Get Directions</span>
                </a>

                <a
                  href={`tel:${phoneNumber}`}
                  className="location-map__btn location-map__btn--ghost"
                  aria-label={`Call ${siteInfo.phone}`}
                >
                  <span>Call {siteInfo.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connectivity */}
      <section className="section location-connectivity">
        <div className="container">
          <div className="section-head center">
            <span
              className="eyebrow"
              style={{ justifyContent: 'center' }}
            >
              Connectivity
            </span>

            <h2>Everything Within Reach</h2>

            <p className="location-connectivity__sub">
              Schools, stations, malls and highways — measured from your
              front door.
            </p>
          </div>

          <div className="loc-grid" ref={gridRef}>
            {connectivity.map((item, index) => (
              <div
                className="loc-card"
                key={item.place}
                style={{ '--i': index }}
              >
                <span className="loc-card__num">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="loc-card__body">
                  <strong>{item.place}</strong>

                  <span className="loc-card__distance">
                    <Icon name="pin" size={12} />
                    {item.distance}
                  </span>
                </div>

                <i
                  className="loc-card__glow"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}