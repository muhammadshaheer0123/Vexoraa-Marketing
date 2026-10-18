"use client";

import { PLANS } from "@/lib/data";
import { scrollToTarget } from "@/lib/smooth";

const SKINS = [
  { bg: "var(--ink-2)", fg: "var(--paper)", dim: "var(--paper-dim)", dot: "var(--cobalt-soft)", btn: "btn-ghost" },
  { bg: "var(--cobalt)", fg: "#fff", dim: "rgb(255 255 255 / 0.82)", dot: "#fff", btn: "btn-ink" },
  { bg: "var(--bone)", fg: "var(--ink)", dim: "var(--bone-dim)", dot: "var(--cobalt)", btn: "btn-ink" },
];

export default function Pricing() {
  return (
    <section id="pricing" className="on-ink section-y relative z-10">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <h2 className="t-h2 max-w-[10ch]" data-split>
            Simple plans. Real reach.
          </h2>
          <p className="t-lead text-paper-dim" data-reveal>
            Fixed scope, fixed price, no retainer. Every plan includes weekly reporting and real, vetted playlists.
          </p>
        </div>

        <div className="mt-14 grid items-stretch gap-4 sm:mt-20 lg:grid-cols-3 lg:gap-5" data-stagger>
          {PLANS.map((p, i) => {
            const s = SKINS[i];
            const featured = i === 1;
            return (
              <article
                key={p.name}
                className={`flex flex-col rounded-[1.75rem] p-6 sm:rounded-[2.5rem] sm:p-9 ${featured ? "lg:-my-6 lg:py-14" : ""}`}
                style={{ background: s.bg, color: s.fg }}
              >
                <p className="text-sm font-semibold" style={{ color: s.dim }}>
                  {p.tag}
                </p>
                <h3 className="t-h2 mt-3 !text-[clamp(2.25rem,4.4vw,4.25rem)]">{p.name}</h3>
                <p className="t-num mt-7 text-[clamp(3rem,6vw,5.5rem)]">{p.price}</p>
                <p className="mt-2 font-medium" style={{ color: s.dim }}>
                  {p.cadence}
                </p>

                <ul className="mt-8 flex flex-1 flex-col gap-3.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <svg className="mt-[0.35em] shrink-0" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <circle cx="9" cy="9" r="9" fill={s.dot} />
                        <path d="m5 9.3 2.6 2.6L13 6.4" stroke={i === 1 ? "var(--cobalt)" : i === 2 ? "#fff" : "var(--ink)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`btn ${s.btn} mt-10 w-full`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTarget("#contact");
                  }}
                >
                  {p.cta}
                </a>
              </article>
            );
          })}
        </div>

        <p className="mt-10 max-w-[60ch] text-paper-dim sm:mt-16" data-reveal>
          Running a label or a roster? We build custom multi-artist campaigns. Tell us what you are releasing and we will scope it.
        </p>
      </div>
    </section>
  );
}
