import { useRef, useState } from 'react';
import PageHero from '../components/PageHero';
import Button from '../components/Button';
import Icon from '../components/Icon';
import scrollToHash from '../utils/scroll';
import QuickFactsBar from '../components/QuickFactsBar';
import FeatureStrip from '../components/FeatureStrip';
import FloorPlanCard from '../components/FloorPlanCard';
import InHouseConvenience from '../components/InHouseConvenience';
import useScrollReveal from '../hooks/useScrollReveal';
import {
  projectSpecs,
  amenities,
  projectQuickFacts,
  projectFeatureStrip,
  floorPlans,
  siteInfo,
} from '../data/siteData';
import './Project.css';

export default function Project() {
  const [specsRef, specsVisible] = useScrollReveal();
  const [floorPlanRef, floorPlanVisible] = useScrollReveal({ threshold: 0.1 });
  const [amenitiesRef, amenitiesVisible] = useScrollReveal();
  const [videoRef, videoVisible] = useScrollReveal({ threshold: 0.25 });

  const videoElRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    // Wait a tick for the video element to become visible before playing
    requestAnimationFrame(() => {
      videoElRef.current?.play();
    });
  };

  return (
    <>
      {/* Full-bleed responsive background hero + quick facts row */}
      <PageHero
        eyebrow="Our Flagship Project"
        title="Elegance Heights"
        description="Your spacious new abode in the suburbs — affordable 1 & 2 BHK homes at Malad East, Mumbai."
        bgImage="/images/building.png"
        actions={[
          {
            label: 'Download Brochure',
            variant: 'primary',
            href: '/images/Elegance-Heights-Brochure.pdf',
            download: 'Elegance-Heights-Brochure.pdf',
          },
          {
            label: 'Book Site Visit',
            variant: 'ghost',
            onClick: () => scrollToHash('#contact'),
          },
        ]}
      >
        <QuickFactsBar facts={projectQuickFacts} />
      </PageHero>

      <div className="container project-rera">
        <span className="project-rera__badge">
          <Icon name="shield" size={16} />
          MahaRERA No. {siteInfo.reraNumber}
        </span>
      </div>

      {/* Dark utility-icon bar with Enquire Now CTA */}
      <div className="container">
        <FeatureStrip features={projectFeatureStrip} phone={siteInfo.phone} />
      </div>

      {/* Quick spec facts */}
      <section className="section project-specs">
        <div className="container">
          <div
            ref={specsRef}
            className={`project-specs__grid ${specsVisible ? 'is-visible' : ''}`}
          >
            {projectSpecs.map((spec, i) => (
              <div
                className="project-specs__item"
                key={spec.label}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span>{spec.label}</span>
                <strong>{spec.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floor plan preview cards */}
      <section className="section project-floorplans">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Floor Plans</span>
            <h2>Homes Designed for Every Family</h2>
          </div>
          <div
            ref={floorPlanRef}
            className={`floor-plan-grid ${floorPlanVisible ? 'is-visible' : ''}`}
          >
            {floorPlans.map((plan, i) => (
              <FloorPlanCard plan={plan} index={i} key={plan.id} />
            ))}
          </div>
        </div>
      </section>

      {/* Amenities snapshot */}
      <section className="section project-amenities-teaser">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Amenities Snapshot</span>
            <h2>A Full Lifestyle, Not Just Four Walls</h2>
          </div>
          <div
            ref={amenitiesRef}
            className={`project-amenities-teaser__grid ${amenitiesVisible ? 'is-visible' : ''}`}
          >
            {amenities.slice(0, 8).map((a, i) => (
              <div
                className="project-amenities-teaser__item"
                key={a.title}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {a.title}
              </div>
            ))}
          </div>
          <div className="project-amenities-teaser__more">
            <Button to="#amenities" variant="outline">Explore All Amenities</Button>
          </div>
        </div>
      </section>

      {/* Project video — poster + pulsing play button */}
      <section className="section project-video">
        <div className="container">
          <div
            ref={videoRef}
            className={`project-video__frame ${videoVisible ? 'is-visible' : ''} ${isPlaying ? 'is-playing' : ''}`}
          >
            {!isPlaying && (
              <>
                <img src="/images/Facade.png" alt="Elegance Heights video preview" className="project-video__poster" />
                <button
                  type="button"
                  className="project-video__play"
                  aria-label="Play project video"
                  onClick={handlePlay}
                >
                  <Icon name="play" size={26} />
                  <span className="project-video__pulse" aria-hidden="true" />
                </button>
              </>
            )}
            {isPlaying && (
              <video
                ref={videoElRef}
                className="project-video__el"
                src="/images/video.mp4"
                poster="/images/Facade.png"
                controls
                playsInline
              />
            )}
          </div>
        </div>
      </section>

      {/* In-house daily-needs vendors */}
      <InHouseConvenience />
    </>
  );
}