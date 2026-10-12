/**
 * A cybersecurity "defence lattice" hero scene, drawn entirely as vector
 * geometry so it stays crisp at any size and recolours from the site tokens.
 *
 * Composition, back to front: atmospheric depth glow, a perspective floor grid,
 * a honeycomb shield clipped to a single shield silhouette, pulsing scan rings
 * and a sweeping scan beam, satellite nodes linked back to the shield by dashed
 * traces, and a layer of drifting particles on top.
 */

const CX = 800;
const CY = 470;

/* -------------------------------------------------------------------------- */
/*                              honeycomb lattice                             */
/* -------------------------------------------------------------------------- */

const HEX_R = 30;
const HEX_W = Math.sqrt(3) * HEX_R;

/** A pointy-top hexagon centred on (cx, cy). */
function hexPath(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    pts.push(
      `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`,
    );
  }
  return `M ${pts.join(" L ")} Z`;
}

const HEXES: { d: string; cx: number; cy: number }[] = [];
for (let col = 0; col < 11; col++) {
  const cx = 520 + col * HEX_W;
  for (let row = 0; row < 13; row++) {
    const cy = 190 + row * HEX_R * 1.5 + (col % 2 ? HEX_R * 0.75 : 0);
    HEXES.push({ d: hexPath(cx, cy, HEX_R * 0.94), cx, cy });
  }
}

/* -------------------------------------------------------------------------- */
/*                                  geometry                                  */
/* -------------------------------------------------------------------------- */

/** The silhouette the honeycomb is clipped to. */
const SHIELD =
  "M 800 168 L 1014 274 L 1014 494 C 1014 652 906 758 800 798 C 694 758 586 652 586 494 L 586 274 Z";

const NODES = [
  { x: 296, y: 300 },
  { x: 1306, y: 282 },
  { x: 214, y: 626 },
  { x: 1382, y: 646 },
  { x: 556, y: 128 },
  { x: 1062, y: 118 },
  { x: 424, y: 764 },
  { x: 1188, y: 792 },
  { x: 1500, y: 452 },
  { x: 96, y: 452 },
];

const RAYS = Array.from({ length: 21 }, (_, i) => `M ${CX} ${CY} L ${-300 + i * 110} 940`);

const PARTICLES = Array.from({ length: 52 }, (_, i) => ({
  cx: 40 + ((i * 197) % 1520),
  cy: 80 + ((i * 263) % 740),
  r: 1.2 + ((i * 7) % 5) * 0.7,
  o: 0.16 + ((i * 13) % 60) / 125,
  delay: -(i % 13) * 0.8,
}));

export function CyberShieldScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="cd-sky" cx="50%" cy="44%" r="72%">
          <stop offset="0%" stopColor="#0a2a3f" />
          <stop offset="45%" stopColor="#061a2c" />
          <stop offset="100%" stopColor="#05070d" />
        </radialGradient>

        <linearGradient id="cd-shield-fill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.34" />
          <stop offset="55%" stopColor="#0ea5e9" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.3" />
        </linearGradient>

        <linearGradient id="cd-shield-edge" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="50%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>

        <radialGradient id="cd-core" cx="42%" cy="36%" r="66%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#a5f3fc" />
          <stop offset="100%" stopColor="#4f46e5" />
        </radialGradient>

        <radialGradient id="cd-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.42" />
          <stop offset="55%" stopColor="#6366f1" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="cd-scan" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a5f3fc" stopOpacity="0" />
          <stop offset="50%" stopColor="#a5f3fc" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#a5f3fc" stopOpacity="0" />
        </linearGradient>

        <filter id="cd-blur-lg" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="36" />
        </filter>
        <filter id="cd-blur-sm" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <filter id="cd-glow" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="11" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <clipPath id="cd-shield-clip">
          <path d={SHIELD} />
        </clipPath>
      </defs>

      {/* Sky */}
      <rect width="1600" height="900" fill="url(#cd-sky)" />

      {/* Depth haze */}
      <ellipse cx={CX} cy={CY} rx="640" ry="350" fill="url(#cd-halo)" />
      <ellipse
        cx="360"
        cy="290"
        rx="270"
        ry="175"
        fill="#22d3ee"
        opacity="0.11"
        filter="url(#cd-blur-lg)"
      />
      <ellipse
        cx="1270"
        cy="330"
        rx="250"
        ry="165"
        fill="#7c3aed"
        opacity="0.15"
        filter="url(#cd-blur-lg)"
      />

      {/* Perspective floor */}
      <g stroke="#67e8f9" strokeOpacity="0.13" strokeWidth="1.5" fill="none">
        {RAYS.map((d) => (
          <path key={d} d={d} />
        ))}
        {[566, 606, 656, 716, 788, 874].map((y) => (
          <line key={y} x1="-60" y1={y} x2="1660" y2={y} strokeOpacity="0.09" />
        ))}
      </g>

      {/* Satellite traces */}
      <g
        stroke="#67e8f9"
        strokeOpacity="0.32"
        strokeWidth="1.5"
        strokeDasharray="7 10"
        fill="none"
      >
        {NODES.map((n) => (
          <path key={`${n.x}-${n.y}`} d={`M ${n.x} ${n.y} L ${CX} ${CY}`} />
        ))}
      </g>

      {/* Scan rings */}
      <g fill="none" stroke="#22d3ee">
        <circle cx={CX} cy={CY} r="300" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4 14">
          <animate attributeName="r" values="260;340;260" dur="9s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.4;0.08;0.4" dur="9s" repeatCount="indefinite" />
        </circle>
        <circle cx={CX} cy={CY} r="372" stroke="#a78bfa" strokeOpacity="0.22" strokeWidth="1.5" strokeDasharray="3 18">
          <animate attributeName="r" values="372;300;372" dur="13s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.08;0.34;0.08" dur="13s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Shield */}
      <g className="cd-float">
        <path
          d={SHIELD}
          fill="url(#cd-shield-fill)"
          stroke="url(#cd-shield-edge)"
          strokeWidth="3.5"
          filter="url(#cd-glow)"
        />

        {/* Honeycomb clipped to the shield */}
        <g clipPath="url(#cd-shield-clip)">
          <g stroke="#a5f3fc" strokeOpacity="0.34" strokeWidth="1.2" fill="none">
            {HEXES.map((h, i) => (
              <path key={i} d={h.d} className="cd-hex" style={{ animationDelay: `${-(i % 14) * 0.42}s` }} />
            ))}
          </g>

          {/* Inner rim */}
          <path
            d={SHIELD}
            fill="none"
            stroke="#e0f2fe"
            strokeOpacity="0.5"
            strokeWidth="2"
            transform="translate(0 0) scale(1)"
          />
          <path
            d="M 800 214 L 966 296 L 966 494 C 966 628 876 716 800 748 C 724 716 634 628 634 494 L 634 296 Z"
            fill="none"
            stroke="#e0f2fe"
            strokeOpacity="0.22"
            strokeWidth="1.5"
          />

          {/* Scan beam sweeping the shield interior */}
          <rect
            x="560"
            y="0"
            width="480"
            height="200"
            fill="url(#cd-scan)"
            className="cd-scanbeam"
          />
        </g>

        {/* Core */}
        <g filter="url(#cd-glow)">
          <circle cx={CX} cy={CY} r="46" fill="url(#cd-core)" />
          <circle cx={CX} cy={CY} r="46" fill="none" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="2" />
          <circle
            cx={CX}
            cy={CY}
            r="76"
            fill="none"
            stroke="#a5f3fc"
            strokeOpacity="0.45"
            strokeWidth="2"
            strokeDasharray="6 12"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${CX} ${CY}`}
              to={`360 ${CX} ${CY}`}
              dur="26s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx={CX}
            cy={CY}
            r="104"
            fill="none"
            stroke="#c4b5fd"
            strokeOpacity="0.28"
            strokeWidth="1.5"
            strokeDasharray="3 16"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`360 ${CX} ${CY}`}
              to={`0 ${CX} ${CY}`}
              dur="38s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>

      {/* Satellite nodes */}
      {NODES.map((n, i) => (
        <g key={`n-${n.x}-${n.y}`} className="cd-bob" style={{ animationDelay: `${-(i * 0.9).toFixed(1)}s` }}>
          <circle cx={n.x} cy={n.y} r="22" fill="#22d3ee" opacity="0.3" filter="url(#cd-blur-sm)" />
          <circle cx={n.x} cy={n.y} r="8" fill="#e0f2fe" />
          <circle
            cx={n.x}
            cy={n.y}
            r="15"
            fill="none"
            stroke="#a5f3fc"
            strokeOpacity="0.55"
            strokeWidth="1.5"
          >
            <animate attributeName="r" values="10;22;10" dur={`${5 + (i % 4)}s`} repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.7;0;0.7" dur={`${5 + (i % 4)}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* Dust */}
      <g fill="#e0f2fe">
        {PARTICLES.map((p, i) => (
          <circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            opacity={p.o}
            className="cd-drift"
            style={{ animationDelay: `${p.delay}s` }}
          />
        ))}
      </g>

      <style>{`
        .cd-float    { animation: cd-float 10s ease-in-out infinite; transform-origin: ${CX}px ${CY}px; }
        .cd-bob      { animation: cd-bob 7.5s ease-in-out infinite; }
        .cd-hex      { animation: cd-hex 5.6s ease-in-out infinite; }
        .cd-drift    { animation: cd-drift 12s ease-in-out infinite; }
        .cd-scanbeam { animation: cd-scanbeam 7s ease-in-out infinite; }
        @keyframes cd-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-14px) scale(1.01); }
        }
        @keyframes cd-bob {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-13px); }
        }
        @keyframes cd-hex {
          0%, 100% { opacity: .55; }
          50%      { opacity: 1; }
        }
        @keyframes cd-drift {
          0%, 100% { transform: translateY(0); opacity: .2; }
          50%      { transform: translateY(-24px); opacity: .55; }
        }
        @keyframes cd-scanbeam {
          0%   { transform: translateY(150px); opacity: 0; }
          12%  { opacity: .85; }
          88%  { opacity: .85; }
          100% { transform: translateY(760px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cd-float, .cd-bob, .cd-hex, .cd-drift, .cd-scanbeam { animation: none; }
          .cd-scanbeam { opacity: .5; }
        }
      `}</style>
    </svg>
  );
}

export default CyberShieldScene;
