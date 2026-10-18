"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { CASES } from "@/lib/data";
import Cover from "./Cover";
import ListenersMockup from "./ListenersMockup";

/**
 * Case studies. On wide screens the section pins and the track travels
 * sideways with the scroll; the cover art drifts at its own speed.
 * On phones and tablets it is a plain vertical list.
 */
export default function Cases({ photos = {} }: { photos?: Record<string, string> }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const el = track.current!;
        const dist = () => el.scrollWidth - window.innerWidth;
        const move = gsap.to(el, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + dist(),
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-cover]").forEach((c) => {
          gsap.fromTo(
            c,
            { xPercent: 14 },
            {
              xPercent: -14,
              ease: "none",
              scrollTrigger: { trigger: c, containerAnimation: move, start: "left right", end: "right left", scrub: true },
            },
          );
        });
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-case]").forEach((c) => {
          gsap.from(c, {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: c, start: "top 88%", once: true },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="cases" className="on-ink relative z-10 overflow-hidden" aria-labelledby="cases-title">
      <div
        ref={track}
        className="flex flex-col gap-6 px-[var(--gutter)] py-[var(--section-y)] lg:h-[100svh] lg:flex-row lg:items-stretch lg:gap-8 lg:px-[var(--gutter)] lg:py-24 lg:pr-[8vw]"
      >
        <div className="flex shrink-0 flex-col justify-between lg:w-[34vw] lg:pr-10">
          <h2 id="cases-title" className="t-h2 max-w-[9ch]" data-split>
            Artists who broke through.
          </h2>
          <p className="t-lead mt-6 text-paper-dim lg:mt-0">
            Five recent campaigns, with the before and after that mattered: monthly listeners.
          </p>
        </div>

        {CASES.map((c) => (
          <article
            key={c.artist}
            data-case
            className="relative flex shrink-0 flex-col justify-between gap-8 overflow-hidden rounded-[1.75rem] bg-ink-2 p-5 sm:rounded-[2.5rem] sm:p-8 lg:w-[min(58vw,860px)] lg:flex-row lg:gap-10"
          >
            <div className="relative flex aspect-[4/5] max-h-[34rem] w-full items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl lg:aspect-auto lg:h-full lg:max-h-none lg:w-[44%]">
              <div data-cover className="absolute -inset-x-[16%] inset-y-0">
                {photos[c.slug] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photos[c.slug]} alt={`${c.artist}, ${c.genre} artist`} className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <Cover variant={c.cover} palette={c.cover + 1} className="h-full w-full" />
                )}
              </div>
              <div className="relative w-[72%] max-w-[19rem] py-6 lg:w-[86%]">
                <ListenersMockup
                  artist={c.artist}
                  platform={c.platform.split(" + ")[0]}
                  fromN={c.fromN}
                  toN={c.toN}
                  weeks={parseInt(c.timeline, 10)}
                  top={c.top}
                  photo={photos[c.slug]}
                  cover={c.cover}
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between gap-8">
              <div>
                <p className="font-display text-lg font-bold text-cobalt-soft">
                  {c.genre} &middot; {c.platform}
                </p>
                <h3 className="t-h3 mt-2 !text-[clamp(2rem,3.6vw,3.5rem)]">{c.artist}</h3>
                <p className="mt-4 max-w-[36ch] text-paper/80">{c.line}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-paper-dim">Monthly listeners</p>
                <p className="t-num mt-1 flex flex-wrap items-baseline gap-x-3 text-[clamp(2.25rem,3.4vw,3.5rem)]">
                  <span className="text-paper-dim">{c.from}</span>
                  <span className="text-cobalt-soft" aria-label="to">
                    &rarr;
                  </span>
                  <span>{c.to}</span>
                </p>
                <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
                  {[
                    ["Timeline", c.timeline],
                    ["Placements", c.placements],
                    ["Reach", c.streams],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-ink-3 px-3 py-2.5">
                      <dt className="text-paper-dim">{k}</dt>
                      <dd className="mt-0.5 font-display text-base font-bold leading-tight tracking-[-0.02em] sm:text-lg">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
