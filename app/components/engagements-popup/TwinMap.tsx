// The Digital Twin slide's picture: parts of an organization and how they connect, drawn as
// hairlines. One node sits apart, joined only by a dashed line and ringed in the brand red:
// the blind spot the assessment looks for. No labels, so it claims nothing about anyone's
// business. Decorative, hidden from assistive technology.

const CENTER = { x: 200, y: 236 };

// The core of the organization, then the wider ring of customers, teams and partners.
const INNER = [
  { x: 118, y: 150 },
  { x: 214, y: 112 },
  { x: 292, y: 160 },
  { x: 306, y: 262 },
  { x: 236, y: 346 },
  { x: 136, y: 326 },
  { x: 82, y: 236 },
] as const;

const OUTER = [
  { x: 52, y: 90 },
  { x: 130, y: 40 },
  { x: 336, y: 70 },
  { x: 362, y: 372 },
  { x: 176, y: 440 },
  { x: 40, y: 380 },
] as const;

// Inner nodes ring each other, spoke to the centre, and reach out to the outer nodes.
const RING = INNER.map((_, i) => [INNER[i], INNER[(i + 1) % INNER.length]] as const);
const SPOKES = INNER.map((p) => [CENTER, p] as const);
const REACH = [
  [OUTER[0], INNER[0]],
  [OUTER[1], INNER[0]],
  [OUTER[1], INNER[1]],
  [OUTER[2], INNER[2]],
  [OUTER[3], INNER[3]],
  [OUTER[4], INNER[4]],
  [OUTER[4], INNER[5]],
  [OUTER[5], INNER[5]],
  [OUTER[5], INNER[6]],
  [OUTER[0], INNER[6]],
] as const;

const BLIND_SPOT = { x: 352, y: 206 };

function Line({ a, b, dashed, red }: { a: { x: number; y: number }; b: { x: number; y: number }; dashed?: boolean; red?: boolean }) {
  return (
    <line
      x1={a.x}
      y1={a.y}
      x2={b.x}
      y2={b.y}
      stroke={red ? "#ca3726" : "#222222"}
      strokeOpacity={red ? 1 : 0.5}
      strokeWidth={1}
      strokeDasharray={dashed ? "3 4" : undefined}
      vectorEffect="non-scaling-stroke"
    />
  );
}

export function TwinMap({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 480"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Two faint orbits give the map a sense of scale without adding information. */}
      <circle cx={CENTER.x} cy={CENTER.y} r={96} fill="none" stroke="#222222" strokeOpacity={0.09} vectorEffect="non-scaling-stroke" />
      <circle cx={CENTER.x} cy={CENTER.y} r={172} fill="none" stroke="#222222" strokeOpacity={0.09} vectorEffect="non-scaling-stroke" />

      {REACH.map(([a, b], i) => (
        <Line key={`r${i}`} a={a} b={b} />
      ))}
      {RING.map(([a, b], i) => (
        <Line key={`g${i}`} a={a} b={b} />
      ))}
      {SPOKES.map(([a, b], i) => (
        <Line key={`s${i}`} a={a} b={b} />
      ))}

      {/* The blind spot: joined to the rest by one dashed line, in red. */}
      <Line a={INNER[3]} b={BLIND_SPOT} dashed red />

      {OUTER.map((p, i) => (
        <circle key={`o${i}`} cx={p.x} cy={p.y} r={3} fill="#f5f5f5" stroke="#222222" strokeOpacity={0.6} vectorEffect="non-scaling-stroke" />
      ))}
      {INNER.map((p, i) => (
        <circle key={`i${i}`} cx={p.x} cy={p.y} r={5} fill="#f5f5f5" stroke="#222222" vectorEffect="non-scaling-stroke" />
      ))}

      <circle cx={CENTER.x} cy={CENTER.y} r={13} fill="#f5f5f5" stroke="#222222" vectorEffect="non-scaling-stroke" />
      <circle cx={CENTER.x} cy={CENTER.y} r={4} fill="#222222" />

      <circle cx={BLIND_SPOT.x} cy={BLIND_SPOT.y} r={9} fill="#f5f5f5" stroke="#ca3726" strokeDasharray="2 3" vectorEffect="non-scaling-stroke" />
      <circle cx={BLIND_SPOT.x} cy={BLIND_SPOT.y} r={3} fill="#ca3726" />
    </svg>
  );
}
