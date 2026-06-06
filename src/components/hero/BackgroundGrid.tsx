import { motion } from "framer-motion";

const nodes = [
  { x: 10, y: 20 }, { x: 80, y: 15 }, { x: 25, y: 70 },
  { x: 65, y: 80 }, { x: 50, y: 45 }, { x: 90, y: 55 },
  { x: 5, y: 50 },  { x: 40, y: 10 },
];
const edges: [number, number][] = [[0, 4], [1, 4], [2, 4], [3, 4], [5, 4], [6, 2], [7, 0], [1, 5]];

export function BackgroundGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="line-grad" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.17 162)" stopOpacity="0" />
            <stop offset="50%" stopColor="oklch(0.72 0.17 162)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="oklch(0.74 0.13 200)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke="url(#line-grad)"
            strokeWidth="0.15"
            strokeDasharray="1 1.5"
            className="animate-flow"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="0.5" fill="oklch(0.72 0.17 162)" opacity="0.35" />
            <circle cx={n.x} cy={n.y} r="1.2" fill="oklch(0.72 0.17 162)" opacity="0.12" />
          </g>
        ))}
      </svg>

      {Array.from({ length: 14 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-primary/40"
          initial={{ x: `${(i * 37) % 100}%`, y: `${(i * 71) % 100}%`, opacity: 0 }}
          animate={{
            x: [`${(i * 37) % 100}%`, `${(i * 37 + 60) % 100}%`],
            y: [`${(i * 71) % 100}%`, `${(i * 71 + 40) % 100}%`],
            opacity: [0, 0.8, 0],
          }}
          transition={{ duration: 8 + (i % 5), repeat: Infinity, delay: i * 0.4, ease: "linear" }}
        />
      ))}
    </div>
  );
}
