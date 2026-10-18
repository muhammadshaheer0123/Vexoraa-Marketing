"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { RESULTS } from "@/lib/data";

const fmt = (n: number, decimals: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

export default function Results() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // the cobalt field opens up from a rounded inset as it arrives
      gsap.fromTo(
        root.current,
        { clipPath: "inset(7% 5% 0% 5% round 3rem)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0rem)",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 25%", scrub: true },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const decimals = Number(el.dataset.decimals || 0);
        const obj = { v: 0 };
        el.textContent = fmt(0, decimals);
        gsap.to(obj, {
          v: end,
          duration: 2.4,
          ease: "power3.out",
          onUpdate: () => (el.textContent = fmt(obj.v, decimals)),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // numbers lean in with scroll
      gsap.utils.toArray<HTMLElement>("[data-lean]").forEach((el) => {
        gsap.fromTo(
          el,
          { xPercent: 6 },
          { xPercent: -2, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom 30%", scrub: true } },
        );
      });
    },
    { scope: root },
  );

  return (
    <section id="results" ref={root} className="on-cobalt section-y relative z-10 overflow-x-clip will-change-[clip-path]">
      <div className="wrap">
        <h2 className="t-h2 max-w-[13ch]" data-split>
          Numbers we put our name on.
        </h2>

        <ul className="mt-14 flex flex-col sm:mt-24">
          {RESULTS.map((r) => (
            <li key={r.label} className="grid items-end gap-x-10 gap-y-2 py-7 sm:py-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
              <p className="t-num text-[clamp(4.5rem,17vw,17rem)]" data-lean>
                <span data-count={r.value} data-decimals={r.decimals}>
                  {fmt(r.value, r.decimals)}
                </span>
                <span>{r.suffix}</span>
              </p>
              <p className="pb-2 font-display text-[clamp(1.25rem,2.2vw,2rem)] font-bold leading-tight tracking-[-0.02em] md:pb-4">
                {r.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
