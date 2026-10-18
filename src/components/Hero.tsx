"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { INSTAGRAM_URL, LATEST_PLACEMENTS } from "@/lib/data";
import PlatformIcon from "./PlatformIcon";
import { sceneState } from "@/lib/sceneState";
import { scrollToTarget } from "@/lib/smooth";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const ticker = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = prefersReducedMotion();
      const portrait = window.innerWidth / window.innerHeight < 1.1;
      // formation sits right of the headline on landscape screens, above it on portrait
      sceneState.x = portrait ? 0 : 0.2;
      sceneState.y = portrait ? 0.27 : 0.06;
      sceneState.opacity = portrait ? 0.42 : 1;
      sceneState.zoom = 1;

      // ── intro ──
      const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
      if (!reduce) {
        const split = SplitText.create(title.current, { type: "lines", mask: "lines", linesClass: "split-line" });
        gsap.set(split.lines, { yPercent: 115 });
        gsap.set("[data-hero-in]", { y: 36, opacity: 0 });
        intro
          .to(split.lines, { yPercent: 0, duration: 1.4, stagger: 0.12 }, 0)
          .to("[data-hero-in]", { y: 0, opacity: 1, duration: 1.1, stagger: 0.1 }, 0.5);
      }
      const play = () => intro.play();
      if (document.documentElement.dataset.ready) gsap.delayedCall(0.2, play);
      else window.addEventListener("vx:ready", () => gsap.delayedCall(0.55, play), { once: true });

      if (reduce) return;

      // ── scroll: headline lifts away, the V turns and drifts to centre ──
      gsap
        .timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.8 },
        })
        .to(title.current, { yPercent: -22, ease: "none" }, 0)
        .to("[data-hero-fade]", { opacity: 0, y: -60, ease: "none" }, 0)
        .to(sceneState, { x: 0, y: 0, spin: 0.9, zoom: 1.35, intensity: 0.95, ease: "none" }, 0);

      // rotating "latest placement" line
      const rows = gsap.utils.toArray<HTMLElement>("[data-placement]", ticker.current);
      gsap.set(rows, { yPercent: 110, opacity: 0 });
      gsap.set(rows[0], { yPercent: 0, opacity: 1 });
      let i = 0;
      gsap.delayedCall(3.2, function swap() {
        const cur = rows[i];
        i = (i + 1) % rows.length;
        const next = rows[i];
        gsap.to(cur, { yPercent: -110, opacity: 0, duration: 0.7, ease: "power3.in" });
        gsap.fromTo(next, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, ease: "expo.out", delay: 0.35 });
        gsap.delayedCall(3.6, swap);
      });
    },
    { scope: root },
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative z-10 flex min-h-[100svh] flex-col justify-end overflow-hidden pb-8 pt-32 sm:pb-12"
    >
      <div className="wrap w-full">
        <h1 ref={title} className="t-mega">
          <span className="block">Get heard</span>
          <span className="block">by millions.</span>
        </h1>

        <div className="mt-8 grid items-end gap-8 sm:mt-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16" data-hero-fade>
          <div data-hero-in>
            <p className="t-lead text-paper/90">
              Vexoraa is the music marketing agency behind real playlist placements on lists reaching 500K to 2M+ monthly
              listeners. Spotify, YouTube, SoundCloud and Apple Music. No bots, no fake streams.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <span data-magnetic className="inline-block">
                <a
                  href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                  className="btn w-full sm:w-auto"
                >
                  <PlatformIcon name="Instagram" className="h-[1.1em] w-[1.1em]" />
                  DM us on Instagram
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </span>
              <a
                href="#results"
                className="btn btn-ghost"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget("#results");
                }}
              >
                See the results
              </a>
            </div>
          </div>

          <div data-hero-in className="min-w-[260px] max-w-sm" aria-hidden="true">
            <p className="mb-2 text-sm font-medium text-paper-dim">Just landed</p>
            <div ref={ticker} className="relative h-[4.4rem] overflow-hidden">
              {LATEST_PLACEMENTS.map((p) => (
                <div key={p.track} data-placement className="absolute inset-0">
                  <p className="font-display text-2xl font-bold leading-tight tracking-[-0.03em]">&ldquo;{p.track}&rdquo;</p>
                  <p className="text-[0.95rem] text-paper-dim">
                    on {p.playlist} <span className="text-cobalt-soft">&middot; {p.reach} listeners</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
