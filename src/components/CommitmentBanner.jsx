import './CommitmentBanner.css';

export default function CommitmentBanner({ description, items, imageSrc }) {
  return (
    <section
      className="commitment-banner"
      style={
        imageSrc
          ? {
              backgroundImage: `linear-gradient(90deg, rgba(15,23,42,0.92), rgba(15,23,42,0.75)), url(${imageSrc})`,
            }
          : undefined
      }
    >
      <div className="container commitment-banner__inner">
        <div className="commitment-banner__text">
          <span className="eyebrow eyebrow--light">Our Commitment</span>
          <p>{description}</p>
        </div>
        <div className="commitment-banner__items">
          {items.map((item) => (
            <div className="commitment-banner__item" key={item.title}>
              <span className="commitment-banner__dot" aria-hidden="true" />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}