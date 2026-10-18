"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { PROCESS } from "@/lib/data";

export default function Process() {
  const root = useRef<HTMLElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set("[data-step]", { opacity: 1 });
        return;
      }
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]");

      steps.forEach((s, i) => {
        gsap.set(s, { opacity: 0.22 });
        ScrollTrigger.create({
          trigger: s,
          start: "top 62%",
          end: "bottom 62%",
          onToggle: (self) => {
            gsap.to(s, { opacity: self.isActive ? 1 : 0.22, duration: 0.5, ease: "power2.out" });
            if (self.isActive && label.current) label.current.textContent = PROCESS[i].when;
          },
        });
      });

      gsap.to(fill.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: "[data-steps]", start: "top 62%", end: "bottom 62%", scrub: 0.4 },
      });
    },
    { scope: root },
  );

  return (
    <section id="process" ref={root} className="on-bone section-y relative z-10">
      <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="t-h2 !text-[clamp(2.4rem,4.8vw,4.6rem)]" data-split>
            A campaign, week by week.
          </h2>
          <p className="t-lead mt-6 text-bone-dim" data-reveal>
            No black box. You see every pitch, every placement and every number as it happens.
          </p>
          <div className="mt-10 hidden items-stretch gap-5 lg:flex" aria-hidden="true">
            <div className="relative w-2.5 overflow-hidden rounded-full bg-bone-2" style={{ height: "9rem" }}>
              <div ref={fill} className="absolute inset-0 origin-top rounded-full bg-cobalt" style={{ transform: "scaleY(0)" }} />
            </div>
            <div className="flex flex-col justify-end">
              <span className="text-sm font-medium text-bone-dim">You are at</span>
              <span ref={label} className="font-display text-4xl font-extrabold tracking-[-0.04em]">
                Week 1
              </span>
            </div>
          </div>
        </div>

        <ol data-steps className="flex flex-col gap-10 lg:gap-0">
          {PROCESS.map((s) => (
            <li key={s.title} data-step className="flex flex-col justify-center gap-5 lg:min-h-[62vh]">
              <p className="w-fit rounded-full bg-ink px-4 py-1.5 text-sm font-semibold text-paper">{s.when}</p>
              <h3 className="t-h2 !text-[clamp(2.25rem,5vw,4.75rem)]">{s.title}</h3>
              <p className="t-lead max-w-[46ch] text-bone-dim">{s.text}</p>
              <ul className="mt-1 flex flex-wrap gap-2.5">
                {s.items.map((it) => (
                  <li key={it} className="rounded-full bg-bone-2 px-4 py-2 text-[0.95rem] font-medium">
                    {it}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
