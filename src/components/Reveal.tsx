"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from "@/lib/gsap";

/**
 * One controller for the page's shared scroll behaviours, driven by data attributes:
 *   data-split          headline splits into masked lines that rise in
 *   data-reveal         element rises and fades in (data-delay in seconds)
 *   data-stagger        each child rises in turn
 *   data-speed="0.15"   scroll-linked parallax (fraction of its own height)
 *   data-magnetic       wrapper that leans toward the pointer (fine pointers only)
 * Content is visible by default; this only hides what it is about to animate.
 */
export default function Reveal() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let cancelled = false;

    const ctx = gsap.context(() => {
      const run = () => {
        if (cancelled) return;

        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            onSplit(self) {
              return gsap.from(self.lines, {
                yPercent: 112,
                duration: 1.15,
                ease: "expo.out",
                stagger: 0.09,
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              });
            },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 46,
            opacity: 0,
            duration: 1.1,
            ease: "power3.out",
            delay: Number(el.dataset.delay || 0),
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
          gsap.from(el.children, {
            y: 56,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
          const s = Number(el.dataset.speed || 0.1);
          gsap.fromTo(
            el,
            { yPercent: s * 100 },
            {
              yPercent: -s * 100,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
            const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
            const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
            el.addEventListener("pointermove", (e) => {
              const r = el.getBoundingClientRect();
              xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
              yTo((e.clientY - (r.top + r.height / 2)) * 0.36);
            });
            el.addEventListener("pointerleave", () => {
              xTo(0);
              yTo(0);
            });
          });
        }

        ScrollTrigger.refresh();
      };

      // split on final glyphs, after webfonts and the layout around them settle
      (document.fonts?.ready ?? Promise.resolve()).then(() => requestAnimationFrame(run));
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, []);

  return null;
}
