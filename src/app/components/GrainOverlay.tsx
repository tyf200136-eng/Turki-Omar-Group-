import { useTheme } from "./ThemeContext";

// نسيج حبيبات خفيف فوق الصور — يعطي إحساس ملمس مادي (زي حبيبات الخشب بالمرجع)
// بدل الصورة الرقمية الناعمة الفلات. استخدميه فوق أي سكشن فيه صورة خلفية.
export function GrainOverlay() {
  const { colors } = useTheme();

  return (
    <div
      className="pointer-events-none absolute inset-0 z-30 mix-blend-overlay"
      style={{ opacity: colors.grainOpacity }}
    >
      <svg width="100%" height="100%">
        <filter id="heroGrainFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#heroGrainFilter)" />
      </svg>
    </div>
  );
}