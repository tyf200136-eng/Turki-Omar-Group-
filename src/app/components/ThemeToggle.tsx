import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "./ThemeContext";

// الأيقونة تعبّر عن الوضع الحالي (قمر وأنت بالوضع الليلي، شمس وأنت بالوضع النهاري)
// والضغط عليها يبدّل للوضع التاني — كذا الاتجاه يصير منطقي مو معكوس
export function ThemeToggle() {
  const { isDark, toggleTheme, colors } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "التبديل إلى الوضع النهاري" : "التبديل إلى الوضع الليلي"}
      className="fixed top-8 left-8 z-[70] w-11 h-11 flex items-center justify-center focus:outline-none"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.svg
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill={colors.text}
          >
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </motion.svg>
        ) : (
          <motion.svg
            key="sun"
            initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.text}
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}