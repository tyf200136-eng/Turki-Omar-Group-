import { useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Preloader } from "./components/Preloader";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { WhoWeAre } from "./components/WhoWeAre";
import { Ecosystem } from "./components/Ecosystem";
import { WhatWeBuild } from "./components/WhatWeBuild";
// الفاصل الصوري الجديد وسكشن المستجدات
import { ImageSeparator } from "./components/ImageSeparator";
import { Updates } from "./components/Updates";
import { Archive } from "./components/Archive";
import { Contact } from "./components/Contact";
// الوضع النهاري/الليلي العام + زر التبديل
import { ThemeProvider, useTheme } from "./components/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";
// محرك السكرول السموذ العام لكل الموقع
import { LenisProvider } from "./components/LenisProvider";

function AppContent() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 22 });
  const { colors } = useTheme(); // اللون يجي من الكونتكست بدل ما يكون ثابت هنا

  return (
    <div
      className="min-h-screen w-full transition-colors duration-700"
      style={{ background: colors.bg, color: colors.text, position: "relative" }}
      dir="rtl"
    >
      <Preloader onComplete={() => setLoading(false)} />

      {/* شريط تقدم السكرول — لونه يتبع الثيم بدل الأبيض الثابت
          (الأبيض كان يختفي كلياً على خلفية الوضع النهاري) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-px origin-right z-[60]"
        style={{
          scaleX: progress,
          opacity: loading ? 0 : 0.6,
          background: colors.text,
        }}
      />

      {/* زر تبديل الوضع النهاري/الليلي — ثابت وظاهر بكل الموقع مو سكشن وحده */}
      <ThemeToggle />
      <Nav />

      <main style={{ position: "relative" }}>
        <Hero />
        <WhoWeAre />
        <Ecosystem />
        {/* سكشن ما نبنيه */}
        <WhatWeBuild />
        {/* فاصل الصورة الثابتة (النافذة) */}
        <ImageSeparator />
        {/* السكشن الجديد (المستجدات) */}
        <Updates />
        {/* سكشن الأرشيف */}
        <Archive />
        {/* التواصل + الفوتر مدموجين بسكشن واحد بتأثير بارالاكس (sticky reveal) */}
        <Contact />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <LenisProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </LenisProvider>
  );
}