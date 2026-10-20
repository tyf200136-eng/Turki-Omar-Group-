import { motion, useScroll, useTransform, useSpring, MotionValue } from "motion/react";
import { useRef } from "react";
import visionImg from "../../imports/vision-image.png";
import { useTheme } from "./ThemeContext";
import { GrainOverlay } from "./GrainOverlay";

const stages = [
  {
    kind: "text-double" as const,
    contents: [
      "مجموعة تركي عمر هي كيان استثماري وتشغيلي رائد، يختص بتأسيس وتطوير الشركات الابتكارية ودفعها نحو الصدارة في مختلف القطاعات الحيوية.",
      "نحو آفاق تقودها الرؤى والأفكار؛ نجمع بين البُعد الاستراتيجي والتقنيات الناشئة لنصنع منظومة أعمال مرنة، قادرة على التكيف والازدهار واقتناص فرص الغد.",
    ],
  },
  {
    kind: "stats" as const,
    items: [
      { n: "6", l: "كيانات تشغيلية" },
      { n: "+50", l: "شراكة استراتيجية" },
      { n: "+120", l: "مشروع منجز" },
    ],
  },
];

const WINDOW_START = 0.05;
const WINDOW_END = 0.4;
const STAGE_SPAN = (WINDOW_END - WINDOW_START) / stages.length;

function Stage({
  stage,
  index,
  progress,
  textColor,
  mutedColor,
  holdAtEnd,
}: {
  stage: (typeof stages)[number];
  index: number;
  progress: MotionValue<number>;
  textColor: string;
  mutedColor: string;
  holdAtEnd?: boolean;
}) {
  const start = WINDOW_START + index * STAGE_SPAN;
  const end = start + STAGE_SPAN;

  const opacity = holdAtEnd
    ? useTransform(progress, [start - 0.02, start + 0.04], [0, 1])
    : useTransform(progress, [start - 0.02, start + 0.04, end - 0.04, end + 0.02], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, end], [24, -24]);

  return (
    <motion.div style={{ opacity, y, color: textColor }} className="absolute inset-0 flex flex-col justify-center">
      {stage.kind === "text-double" ? (
        <div className="flex flex-col gap-8">
          {stage.contents.map((c, i) => (
            <p key={i} style={{ fontSize: 22, lineHeight: 2.1 }} className="font-extralight">
              {c}
            </p>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-8">
          {stage.items.map((s) => (
            <div key={s.l}>
              <div style={{ fontSize: 48, fontWeight: 300 }}>{s.n}</div>
              <div style={{ fontSize: 14, color: mutedColor }} className="mt-2">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export function WhoWeAre() {
  const ref = useRef<HTMLDivElement>(null);
  const { isDark, colors } = useTheme();
  const { scrollYProgress: rawProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(rawProgress, { stiffness: 42, damping: 20, mass: 0.5 });

  const stage0Start = WINDOW_START;
  const stage0End = WINDOW_START + STAGE_SPAN;
  const stage1Start = stage0End;
  const stage1End = WINDOW_END;

  const textRGB = isDark ? "255,255,255" : "12,13,14";
  const titlePart1Color = useTransform(progress, [stage0Start, stage0End], [`rgba(${textRGB},0.35)`, `rgba(${textRGB},1)`]);
  const titlePart2Color = useTransform(progress, [stage1Start, stage1End], [`rgba(${textRGB},0.35)`, `rgba(${textRGB},1)`]);

  // === التعديل السينمائي للحجم والانزلاق ===
  const imageStart = 0.42;
  const imageGrowEnd = 0.78;

  const imageOpacity = useTransform(progress, [imageStart, imageStart + 0.02], [0, 1]);

  // تتوسع الدائرة من حجم صغير لتغطي السكشن بالكامل. نستخدم 150% كسقف نهائي (بدل 100%)
  // لأن حساب % بالـ circle() يعتمد على القطر الأبعد للحاوية، و100% وحدها قد تترك زوايا غير مغطاة
  // بالشاشات العريضة. 150% يضمن تغطية كاملة 100% لعرض وارتفاع السكشن دائماً.
  const clipProgress = useTransform(progress, [imageStart, imageGrowEnd], [0, 150]);
  const clipPath = useTransform(clipProgress, (val) => `circle(${val}% at 50% 100%)`);

  // انزلاق العناوين والنصوص فوق الصورة بسلاسة وفخامة
  const partAOpacity = useTransform(progress, [0.55, 0.65], [0, 1]);
  const partAY = useTransform(progress, [0.55, 0.65], [40, 0]);

  const partBOpacity = useTransform(progress, [0.62, 0.72], [0, 1]);
  const partBY = useTransform(progress, [0.62, 0.72], [40, 0]);

  const partCOpacity = useTransform(progress, [0.70, 0.82], [0, 1]);
  const partCY = useTransform(progress, [0.70, 0.82], [40, 0]);

  // شدّة خلفية خاصة بمنطقة النص فقط (تتزامن مع ظهور النص) — تقوّى تدريجياً
  // بدل ما تظهر فجأة، عشان القراءة تكون واضحة بدون ما تحرق باقي الصورة
  const textScrimOpacity = useTransform(progress, [0.5, 0.62], [0, 1]);

  // نفس درجة لون colors.bg المستخدمة بالضبط بأوفرلاي الهيرو (rgba للكريمي بالنهاري وللبني
  // الغامق بالليلي) بدل الأبيض/الأسود النقي — عشان الأوفرلاي فوق الصورة والنص هنا يطابق
  // هوية الهيرو تماماً ويحس الاثنين متصلين بنفس اللغة اللونية
  const bgRGB = isDark ? "12,13,14" : "255,255,255";

  return (
    <section id="who" ref={ref} className="relative h-[200vh]" style={{ background: colors.bg }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden transition-colors duration-700" dir="rtl" style={{ background: colors.bg }}>
        <div className="absolute inset-0 pointer-events-none z-0" style={{ background: colors.vignette }} />

        {/* طبقة تطابق مع نهاية الهيرو: تفرض لون colors.bg الصافي بأعلى السكشن بدون أي تعتيم
            من الـvignette، عشان يختفي أي خط فاصل عند نقطة التماس بين الهيرو وهذا السكشن ويصيرون
            متصلين بصرياً كصفحة واحدة */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none z-[1]"
          style={{ height: "20vh", background: `linear-gradient(to bottom, ${colors.bg} 0%, ${colors.bg} 15%, transparent 100%)` }}
        />

        <GrainOverlay />

        <div className="absolute inset-0 flex items-center px-8 md:px-20 z-10">
          <div className="relative z-10 max-w-7xl mx-auto w-full grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <span style={{ fontSize: 12, color: colors.textMuted }} className="block mb-8">
                02 — من نحن
              </span>
              <h2 style={{ fontSize: "clamp(38px, 5vw, 70px)", lineHeight: 1.35, fontWeight: 300, color: colors.text }}>
                مجموعة تركي عمر
                <br />
                <motion.span style={{ color: titlePart1Color }}>ريادة التشغيل</motion.span>{" "}
                <motion.span style={{ color: titlePart2Color }}>وبناء المستقبل</motion.span>
              </h2>
            </div>

            <div className="md:col-span-7 md:pt-24 relative" style={{ minHeight: 260 }}>
              {stages.map((s, i) => (
                <Stage
                  key={i}
                  stage={s}
                  index={i}
                  progress={progress}
                  textColor={colors.text}
                  mutedColor={colors.textMuted}
                  holdAtEnd={i === stages.length - 1}
                />
              ))}
            </div>
          </div>
        </div>

        {/* حاوية الصورة السينمائية المتوسعة لتغطي السكشن كاملاً */}
        <motion.div
          style={{
            opacity: imageOpacity,
            clipPath: clipPath,
          }}
          className="absolute inset-0 z-20 flex justify-center items-center overflow-hidden pointer-events-none"
        >
          {/* الصورة مع إضاءات وفلترة سينمائية فخمة */}
          <img
            src={visionImg}
            alt="رؤيتنا"
            className="w-full h-full object-cover scale-105 transition-transform duration-1000"
            style={{
              filter: isDark
                ? "brightness(0.5) contrast(1.3) saturate(1.1) drop-shadow(0 0 30px rgba(0,0,0,0.8))"
                : "brightness(0.9) contrast(1.15) saturate(1.05)",
            }}
          />

          {/* طبقة تلوين (Tint) بلون خلفية السكشن نفسها — تصبغ الصورة بدفء/برودة نفس الباليت
              (colors.bg) بدل ما تبين بألوانها الخام كصورة منفصلة عن هوية الموقع */}
          <div
            className="absolute inset-0"
            style={{
              background: colors.bg,
              mixBlendMode: isDark ? "multiply" : "soft-light",
              opacity: isDark ? 0.35 : 0.55,
            }}
          />

          {/* التدرج الضوئي والسينمائي العام فوق الصورة — بنفس درجة لون colors.bg المستخدمة
              بأوفرلاي الهيرو بالضبط (bgRGB)، بدل الأبيض/الأسود النقي */}
          <div
            className="absolute inset-0"
            style={{
              background: isDark
                ? `radial-gradient(circle at 50% 100%, rgba(${bgRGB},0.2) 0%, rgba(${bgRGB},0.85) 80%), linear-gradient(to top, rgba(${bgRGB},0.95) 0%, transparent 60%)`
                : `linear-gradient(to top, rgba(${bgRGB},0.9) 0%, transparent 60%)`,
            }}
          />

          {/* شدّة إضافية مركّزة خلف منطقة النص والعناوين تحديداً (يمين ومنتصف الشاشة عمودياً)
              عشان يتحسن التباين بمكان القراءة تحديداً بدون ما نعتم الصورة كلها أكثر من اللازم —
              بنفس درجة لون colors.bg المستخدمة بالهيرو بالضبط (bgRGB) */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: textScrimOpacity,
              background: `radial-gradient(ellipse 65% 55% at 68% 48%, rgba(${bgRGB},0.6) 0%, rgba(${bgRGB},0.25) 55%, transparent 85%)`,
            }}
          />

          <GrainOverlay />

          {/* طبقة مسح بأسفل الصورة: تفرض rgba(bgRGB) صافي بآخر 20% من ارتفاع السكشن، عشان
              يطابق تماماً أول سكشن "منظومتنا" اللي بعده ويختفي أي خط أو تفاوت عند التماس */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{ height: "22vh", background: `linear-gradient(to top, rgba(${bgRGB},1) 0%, rgba(${bgRGB},0.5) 55%, transparent 100%)` }}
          />

          {/* النصوص والعناوين المنزلقة بفخامة فوق الصورة */}
          <div className="absolute top-1/2 -translate-y-1/2 text-right px-10 md:px-20 w-full max-w-7xl mx-auto pointer-events-auto" dir="rtl">
            <h2 style={{ fontSize: "clamp(40px, 5.5vw, 80px)", fontWeight: 300, lineHeight: 1.4 }}>
              <motion.span style={{ opacity: partAOpacity, y: partAY, color: colors.text }} className="block drop-shadow-md">
                ببصيرة تسبق الزمن
              </motion.span>
              <motion.span style={{ opacity: partBOpacity, y: partBY, color: colors.textMuted }} className="block drop-shadow-md">
                نرسم ملامح الغد
              </motion.span>
            </h2>

            <motion.div style={{ opacity: partCOpacity, y: partCY }} className="mt-12 max-w-xl">
              <p style={{ fontSize: 24, lineHeight: 1.9, color: colors.text, opacity: 0.9 }} className="font-extralight drop-shadow">
                نمزج بين عمق الخبرة وجرأة الابتكار؛ لنبني كيانات تنبض بالحياة، تنمو مع كل تحدٍّ وتزدهر مع كل فرصة.
              </p>
              <p style={{ fontSize: 18, lineHeight: 1.9, color: colors.textMuted }} className="font-extralight mt-6 drop-shadow">
                فكل شركة تنضم إلينا تحمل جزءًا من طموحنا المشترك نحو أثرٍ يبقى بعد الزمن.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}