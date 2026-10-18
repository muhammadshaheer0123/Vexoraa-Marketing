"use client";

import { useEffect, useRef, useState } from "react";
import Cover from "./Cover";

type Props = {
  artist: string;
  platform: string;
  fromN: number;
  toN: number;
  weeks: number;
  top: { name: string; reach: string }[];
  photo?: string;
  cover: number;
};

const fmt = new Intl.NumberFormat("en-US");
const r2 = (n: number) => Math.round(n * 100) / 100;

/** Deterministic growth curve from `from` to `to`, a little bumpy like real listener data. */
function series(from: number, to: number, n: number) {
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    const base = Math.pow(t, 2.15);
    const bump = Math.sin(i * 1.9) * 0.025 * (1 - t) * (t > 0 && t < 1 ? 1 : 0);
    return from + (to - from) * Math.min(1, Math.max(0, base + bump));
  });
}

/**
 * A phone screenshot of an artist analytics screen, built in HTML so it stays
 * sharp and the numbers are real text. All sizes use container-query units so
 * the whole phone scales with whatever width it is given.
 */
export default function ListenersMockup({ artist, platform, fromN, toN, weeks, top, photo, cover }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = num.current;
    if (!el) return;
    if (!seen) {
      el.textContent = fmt.format(fromN);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = fmt.format(toN);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const dur = 2200;
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt.format(Math.round(fromN + (toN - fromN) * e));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen, fromN, toN]);

  // chart geometry in a 100 x 40 box
  const pts = series(fromN, toN, weeks).map((v, i, a) => ({
    x: r2((i / (a.length - 1)) * 100),
    y: r2(37 - ((v - fromN) / (toN - fromN)) * 33),
  }));
  let line = `M${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1];
    const c = pts[i];
    const mx = r2((p.x + c.x) / 2);
    line += ` Q${p.x} ${p.y} ${mx} ${r2((p.y + c.y) / 2)}`;
  }
  const last = pts[pts.length - 1];
  line += ` T${last.x} ${last.y}`;
  const area = `${line} L100 40 L0 40 Z`;
  const delta = Math.round((toN / fromN - 1) * 100);

  return (
    <div ref={ref} style={{ containerType: "inline-size" }} className="w-full" role="img" aria-label={`${artist} analytics: monthly listeners grew from ${fmt.format(fromN)} to ${fmt.format(toN)} in ${weeks} weeks`}>
      <div style={{ background: "#26262d", borderRadius: "13cqw", padding: "2.2cqw" }}>
        <div style={{ background: "#0e0e12", borderRadius: "11cqw", padding: "6cqw 6cqw 6.5cqw", color: "#f4f3f0" }} aria-hidden="true" data-ui>
          {/* notch */}
          <div style={{ margin: "-2.5cqw auto 4.5cqw", width: "24cqw", height: "4.6cqw", borderRadius: "9cqw", background: "#26262d" }} />

          {/* artist header */}
          <div style={{ display: "flex", alignItems: "center", gap: "3.5cqw" }}>
            <div style={{ width: "12cqw", height: "12cqw", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
              ) : (
                <Cover variant={cover} palette={cover + 1} className="h-full w-full" />
              )}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: "5cqw", fontWeight: 700, lineHeight: 1.15, fontFamily: "var(--font-bricolage)" }}>{artist}</p>
              <p style={{ fontSize: "3.4cqw", color: "#a9a9b3", lineHeight: 1.3 }}>{platform} audience</p>
            </div>
          </div>

          {/* headline stat */}
          <p style={{ marginTop: "6cqw", fontSize: "3.6cqw", color: "#a9a9b3" }}>Monthly listeners</p>
          <p
            className="tnum"
            style={{ fontSize: "13cqw", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.05em", fontFamily: "var(--font-bricolage)", marginTop: "1cqw" }}
          >
            <span ref={num}>{fmt.format(fromN)}</span>
          </p>
          <p style={{ marginTop: "2.5cqw", display: "inline-block", borderRadius: "9cqw", background: "#2340ff", padding: "1cqw 3cqw", fontSize: "3.4cqw", fontWeight: 700 }}>
            +{fmt.format(delta)}% in {weeks} weeks
          </p>

          {/* chart */}
          <svg viewBox="0 0 100 40" style={{ marginTop: "4cqw", width: "100%", display: "block", overflow: "visible" }}>
            <path
              d={area}
              fill="#2340ff"
              style={{ opacity: seen ? 0.28 : 0, transition: "opacity 1.4s ease 0.9s" }}
            />
            <path
              d={line}
              fill="none"
              stroke="#7b8cff"
              strokeWidth="1.5"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              style={{ strokeDashoffset: seen ? 0 : 1, transition: "stroke-dashoffset 2.2s cubic-bezier(0.16,1,0.3,1)" }}
            />
            <circle cx={last.x} cy={last.y} r="2.2" fill="#fff" style={{ opacity: seen ? 1 : 0, transition: "opacity 0.4s ease 2s" }} />
            <circle cx={last.x} cy={last.y} r="4.4" fill="#7b8cff" style={{ opacity: seen ? 0.35 : 0, transition: "opacity 0.4s ease 2s" }} />
          </svg>
          <div style={{ marginTop: "2cqw", display: "flex", justifyContent: "space-between", fontSize: "3cqw", color: "#a9a9b3" }}>
            <span>Week 1</span>
            <span>Week {Math.ceil(weeks / 2)}</span>
            <span>Week {weeks}</span>
          </div>

          {/* top playlists */}
          <p style={{ marginTop: "6cqw", fontSize: "3.6cqw", color: "#a9a9b3" }}>Top playlists</p>
          <div style={{ marginTop: "2cqw", display: "grid", gap: "2cqw" }}>
            {top.map((t, i) => (
              <div key={t.name} style={{ display: "flex", alignItems: "center", gap: "3cqw", background: "#1b1b21", borderRadius: "4.5cqw", padding: "2.4cqw 3cqw" }}>
                <div style={{ width: "8cqw", height: "8cqw", borderRadius: "2cqw", overflow: "hidden", flexShrink: 0 }}>
                  <Cover variant={cover + i + 2} palette={cover + i + 2} className="h-full w-full" />
                </div>
                <p style={{ flex: 1, minWidth: 0, fontSize: "3.7cqw", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.name}</p>
                <p className="tnum" style={{ fontSize: "3.5cqw", color: "#7b8cff", fontWeight: 700 }}>{t.reach}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
