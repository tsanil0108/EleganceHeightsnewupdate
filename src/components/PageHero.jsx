import ImagePlaceholder from './ImagePlaceholder';
import './PageHero.css';

/**
 * PageHero
 *
 * Two display modes:
 * 1. Side-by-side (default) — pass `imageSrc` + `imageLabel`, image renders
 *    in a boxed panel next to the text (original behaviour).
 * 2. Full background — pass `bgImage`, the image fills the entire hero
 *    section edge-to-edge with a dark overlay and the text sits on top.
 *    Use this for the About page to match the PDF design.
 */
export default function PageHero({
  eyebrow,
  title,
  accent,
  description,
  imageLabel,
  imageSrc,
  imageVideo,
  bgImage,
  actions,
  children,
}) {
  if (bgImage) {
    return (
      <section
        className="page-hero page-hero--bg"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.75) 100%), url(${bgImage})`,
        }}
      >
        <div className="container page-hero__bg-inner">
          <div className="page-hero__text page-hero__text--on-bg">
            {eyebrow && <span className="eyebrow eyebrow--light">{eyebrow}</span>}
            <h1>
              {title} {accent && <span className="text-accent">{accent}</span>}
            </h1>
            {description && <p>{description}</p>}
            {actions && actions.length > 0 && (
              <div className="page-hero__actions">
                {actions.map((a) =>
                  a.onClick ? (
                    <button
                      key={a.label}
                      type="button"
                      className={`btn btn--${a.variant || 'primary'}`}
                      onClick={a.onClick}
                    >
                      {a.label}
                    </button>
                  ) : (
                    <a
                      key={a.label}
                      href={a.href || '#'}
                      download={a.download}
                      target={a.external ? '_blank' : undefined}
                      rel={a.external ? 'noopener noreferrer' : undefined}
                      className={`btn btn--${a.variant || 'primary'}`}
                    >
                      {a.label}
                    </a>
                  )
                )}
              </div>
            )}
            {children}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-hero">
      <div className="container page-hero__inner">
        <div className="page-hero__text">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1>
            {title} {accent && <span className="text-accent">{accent}</span>}
          </h1>
          {description && <p>{description}</p>}
          {actions && actions.length > 0 && (
            <div className="page-hero__actions">
              {actions.map((a) =>
                a.onClick ? (
                  <button
                    key={a.label}
                    type="button"
                    className={`btn btn--${a.variant || 'primary'}`}
                    onClick={a.onClick}
                  >
                    {a.label}
                  </button>
                ) : (
                  <a
                    key={a.label}
                    href={a.href || '#'}
                    download={a.download}
                    target={a.external ? '_blank' : undefined}
                    rel={a.external ? 'noopener noreferrer' : undefined}
                    className={`btn btn--${a.variant || 'primary'}`}
                  >
                    {a.label}
                  </a>
                )
              )}
            </div>
          )}
        </div>
        <div className="page-hero__image">
          {imageVideo ? (
            <video
              className="page-hero__video"
              src={imageVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={imageLabel}
            />
          ) : (
            <ImagePlaceholder label={imageLabel} src={imageSrc} alt={imageLabel} ratio="6/5" />
          )}
        </div>
      </div>
    </section>
  );
}