import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";

const links = [
  { ar: "الرئيسية", id: "hero" },
  { ar: "من نحن", id: "who" },
  { ar: "المنظومة", id: "ecosystem" },
  { ar: "ركائز البناء", id: "build" },
  { ar: "المستجدات", id: "updates" },
  { ar: "أعمالنا", id: "archive" },
  { ar: "تواصل", id: "contact" },
];

// تدرج الخط الفضي — نسخة فاتحة للوضع الليلي وأخرى داكنة للنهاري
// (الفضي على خلفية بيضاء يختفي تماماً)
const UNDERLINE_DARK =
  "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(244,244,244,0.55) 20%, rgba(216,216,216,0.9) 50%, rgba(244,244,244,0.55) 80%, rgba(255,255,255,0) 100%)";
const UNDERLINE_LIGHT =
  "linear-gradient(90deg, rgba(12,13,14,0) 0%, rgba(12,13,14,0.35) 20%, rgba(12,13,14,0.75) 50%, rgba(12,13,14,0.35) 80%, rgba(12,13,14,0) 100%)";

export function Nav() {
  const [active, setActive] = useState<string>("hero");
  const { isDark, colors } = useTheme();

  const underline = isDark ? UNDERLINE_DARK : UNDERLINE_LIGHT;

  useEffect(() => {
    const ids = links.map((l) => l.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // تمرير ناعم بدل قفزة الهاش — قفزة الهاش تتصادم مع سكرول Lenis
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 py-6 flex items-center justify-center transition-colors duration-700"
      style={{
        background: isDark
          ? "linear-gradient(to bottom, rgba(12,13,14,0.85), rgba(12,13,14,0))"
          : "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0))",
        backdropFilter: "blur(8px)",
      }}
    >
      <ul className="hidden md:flex items-center gap-7" dir="rtl">
        {links.map((l, i) => {
          const isActive = active === l.id;
          return (
            <motion.li
              key={l.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.07, duration: 0.8 }}
              className="relative group"
            >
              <a
                href={`#${l.id}`}
                onClick={(e) => handleNavClick(e, l.id)}
                className="relative inline-block transition-opacity"
                style={{
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 400,
                  letterSpacing: 0,
                  color: isActive ? colors.text : colors.textMuted,
                  paddingBottom: 6,
                }}
              >
                {l.ar}
                {/* Hover underline */}
                <span
                  aria-hidden
                  className="absolute right-0 left-0 -bottom-0.5 h-px origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                  style={{ background: underline }}
                />
                {/* Active indicator */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    aria-hidden
                    className="absolute right-0 left-0 -bottom-0.5 h-px"
                    style={{ background: underline }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </a>
            </motion.li>
          );
        })}
      </ul>
    </motion.nav>
  );
}