import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ThemeColors = {
  bg: string;
  text: string;
  textMuted: string;
  border: string;
  overlayGradient: string; // تدرج عمودي للتراكب فوق الصور السينمائية
  vignette: string; // تعتيم الأطراف فقط عشان الضوء يتجمع بالمنتصف بدل تعتيم موحّد
  grainOpacity: number; // شدة نسيج الحبيبات (grain) فوق الأقسام المصوّرة
  shadowSoft: string; // ظل ناعم لعنصر واحد (صور، بطاقات بسيطة، بوب أب)
  shadowCard: string; // ظل البطاقات المكدّس (طبقات + ظل عام + حافة ضوء)
};

type ThemeContextValue = {
  isDark: boolean;
  toggleTheme: () => void;
  colors: ThemeColors;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// لوحة محايدة مأخوذة بالضبط من درجات سكشن Contact الأصلي: أسود قريب من #0c0d0e،
// وأبيض بتدرجات شفافية (٪40/50/60/70/90) — بدون أي ميل دافئ أو قيم مخترعة جديدة
function getColors(isDark: boolean): ThemeColors {
  return isDark
    ? {
        bg: "#0c0d0e",
        text: "#FFFFFF",
        textMuted: "rgba(255, 255, 255, 0.6)",
        border: "rgba(255, 255, 255, 0.1)",
        overlayGradient:
          "linear-gradient(180deg, rgba(12,13,14,0.92) 0%, rgba(12,13,14,0.3) 45%, rgba(12,13,14,0.97) 100%)",
        // خُفّف من 0.8 أسود نقي إلى 0.55 بدرجة الخلفية نفسها — الأسود النقي فوق
        // خلفية شبه سوداء يعطي بقعة موحلة بدل إحساس بالعمق
        vignette:
          "radial-gradient(ellipse at center, rgba(12,13,14,0) 42%, rgba(12,13,14,0.55) 100%)",
        grainOpacity: 0.05,
        // بالليلي: الظل يتوسّع ويخف بدل ما يغمق، وتنضاف حافة ضوء علوية
        // لأن الظل الأسود على خلفية سوداء ما يُرى — اللي يُرى هو انعكاس الضوء
        shadowSoft: "0 30px 70px -25px rgba(0,0,0,0.7)",
        shadowCard:
          "14px 14px 0 -6px rgba(255,255,255,0.045), 28px 28px 0 -12px rgba(255,255,255,0.025), 0 30px 70px -25px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
      }
    : {
        bg: "#FFFFFF",
        text: "#0c0d0e",
        textMuted: "rgba(12, 13, 14, 0.6)",
        border: "rgba(12, 13, 14, 0.1)",
        overlayGradient:
          "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.3) 45%, rgba(255,255,255,0.97) 100%)",
        vignette:
          "radial-gradient(ellipse at center, rgba(255,255,255,0) 40%, rgba(140,140,140,0.5) 100%)",
        grainOpacity: 0.04,
        shadowSoft: "0 25px 60px -15px rgba(0,0,0,0.35)",
        shadowCard:
          "14px 14px 0 -6px rgba(0,0,0,0.18), 28px 28px 0 -12px rgba(0,0,0,0.1), 0 25px 60px -15px rgba(0,0,0,0.45)",
      };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.body.style.backgroundColor = getColors(isDark).bg;

    // إضافة/إزالة كلاس dark على <html> — بدونها كل كلاسات dark: بالمشروع
    // وكل قيم .dark بملف globals.css ما تشتغل إطلاقاً
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);
  const colors = getColors(isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme يجب أن يُستخدم داخل ThemeProvider");
  return ctx;
}