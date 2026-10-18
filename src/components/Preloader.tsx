"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * The curtain. It is rendered in the server HTML so the first paint is
 * already black, then lifts once fonts are ready and the page is laid out.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLImageElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      const reduce = prefersReducedMotion();
      const finish = () => {
        html.dataset.ready = "1";
        html.style.overflow = "";
        window.dispatchEvent(new Event("vx:ready"));
      };
      html.style.overflow = "hidden";

      // failsafe: never trap the visitor behind the curtain
      gsap.delayedCall(8, () => {
        if (html.dataset.ready) return;
        gsap.set(root.current, { display: "none" });
        finish();
      });

      const state = { n: 0 };
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (reduce) {
        tl.to(root.current, { autoAlpha: 0, duration: 0.4 }).add(finish);
        return;
      }

      tl.fromTo(logo.current, { scale: 0.6, autoAlpha: 0, rotate: -6 }, { scale: 1, autoAlpha: 1, rotate: 0, duration: 1 })
        .to(
          state,
          {
            n: 100,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
              if (count.current) count.current.textContent = String(Math.round(state.n)).padStart(2, "0");
              if (bar.current) bar.current.style.transform = `scaleX(${state.n / 100})`;
            },
          },
          0.1,
        )
        .to(logo.current, { scale: 1.1, autoAlpha: 0, duration: 0.5, ease: "power2.in" })
        .to(count.current, { autoAlpha: 0, duration: 0.3 }, "<")
        .to(root.current, { yPercent: -100, duration: 1.05, ease: "expo.inOut" }, "-=0.1")
        .add(finish, "-=0.55")
        .set(root.current, { display: "none" });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="preloader fixed inset-0 z-[300] flex items-center justify-center bg-ink"
      role="status"
      aria-label="Loading Vexoraa"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={logo} src="/logo-white.png" alt="" width={842} height={708} className="w-32 sm:w-44 md:w-52" />
      <span
        ref={count}
        className="t-num absolute bottom-6 right-[var(--gutter)] text-5xl text-paper sm:text-7xl"
        aria-hidden="true"
      >
        00
      </span>
      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-ink-3" aria-hidden="true">
        <div ref={bar} className="h-full origin-left bg-cobalt" style={{ transform: "scaleX(0)" }} />
      </div>
      <noscript>
        <style>{`.preloader{display:none!important}`}</style>
      </noscript>
    </div>
  );
}
