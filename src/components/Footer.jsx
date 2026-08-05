import { navLinks, siteInfo } from '../data/siteData';
import scrollToHash from '../utils/scroll';
import logo from '../../asset/image/logo.png';
import './Footer.css';

export default function Footer() {
  const goTo = (e, path) => {
    e.preventDefault();
    scrollToHash(path);
  };

  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-circle">
              <img src={logo} alt="SGF Enterprises" className="footer__logo-img" />
            </span>
            <span className="footer__logo-text">
              SGF<br /><em>Enterprises</em>
            </span>
          </div>
          <p>Spacious 1 &amp; 2 BHK homes designed for elevated suburban living, by SGF Enterprises.</p>
          <div className="footer__socials">
            <a href="https://www.instagram.com/elegance.heights?igsh=MXg3NDFza2JmNjBmaw==" aria-label="Instagram" onClick={(e) => e.preventDefault()}>IG</a>
            <a href="#" aria-label="Facebook" onClick={(e) => e.preventDefault()}>FB</a>
            <a href="#" aria-label="LinkedIn" onClick={(e) => e.preventDefault()}>IN</a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Explore</h4>
          <ul>
            {navLinks.map((link) => (
              <li key={link.path}>
                <a href={link.path} onClick={(e) => goTo(e, link.path)}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contact</h4>
          <ul className="footer__contact">
            <li>{siteInfo.address}</li>
            <li><a href={`tel:${siteInfo.phone}`}>{siteInfo.phone}</a></li>
            <li><a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Site Visit</h4>
          <p className="footer__note">Open daily, 10 AM – 7 PM. Schedule a guided tour of the show flat and sales lounge.</p>
          <a href="#contact" className="footer__cta" onClick={(e) => goTo(e, '#contact')}>Book a Visit &rarr;</a>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>&copy; {new Date().getFullYear()} SGF Enterprises. All rights reserved.</p>
        <p>RERA No. {siteInfo.reraNumber} &mdash; details available at maharera.mahaonline.gov.in</p>
      </div>
    </footer>
  );
}
