/**
 * Cover art drawn in code: flat colour and the V / waveform grammar of the brand.
 * Placeholders for real release artwork; swap for <Image> when assets exist.
 */
const PALETTES: [string, string, string][] = [
  ["#2340ff", "#0b0b0d", "#f4f3f0"],
  ["#0b0b0d", "#f4f3f0", "#2340ff"],
  ["#f4f3f0", "#2340ff", "#0b0b0d"],
  ["#1d1d23", "#7b8cff", "#f4f3f0"],
  ["#7b8cff", "#0b0b0d", "#ffffff"],
  ["#ecece8", "#0b0b0d", "#2340ff"],
];

export default function Cover({
  variant = 0,
  palette = 0,
  className = "",
}: {
  variant?: number;
  palette?: number;
  className?: string;
}) {
  const [bg, a, b] = PALETTES[palette % PALETTES.length];
  const v = variant % 6;

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Abstract release artwork"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="100" height="100" fill={bg} />
      {v === 0 &&
        [46, 36, 26, 16, 7].map((r, i) => (
          <circle key={r} cx="50" cy="58" r={r} fill={i % 2 ? b : a} />
        ))}
      {v === 1 && (
        <>
          <path d="M-5 8 L50 96 L105 8 L84 8 L50 64 L16 8 Z" fill={a} />
          <path d="M18 8 L50 58 L82 8 L68 8 L50 36 L32 8 Z" fill={b} />
        </>
      )}
      {v === 2 &&
        Array.from({ length: 17 }).map((_, i) => {
          const h = Math.round((14 + Math.abs(Math.sin(i * 0.9) * 60) + (i % 3) * 6) * 100) / 100;
          return <rect key={i} x={Math.round((6 + i * 5.4) * 100) / 100} y={Math.round((50 - h / 2) * 100) / 100} width="3.4" height={h} rx="1.7" fill={i % 5 === 2 ? b : a} />;
        })}
      {v === 3 && (
        <>
          <circle cx="50" cy="100" r="46" fill={a} />
          <circle cx="50" cy="100" r="28" fill={b} />
          <rect y="0" width="100" height="14" fill={a} />
        </>
      )}
      {v === 4 &&
        [0, 1, 2, 3, 4, 5, 6].map((i) => (
          <path
            key={i}
            d={`M-5 ${14 + i * 13} Q 25 ${-4 + i * 13} 50 ${14 + i * 13} T 105 ${14 + i * 13} L105 ${22 + i * 13} Q 75 ${34 + i * 13} 50 ${22 + i * 13} T -5 ${22 + i * 13} Z`}
            fill={i % 2 ? b : a}
          />
        ))}
      {v === 5 &&
        Array.from({ length: 36 }).map((_, i) => {
          const x = (i % 6) * 16 + 12;
          const y = Math.floor(i / 6) * 16 + 12;
          const r = Math.round((2 + ((i * 7) % 5) * 1.4) * 100) / 100;
          return <circle key={i} cx={x} cy={y} r={r} fill={i % 7 === 0 ? b : a} />;
        })}
    </svg>
  );
}
