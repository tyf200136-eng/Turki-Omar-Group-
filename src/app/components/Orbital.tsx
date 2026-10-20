import { motion } from "motion/react";

/**
 * Architectural orbital system. Concentric rings + delicate orbit nodes.
 * Slow, restrained, premium.
 */
export function Orbital({
  size = 900,
  rings = [0.35, 0.55, 0.78, 1],
  nodes = 12,
  opacity = 1,
  reverse = false,
}: {
  size?: number;
  rings?: number[];
  nodes?: number;
  opacity?: number;
  reverse?: boolean;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      style={{ opacity }}
      aria-hidden
    >
      {rings.map((r, i) => {
        const d = size * r;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/10"
            style={{ width: d, height: d }}
            animate={{ rotate: reverse ? -360 : 360 }}
            transition={{ duration: 140 + i * 40, repeat: Infinity, ease: "linear" }}
          >
            {/* delicate orbit nodes */}
            {i === rings.length - 2 &&
              Array.from({ length: nodes }).map((_, k) => {
                const angle = (k * 360) / nodes;
                return (
                  <span
                    key={k}
                    className="absolute left-1/2 top-0 w-px h-2 bg-white/30 -translate-x-1/2"
                    style={{ transform: `rotate(${angle}deg) translateY(-1px)`, transformOrigin: `50% ${d / 2}px` }}
                  />
                );
              })}
            {/* single luminous node */}
            {i === rings.length - 1 && (
              <motion.span
                className="absolute left-1/2 top-0 w-[6px] h-[6px] rounded-full bg-white -translate-x-1/2 -translate-y-1/2"
                style={{ boxShadow: "0 0 18px rgba(255,255,255,0.6)" }}
              />
            )}
          </motion.div>
        );
      })}
      {/* center crosshair */}
      <div className="absolute w-px h-[140%] bg-gradient-to-b from-transparent via-white/8 to-transparent" style={{ opacity: 0.4 }} />
      <div className="absolute h-px w-[140%] bg-gradient-to-r from-transparent via-white/8 to-transparent" style={{ opacity: 0.4 }} />
    </div>
  );
}
