import ImagePlaceholder from './ImagePlaceholder';
import './PageHero.css';

/**
 * PageHero
 *
 * Two display modes:
 * 1. Side-by-side — imageSrc/imageVideo ke saath.
 * 2. Full background — bgImage ke saath.
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
  actions = [],
  className = '',
  children,
}) {
  const renderActions = () => {
    if (!actions.length) return null;

    return (
      <div className="page-hero__actions">
        {actions.map((action) =>
          action.onClick ? (
            <button
              key={action.label}
              type="button"
              className={`btn btn--md btn--${action.variant || 'primary'}`}
              onClick={action.onClick}
            >
              {action.label}
            </button>
          ) : (
            <a
              key={action.label}
              href={action.href || '#'}
              download={action.download}
              target={action.external ? '_blank' : undefined}
              rel={action.external ? 'noopener noreferrer' : undefined}
              className={`btn btn--md btn--${action.variant || 'primary'}`}
            >
              {action.label}
            </a>
          )
        )}
      </div>
    );
  };

  if (bgImage) {
    return (
      <section
        className={`page-hero page-hero--bg ${className}`}
        style={{
          backgroundImage: `
            radial-gradient(
              ellipse 65% 55% at 50% 45%,
              rgba(0, 0, 0, 0.32) 0%,
              rgba(0, 0, 0, 0) 70%
            ),
            url("${bgImage}")
          `,
        }}
      >
        <div className="container page-hero__bg-inner">
          <div className="page-hero__text page-hero__text--on-bg">
            {eyebrow && (
              <span className="eyebrow eyebrow--light">{eyebrow}</span>
            )}

            <h1>
              {title}
              {accent && (
                <>
                  {' '}
                  <span className="text-accent">{accent}</span>
                </>
              )}
            </h1>

            {description && <p>{description}</p>}

            {renderActions()}

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
            {title}
            {accent && (
              <>
                {' '}
                <span className="text-accent">{accent}</span>
              </>
            )}
          </h1>

          {description && <p>{description}</p>}

          {renderActions()}

          {children}
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
              aria-label={imageLabel || 'Page hero video'}
            />
          ) : (
            <ImagePlaceholder
              label={imageLabel}
              src={imageSrc}
              alt={imageLabel || 'Page hero'}
              ratio="6/5"
            />
          )}
        </div>
      </div>
    </section>
  );
}