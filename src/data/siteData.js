export const siteInfo = {
  developer: 'SGF Enterprises',
  project: 'Elegance Heights',
  tagline: 'Your Spacious New Abode in the Suburbs',
  address:
    'Elegance Heights, Next to Shankar Mandir, Opp. Shree Raj Medical & Bhagvati Gen. Store, Shivaji Nagar, Kurar Village, Malad East, Mumbai 400 097',
  phone: '+91 9833324444',
  email: 'Sales@eleganceheights.com',
  reraNumber: 'P51800034810',
  financeBy: 'Jandhan Co-operative Credit Society Limited',
};

// Single-page navigation — every link is an in-page anchor (id of a <section>)
// so clicking a nav item smooth-scrolls down the same page instead of routing.
export const navLinks = [
  { label: 'Home', path: '#home' },
  { label: 'About SGF', path: '#about' },
  { label: 'Project', path: '#project' },
  { label: 'Amenities', path: '#amenities' },
  { label: 'Floor Plans', path: '#floor-plans' },
  { label: 'Gallery', path: '#gallery' },
  { label: 'Location', path: '#location' },
  { label: 'Contact', path: '#contact' },
];

export const heroStats = [
  { value: '10+', label: 'Years of Trust' },
  { value: '100%', label: 'RERA Registered' },
];

// Stats strip used specifically on the About page (matches PDF: 5 stats)
export const aboutStats = [
  { value: '10+', label: 'Years of Excellence' },
  { value: '100%', label: 'Commitment to Quality' },
];

// About page values grid (matches PDF: 5 values, no numbering — not a sequence)
export const companyValues = [
  {
    title: 'Integrity',
    description: 'We believe in transparency, honesty and ethical business practices.',
  },
  {
    title: 'Quality',
    description: 'Delivering superior quality in every project with attention to detail.',
  },
  {
    title: 'Customer First',
    description: 'Our customers are at the heart of everything we do.',
  },
  {
    title: 'Innovation',
    description: 'Embracing modern technology and innovative designs.',
  },
  {
    title: 'Sustainability',
    description: 'Building eco-friendly spaces for a better tomorrow.',
  },
];

// Dark "Our Commitment" banner items (matches PDF)
export const commitmentItems = [
  { title: 'Timely Delivery' },
  { title: '100% In-House Construction' },
  { title: 'Trust & Reliability' },
  { title: 'Building Relationships' },
];

// Premium USP grid — shown as luxury feature cards on the Home page
// (and referenced elsewhere). The "valet" card is flagged `featured`
// so it renders as the larger, badge-highlighted signature card.
export const premiumUSPs = [
  {
    icon: 'valet',
    title: 'Exclusive 24×7 Valet Parking',
    description:
      'One of the very few residential addresses in the region offering round-the-clock valet parking — arrive, hand over your keys, and walk straight home.',
    badge: 'Signature USP',
    featured: true,
  },
  {
    icon: 'skyline',
    title: 'Iconic Mumbai Skyline Views',
    description: 'Wake up to sweeping, uninterrupted views of the Mumbai skyline from the upper floors of the tower.',
  },
  {
    icon: 'inhouse',
    title: '100% In-House Construction',
    description: 'Built entirely under SGF Enterprises\u2019 own supervision, ensuring superior quality, better workmanship and on-time delivery.',
  },
  {
    icon: 'eye',
    title: 'Complimentary Live Site Visit',
    description: 'Walk through a real, fully built box-structure apartment and experience actual room sizes for yourself — before possession, before you decide.',
  },
  {
    icon: 'floorplan',
    title: 'Smart Space-Optimized Floor Plans',
    description: 'Thoughtfully engineered layouts that eliminate wasted corridors, maximizing usable carpet area in every home.',
  },
  {
    icon: 'rupee',
    title: 'Pay Less, Get More Value',
    description: 'Luxury specifications and finishes delivered at a price point that over-delivers on value, floor after floor.',
  },
  {
    icon: 'percent',
    title: 'Pay Only 9% GST*',
    description: 'A limited-period promotional benefit that lowers your effective acquisition cost on select homes.',
    note: '*Conditions apply. Final GST applicability as per current government scheme, confirmed at the time of booking.',
  },
  {
    icon: 'amenities',
    title: 'Premium Lifestyle Amenities',
    description: 'Infinity Pool, Sky Deck, Rooftop Cafe, Clubhouse, Gaming Zone, Library, Zen Garden and Amphitheatre — a resort, right at home.',
  },
  {
    icon: 'marble',
    title: 'Imported Premium Marble Finishes',
    description: 'Imported marble flooring and refined interior finishes bring a genuinely luxurious feel to every room.',
  },
  {
    icon: 'smart',
    title: 'AI-Enabled Smart Homes',
    description: 'Smart locks, app-controlled devices and voice-assistant compatibility make every home future-ready from day one.',
  },
];

// Standalone note used for the GST promotional disclaimer wherever it
// appears without a full card (e.g. footnotes near CTAs).
export const gstDisclaimer =
  '*Pay Only 9% GST is a limited-period offer, subject to applicable government terms, scheme conditions and timelines. Please confirm current applicability with our sales team at the time of booking.';

// "Experience Before You Buy" — premium live site-visit section content,
// used wherever the site previously pointed at a generic site-visit CTA.
export const experienceBeforeYouBuy = {
  eyebrow: 'Complimentary Live Site Visit',
  title: 'Experience Before You Buy',
  description:
    'Photos and floor plans only tell half the story. Walk through a real, fully built box-structure apartment at Elegance Heights and get a true feel of actual room sizes, ceiling heights and natural light — before you decide, not after.',
  primaryLabel: 'Book Your Live Visit',
  secondaryLabel: 'Call +91 9833324444',
};

// Project hero quick-facts row (matches brochure cover: G+40 Storey Tower / Malad East / Affordable Luxury / 1&2 BHK)
export const projectQuickFacts = [
  { icon: 'building', label: 'G+40 Storey Tower' },
  { icon: 'pin', label: 'Prime Location — Malad East' },
  { icon: 'diamond', label: 'Affordable Luxury, Premium Living' },
  { icon: 'home', label: '1 & 2 BHK Spacious Homes' },
];

// Dark navy feature strip under the Project hero (matches brochure's utility-icon bar, page 2)
export const projectFeatureStrip = [
  { icon: 'valet', label: '24 Hours Valet Parking' },
  { icon: 'ev', label: 'Electric Charging Points For Cars' },
  { icon: 'lift', label: '5 High Speed Lifts Of International Repute' },
  { icon: 'rooftop', label: 'Rooftop Recreation Areas' },
  { icon: 'solar', label: 'Solar Powered Common Area For Lights & Ventilation' },
  { icon: 'waste', label: 'Waste Management System' },
  { icon: 'drop', label: 'Rain Water Harvesting & Sewage Treatment Plant' },
  { icon: 'wifi', label: 'Wi-Fi Enabled' },
];

// Project highlights strip (matches PDF: Italian Marble Lobby / Amenities / Connectivity / etc.)
export const projectHighlightsStrip = [
  { icon: 'skyline', label: 'Iconic Mumbai Skyline Views' },
  { icon: 'marble', label: 'Italian Marble Entrance Lobby' },
  { icon: 'amenities', label: 'Luxury Lifestyle Amenities' },
  { icon: 'smart', label: 'AI-Enabled Smart Homes' },
  { icon: 'connect', label: 'Excellent Connectivity' },
  { icon: 'design', label: 'Thoughtfully Designed Homes' },
  { icon: 'shield', label: '24x7 Security with CCTV' },
  { icon: 'solar', label: 'Solar Powered Common Area' },
];

// Real amenities from the brochure — "Impressive Internal Amenities" (page 2)
// and "Impressive External Amenities" (page 11). Titles/categories match the
// brochure; images are mapped to the closest available photo where a
// dedicated shot doesn't exist yet in public/images.
export const amenities = [
  { title: 'Infinity Pool for Adults & Kids', category: 'Leisure', image: '/images/InfinityPool.png' },
  { title: 'Air Conditioned Gymnasium', category: 'Wellness', image: '/images/Gymnasium.png' },
  { title: 'Yoga & Meditation Area', category: 'Wellness', image: '/images/Yoga_MeditationDeck.png' },
  { title: 'Zen Garden', category: 'Wellness', image: '/images/Garden.png' },
  { title: 'Kids\u2019 Play Area', category: 'Family', image: '/images/KidsPlayArea.png' },
  { title: 'Creche Area', category: 'Family', image: '/images/KidsPlayArea.png' },
  { title: 'Gazebo Sitting Area', category: 'Leisure', image: '/images/Garden.png' },
  { title: 'Multi-purpose Hall', category: 'Community', image: '/images/indoorgame.png' },
  { title: 'Library', category: 'Community', image: '/images/indoorgame.png' },
  { title: 'Gaming Arena', category: 'Community', image: '/images/IndoorGamesRoom.png' },
  { title: 'Rock Climbing', category: 'Adventure', image: '/images/SkylineView.png' },
  { title: 'Star Gazing Section Area', category: 'Leisure', image: '/images/SkylineView.png' },
  { title: 'Amphitheatre Area', category: 'Community', image: '/images/SkylineView.png' },
  { title: 'Skylon Cafeteria', category: 'Leisure', image: '/images/Lobby.png' },
  { title: 'Rooftop Recreation Areas', category: 'Leisure', image: '/images/SkylineView.png' },
  { title: 'Elegant Entrance Lobby with Italian Marble & Artificial Waterfall', category: 'Arrival', image: '/images/Lobby.png' },
  { title: '24 Hours Valet Parking', category: 'Convenience', image: '/images/building.png' },
  { title: 'Electric Charging Points for Cars', category: 'Sustainability', image: '/images/building.png' },
  { title: 'Solar Powered Common Area for Lights & Ventilation', category: 'Sustainability', image: '/images/Facade.png' },
  { title: 'Rain Water Harvesting & Sewage Treatment Plant', category: 'Sustainability', image: '/images/building.png' },
  { title: '5 High Speed Lifts of International Repute', category: 'Convenience', image: '/images/Lobby.png' },
  { title: 'Wi-Fi Enabled', category: 'Convenience', image: '/images/Lobby.png' },
  { title: 'High-security Gates with CCTV Cameras', category: 'Safety', image: '/images/24x7_Security_CCTV.png' },
];

// In-home specifications from the brochure's "Impressive Internal Amenities" list
export const interiorSpecs = [
  'Italian Marble Flooring',
  'Wooden Flooring in the Bedroom',
  'Jaguar Fittings in Toilets',
  'Emulsion Paint in All Rooms',
  'Digital Lock on Main Doors',
  'Video Door Phones and Conferencing',
  'Elegant Entrance Lobby with Italian Marble Flooring and Artificial Waterfall',
  'High-security Gates with CCTV Cameras',
];

// ============================================================
// Floor plan preview cards — used on the Project page grid.
// Just the 2 summary cards (1 BHK, and 2 BHK with its size
// range). Individual 2 BHK size variants (479/488/489/495/498)
// only show on the full Floor Plans page/section.
// ============================================================
export const floorPlans = [
  {
    id: '1bhk',
    type: '1 BHK',
    carpetArea: '343 sq.ft.',
    configuration: 'Living / Kitchen, 1 Bedroom, 1 Bathroom',
    price: 'On Request',
    image: '/images/1_BHK-343sq.png',
  },
  {
    id: '2bhk',
    type: '2 BHK',
    carpetArea: '456 sq.ft.- 498 sq.ft.',
    configuration: 'Living / Kitchen, 2 Bedrooms, 2 Bathrooms',
    price: 'On Request',
    image: '/images/2_BHK-498sq.png',
  },
];

// Why Elegance Heights bullet list (Project page highlights section)
export const projectWhyList = [
  'Vastu-compliant layouts across all unit types',
  'Double-height entrance lobby with concierge desk',
  'Podium-level landscaped amenity deck',
  'Earthquake-resistant RCC structure, MahaRERA registered',
];

export const projectSpecs = [
  { label: 'Location', value: 'Malad East, Mumbai' },
  { label: 'Configuration', value: '1 & 2 BHK Residences' },
  { label: 'Towers', value: '1 Tower, G+40 Storeys' },
  { label: 'Total Units', value: '224 Homes' },
  { label: 'Possession', value: 'Dec 2029' },
  { label: 'RERA No.', value: 'P51800034810' },
];

export const galleryImages = [
  { id: 1, caption: 'Tower Facade at Dusk', category: 'Exterior', image: '/images/Facade.png' },
  { id: 2, caption: 'Grand Entrance Lobby', category: 'Interior', image: '/images/Lobby.png' },
  { id: 3, caption: 'Living Room Interiors', category: 'Interior', image: '/images/LivingRoom.png' },
  { id: 4, caption: 'Rooftop Infinity Pool', category: 'Amenity', image: '/images/InfinityPool.png' },
  { id: 5, caption: 'Landscaped Podium Garden', category: 'Amenity', image: '/images/Garden.png' },
  { id: 6, caption: 'Aerial Skyline View', category: 'Exterior', image: '/images/SkylineView.png' },
  { id: 7, caption: 'Clubhouse Lounge', category: 'Amenity', image: '/images/indoorgame.png' },
  { id: 8, caption: 'Tower Elevation', category: 'Exterior', image: '/images/building.png' },
];

// Real distances from the brochure's "Location Advantage" map (last page)
export const connectivity = [
  { place: 'Malad Railway Station', distance: '1.7 Kms' },
  { place: 'Malad Metro Station', distance: '800 Mts' },
  { place: 'Shankar Mandir', distance: '05 Mts' },
  { place: 'Malad Bus Stop', distance: '100 Mts' },
  { place: 'Schools', distance: '200 Mts' },
  { place: 'Western Express Highway', distance: '800 Mts' },
];

export const achievements = [
  { value: '10+', label: 'Years in Real Estate' },
  { value: '25+', label: 'Projects Completed' },
  { value: '5000+', label: 'Families Housed' },
  { value: '100%', label: 'On-time RERA Delivery' },
];

// Project consultants/team, as credited on the brochure's Location Advantage page
export const projectTeam = [
  { role: 'Architect', name: 'Vivek Bhole Architect Pvt Ltd' },
  { role: 'Design Architect', name: 'Azhar Bhati Architects' },
  { role: 'Lawyers & Solicitors', name: 'Mhatre Law Associates' },
  { role: 'Structural Engineer', name: 'A.A. Associates' },
];