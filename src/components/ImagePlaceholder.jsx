import './ImagePlaceholder.css';

export default function ImagePlaceholder({ label, ratio = '4/3', className = '', src, alt }) {
  if (src) {
    return (
      <div className={`img-placeholder img-placeholder--photo ${className}`} style={{ aspectRatio: ratio }}>
        <img src={src} alt={alt || label || ''} className="img-placeholder__img" loading="lazy" />
      </div>
    );
  }

  return (
    <div className={`img-placeholder ${className}`} style={{ aspectRatio: ratio }}>
      <span className="img-placeholder__icon" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="4" width="20" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="8" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.4" />
          <path d="M3 17L9 12L13 15L16 12.5L21 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {label && <span className="img-placeholder__label">{label}</span>}
    </div>
  );
}