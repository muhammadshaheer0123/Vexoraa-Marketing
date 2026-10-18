"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { FOOTER_LINKS } from "@/lib/data";
import { scrollToTarget } from "@/lib/smooth";

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-letter]", {
        yPercent: 105,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.07,
        scrollTrigger: { trigger: "[data-wordmark]", start: "top 92%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="on-ink relative z-10 overflow-hidden pt-[clamp(5rem,10vw,9rem)]">
      <div className="wrap">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
          <div className="max-w-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-white.png" alt="" width={842} height={708} className="h-12 w-auto" />
            <p className="mt-5 text-paper-dim">
              Music marketing for artists who want real listeners, real playlists and a career, not a vanity number.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <nav key={title} aria-label={title}>
              <h2 className="font-display text-lg font-bold tracking-[-0.02em]">{title}</h2>
              <ul className="mt-3 flex flex-col">
                {links.map((l) => {
                  const external = l.href.startsWith("http");
                  return (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="link-u inline-block py-2.5 text-paper-dim transition-colors hover:text-paper"
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {
                              onClick: (e: React.MouseEvent) => {
                                e.preventDefault();
                                scrollToTarget(l.href);
                              },
                            })}
                      >
                        {l.label}
                        {external && <span className="sr-only"> (opens in a new tab)</span>}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>

        <div
          data-wordmark
          className="mt-16 flex select-none justify-between font-display font-extrabold leading-[0.9] tracking-[-0.06em] sm:mt-24"
          style={{ fontSize: "clamp(3.4rem, 19.4vw, 21rem)" }}
          aria-label="Vexoraa"
          role="img"
        >
          {"VEXORAA".split("").map((c, i) => (
            <span key={i} className="mask-line px-[0.015em] pb-[0.05em] pt-[0.02em]" aria-hidden="true">
              <span data-letter className="block">
                {c}
              </span>
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-3 py-8 text-sm text-paper-dim sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Vexoraa. All rights reserved.</p>
          <p>Real playlists. Real listeners. Results vary by release and genre.</p>
        </div>
      </div>
    </footer>
  );
}
