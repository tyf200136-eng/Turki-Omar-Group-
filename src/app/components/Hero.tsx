import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import heroOfficeImg from "../../imports/hero-office.png";
import LogoTOG from "../../imports/logotog.png";
import { useTheme } from "./ThemeContext";
import { GrainOverlay } from "./GrainOverlay";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { isDark, colors } = useTheme();

  const { scrollYProgress: rawProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // سبرنق أهدأ وأنعم — السرعة الفعلية الحين تجي من Lenis على مستوى الموقع كامل
  const progress = useSpring(rawProgress, { stiffness: 42, damping: 20, mass: 0.5 });

  // 1. حركة تكبير الصورة وانسياب الإطار عبر الشاشة الكاملة
  const imageScale = useTransform(progress, [0, 0.8], [1.1, 1]);
  const heroOpacity = useTransform(progress, [0, 0.2], [0.6, 1]);

  // 2. الشعار والعنوان يضلوا ظاهرين طول الهيرو، ويختفون بهدوء بس قرب النهاية جداً
  const titleExitOpacity = useTransform(progress, [0.8, 1], [1, 0]);
  const titleExitY = useTransform(progress, [0.8, 1], [0, -70]);

  // 3. النص السفلي: فترات متباعدة بوضوح عشان تتوالى وحدة بعد وحدة مو تطلع مع بعض
  const rightBlockOpacity = useTransform(progress, [0.32, 0.5], [0, 1]);
  const rightBlockX = useTransform(progress, [0.32, 0.5], [50, 0]);
  const leftBlockOpacity = useTransform(progress, [0.52, 0.68], [0, 1]);
  const leftBlockX = useTransform(progress, [0.52, 0.68], [-50, 0]);

  // تمرير ناعم للقسم المستهدف بدل قفزة الهاش المفاجئة
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="w-full relative transition-colors duration-700"
      style={{ background: colors.bg, height: "240vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-8 md:p-16" dir="rtl">

        {/* الصورة الخلفية بأسلوب العرض السينمائي — إضاءة موجّهة دافئة */}
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroOfficeImg})`,
              scale: imageScale,
              // خُففت العتمة من 0.55 إلى 0.7 — فوقها 3 طبقات تعتيم إضافية (Tint + Gradient + Vignette)
              // فكانت النتيجة تراكم يبتلع تفاصيل الصورة بالوضع الليلي
              filter: isDark
                ? "brightness(0.7) contrast(1.18) saturate(0.9) sepia(0.1)"
                : "brightness(1) contrast(1.05) saturate(0.95)",
            }}
          />

          {/* طبقة تلوين (Tint) بلون خلفية الصفحة نفسها — نفس المنطق المطبّق على صورة سكشن
              "من نحن" بالضبط، عشان صورة الهيرو وصورة السكشن اللي بعده يشتركوا بنفس درجة
              الدفء/البرودة ويحسّوا كأنهم مقطوعين من نفس الفيلم بدل ما تبين كل صورة بألوانها
              الخام الخاصة */}
          <div
            className="absolute inset-0"
            style={{
              background: colors.bg,
              mixBlendMode: isDark ? "multiply" : "soft-light",
              opacity: isDark ? 0.22 : 0.55,
            }}
          />

          <div className="absolute inset-0 transition-colors duration-700" style={{ background: colors.overlayGradient }} />
          <div className="absolute inset-0" style={{ background: colors.vignette }} />

          {/* طبقة مسح بآخر الهيرو: تفرض لون colors.bg الصافي بدون أي تعتيم من الـvignette
              بالحافة السفلية، عشان تلتقي بالضبط مع نفس الطبقة الموجودة بأعلى سكشن "من نحن"
              ويختفي أي خط أو تفاوت لون عند نقطة التماس بين السكشنين */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{ height: "20vh", background: `linear-gradient(to top, ${colors.bg} 0%, ${colors.bg} 15%, transparent 100%)` }}
          />

          <GrainOverlay />
        </motion.div>

        {/* الشعار + العنوان: كتلة متمركزة، بدون أي تباعد إضافي بالحروف */}
        <motion.div
          style={{ opacity: titleExitOpacity, y: titleExitY }}
          className="relative z-10 flex flex-col items-center text-center my-auto px-4 w-full"
        >
          <motion.img
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            src={LogoTOG}
            alt="مجموعة تركي عمر"
            className="w-[260px] md:w-[420px] mb-10 transition-all"
            style={{ filter: isDark ? "invert(0)" : "invert(1)" }}
          />

          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
              className="text-4xl md:text-7xl lg:text-8xl font-extralight leading-tight transition-colors duration-700"
              style={{ color: colors.text, fontFamily: "'Almarai', sans-serif" }}
            >
              نصنع الكيانات
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
              className="text-4xl md:text-7xl lg:text-8xl font-light leading-tight transition-colors duration-700"
              style={{ color: colors.textMuted, fontFamily: "'Almarai', sans-serif" }}
            >
              التي تقود المستقبل
            </motion.h1>
          </div>
        </motion.div>

        {/* سكشن المعلومات السفلي: بدون خطوط فاصلة، موزّع بشكل مفتوح، كل جهة تدخل من مكانها */}
        <div className="relative z-20 w-full max-w-7xl mx-auto pt-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">

            {/* الكتلة اليمين (بحكم RTL): تدخل من اليمين */}
            <motion.div
              style={{ opacity: rightBlockOpacity, x: rightBlockX }}
              className="md:col-span-8 space-y-4"
            >
              <span className="text-xs uppercase block" style={{ color: colors.textMuted }}>
                مجموعة تركي عمر
              </span>
              <p
                className="text-lg md:text-2xl font-extralight leading-relaxed max-w-2xl transition-colors duration-700"
                style={{ color: colors.text }}
              >
                كيان استثماري وتشغيلي رائد يبني الكيانات التي تقود المستقبل، عبر 6 شركات تابعة تمتد من التقنية إلى الترفيه.
              </p>
            </motion.div>

            {/* الكتلة اليسار (بحكم RTL): دعوة واحدة للتواصل بدل تكرار روابط شريط التنقل */}
            <motion.div
              style={{ opacity: leftBlockOpacity, x: leftBlockX }}
              className="md:col-span-4 flex md:justify-end"
            >
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact")}
                className="group inline-flex items-center gap-4 text-base md:text-xl font-light transition-opacity duration-500 hover:opacity-50"
                style={{ color: colors.text }}
              >
                <span>تواصل معنا</span>
                <span className="text-sm transition-transform duration-500 group-hover:-translate-x-2">←</span>
              </a>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}