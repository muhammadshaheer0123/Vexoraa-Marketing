"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { NAV_LINKS } from "@/lib/data";
import { getLenis, scrollToTarget } from "@/lib/smooth";

export default function Nav() {
  const bar = useRef<HTMLElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      const el = bar.current!;
      gsap.set(el, { yPercent: -100 });
      const show = () => gsap.to(el, { yPercent: 0, duration: 0.9, ease: "expo.out" });
      if (document.documentElement.dataset.ready) show();
      else window.addEventListener("vx:ready", () => gsap.delayedCall(0.5, show), { once: true });

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          el.dataset.solid = y > 60 ? "1" : "0";
          if (!document.documentElement.dataset.ready) return;
          gsap.to(el, {
            yPercent: self.direction === 1 && y > 320 ? -100 : 0,
            duration: 0.55,
            ease: "power3.out",
            overwrite: true,
          });
        },
      });

      gsap.to(progress.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });
    },
    { scope: bar },
  );

  // lock scroll and allow Escape while the menu is open
  useEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      getLenis()?.start();
    };
  }, [open]);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // let the menu release scroll before travelling
    setTimeout(() => scrollToTarget(href, -8), open ? 60 : 0);
  };

  return (
    <>
      <header
        ref={bar}
        data-solid="0"
        className="group fixed inset-x-0 top-0 z-[100] transition-colors duration-500 data-[solid=1]:bg-ink"
      >
        <div className="wrap flex h-[68px] items-center justify-between sm:h-[76px]">
          <a href="#top" onClick={go("#top")} className="flex items-center gap-3" aria-label="Vexoraa, back to top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-white.png" alt="" width={842} height={708} className="h-8 w-auto sm:h-9" />
            <span className="font-display text-xl font-extrabold tracking-[-0.04em] sm:text-2xl">Vexoraa</span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={go(l.href)} className="link-u py-1 text-[0.95rem] font-medium text-paper">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contact" onClick={go("#contact")} className="btn hidden !min-h-[46px] !px-5 !text-[0.95rem] sm:inline-flex">
              Book a strategy call
            </a>
            <button
              type="button"
              className="grid h-12 w-12 place-items-center rounded-full bg-ink-3 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="relative block h-3 w-6" aria-hidden="true">
                <span
                  className="absolute left-0 top-0 h-0.5 w-6 bg-paper transition-transform duration-500"
                  style={{ transform: open ? "translateY(5px) rotate(45deg)" : "none" }}
                />
                <span
                  className="absolute bottom-0 left-0 h-0.5 w-6 bg-paper transition-transform duration-500"
                  style={{ transform: open ? "translateY(-5px) rotate(-45deg)" : "none" }}
                />
              </span>
            </button>
          </div>
        </div>
        <div className="h-[3px] w-full bg-transparent" aria-hidden="true">
          <div ref={progress} className="h-full origin-left bg-cobalt" style={{ transform: "scaleX(0)" }} />
        </div>
      </header>

      <div
        id="mobile-menu"
        className="fixed inset-0 z-[90] flex flex-col justify-between bg-ink px-[var(--gutter)] pb-10 pt-28 transition-[clip-path] duration-[800ms] [transition-timing-function:var(--ease-io)] lg:hidden"
        style={{ clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)" }}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={go(l.href)}
              className="t-h2 block py-1 transition-[opacity,transform] duration-700 [transition-timing-function:var(--ease-out)]"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(40px)",
                transitionDelay: open ? `${180 + i * 60}ms` : "0ms",
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact" onClick={go("#contact")} className="btn w-full">
          Book a strategy call
        </a>
      </div>
    </>
  );
}
