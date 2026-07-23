import { siteInfo } from '../data/siteData';
import './FloatingContact.css';

// Floating WhatsApp + Call buttons — shown on every page.
// WhatsApp opens a chat with a pre-typed message; Call dials directly.
export default function FloatingContact() {
  const phoneDigits = siteInfo.phone.replace(/[^0-9]/g, '');

  const waMessage = encodeURIComponent(
    "Hi, I'm interested in Elegance Heights. Please share more details."
  );

  const whatsappUrl = `https://wa.me/${phoneDigits}?text=${waMessage}`;
  const telUrl = `tel:+${phoneDigits}`;

  return (
    <div className="floating-contact" aria-label="Contact us">
      <a
        href={whatsappUrl}
        className="floating-contact__btn floating-contact__btn--wa"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <svg
          viewBox="0 0 32 32"
          width="26"
          height="26"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16.003 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.59 4.46 1.71 6.4L3.2 28.8l6.57-1.72a12.74 12.74 0 006.23 1.62h.005c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.332-6.635-3.752-9.055A12.72 12.72 0 0016.003 3.2zm0 23.04h-.004a10.63 10.63 0 01-5.42-1.485l-.39-.23-4.03 1.055 1.075-3.93-.253-.403a10.6 10.6 0 01-1.626-5.647c0-5.87 4.777-10.646 10.65-10.646a10.58 10.58 0 017.53 3.122 10.58 10.58 0 013.12 7.53c0 5.872-4.777 10.648-10.648 10.648zm5.84-7.976c-.32-.16-1.894-.935-2.187-1.042-.293-.107-.507-.16-.72.16-.213.32-.827 1.042-1.014 1.255-.187.213-.373.24-.693.08-.32-.16-1.352-.498-2.575-1.588-.952-.849-1.594-1.897-1.78-2.217-.187-.32-.02-.493.14-.652.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.735-.987-2.375-.26-.623-.524-.539-.72-.549l-.613-.011c-.213 0-.56.08-.853.4-.293.32-1.12 1.095-1.12 2.67 0 1.575 1.147 3.096 1.307 3.31.16.213 2.256 3.446 5.466 4.832.764.33 1.36.527 1.824.674.767.244 1.464.21 2.016.127.615-.092 1.894-.774 2.16-1.522.267-.747.267-1.388.187-1.522-.08-.133-.293-.213-.613-.373z" />
        </svg>
      </a>

      <a
        href={telUrl}
        className="floating-contact__btn floating-contact__btn--call"
        aria-label={`Call ${siteInfo.phone}`}
      >
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>
    </div>
  );
}