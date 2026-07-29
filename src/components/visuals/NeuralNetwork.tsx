'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { EASE_STANDARD, VIEWPORT_ONCE } from '@/lib/motion';

const VIEW_W = 420;
const VIEW_H = 340;

/** Nodes per layer, input → output. Mirrors the agent's reasoning pipeline. */
const LAYERS = [4, 6, 6, 3];

const LAYER_LABELS = ['Signals', 'Encode', 'Reason', 'Act'];

interface Node {
  x: number;
  y: number;
  layer: number;
  index: number;
}

/**
 * Layout is computed deterministically from LAYERS — no randomness — so the
 * server and client render byte-identical markup and React never has to
 * reconcile a hydration mismatch.
 */
function buildNodes(): Node[] {
  const padX = 46;
  const padY = 40;
  const usableW = VIEW_W - padX * 2;
  const usableH = VIEW_H - padY * 2;

  return LAYERS.flatMap((count, layer) => {
    const x = padX + (usableW / (LAYERS.length - 1)) * layer;
    const gap = usableH / (count + 1);
    return Array.from({ length: count }, (_, index) => ({
      x,
      y: padY + gap * (index + 1),
      layer,
      index,
    }));
  });
}

const NODES = buildNodes();

/** Position of a node within its own layer, normalised to 0…1. */
function slot(node: Node) {
  return node.index / Math.max(1, LAYERS[node.layer] - 1);
}

/**
 * Connect each node only to the nearest few nodes in the next layer.
 *
 * A fully connected lattice at this size renders as an unreadable hairball —
 * restricting to local neighbours keeps the left-to-right flow of the pipeline
 * legible while still reading as a network.
 */
const EDGES = NODES.flatMap((from) =>
  NODES.filter(
    (to) => to.layer === from.layer + 1 && Math.abs(slot(from) - slot(to)) <= 0.34
  ).map((to) => ({ from, to }))
);

interface NeuralNetworkProps {
  className?: string;
  /** Renders for a dark section. */
  inverse?: boolean;
}

/**
 * Animated agent-topology diagram: edges draw themselves in on scroll, then
 * pulses travel along them continuously while nodes breathe.
 *
 * The travelling pulse is a dashed stroke whose offset is animated in CSS,
 * which keeps every edge on the compositor instead of running dozens of
 * simultaneous JS-driven tweens.
 */
export default function NeuralNetwork({
  className,
  inverse = false,
}: NeuralNetworkProps) {
  const edgeColor = inverse ? 'rgba(255,255,255,0.16)' : 'rgba(19,25,33,0.12)';
  const nodeColor = inverse ? '#FDBA74' : '#F97316';
  const labelColor = inverse ? 'rgba(255,255,255,0.4)' : 'rgba(92,103,125,0.7)';

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className={cn('h-full w-full', className)}
      role="img"
      aria-label="Diagram of a four-layer agent pipeline: signals are encoded, reasoned over, then acted on."
    >
      <defs>
        <linearGradient id="nn-signal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F97316" stopOpacity="0" />
          <stop offset="50%" stopColor="#F97316" stopOpacity="1" />
          <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="nn-node-glow">
          <stop offset="0%" stopColor={nodeColor} stopOpacity="0.55" />
          <stop offset="100%" stopColor={nodeColor} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Static lattice */}
      <g>
        {EDGES.map(({ from, to }, i) => (
          <motion.line
            key={`edge-${i}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={edgeColor}
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{
              duration: 0.9,
              delay: from.layer * 0.18 + (i % 7) * 0.02,
              ease: EASE_STANDARD,
            }}
          />
        ))}
      </g>

      {/* Signals firing along a deterministic subset of the edges */}
      <g>
        {EDGES.filter((_, i) => i % 5 === 0).map(({ from, to }, i) => (
          <line
            key={`signal-${i}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="url(#nn-signal)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray="18 220"
            className="animate-signal"
            style={{
              animationDelay: `${(i % 6) * 0.55}s`,
              animationDuration: `${2.6 + (i % 4) * 0.5}s`,
            }}
          />
        ))}
      </g>

      {/* Nodes */}
      <g>
        {NODES.map((node, i) => (
          <g key={`node-${i}`}>
            <circle
              cx={node.x}
              cy={node.y}
              r={14}
              fill="url(#nn-node-glow)"
              className="animate-node-pulse"
              style={{ animationDelay: `${(i % 9) * 0.32}s` }}
            />
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={4}
              fill={nodeColor}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{
                duration: 0.5,
                delay: 0.2 + node.layer * 0.16 + node.index * 0.05,
                ease: EASE_STANDARD,
              }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            />
          </g>
        ))}
      </g>

      {/* Layer captions */}
      <g>
        {LAYER_LABELS.map((label, layer) => {
          const x = NODES.find((n) => n.layer === layer)?.x ?? 0;
          return (
            <motion.text
              key={label}
              x={x}
              y={VIEW_H - 12}
              textAnchor="middle"
              fill={labelColor}
              fontSize={10}
              letterSpacing={1.6}
              className="font-mono uppercase"
              initial={{ opacity: 0, y: VIEW_H - 4 }}
              whileInView={{ opacity: 1, y: VIEW_H - 12 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.5, delay: 0.5 + layer * 0.1 }}
            >
              {label}
            </motion.text>
          );
        })}
      </g>
    </svg>
  );
}
