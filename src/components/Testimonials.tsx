"use client";

import { useRef, useState } from "react";
import { TESTIMONIALS } from "@/lib/data";
import Cover from "./Cover";

const initials = (n: string) =>
  n
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

export default function Testimonials() {
  const [i, setI] = useState(0);
  const drag = useRef<number | null>(null);
  const n = TESTIMONIALS.length;
  const t = TESTIMONIALS[i];
  const go = (d: number) => setI((v) => (v + d + n) % n);

  return (
    <section id="testimonials" className="on-bone section-y relative z-10 overflow-hidden">
      <div className="wrap">
        <h2 className="t-h2 max-w-[10ch]" data-split>
          Artists say it best.
        </h2>

        <div
          className="mt-12 grid gap-10 sm:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-20"
          onPointerDown={(e) => (drag.current = e.clientX)}
          onPointerUp={(e) => {
            if (drag.current === null) return;
            const dx = e.clientX - drag.current;
            drag.current = null;
            if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
          }}
          data-reveal
        >
          <figure key={i} className="vx-quote-in">
            <blockquote className="font-display text-[clamp(1.5rem,3.1vw,3rem)] font-bold leading-[1.12] tracking-[-0.03em]">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span
                className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ink font-display text-lg font-extrabold text-paper"
                aria-hidden="true"
              >
                {initials(t.name)}
              </span>
              <span>
                <span className="block font-display text-xl font-bold tracking-[-0.02em]">{t.name}</span>
                <span className="block text-bone-dim">{t.role}</span>
              </span>
            </figcaption>
          </figure>

          <div className="flex flex-col justify-between gap-8">
            <div key={`r-${i}`} className="vx-quote-in rounded-[1.75rem] bg-cobalt p-6 text-white sm:rounded-[2.25rem] sm:p-8">
              <p className="text-sm font-medium text-white/80">Result</p>
              <p className="t-h3 mt-2 !text-[clamp(1.6rem,2.8vw,2.4rem)]">{t.result}</p>
              <Cover variant={i + 2} palette={(i + 3) % 6} className="mt-6 h-28 w-full rounded-2xl" />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex" role="group" aria-label="Choose a testimonial">
                {TESTIMONIALS.map((x, idx) => (
                  <button
                    key={x.name}
                    type="button"
                    onClick={() => setI(idx)}
                    aria-label={`Show testimonial from ${x.name}`}
                    aria-current={idx === i}
                    className="grid h-11 w-9 place-items-center"
                  >
                    <span
                      className="block h-3 rounded-full transition-[width,background-color] duration-500"
                      style={{ width: idx === i ? 28 : 12, background: idx === i ? "var(--cobalt)" : "var(--bone-2)" }}
                    />
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="grid h-14 w-14 place-items-center rounded-full bg-ink text-paper transition-colors hover:bg-cobalt"
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 11H4m6-6-6 6 6 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="grid h-14 w-14 place-items-center rounded-full bg-ink text-paper transition-colors hover:bg-cobalt"
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 11h14m-6-6 6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
