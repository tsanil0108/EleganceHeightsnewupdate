import { useState } from 'react';
import PageHero from '../components/PageHero';
import StatStrip from '../components/StatStrip';
import CommitmentBanner from '../components/CommitmentBanner';
import VideoModal from '../components/VideoModal';
import useScrollReveal from '../hooks/useScrollReveal';
import { aboutStats, companyValues, commitmentItems } from '../data/siteData';
import './About.css';

export default function About() {
  const [valuesRef, valuesVisible] = useScrollReveal();
  const [bannerRef, bannerVisible] = useScrollReveal();
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      {/* Full-width responsive background-image hero, fades/slides in on load */}
      <PageHero
        eyebrow="About SGF Enterprises"
        title="Building Spaces."
        accent="Creating Legacies."
        description="SGF Enterprises is a forward-thinking real estate developer committed to creating exceptional residential spaces that combine timeless architecture, quality construction and elevated lifestyles."
        bgImage="/images/LivingRoom.png"
        actions={[
          { label: 'Our Journey', variant: 'primary', href: '#values' },
          { label: 'Watch Company Video', variant: 'ghost', onClick: () => setVideoOpen(true) },
        ]}
      />

      {videoOpen && (
        <VideoModal src="/images/video.mp4" onClose={() => setVideoOpen(false)} />
      )}

      <div className="container">
        <StatStrip stats={aboutStats} />
      </div>

      <section className="section about-values" id="values">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our Values</span>
            <h2>Values That Define Us</h2>
          </div>
          <div
            ref={valuesRef}
            className={`about-values__grid ${valuesVisible ? 'is-visible' : ''}`}
          >
            {companyValues.map((v, i) => (
              <div
                className="about-values__card"
                key={v.title}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <h3>{v.title}</h3>
                <p>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container" ref={bannerRef}>
        <div className={bannerVisible ? 'is-visible' : ''}>
          <CommitmentBanner
            description="At SGF Enterprises, we are committed to delivering landmarks that stand the test of time and enrich the communities we build in."
            items={commitmentItems}
            imageSrc="/images/Facade.png"
          />
        </div>
      </div>
    </>
  );
}