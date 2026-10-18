"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { setLenis } from "@/lib/smooth";
import { sceneState } from "@/lib/sceneState";

/** Lenis inertia scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync. */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) {
      const onScroll = () => ScrollTrigger.update();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.3,
      smoothWheel: true,
    });
    setLenis(lenis);

    lenis.on("scroll", (e: { velocity: number }) => {
      ScrollTrigger.update();
      sceneState.vel = e.velocity;
    });
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // while the preloader is up the page must not scroll
    if (!document.documentElement.dataset.ready) lenis.stop();
    const onReady = () => lenis.start();
    window.addEventListener("vx:ready", onReady);

    return () => {
      window.removeEventListener("vx:ready", onReady);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
