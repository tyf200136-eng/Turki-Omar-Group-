import { motion } from "motion/react";
import logoSrc from "../../imports/logo-main.png";

export function Logo({
  size = 80,
  animate = false,
  fill = false,
}: {
  size?: number;
  animate?: boolean;
  fill?: boolean;
}) {
  const dimensionStyle = fill
    ? { width: "100%", height: "100%" }
    : { width: size, height: size };
  return (
    <motion.div
      initial={animate ? { opacity: 0, scale: 0.92 } : false}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      style={dimensionStyle}
      className="relative inline-flex items-center justify-center"
    >
      <img
        src={logoSrc}
        alt="Turki Omar Holding Group"
        className="w-full h-full object-contain relative z-10"
        style={{ filter: "drop-shadow(0 0 32px rgba(255,255,255,0.18))" }}
      />
    </motion.div>
  );
}
