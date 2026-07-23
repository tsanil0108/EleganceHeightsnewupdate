import { useEffect, useState } from 'react';
import Button from '../components/Button';
import StatStrip from '../components/StatStrip';
import Icon from '../components/Icon';
import PremiumHighlights from '../components/PremiumHighlights';
import Lightbox from '../components/Lightbox';
import CoverflowCarousel from '../components/CoverflowCarousel';
import { heroStats, premiumUSPs } from '../data/siteData';
import './Home.css';

// Hero background images
const heroImages = [
  '/images/building.png',
  '/images/building1.png',
  '/images/building2.png',
  
];

// Lifestyle showcase
const lifestyleImages = [
  { label: 'Facade', src: '/images/Facade.png' },
  { label: 'Lobby', src: '/images/Lobby.png' },
  { label: 'Pool Deck', src: '/images/InfinityPool.png' },
  { label: 'Living Room', src: '/images/LivingRoom.png' },
  { label: 'Garden', src: '/images/Garden.png' },
];

const carouselItems = lifestyleImages.map((item) => ({
  image: item.src,
  title: item.label,
}));

const lightboxItems = lifestyleImages.map((item) => ({
  image: item.src,
  caption: item.label,
}));

export default function Home() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [activeHeroImage, setActiveHeroImage] = useState(0);

  const openLightbox = (i) =>
    setLightboxIndex(i % lifestyleImages.length);

  const closeLightbox = () => setLightboxIndex(null);

  const showNext = () =>
    setLightboxIndex((i) =>
      i === null ? i : (i + 1) % lifestyleImages.length
    );

  const showPrev = () =>
    setLightboxIndex((i) =>
      i === null
        ? i
        : (i - 1 + lifestyleImages.length) % lifestyleImages.length
    );

  // Hero background auto-change
  useEffect(() => {
    const heroInterval = window.setInterval(() => {
      setActiveHeroImage(
        (currentImage) => (currentImage + 1) % heroImages.length
      );
    }, 5000);

    return () => window.clearInterval(heroInterval);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('in-view'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero__bg" aria-hidden="true">
          {heroImages.map((image, index) => (
            <img
              key={image}
              src={image}
              alt=""
              className={
                index === activeHeroImage
                  ? 'home-hero__slide is-active'
                  : 'home-hero__slide'
              }
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />
          ))}
        </div>

        <div className="home-hero__overlay" />

        <div className="container home-hero__inner">
          <div className="home-hero__text">
            <span className="home-hero__project hero-anim hero-anim--1">
              Elegance Heights Tower
            </span>

            <h1 className="hero-anim hero-anim--2">
              Your Spacious New Abode <br />
              in the <span className="text-accent">Suburbs</span>
            </h1>

            <p className="hero-anim hero-anim--3">
              Elegance Heights brings affordable 1 &amp; 2 BHK homes to Malad
              East, designed for families who want more room to breathe without
              leaving the city behind.
            </p>

            <div className="home-hero__actions hero-anim hero-anim--4">
              <Button to="#floor-plans" variant="primary" size="lg">
                View Floor Plans
              </Button>

              <Button to="#contact" variant="outline-light" size="lg">
                Book a Site Visit
              </Button>
            </div>

            <div className="home-hero__slider-dots">
              {heroImages.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  className={
                    index === activeHeroImage
                      ? 'home-hero__slider-dot is-active'
                      : 'home-hero__slider-dot'
                  }
                  onClick={() => setActiveHeroImage(index)}
                  aria-label={`Show hero image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="home-hero__floating-card hero-anim hero-anim--card">
            <strong>Project Highlights</strong>

            <span>
              <Icon name="home" size={16} />
              1 &amp; 2 BHK Residences
            </span>

            <span>
              <Icon name="lift" size={16} />
              G+40 Storeys
            </span>

            <span>
              <Icon name="pin" size={16} />
              Malad East, Mumbai
            </span>

            <span>
              <Icon name="calendar" size={16} />
              Possession — Dec 2029
            </span>

            <span>
              <Icon name="percent" size={16} />
              Pay Only 9% Registration*
            </span>

            <div className="home-hero__rera">
              <img
                src="/images/QRCODE.png"
                alt="MahaRERA QR Code — Scan to verify registration"
                className="home-hero__rera-qr"
                loading="lazy"
              />

              <div className="home-hero__rera-text">
                <strong>MahaRERA Regn. No.</strong>
                <span>P51800034810</span>
                <em>
                  Scan to verify on maharera.maharashtra.gov.in
                </em>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container home-stats">
        <StatStrip stats={heroStats} />
      </div>

      {/* Lifestyle Showcase */}
      <section className="section home-strip">
        <div className="container">
          <div className="section-head center reveal">
            <span className="eyebrow">
              Designed for an Elevated Lifestyle
            </span>

            <h2>A Home That Grows With Every Season of Life</h2>
          </div>

          <CoverflowCarousel
            items={carouselItems}
            onSelect={(i) => openLightbox(i)}
            autoPlayMs={2500}
          />
        </div>
      </section>

      <Lightbox
        items={lightboxItems}
        index={lightboxIndex}
        onClose={closeLightbox}
        onNext={showNext}
        onPrev={showPrev}
      />

      {/* Premium USP grid */}
      <section className="section home-usp">
        <div className="container">
          <div className="section-head center reveal">
            <span
              className="eyebrow"
              style={{ justifyContent: 'center' }}
            >
              The Elegance Heights Difference
            </span>

            <h2>
              Ten Reasons This Is Malad East&apos;s Most Premium Address
            </h2>
          </div>

          <PremiumHighlights items={premiumUSPs} />
        </div>
      </section>
    </>
  );
}