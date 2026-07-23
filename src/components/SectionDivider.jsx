import './SectionDivider.css';

export default function SectionDivider() {
  return (
    <div className="section-divider" role="presentation">
      <span className="section-divider__line" />
      <span className="section-divider__mark">SGF</span>
      <span className="section-divider__line" />
    </div>
  );
}
