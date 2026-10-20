import { motion, AnimatePresence, animate } from "motion/react";
import { useEffect, useState } from "react";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setProgress(Math.round(v)),
      onComplete: () => {
        setTimeout(() => {
          setDone(true);
          onComplete();
        }, 350);
      },
    });
    return () => controls.stop();
  }, [onComplete]);

  const CIRCLE_SIZE = 220;
  const BALL_SIZE = 12;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "#0D0D0D" }}
        >
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: 12, color: "#fff" }}
            className="mb-10"
          >
            مجموعة تركي عمر
          </motion.span>

          <div
            className="relative rounded-full border"
            style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE, borderColor: "rgba(255,255,255,0.3)" }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="absolute rounded-full"
                style={{
                  width: BALL_SIZE,
                  height: BALL_SIZE,
                  background: "#fff",
                  top: -BALL_SIZE / 2,
                  left: "50%",
                  transform: "translateX(-50%)",
                  boxShadow: "0 0 12px rgba(255,255,255,0.8)",
                }}
              />
            </motion.div>
          </div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ fontSize: 13, color: "#fff", marginTop: 32 }}
          >
            {progress}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}