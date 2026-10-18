"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { TIERS } from "@/lib/data";
import { sceneState } from "@/lib/sceneState";
import Cover from "./Cover";

/**
 * Pinned scroll story: four tiers of playlist reach. As the visitor scrolls,
 * the number climbs, the playlist list swaps, and the 3D ribbons unfold into
 * a waveform field that gets louder with every tier.
 */
export default function Ladder() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-tier]");
      const segs = gsap.utils.toArray<HTMLElement>("[data-seg]");

      const mm = gsap.matchMedia();

      // reduced motion, or a screen too short to pin (phones in landscape): stack all four tiers
      mm.add("(max-height: 619px), (prefers-reduced-motion: reduce)", () => {
        gsap.set(panels, { position: "relative", opacity: 1, yPercent: 0, pointerEvents: "auto" });
        gsap.set("[data-tier]:not(:last-child)", { marginBottom: "3.5rem" });
        gsap.set("[data-segs]", { display: "none" });
      });

      mm.add("(min-height: 620px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(panels, { opacity: 0, yPercent: 8, pointerEvents: "none" });
        gsap.set(panels[0], { opacity: 1, yPercent: 0, pointerEvents: "auto" });
        gsap.set(segs, { backgroundColor: "#1d1d23" });
        gsap.set(segs[0], { backgroundColor: "#2340ff" });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + window.innerHeight * 3.6,
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // the formation unfolds across the whole pin
        // immediateRender is off so the hero's own scroll state stays in charge until the pin begins
        tl.fromTo(
          sceneState,
          { morph: 0, spin: 0.9, zoom: 1.35, opacity: 1 },
          { morph: 1, spin: 0, zoom: 1, opacity: 0.62, duration: TIERS.length - 1 + 0.6, immediateRender: false },
          0,
        );

        TIERS.forEach((tier, i) => {
          tl.fromTo(
            sceneState,
            { intensity: i === 0 ? 0.95 : TIERS[i - 1].intensity },
            { intensity: tier.intensity, duration: 0.6, immediateRender: false },
            i,
          );
          if (i === 0) return;
          tl.to(panels[i - 1], { opacity: 0, yPercent: -8, duration: 0.35, pointerEvents: "none" }, i - 0.15)
            .fromTo(panels[i], { opacity: 0, yPercent: 8 }, { opacity: 1, yPercent: 0, duration: 0.45, pointerEvents: "auto" }, i - 0.05)
            .to(segs[i], { backgroundColor: "#2340ff", duration: 0.2 }, i - 0.05);
        });
        tl.to({}, { duration: 0.5 }); // hold the last tier
      });
    },
    { scope: root },
  );

  return (
    <section id="playlists" ref={root} className="relative z-10 flex h-auto flex-col overflow-hidden pt-24 [@media(min-height:620px)]:h-[100svh] sm:pt-28">
      <div className="wrap flex min-h-0 w-full flex-1 flex-col">
        <h2 className="t-h2 max-w-[14ch]" data-split>
          Playlists that move the needle.
        </h2>

        <div className="relative mt-5 min-h-0 flex-1 sm:mt-8">
          {TIERS.map((tier, i) => (
            <div
              key={tier.name}
              data-tier
              className="absolute inset-0 grid grid-cols-[minmax(0,1fr)] grid-rows-[auto_1fr] gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:grid-rows-1 lg:gap-14"
              aria-hidden={undefined}
            >
              <div className="flex flex-col justify-center">
                <p className="font-display text-xl font-bold text-cobalt-soft sm:text-2xl">{tier.name} tier</p>
                <p className="t-num mt-1 text-[clamp(2.2rem,12.5vw,4.5rem)] whitespace-nowrap lg:text-[clamp(2.75rem,8.4vw,9.5rem)]">{tier.range}</p>
                <p className="mt-2 text-lg text-paper-dim sm:mt-4">monthly listeners per playlist</p>
                <p className="t-lead mt-3 hidden max-w-[34ch] text-paper/90 sm:block">{tier.blurb}</p>
              </div>

              <ul className="flex flex-col justify-center gap-2.5 sm:gap-3.5" aria-label={`${tier.name} tier example playlists`}>
                {tier.playlists.map((p, j) => (
                  <li key={p.name} className="flex items-center gap-4 rounded-2xl bg-ink-2 p-2.5 pr-5 sm:gap-5 sm:p-3.5">
                    <Cover variant={i * 3 + j} palette={(i + j) % 6} className="h-14 w-14 shrink-0 rounded-xl sm:h-[4.5rem] sm:w-[4.5rem]" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-lg font-bold tracking-[-0.02em] sm:text-2xl">{p.name}</p>
                      <p className="truncate text-sm text-paper-dim sm:text-base">
                        {p.curator} &middot; {p.genre}
                      </p>
                    </div>
                    <p className="tnum text-right font-display text-xl font-extrabold tracking-[-0.03em] sm:text-3xl">
                      {p.reach}
                      <span className="block text-xs font-medium text-paper-dim sm:text-sm">listeners</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div data-segs className="flex gap-2 pb-6 pt-4 sm:pb-8" aria-hidden="true">
          {TIERS.map((t) => (
            <div key={t.name} data-seg className="h-2 flex-1 rounded-full bg-ink-3" />
          ))}
        </div>
      </div>
    </section>
  );
}
