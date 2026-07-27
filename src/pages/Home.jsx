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

// seamless loop ke liye first slide ka clone end me
const heroSlides = [...heroImages, heroImages[0]];

const HERO_INTERVAL = 4000; // har slide kitni der tikta hai
const HERO_SLIDE_MS = 900;  // slide transition duration

// Lifestyle showcase
const lifestyleImages = [
  { label: 'Facade', src: '/images/Facade.png' },
 
  { label: 'Pool Deck', src: '/images/InfinityPool.png' },
  { label: 'Living Room', src: '/images/LivingRoom.png' },
  { label: 'Garden', src: '/images/Garden.png' },
  { label: 'Bed Room', src: '/images/Bedroom.png' },
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
  const [heroSnap, setHeroSnap] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

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

  // Preload hero images
  useEffect(() => {
    let loaded = 0;
    const total = heroImages.length;
    
    heroImages.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loaded++;
        if (loaded === total) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loaded++;
        if (loaded === total) {
          setImagesLoaded(true);
        }
      };
      img.src = src;
    });
  }, []);

  // Auto-advance
  useEffect(() => {
    if (!imagesLoaded) return;
    
    const id = window.setInterval(() => {
      setActiveHeroImage((c) => c + 1);
    }, HERO_INTERVAL);

    return () => window.clearInterval(id);
  }, [imagesLoaded]);

  // Clone pe pohanche → slide poora hone do, phir bina transition ke 0 pe jump
  useEffect(() => {
    if (activeHeroImage !== heroImages.length) return undefined;
    const t = window.setTimeout(() => {
      setHeroSnap(true);
      setActiveHeroImage(0);
    }, HERO_SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [activeHeroImage]);

  // Snap ke baad transition wapas on
  useEffect(() => {
    if (!heroSnap) return undefined;
    let raf2;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setHeroSnap(false));
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [heroSnap]);

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
          <div
            className="home-hero__track"
            style={{
              transform: `translateX(-${activeHeroImage * 100}%)`,
              transition: heroSnap ? 'none' : `transform ${HERO_SLIDE_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
            }}
          >
            {heroSlides.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Hero background ${index + 1}`}
                className="home-hero__slide"
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                style={{
                  opacity: imagesLoaded ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                }}
              />
            ))}
          </div>
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
                    index === activeHeroImage % heroImages.length
                      ? 'home-hero__slider-dot is-active'
                      : 'home-hero__slider-dot'
                  }
                  onClick={() => {
                    setHeroSnap(false);
                    setActiveHeroImage(index);
                  }}
                  aria-label={`Show hero image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right column — badge + card stacked */}
          <aside className="home-hero__aside hero-anim hero-anim--card">
            {/* RERA badge */}
            <div className="home-hero__rera-badge">
              <div className="home-hero__rera-badge-text">
                <strong>MAHA RERA NO.</strong>
                <span>P51800034810</span>
                <em>www.maharera.maharashtra.gov.in</em>
              </div>
              <img
                src="/images/QRCODE.png"
                alt="MahaRERA QR Code"
                className="home-hero__rera-badge-qr"
              />
            </div>

            {/* Project Highlights card */}
            <div className="home-hero__floating-card">
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

              <span className="home-hero__offer">
                <span className="home-hero__offer-tag">Limited Offer</span>
                <Icon name="percent" size={16} />
                <span className="home-hero__offer-text">
                  Pay Only <strong>9%</strong> Registration
                  <em>*T&amp;C apply</em>
                </span>
              </span>
            </div>
          </aside>
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