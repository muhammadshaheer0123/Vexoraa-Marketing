"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { TIERS } from "@/lib/data";
import { sceneState } from "@/lib/sceneState";
import { scrollToTarget } from "@/lib/smooth";

const PLATFORMS = [
  { name: "Spotify", factor: 1 },
  { name: "YouTube", factor: 0.85 },
  { name: "SoundCloud", factor: 0.7 },
  { name: "Apple Music", factor: 0.55 },
];
const PLANS = [
  { name: "Launch", base: 12000 },
  { name: "Growth", base: 48000 },
  { name: "Breakthrough", base: 140000 },
];

const MIN = 500;
const MAX = 250000;
const fromSlider = (p: number) => Math.round(MIN * Math.pow(MAX / MIN, p / 100) / 100) * 100;
const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });
const full = new Intl.NumberFormat("en-US");

function Option({
  name,
  label,
  checked,
  onChange,
}: {
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="cursor-pointer">
      <input type="radio" name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="block rounded-full bg-ink-3 px-2 py-3 text-center text-[0.88rem] font-semibold sm:px-5 sm:text-[0.95rem] transition-colors duration-300 peer-checked:bg-cobalt peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cobalt-soft">
        {label}
      </span>
    </label>
  );
}

export default function Calculator() {
  const uid = useId();
  const root = useRef<HTMLElement>(null);
  const big = useRef<HTMLSpanElement>(null);
  const shown = useRef({ v: 0 });
  const [platform, setPlatform] = useState(0);
  const [plan, setPlan] = useState(1);
  const [slider, setSlider] = useState(38);

  const current = fromSlider(slider);

  const out = useMemo(() => {
    const add = PLANS[plan].base * PLATFORMS[platform].factor * (1 + 0.15 * Math.log10(Math.max(current, MIN) / MIN));
    const projected = Math.round((current + add) / 100) * 100;
    return {
      projected,
      low: Math.round((current + add * 0.7) / 100) * 100,
      high: Math.round((current + add * 1.25) / 100) * 100,
      ratio: projected / current,
      streams: Math.round((projected * 3.1) / 1000) * 1000,
      tier: TIERS[Math.min(3, plan + (current >= 25000 ? 1 : 0))],
    };
  }, [platform, plan, current]);

  // count the headline number to its new value and let the 3D field react
  useEffect(() => {
    const el = big.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.textContent = full.format(out.projected);
      return;
    }
    const tween = gsap.to(shown.current, {
      v: out.projected,
      duration: 0.9,
      ease: "power3.out",
      overwrite: true,
      onUpdate: () => (el.textContent = full.format(Math.round(shown.current.v))),
    });
    return () => {
      tween.kill();
    };
  }, [out.projected]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 70%",
      end: "bottom 30%",
      onToggle: (self) => {
        // calm the field behind the copy, but keep it reacting to the projection
        gsap.to(sceneState, {
          opacity: self.isActive ? 0.38 : 0.62,
          ...(self.isActive ? { intensity: Math.min(1.6, 0.5 + out.ratio * 0.18) } : {}),
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      },
    });
    return () => st.kill();
  }, [out.ratio]);

  useEffect(() => {
    if (!root.current) return;
    if (ScrollTrigger.isInViewport(root.current, 0.3)) {
      gsap.to(sceneState, { intensity: Math.min(1.6, 0.5 + out.ratio * 0.18), duration: 0.8, overwrite: "auto" });
    }
  }, [out.ratio]);

  return (
    <section id="calculator" ref={root} className="relative z-10 section-y">
      <div className="wrap">
        <h2 className="t-h2 max-w-[11ch]" data-split>
          Project your next 90 days.
        </h2>
        <p className="t-lead mt-6 text-paper/80" data-reveal>
          Pick a platform, your current monthly listeners and a plan. The field behind this page gets louder as the projection grows.
        </p>

        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-6" data-reveal>
          {/* controls */}
          <div className="rounded-[1.75rem] bg-ink-2 p-5 sm:rounded-[2.5rem] sm:p-9">
            <fieldset>
              <legend className="font-display text-xl font-bold tracking-[-0.02em]">Platform</legend>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {PLATFORMS.map((p, i) => (
                  <Option key={p.name} name={`${uid}-platform`} label={p.name} checked={platform === i} onChange={() => setPlatform(i)} />
                ))}
              </div>
            </fieldset>

            <div className="mt-9">
              <div className="flex items-end justify-between gap-4">
                <label htmlFor={`${uid}-listeners`} className="font-display text-xl font-bold tracking-[-0.02em]">
                  Monthly listeners today
                </label>
                <output htmlFor={`${uid}-listeners`} className="t-num text-4xl text-cobalt-soft sm:text-5xl">
                  {full.format(current)}
                </output>
              </div>
              <input
                id={`${uid}-listeners`}
                type="range"
                min={0}
                max={100}
                step={1}
                value={slider}
                onChange={(e) => setSlider(Number(e.target.value))}
                className="vx-range mt-5 w-full"
                aria-valuetext={`${full.format(current)} monthly listeners`}
              />
              <div className="mt-2 flex justify-between text-sm text-paper-dim" aria-hidden="true">
                <span>500</span>
                <span>250K</span>
              </div>
            </div>

            <fieldset className="mt-9">
              <legend className="font-display text-xl font-bold tracking-[-0.02em]">Plan</legend>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {PLANS.map((p, i) => (
                  <Option key={p.name} name={`${uid}-plan`} label={p.name} checked={plan === i} onChange={() => setPlan(i)} />
                ))}
              </div>
            </fieldset>
          </div>

          {/* output */}
          <div className="on-cobalt flex flex-col justify-between gap-10 rounded-[1.75rem] p-5 sm:rounded-[2.5rem] sm:p-9" aria-live="polite">
            <div>
              <p className="font-display text-xl font-bold tracking-[-0.02em]">Projected monthly listeners in 90 days</p>
              <p className="t-num mt-4 text-[clamp(3.5rem,9vw,9rem)]">
                <span ref={big}>{full.format(out.projected)}</span>
              </p>
              <p className="mt-3 text-lg text-white/85">
                Likely range {compact.format(out.low)} to {compact.format(out.high)}, about{" "}
                <strong className="font-semibold">{out.ratio.toFixed(1)}x</strong> today&rsquo;s audience.
              </p>
            </div>

            <dl className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-cobalt-deep px-5 py-4">
                <dt className="text-sm text-white/75">Playlist tier unlocked</dt>
                <dd className="mt-1 font-display text-2xl font-extrabold tracking-[-0.03em]">
                  {out.tier.name} <span className="text-base font-semibold text-white/75">({out.tier.range})</span>
                </dd>
              </div>
              <div className="rounded-2xl bg-cobalt-deep px-5 py-4">
                <dt className="text-sm text-white/75">Estimated monthly streams</dt>
                <dd className="mt-1 font-display text-2xl font-extrabold tracking-[-0.03em]">{compact.format(out.streams)}</dd>
              </div>
            </dl>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[40ch] text-sm text-white/80">
                Illustrative projection from our past campaign averages. It is an estimate, not a guarantee.
              </p>
              <a
                href="#contact"
                className="btn btn-ink shrink-0"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget("#contact");
                }}
              >
                Plan this campaign
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
