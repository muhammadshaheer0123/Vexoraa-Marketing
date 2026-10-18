"use client";

import { useState } from "react";
import { SERVICES } from "@/lib/data";
import Cover from "./Cover";

function Plus({ open }: { open: boolean }) {
  return (
    <span
      className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full transition-[background-color,transform] duration-500 sm:h-16 sm:w-16"
      style={{ background: open ? "var(--cobalt)" : "var(--ink)", color: "#fff", transform: open ? "rotate(135deg)" : "none" }}
      aria-hidden="true"
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <path d="M11 3v16M3 11h16" />
      </svg>
    </span>
  );
}

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="on-bone section-y relative z-10">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <h2 className="t-h2 max-w-[11ch]" data-split>
            Every platform. One strategy.
          </h2>
          <p className="t-lead text-bone-dim" data-reveal>
            The same track, heard in the right places at the right moment. We plan across all four platforms so each placement
            feeds the next.
          </p>
        </div>

        <ul className="mt-14 flex flex-col gap-3 sm:mt-20 sm:gap-4" data-stagger>
          {SERVICES.map((s, i) => {
            const open = active === i;
            return (
              <li
                key={s.platform}
                className="overflow-hidden rounded-[1.75rem] transition-colors duration-700 sm:rounded-[2.5rem]"
                style={{ background: open ? "var(--ink)" : "var(--bone-2)", color: open ? "var(--paper)" : "var(--bone-ink)" }}
              >
                <h3>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-10 sm:py-8"
                    aria-expanded={open}
                    aria-controls={`svc-${i}`}
                    onClick={() => setActive(open ? -1 : i)}
                  >
                    <span className="t-h2 !text-[clamp(2.25rem,7.4vw,7rem)]">{s.platform}</span>
                    <span className="flex items-center gap-8">
                      <span className="hidden text-right text-sm font-medium opacity-70 md:block">
                        <span className="t-num block text-4xl">{s.metric}</span>
                        <span className="block max-w-[16ch]">{s.metricLabel}</span>
                      </span>
                      <Plus open={open} />
                    </span>
                  </button>
                </h3>

                <div
                  id={`svc-${i}`}
                  role="region"
                  aria-label={`${s.platform} details`}
                  className="grid transition-[grid-template-rows] duration-[700ms] [transition-timing-function:var(--ease-out)]"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-8 px-5 pb-6 sm:px-10 sm:pb-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
                      <div>
                        <p className="t-lead text-paper/90">{s.lead}</p>
                        <ul className="mt-6 flex flex-col gap-3 text-paper/80">
                          {s.points.map((p) => (
                            <li key={p} className="flex gap-3">
                              <span className="mt-[0.7em] h-2 w-2 shrink-0 rounded-full bg-cobalt-soft" aria-hidden="true" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-end gap-5 md:justify-end">
                        <div className="md:hidden">
                          <p className="t-num text-5xl text-cobalt-soft">{s.metric}</p>
                          <p className="mt-1 text-sm text-paper-dim">{s.metricLabel}</p>
                        </div>
                        <Cover variant={i + 1} palette={(i * 2 + 1) % 6} className="hidden h-44 w-44 rounded-2xl md:block lg:h-56 lg:w-56" />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
