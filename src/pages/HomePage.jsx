import { useEffect } from "react";
import Lenis from "lenis";
import Hero from "../components/Hero";
import About from "../components/About";
import Themes from "../components/Themes";
import Prizes from "../components/Prizes";
import HackathonTimeline from "../components/HackathonTimeline";
import Gallery from "../components/Gallery";
import RegisterQR from "../components/RegisterQR";
import Sponsors from "../components/Sponsors";
import Footer from "../components/Footer";
import HorizontalScroll from "../components/HorizontalScroll";

function HomePage() {
  useEffect(() => {
    // Initialize Lenis smooth scroll with momentum/inertia
    const lenis = new Lenis({
      duration: 1.2, // Duration of the scroll animation
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function for natural deceleration
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false, // Disable on touch devices for native feel
      touchMultiplier: 2,
    });

    // Animation frame loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Hero />
      <About />
      <HorizontalScroll>
        <Gallery />
        <Themes />
      </HorizontalScroll>
      <Prizes />
      <HackathonTimeline />
      <RegisterQR />
      <Sponsors />
      <Footer />
    </>
  );
}

export default HomePage;
