# Elegance Heights — Website

A multi-page React website for **Elegance Heights**, a residential project by **SGF Enterprises** in Malad East, Mumbai. Built with React, React Router, and plain CSS (no Tailwind).

## Tech Stack

- React 18
- React Router v6 (multi-page navigation)
- Vite (dev server & build)
- Plain CSS with a shared design-token file (`src/styles/variables.css`)

## Pages

- `/` — Home
- `/about` — About SGF Enterprises
- `/project` — Elegance Heights project overview
- `/amenities` — All 18 lifestyle amenities
- `/floor-plans` — 1 BHK / 2 BHK layouts
- `/gallery` — Photo gallery with filters
- `/location` — Location & connectivity
- `/contact` — Enquiry form & contact details

## Getting Started

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (typically `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/     Shared UI: Navbar, Footer, Button, PageHero, StatStrip, CTAPanel, ImagePlaceholder
  pages/          One folder-free file per route, each with its own CSS
  data/           siteData.js — all site copy, amenities, floor plans, stats in one place
  styles/         variables.css (design tokens) + global.css (reset & base styles)
```

## Notes

- All imagery is currently rendered as styled placeholders (`<ImagePlaceholder />`) so you can drop in real photography without touching layout code — just replace the component usage with an `<img>` tag pointing at your asset.
- Colors, type, and spacing all live in `src/styles/variables.css` as CSS custom properties — update the palette or fonts there and it cascades through the whole site.
- The contact form is front-end only (no backend wired up yet); `handleSubmit` in `src/pages/Contact.jsx` is where you'd connect an API or email service.
