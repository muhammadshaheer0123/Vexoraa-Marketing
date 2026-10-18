import { readdirSync } from "node:fs";
import path from "node:path";
import Preloader from "@/components/Preloader";
import SceneMount from "@/components/SceneMount";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Ladder from "@/components/Ladder";
import Services from "@/components/Services";
import Results from "@/components/Results";
import Cases from "@/components/Cases";
import Process from "@/components/Process";
import Calculator from "@/components/Calculator";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

/** Photos dropped into public/artists/<slug>.jpg are picked up automatically. */
function artistPhotos(): Record<string, string> {
  try {
    return Object.fromEntries(
      readdirSync(path.join(process.cwd(), "public", "artists"))
        .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
        .map((f) => [f.replace(/\.[^.]+$/, "").toLowerCase(), `/artists/${f}`]),
    );
  } catch {
    return {};
  }
}

export default function Home() {
  const photos = artistPhotos();
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Preloader />
      <SceneMount />
      <SmoothScroll />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Ladder />
        <Services />
        <Results />
        <Cases photos={photos} />
        <Process />
        <Calculator />
        <Testimonials />
        <Pricing />
        <Faq />
        <Contact />
        <Reveal />
      </main>
      <Footer />
    </>
  );
}
