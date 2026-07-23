import { siteInfo } from '../data/siteData';
import './TopBar.css';

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <div className="topbar__left">
          <span>{siteInfo.address}</span>
        </div>
        <div className="topbar__right">
          <a href={`tel:${siteInfo.phone}`}>{siteInfo.phone}</a>
          <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
        </div>
      </div>
    </div>
  );
}
