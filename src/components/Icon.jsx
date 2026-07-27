import { useId } from 'react';

const ICONS = {
  home: 'M3 11l9-8 9 8 M5 10v10h14V10',
  pin: 'M12 22s7-7.58 7-12a7 7 0 10-14 0c0 4.42 7 12 7 12z M12 13a3 3 0 100-6 3 3 0 000 6z',
  rupee: 'M6 4h12 M6 9h12 M6 4c4 0 7 2 7 5s-3 5-7 5h9 M9 14l6 6',
  download: 'M12 3v12 M8 11l4 4 4-4 M4 19h16',
  shield: 'M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z',
  car: 'M4 16V9l2-5h12l2 5v7 M2 16h20 M6 16a2 2 0 104 0 M14 16a2 2 0 104 0',
  lift: 'M8 8l4-4 4 4 M8 16l4 4 4-4 M12 4v16',
  rooftop: 'M4 20V10l8-6 8 6v10 M9 20v-6h6v6',
  drop: 'M12 3s6 7 6 11a6 6 0 11-12 0c0-4 6-11 6-11z',
  cctv: 'M4 6h13l3 3-3 3H4z M7 12v8 M4 20h10',
  wifi: 'M2 9a15 15 0 0120 0 M5 12.5a10 10 0 0114 0 M8.5 16a5 5 0 017 0 M12 20h.01',
  podium: 'M4 20V13h16v7 M8 13V6h8v7 M11 6V3h2v3',
  marble: 'M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.5 5.5 21 8 13.5 2.5 9h7z',
  amenity: 'M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.5 5.5 21 8 13.5 2.5 9h7z',
  connectivity: 'M4 20l6-16 4 10 3-6 3 12 M4 20h16',
  floorplan: 'M3 3h18v18H3z M3 12h18 M12 3v18',
  play: 'M8 5l12 7-12 7z',
  check: 'M5 13l4 4L19 7',
  phone: 'M4 5c0 8 7 15 15 15l3-4-6-3-2 2c-3-1.5-5-3.5-6-6l2-2-3-6z',
  chevronDown: 'M6 9l6 6 6-6',
  chevronRight: 'M9 5l7 7-7 7',
  solar: 'M12 8a4 4 0 100 8 4 4 0 000-8z M12 2v2 M12 20v2 M4 12H2 M22 12h-2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M4.9 19.1l1.4-1.4 M17.7 6.3l1.4-1.4',
  ev: 'M13 2L4 14h6l-1 8 9-12h-6l1-8z',
  waste: 'M4 7h16 M8 7V4h8v3 M6 7l1 13h10l1-13',
  diamond: 'M3.5 9h17 M8 3h8l4.5 6L12 21 3.5 9 8 3z',
  arrow: 'M5 12h14 M13 6l6 6-6 6',
  skyline: 'M2 21h20 M4 21V8l3-2v15 M9 21V5l4 3v13 M15 21v-9l4-2v11 M9 9h.01 M9 13h.01 M14 12h.01 M14 16h.01',
  inhouse: 'M4 21V10 M4 10l6-4 M4 10h16 M10 21V10 M16 10l4-2v6l-4 1v6',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z M12 15a3 3 0 100-6 3 3 0 000 6z',
  percent: 'M5 19L19 5 M7.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5z M16.5 20a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  smart: 'M7 7h10v10H7z M10 10h4v4h-4z M9 3v3 M15 3v3 M9 18v3 M15 18v3 M3 9h3 M3 15h3 M18 9h3 M18 15h3',
  valet: 'M4 16V9l2-5h12l2 5v7 M2 16h20 M6 16a2 2 0 104 0 M14 16a2 2 0 104 0 M17 9h-2 M9 9H7 M18 8l2.2-2.2 1 1-2.2 2.2',
  amenities: 'M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.5 5.5 21 8 13.5 2.5 9h7z',
  connect: 'M4 20l6-16 4 10 3-6 3 12 M4 20h16',
  design: 'M3 17l5-5 3 3 7-7 M13 3h5v5 M4 20h16',
  building: 'M4 21V6l8-4 8 4v15 M4 21h16 M9 21v-5h6v5 M8 8h.01 M12 8h.01 M16 8h.01 M8 12h.01 M12 12h.01 M16 12h.01',

  // ── Amenity-specific icons (matched to the brochure/reference photo) ──
  infinityPool: 'M2 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0 M2 13.5c2-2 4-2 6 0s4 2 6 0 4-2 6 0 M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0',
  gym: 'M2 10v4 M22 10v4 M6 8v8 M18 8v8 M8 12h8',
  multiPurposeHall: 'M4 21h16 M6 21V10l6-5 6 5v11 M9 21v-6h6v6 M9 14h6',
  rockClimbing: 'M3 20l5-9 3 5 3-4 4 8H3z M15 8a2 2 0 100-4 2 2 0 000 4z M6 16l2-2 M11 16l2-3',
  amphitheatre: 'M3 19a9 4.5 0 0118 0 M5.5 19a6.5 3.2 0 0113 0 M8 19a4 2 0 018 0 M3 19h18',
  gamingArena: 'M5 9h14l2 4-1.5 7a2 2 0 01-2 1.8h-1l-2-3H9.5l-2 3h-1a2 2 0 01-2-1.8L3 13z M8 12v3 M6.5 13.5h3 M15 12h.01 M17.2 14h.01',
  starGazingSection: 'M4 20l6-4 M8 16l9-9 3 3-9 9 M18 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1z M5 6l.7 1.3L7 8l-1.3.7L5 10l-.7-1.3L3 8l1.3-.7z',
  skylonCafeteria: 'M4 21h16 M6 21v-6h4v6 M14 21v-6h4v6 M4 11h16l-1.5-5h-13z M12 6V3 M9 6V4 M15 6V4',
  library: 'M4 19V4a1 1 0 011-1h3v17 M9 3h4v17H9 M13 4l4-1 3 16-4 1z',
  zenGarden: 'M12 3c1.2 1.8 1.2 3.2 0 5-1.2-1.8-1.2-3.2 0-5z M9 8c1.2 1.8 1.2 3.2 0 5 M15 8c-1.2 1.8-1.2 3.2 0 5 M7 16a5 5 0 0110 0 M3 21h18',
  crecheArea: 'M12 3l4 3v2h2v13H6V8h2V6z M9 21v-5h6v5 M9 11h6',
  gazeboSitting: 'M12 2l9 6H3z M5 8v12 M19 8v12 M3 20h18 M8 20v-6h8v6',
  yogaMeditation: 'M12 3.5a1.8 1.8 0 100 3.6 1.8 1.8 0 000-3.6z M8 21c0-4.5 2-7 4-7s4 2.5 4 7 M5.5 14c1.5-1 2.5-1 2.5-1 M18.5 14c-1.5-1-2.5-1-2.5-1 M12 12v3',
  kidsPlayArea: 'M4 20h16 M6 20V8l7-4v16 M13 12h4v8 M6 8h7',
};

// Maps an amenity's display title (as used in siteData.js) to the
// best-matching icon key. Order matters — most specific patterns first.
const TITLE_MATCHERS = [
  [/infinity pool|swimming pool/i, 'infinityPool'],
  [/gymnasium|\bgym\b/i, 'gym'],
  [/yoga|meditation/i, 'yogaMeditation'],
  [/zen garden/i, 'zenGarden'],
  [/kids/i, 'kidsPlayArea'],
  [/creche|cresh/i, 'crecheArea'],
  [/gazebo/i, 'gazeboSitting'],
  [/multi-?purpose|\bhall\b/i, 'multiPurposeHall'],
  [/library/i, 'library'],
  [/gaming/i, 'gamingArena'],
  [/rock climb/i, 'rockClimbing'],
  [/star gaz/i, 'starGazingSection'],
  [/amphitheatre|amphitheater/i, 'amphitheatre'],
  [/cafeteria|skylon/i, 'skylonCafeteria'],
  [/rooftop/i, 'rooftop'],
  [/marble|lobby|waterfall/i, 'marble'],
  [/valet/i, 'valet'],
  [/charging|electric.*car/i, 'ev'],
  [/solar/i, 'solar'],
  [/rain water|harvesting|sewage/i, 'drop'],
  [/waste/i, 'waste'],
  [/high speed lift|\blift\b/i, 'lift'],
  [/wi-?fi/i, 'wifi'],
  [/cctv|security gate/i, 'cctv'],
  [/co-?working/i, 'smart'],
  [/jogging|track/i, 'connectivity'],
];

export function getAmenityIconKey(title = '') {
  const match = TITLE_MATCHERS.find(([re]) => re.test(title));
  return match ? match[1] : 'amenities';
}

// `gold` renders the icon stroked with a gold gradient (for the
// dark-card / dark-strip designs) instead of plain currentColor.
export default function Icon({ name, title, size = 20, className, gold = false }) {
  const key = name || getAmenityIconKey(title);
  const gradId = useId();

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={gold ? `url(#${gradId})` : 'currentColor'}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {gold && (
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-gold-light, #e8c76b)" />
            <stop offset="100%" stopColor="var(--color-gold, #c9a227)" />
          </linearGradient>
        </defs>
      )}
      <path d={ICONS[key] || ICONS.home} />
    </svg>
  );
}