import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "./ThemeContext";

// استيراد الصور المباشر
import work1a from "../../imports/work-1-a.jpg";
import work1b from "../../imports/work-1-b.jpg";
import work2a from "../../imports/work-2-a.jpg";
import work2b from "../../imports/work-2-b.jpg";
import work3a from "../../imports/work-3-a.jpg";
import work3b from "../../imports/work-3-b.jpg";
import work4a from "../../imports/work-4-a.jpg";
import work4b from "../../imports/work-4-b.jpg";

// غلاف ملف الأعمال
import profileCover from "../../imports/portfolio-cover.jpg";

// رابط ملف الأعمال (PDF) — يُستبدل برابط الباك اند بعد رفع الملف
const PROFILE_PDF_URL = "/turki-omar-group-portfolio.pdf";
const PROFILE_PDF_META = "PDF · 49 صفحة";

interface ArchiveItem {
  n: string;
  title: string;
  subTitle: string;
  year: string;
  category: string;
  desc: string;
  fullDesc: string;
  link?: string;
  images: [string, string];
  span: string;
  aspectRatio: string;
}

const archiveItems: ArchiveItem[] = [
  {
    n: "01",
    title: "الابتكار التقني وتطوير الأنظمة",
    subTitle: "منظومة الاستثمار الرقمي",
    year: "2026",
    category: "الاستراتيجية",
    desc: "نقود التحول الرقمي للمؤسسات، ونبتكر حلولاً برمجية متقدمة تدعم الكفاءة وتعزز مسارات النمو.",
    fullDesc: "مشروع استراتيجي رائد يهدف للارتقاء بالبنية التحتية البرمجية للمؤسسة، مع تقديم حلول رقمية موجهة للعملاء بمرونة وكفاءة عالية تلبي المعايير العالمية.",
    link: "https://example.com",
    images: [work1a, work1b],
    span: "lg:col-span-8 lg:row-span-2",
    aspectRatio: "16/10",
  },
  {
    n: "02",
    title: "منصة تقنية متقدمة",
    subTitle: "المنصة البرمجية المتقدمة",
    year: "2026",
    category: "الأنظمة الذكية",
    desc: "تأسيس بنية رقمية مرنة تدعم معالجة البيانات بسرعة فائقة واحترافية عالية.",
    fullDesc: "إدارة وتوجيه الاستثمارات نحو شراكات مستدامة تدعم التواجد في الأسواق الإقليمية وتضمن عائدًا استثماريًا متناميًا.",
    link: "https://example.com",
    images: [work2a, work2b],
    span: "lg:col-span-4",
    aspectRatio: "16/9",
  },
  {
    n: "03",
    title: "الشراكات الاستراتيجية",
    subTitle: "تحالفات النمو المستدام",
    year: "2025",
    category: "التوسع والنمو",
    desc: "عقد تحالفات راسخة وطويلة الأمد لفتح آفاق استثمارية جديدة وتحقيق نجاحات مشتركة.",
    fullDesc: "تأمين الشراكات الاستراتيجية مع كبار الفاعلين في القطاع لفتح مجالات تعاون جديدة والوصول لشرائح مستهدفة بكفاءة.",
    images: [work3a, work3b],
    span: "lg:col-span-4",
    aspectRatio: "16/9",
  },
  {
    n: "04",
    title: "إدارة وتشغيل الفعاليات",
    subTitle: "إدارة العمليات الميدانية",
    year: "2025",
    category: "العمليات التشغيلية",
    desc: "تصميم وإدارة تجارب ترفيهية وفعاليات نوعية بأعلى معايير الاحترافية الميدانية.",
    fullDesc: "تنظيم وإدارة فعاليات ضخمة باستخدام أحدث تقنيات الإضاءة والصوت والمؤثرات البصرية، لخلق ذكريات لا تُنسى للحضور.",
    link: "https://example.com",
    images: [work4a, work4b],
    span: "lg:col-span-6",
    aspectRatio: "21/9",
  },
  {
    n: "05",
    title: "تطوير الأعمال والتوسع",
    subTitle: "التوسع الاستثماري المتقدم",
    year: "2025",
    category: "تطوير الأعمال",
    desc: "الأخذ بيد الشركات للوصول بها إلى مستويات استثنائية من الاستقرار المالي.",
    fullDesc: "تقديم الاستشارات الاستراتيجية وخطط العمل التوسعية لضمان استقرار المشاريع وزيادة حصتها السوقية.",
    images: [work1b, work2a],
    span: "lg:col-span-6",
    aspectRatio: "21/9",
  },
];

const HOVERABLE = "transition-opacity duration-500 hover:opacity-40 cursor-default";

function CinematicCard({
  item,
  index,
  onClick,
  bgRGB,
}: {
  item: ArchiveItem;
  index: number;
  onClick: () => void;
  bgRGB: string;
}) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2, delay: (index % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      style={{
        aspectRatio: item.aspectRatio,
        background: `rgb(${bgRGB})`,
        // ظل مكدّس خلف البطاقة (طبقتين إضافيتين + ظل ناعم عام) عشان يعطي إحساس ثلاثي الأبعاد
        // كأن فيه بطاقات تانية وراها، بالإضافة للظل الأصلي تحتها
        boxShadow:
          "14px 14px 0 -6px rgba(0,0,0,0.22), 28px 28px 0 -12px rgba(0,0,0,0.14), 0 25px 60px -15px rgba(0,0,0,0.6)",
      }}
      // إزالة كل الحواف (border) وإبقاء الظل والشكل النظيف
      className={`relative group overflow-hidden cursor-pointer transition-all duration-700 ${item.span}`}
    >
      {/* عرض الصور بتكبير سينمائي ناعم عند الهوفر */}
      {item.images.map((img, idx) => (
        <motion.img
          key={idx}
          src={img}
          alt={item.title}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{
            opacity: currentImgIndex === idx ? 1 : 0,
            scale: currentImgIndex === idx ? 1.03 : 1.1,
          }}
          transition={{ duration: 2, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none group-hover:scale-105 transition-transform duration-1000 ease-out"
        />
      ))}

      {/* رقم المشروع الخلفي السينمائي */}
      <span
        className="absolute -bottom-6 -left-2 text-[100px] md:text-[140px] font-mono font-bold select-none pointer-events-none transition-all duration-700 ease-out z-10"
        style={{ color: "rgba(255,255,255,0.06)" }}
      >
        {item.n}
      </span>

      {/* التدرج الظلي السينمائي — طبقتين: تدرج عمودي قوي من الأسفل + تعتيم خفيف بالزوايا
          (Vignette) يعطي عمق سينمائي أوضح، بنفس درجة لون bgRGB بدل الأسود النقي */}
      <div
        className="absolute inset-0 z-10 opacity-95 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 35%, rgba(${bgRGB},0.35) 100%), linear-gradient(to top, rgba(${bgRGB},1) 0%, rgba(${bgRGB},0.75) 32%, rgba(${bgRGB},0.35) 62%, rgba(${bgRGB},0.08) 100%)`,
        }}
      />

      {/* التفاصيل العلوية — نص عائم بدون أي صندوق أو خلفية محيطة */}
      <div className="absolute top-6 right-6 left-6 flex justify-between items-center z-20" dir="rtl">
        <span className="text-xs font-mono tracking-widest text-white/90">
          {item.category}
        </span>
        <span className="text-xs font-mono text-white/60 tracking-widest">
          {item.year}
        </span>
      </div>

      {/* العناوين المنزلقة والأزرار (بدون حواف) */}
      <div className="absolute bottom-0 right-0 left-0 p-6 md:p-10 z-20 flex flex-col justify-end" dir="rtl">
        <div className="flex justify-between items-end gap-4">
          <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <div className="text-xs font-mono text-white/40 mb-1 tracking-wider">{item.n} /</div>
            <h3 className="text-xl md:text-3xl text-white font-light tracking-wide mb-1 transition-colors">
              {item.title}
            </h3>
            <p className="text-xs md:text-sm text-white/60 font-light tracking-wide transition-opacity duration-500 group-hover:text-white/80">
              {item.subTitle}
            </p>
          </div>

          {/* أيقونة السهم عائمة بدون أي صندوق خلفها */}
          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-all duration-500 shrink-0">
            <span className="text-white text-xl md:text-2xl transition-transform duration-300 group-hover:scale-125">↗</span>
          </div>
        </div>
      </div>
    </motion.figure>
  );
}

export function Archive() {
  const [selectedItem, setSelectedItem] = useState<ArchiveItem | null>(null);
  const { isDark, colors } = useTheme();

  // نفس درجة لون colors.bg المستخدمة بباقي الأقسام بالضبط، مستخدمة هنا كسلسلة أرقام
  // خام (بدون rgb()) عشان تنبني منها rgba() بسهولة داخل التدرجات
  const bgRGB = isDark ? "12,13,14" : "255,255,255";

  // لعمل تأثير البارالاكس الخاص بالسكشن
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // نعطي شبكة البطاقات حركة بارالاكس بسيطة جداً للإيحاء بالعمق
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  // متغيرات انزلاق العنوان والنص بنعومة (تأثير الظهور من العدم، Mask Reveal)
  const headerContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  };
  const headerItemVariants = {
    hidden: { opacity: 0, y: "100%" },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      id="archive"
      ref={sectionRef}
      // إعطاء السكشن z-20 وخلفية ثابتة ليعمل كـ "ستارة" تغطي ما تحتها
      className="relative z-20 pt-0 pb-44 px-4 md:px-12 overflow-hidden transition-colors duration-700"
      style={{ background: colors.bg }}
    >
      {/* تداخل سينمائي ناعم مع السكشن السابق */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-20"
        style={{ background: `linear-gradient(to bottom, rgb(${bgRGB}) 0%, transparent 100%)` }}
      />

      <div className="relative max-w-[1700px] mx-auto z-10 pt-20" dir="rtl">
        {/* رأس السكشن — العنوان والنص ينزلقون بنعومة من الأسفل (Mask Reveal) بالتتابع */}
        <motion.div
          variants={headerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-6 mb-16 px-2 md:px-6"
        >
          <div className="overflow-hidden pb-1">
            <motion.div variants={headerItemVariants} className="flex items-center gap-4 opacity-60">
              <span className="w-12 h-px" style={{ background: colors.border }} />
              <span
                style={{ color: colors.textMuted }}
                className={`text-xs font-mono tracking-widest uppercase ${HOVERABLE}`}
              >
                07 — الأرشيف
              </span>
            </motion.div>
          </div>

          <div className="overflow-hidden pb-2">
            <motion.h2
              variants={headerItemVariants}
              style={{ fontSize: "clamp(42px, 6vw, 88px)", fontWeight: 300, lineHeight: 1.1, color: colors.text }}
              className={`tracking-tight ${HOVERABLE}`}
            >
              مختارات من <span style={{ color: colors.textMuted }} className="font-extralight">أعمالنا</span>
            </motion.h2>
          </div>

          <div className="overflow-hidden pb-2">
            <motion.p
              variants={headerItemVariants}
              style={{ fontSize: 18, lineHeight: 1.9, color: colors.textMuted }}
              className={`max-w-2xl font-light mt-2 ${HOVERABLE}`}
            >
              لمحة موجزة من مشاريع وإنجازات تجسّد فلسفة عملنا، وتُحوّل المصداقية إلى أثر مرئي ملموس
            </motion.p>
          </div>
        </motion.div>

        {/* شبكة الكروت بحركة البارالاكس */}
        <motion.div style={{ y: yParallax }} className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {archiveItems.map((item, i) => (
            <CinematicCard key={i} item={item} index={i} onClick={() => setSelectedItem(item)} bgRGB={bgRGB} />
          ))}
        </motion.div>

        {/* ملف الأعمال — سطر ختامي بعد الشبكة، وخارج حاوية البارالاكس
            عشان يبقى ثابت وقت الضغط (العناصر التفاعلية ما تتحرك مع السكرول) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 md:mt-28 pt-10 md:pt-14 px-2 md:px-6"
          style={{ borderTop: `1px solid ${colors.border}` }}
        >
          <a
            href={PROFILE_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col md:flex-row md:items-center gap-8 md:gap-14"
          >
            {/* الغلاف — نفس نسبة صورة الغلاف 13:9 */}
            <div
              className="relative w-full md:w-[38%] shrink-0 aspect-[13/9] overflow-hidden"
              style={{ boxShadow: "0 25px 60px -15px rgba(0,0,0,0.6)" }}
            >
              <img
                src={profileCover}
                alt="ملف أعمال مجموعة تركي عمر"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
            </div>

            {/* النص */}
            <div className="flex-1">
              <div className="text-xs font-mono mb-4" style={{ color: colors.textMuted }}>
                {PROFILE_PDF_META}
              </div>

              <h3 className="text-2xl md:text-4xl font-light mb-4" style={{ color: colors.text }}>
                ملف الأعمال
              </h3>

              <p
                className="text-base md:text-lg font-light max-w-xl mb-8"
                style={{ color: colors.textMuted, lineHeight: 1.9 }}
              >
                نظرة كاملة على المجموعة وكياناتها وخدماتها ومشاريعها.
              </p>

              <span
                className="inline-flex items-center gap-3 text-sm font-mono transition-opacity duration-500 group-hover:opacity-40"
                style={{ color: colors.text }}
              >
                <span>فتح الملف</span>
                <span className="text-base">↙</span>
              </span>
            </div>
          </a>
        </motion.div>
      </div>

      {/* النافذة المنبثقة التفصيلية Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12" dir="rtl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 backdrop-blur-3xl"
              style={{ background: `rgba(${bgRGB},0.9)` }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              // إزالة حواف المودال
              className="relative w-full max-w-5xl max-h-[88vh] overflow-y-auto p-8 md:p-14 shadow-2xl z-10 custom-scrollbar"
              style={{ background: colors.bg }}
            >
              <button
                onClick={() => setSelectedItem(null)}
                // إزالة حواف زر الإغلاق
                className="absolute top-8 left-8 text-lg transition-colors w-11 h-11 flex items-center justify-center"
                style={{ color: colors.textMuted, background: colors.border }}
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono tracking-wider uppercase" style={{ color: colors.textMuted }}>
                  {selectedItem.category}
                </span>
                <span style={{ color: colors.border }}>•</span>
                <span className="text-xs font-mono" style={{ color: colors.textMuted }}>{selectedItem.year}</span>
              </div>

              <h3 className="text-3xl md:text-5xl font-light mb-2 tracking-wide" style={{ color: colors.text }}>
                {selectedItem.title}
              </h3>
              <p className="text-sm font-sans mb-10 tracking-wide" style={{ color: colors.textMuted }}>{selectedItem.subTitle}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {selectedItem.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={selectedItem.title}
                    // إزالة حواف الصور داخل المودال
                    className="w-full h-64 md:h-80 object-cover"
                  />
                ))}
              </div>

              <div className="space-y-4 leading-relaxed font-light text-lg md:text-xl mb-10" style={{ color: colors.text, opacity: 0.85 }}>
                <p>{selectedItem.fullDesc}</p>
              </div>

              {selectedItem.link && (
                <div className="pt-6" style={{ borderTop: `1px solid ${colors.border}` }}>
                  <a
                    href={selectedItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    // إزالة حواف زر الزيارة
                    className="inline-flex items-center gap-3 text-sm font-sans tracking-wider px-8 py-4 transition-all"
                    style={{ color: colors.text, background: colors.border }}
                  >
                    <span>زيارة رابط المشروع</span>
                    <span className="text-xs">↗</span>
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}