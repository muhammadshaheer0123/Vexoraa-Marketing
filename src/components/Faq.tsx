"use client";

import { useState } from "react";
import { FAQS } from "@/lib/data";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="on-bone section-y relative z-10">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-24">
        <div>
          <h2 className="t-h2 max-w-[8ch]" data-split>
            Straight answers.
          </h2>
          <p className="t-lead mt-6 text-bone-dim" data-reveal>
            Skeptical of music promotion? Good. Here is exactly how we work.
          </p>
        </div>

        <ul className="flex flex-col gap-2.5" data-stagger>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <li
                key={f.q}
                className="rounded-3xl transition-colors duration-500"
                style={{ background: isOpen ? "var(--ink)" : "var(--bone-2)", color: isOpen ? "var(--paper)" : "var(--bone-ink)" }}
              >
                <h3>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-8 sm:py-6"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="font-display text-xl font-bold leading-tight tracking-[-0.025em] sm:text-2xl">{f.q}</span>
                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full transition-[transform,background-color] duration-500"
                      style={{ background: isOpen ? "var(--cobalt)" : "var(--ink)", color: "#fff", transform: isOpen ? "rotate(45deg)" : "none" }}
                      aria-hidden="true"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <path d="M8 2v12M2 8h12" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-${i}`}
                  role="region"
                  aria-label={f.q}
                  className="grid transition-[grid-template-rows] duration-[600ms] [transition-timing-function:var(--ease-out)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="t-body px-6 pb-6 text-paper/85 sm:px-8 sm:pb-8">{f.a}</p>
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
