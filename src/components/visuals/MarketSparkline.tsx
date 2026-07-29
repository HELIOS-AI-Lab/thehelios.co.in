'use client';

import { useId } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { EASE_SOFT, VIEWPORT_ONCE } from '@/lib/motion';

const W = 480;
const H = 200;

/**
 * A fixed series — this is an illustrative visual, not live market data, so the
 * points are hard-coded and identical on server and client.
 */
const SERIES = [
  32, 35, 31, 39, 42, 38, 45, 51, 47, 56, 54, 63, 71, 66, 76, 85, 81, 94, 106,
  121,
];

const PAD = 18;

function toPoints() {
  const min = Math.min(...SERIES);
  const max = Math.max(...SERIES);
  const span = max - min || 1;

  return SERIES.map((value, i) => ({
    x: PAD + ((W - PAD * 2) / (SERIES.length - 1)) * i,
    y: H - PAD - ((value - min) / span) * (H - PAD * 2),
  }));
}

/** Catmull-Rom to cubic Bézier — gives the curve its smooth, non-jagged read. */
function toSmoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return '';

  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return d;
}

const POINTS = toPoints();
const LINE_PATH = toSmoothPath(POINTS);
const AREA_PATH = `${LINE_PATH} L ${POINTS[POINTS.length - 1].x} ${H} L ${POINTS[0].x} ${H} Z`;
const LAST = POINTS[POINTS.length - 1];

interface MarketSparklineProps {
  className?: string;
  inverse?: boolean;
}

/**
 * Portfolio-growth curve that draws itself in on scroll, fills underneath, and
 * leaves a pulsing marker at the live end of the series.
 *
 * Decorative: the surrounding copy carries the meaning, so this is hidden from
 * assistive technology rather than described.
 */
export default function MarketSparkline({
  className,
  inverse = false,
}: MarketSparklineProps) {
  // useId keeps gradient ids unique when the component appears more than once
  const uid = useId().replace(/:/g, '');
  const areaId = `spark-area-${uid}`;
  const lineId = `spark-line-${uid}`;

  const gridColor = inverse ? 'rgba(255,255,255,0.07)' : 'rgba(19,25,33,0.06)';

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={cn('h-full w-full overflow-visible', className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={areaId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F97316" stopOpacity={inverse ? 0.34 : 0.22} />
          <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={lineId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="60%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#FDBA74" />
        </linearGradient>
      </defs>

      {/* Baseline grid */}
      {[0.25, 0.5, 0.75].map((t) => (
        <line
          key={t}
          x1={0}
          x2={W}
          y1={H * t}
          y2={H * t}
          stroke={gridColor}
          strokeWidth={1}
          strokeDasharray="3 6"
        />
      ))}

      {/* Filled area, revealed after the line has drawn */}
      <motion.path
        d={AREA_PATH}
        fill={`url(#${areaId})`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.9, delay: 0.85, ease: 'easeOut' }}
      />

      {/* The curve itself */}
      <motion.path
        d={LINE_PATH}
        fill="none"
        stroke={`url(#${lineId})`}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 1.6, ease: EASE_SOFT }}
      />

      {/* Live marker at the head of the series */}
      <motion.g
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.45, delay: 1.5, ease: EASE_SOFT }}
        style={{ transformOrigin: `${LAST.x}px ${LAST.y}px` }}
      >
        <circle
          cx={LAST.x}
          cy={LAST.y}
          r={5}
          fill="#F97316"
          opacity={0.35}
          className="animate-ping-ring"
          style={{ transformOrigin: `${LAST.x}px ${LAST.y}px` }}
        />
        <circle
          cx={LAST.x}
          cy={LAST.y}
          r={4.5}
          fill="#F97316"
          stroke={inverse ? '#131921' : '#FFFFFF'}
          strokeWidth={2}
        />
      </motion.g>
    </svg>
  );
}
