import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import FloatingContact from './components/FloatingContact';
import Home from './pages/Home';
import About from './pages/About';
import Project from './pages/Project';
import Amenities from './pages/Amenities';
import FloorPlans from './pages/FloorPlans';
import Gallery from './pages/Gallery';
import Location from './pages/Location';
import Contact from './pages/Contact';

// Single-page layout: every "page" is now just a section on one continuous
// scroll. The navbar / footer links smooth-scroll to these ids instead of
// navigating to separate routes.
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <div id="home" className="page-anchor">
          <Home />
        </div>
        <div id="about" className="page-anchor">
          <About />
        </div>
        <div id="project" className="page-anchor">
          <Project />
        </div>
        <div id="amenities" className="page-anchor">
          <Amenities />
        </div>
        <div id="floor-plans" className="page-anchor">
          <FloorPlans />
        </div>
        <div id="gallery" className="page-anchor">
          <Gallery />
        </div>
        <div id="location" className="page-anchor">
          <Location />
        </div>
        <div id="contact" className="page-anchor">
          <Contact />
        </div>
      </main>
      <Footer />
      <BackToTop />
      <FloatingContact />
    </>
  );
}