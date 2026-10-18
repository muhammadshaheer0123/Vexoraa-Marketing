"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { MARQUEE_A, MARQUEE_B } from "@/lib/data";

function Row({ words, dir }: { words: string[]; dir: 1 | -1 }) {
  // the group renders twice so a -50% shift loops seamlessly
  const group = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span className="font-display text-[clamp(2.4rem,6.4vw,6rem)] font-extrabold leading-none tracking-[-0.04em]">{w}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-white.png" alt="" width={842} height={708} className="mx-[clamp(1.5rem,3.5vw,3.5rem)] h-[clamp(1.6rem,3.6vw,3.2rem)] w-auto" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden py-[clamp(0.6rem,1.4vw,1.2rem)]">
      <div data-marquee-track data-dir={dir} className="flex w-max will-change-transform">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}

export default function Marquee() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tweens = gsap.utils.toArray<HTMLElement>("[data-marquee-track]").map((el) => {
        const dir = Number(el.dataset.dir);
        return gsap.fromTo(
          el,
          { xPercent: dir === 1 ? 0 : -50 },
          { xPercent: dir === 1 ? -50 : 0, duration: 38, ease: "none", repeat: -1 },
        );
      });

      // scroll velocity pushes the belts faster and flips them with the scroll direction
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity() / 380;
          const boost = 1 + Math.min(Math.abs(v), 9);
          const dir = self.direction;
          tweens.forEach((t) => {
            gsap.to(t, { timeScale: boost * dir, duration: 0.25, overwrite: true });
            gsap.to(t, { timeScale: dir, duration: 1.1, delay: 0.25, ease: "power2.out" });
          });
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="on-cobalt relative z-10 select-none" aria-label="Platforms and promises">
      <Row words={MARQUEE_A} dir={1} />
      <Row words={MARQUEE_B} dir={-1} />
    </section>
  );
}
