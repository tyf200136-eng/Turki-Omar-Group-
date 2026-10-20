import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "./ThemeContext";

// صور البطاقات (اللي تظهر بالسكشن)
import cardImg1 from "../../imports/news-taif-aura-card.jpg";
import cardImg2 from "../../imports/news-masar-alarab-card.jpg";
import cardImg3 from "../../imports/news-marjooh-card.jpg";

// صور المقال (اللي تظهر داخل البوب أب)
import articleImg1 from "../../imports/news-taif-aura-full.jpg";
import articleImg2 from "../../imports/news-masar-alarab-full.jpg";
import articleImg3 from "../../imports/news-marjooh-full.jpg";

const HOVERABLE = "transition-opacity duration-300 hover:opacity-40 cursor-default";

export const Updates = () => {
  // حالة البطاقة النشطة (الافتراضي: البطاقة اللي بالنص رقم 1)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(1);
  // حالة البوب أب: رقم البطاقة المفتوحة، وnull يعني مقفل
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { isDark, colors } = useTheme();

  // نفس درجة لون colors.bg المستخدمة بباقي الأقسام بالضبط (كريمي بالنهاري، بني غامق بالليلي)
  // بدل الأسود/الأبيض النقي — عشان الخلفية والتدرجات هنا تطابق هوية الموقع
  const bgRGB = isDark ? "12,13,14" : "255,255,255";

  const bgRef = useRef<HTMLDivElement>(null);

  // إعداد حركة الخلفية التفاعلية الهادئة
  const { scrollYProgress: bgProgress } = useScroll({
    target: bgRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(bgProgress, [0, 1], ["0%", "12%"]);
  const bgOpacity = useTransform(bgProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);

  const cardsData = [
    {
      id: 1,
      image: cardImg1,
      articleImage: articleImg1,
      date: "مايو 2026",
      title: "انضمام الطائف أورا",
      desc: "توسّع المجموعة بانضمام ذراع ترفيهي جديد يجسّد رؤيتنا بمدينة ترفيهية مستدامة.",
      article: [
        "أعلنت مجموعة تركي عمر انضمام «الطائف أورا» إلى منظومتها، لتكون الذراع الترفيهي للمجموعة ونقطة انطلاقها في قطاع الوجهات والتجارب.",
        "المشروع وجهة ترفيهية متكاملة في مدينة الطائف، صُمّمت لتقدّم تجربة تجمع بين الأجواء الطبيعية للمدينة ومرافق ترفيهية معاصرة تناسب العائلة والزائر على حد سواء.",
        "يأتي هذا الانضمام امتداداً لتوجّه المجموعة في بناء كيانات تشغيلية طويلة المدى، وتوسيع حضورها في القطاعات ذات الأثر المباشر على جودة الحياة.",
      ],
    },
    {
      id: 2,
      image: cardImg2,
      articleImage: articleImg2,
      date: "فبراير 2026",
      title: "انضمام مسار العرب الطبية",
      desc: "دخول المجموعة لقطاع الرعاية الصحية عبر ذراع طبي متخصص بتقديم أجود المنتجات الطبية والصحية.",
      article: [
        "دخلت مجموعة تركي عمر قطاع الرعاية الصحية رسمياً بانضمام «مسار العرب الطبية» إلى منظومتها كذراع متخصص في المنتجات الصحية.",
        "تقدّم الشركة مجموعة متنوعة من المنتجات الموثوقة وعالية الجودة، تشمل العناية بالفم والأسنان، وصحة الأطفال، والمكملات الغذائية، والعناية بالمرأة والجمال، والعناية بالرجل.",
        "يمثّل هذا التوسّع خطوة في تنويع محفظة المجموعة، وربط خبرتها التشغيلية بقطاع يقوم على الثقة والجودة والاستمرارية.",
      ],
    },
    {
      id: 3,
      image: cardImg3,
      articleImage: articleImg3,
      date: "يوليو 2026",
      title: "جائزة لجنة التحكيم لفيلم مرجوج هزازي",
      desc: "الوثائقي «مرجوج هزازي» يحصد جائزة لجنة التحكيم بمسابقة الأفلام الوثائقية في مهرجان أفلام السعودية.",
      article: [
        "نال الفيلم الوثائقي «مرجوج هزازي» للمخرج مشعل الثبيتي جائزة لجنة التحكيم في مسابقة الأفلام الوثائقية، ضمن الدورة الثانية عشرة من مهرجان أفلام السعودية التي أقيمت في مركز الملك عبدالعزيز الثقافي العالمي (إثراء) بالظهران، خلال الفترة من 26 يونيو إلى 2 يوليو 2026.",
        "الفيلم وثائقي قصير مدته نحو 23 دقيقة، يستعيد سيرة الهاكر السعودي مرجوج هزازي، أحد أبرز الأسماء التي شغلت الإنترنت السعودي في وقتها، ويعيد قراءة القصة من زاوية إنسانية بعد رحلة بحث امتدت أشهراً.",
        // ملاحظة: عدّل هذي الفقرة حسب دور المجموعة الفعلي بالعمل (شراكة إنتاجية؟ دعم؟ لا شيء؟)
        "وتحتفي مجموعة تركي عمر بهذا الحضور في المشهد السينمائي المحلي، انطلاقاً من إيمانها بأن الصناعة الإبداعية قطاع اقتصادي قائم بذاته، وأن الاستثمار في الحكاية السعودية يبني قيمة طويلة المدى.",
      ],
    },
  ];

  // دوال التنقل بالأسهم (تغيير الاندكس كأن المستخدم حرك الماوس عليها)
  const handleNext = () => {
    setHoveredIndex((prev) => (prev === null ? 2 : (prev + 1) % 3));
  };

  const handlePrev = () => {
    setHoveredIndex((prev) => (prev === null ? 0 : (prev - 1 + 3) % 3));
  };

  // إغلاق البوب أب بزر Escape + تجميد سكرول الصفحة وقت فتحه
  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeIndex]);

  const activeCard = activeIndex !== null ? cardsData[activeIndex] : null;

  // متغيرات حركة انزلاق النصوص والعنوان بنعومة (تأثير الظهور من العدم)
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.1,
      },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: "100%" }, // الانطلاق من خارج حدود الحاوية
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      ref={bgRef}
      className="relative pt-28 pb-48 md:pt-36 md:pb-60 overflow-hidden isolate transition-colors duration-700"
      style={{ background: colors.bg, contain: "paint" }}
    >
      {/* 🌌 خلفية البارالاكس السينمائية المحصورة */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          y: bgY,
          opacity: bgOpacity,
          background: `radial-gradient(ellipse 85% 65% at 50% 20%, rgba(${bgRGB},0.18) 0%, rgba(${bgRGB},0) 60%), linear-gradient(180deg, rgba(${bgRGB},1) 0%, rgba(${bgRGB},0.85) 45%, rgba(${bgRGB},1) 100%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-10 z-10">

        {/* 1. انزلاق العنوان والوسم ناعم وموزع مع تأثير Mask */}
        <motion.div
          variants={titleContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 md:mb-24"
          dir="rtl"
        >
          {/* Tag Line */}
          <div className="overflow-hidden pb-1 mb-4">
            <motion.div variants={textItemVariants} className="flex items-center gap-4 opacity-55">
              <span className="w-10 h-px" style={{ background: colors.border }} />
              <span style={{ fontSize: 12, letterSpacing: "normal", color: colors.textMuted }} className={HOVERABLE}>
                06 — المستجدات
              </span>
              <span className="w-10 h-px" style={{ background: colors.border }} />
            </motion.div>
          </div>

          {/* Main Heading */}
          <div className="overflow-hidden pb-2">
            <motion.h2
              variants={textItemVariants}
              style={{
                fontSize: "clamp(46px, 6vw, 86px)",
                fontWeight: 400,
                lineHeight: 1.1,
                color: colors.text,
              }}
              className={HOVERABLE}
            >
              المستجدات
            </motion.h2>
          </div>

          {/* Subheading */}
          <div className="overflow-hidden mt-4 pb-2">
            <motion.p
              variants={textItemVariants}
              style={{ color: colors.textMuted }}
              className="text-xl md:text-2xl font-light tracking-wide max-w-xl opacity-80"
            >
              آخر أخبار وإنجازات المجموعة
            </motion.p>
          </div>
        </motion.div>

        {/* 2. حاوية الكروت الضخمة السينمائية (نفس الأصلية بالضبط) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative w-full max-w-6xl mx-auto min-h-[128vw] md:min-h-[740px] flex justify-center items-center my-6"
          dir="rtl"
        >
          {cardsData.map((card, index) => {
            const isHovered = hoveredIndex === index;

            let zIndex = 10;
            let scale = 0.92;
            let opacity = 0.75;

            if (isHovered) {
              zIndex = 30;
              scale = 1.04;
              opacity = 1;
            } else if (hoveredIndex === null && index === 1) {
              zIndex = 20;
              scale = 1;
              opacity = 0.9;
            }

            return (
              <motion.div
                key={card.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(1)}
                onClick={() => setActiveIndex(index)}
                role="button"
                tabIndex={0}
                aria-label={`اقرأ: ${card.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveIndex(index);
                  }
                }}
                animate={{
                  scale,
                  zIndex,
                  opacity,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ backfaceVisibility: "hidden" }}
                className={`absolute w-[68vw] h-[121vw] md:w-[380px] md:h-[676px] cursor-pointer will-change-transform ${
                  index === 0
                    ? "-mr-[44vw] md:-mr-[255px]"
                    : index === 2
                    ? "-ml-[44vw] md:-ml-[255px]"
                    : ""
                }`}
              >
                {/* إطار الكارت والشدو السينمائي العميق */}
                <div
                  className={`absolute inset-0 overflow-hidden border transform-gpu transition-shadow duration-700 ${
                    isHovered
                      ? "shadow-[0_25px_60px_-10px_rgba(0,0,0,0.98),0_0_40px_rgba(0,0,0,0.85)]"
                      : "shadow-[0_12px_35px_-10px_rgba(0,0,0,0.75)]"
                  }`}
                  style={{ background: colors.bg, borderColor: colors.border }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    style={{ backfaceVisibility: "hidden" }}
                    className={`w-full h-full object-cover transition-transform duration-1000 ease-out will-change-transform transform-gpu ${
                      isHovered ? "scale-108" : "scale-100"
                    }`}
                  />

                  {/* تدرجات الظل الداخلي — بنفس درجة لون الخلفية (bgRGB) بدل الأسود النقي */}
                  <div
                    className="absolute inset-0 transition-colors duration-700"
                    style={{ background: isHovered ? `rgba(${bgRGB},0.2)` : `rgba(${bgRGB},0.55)` }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, rgba(${bgRGB},0.95) 0%, rgba(${bgRGB},0.4) 55%, transparent 100%)` }}
                  />
                </div>

                {/* النصوص بداخل الكارت */}
                <div className="relative z-20 h-full flex flex-col justify-end p-7 md:p-10 select-none">
                  <div className="text-xs md:text-sm mb-2 font-mono tracking-widest" style={{ color: colors.textMuted }}>
                    {card.date}
                  </div>
                  <h3 className="text-2xl md:text-3xl mb-3 font-normal leading-snug" style={{ color: colors.text }}>
                    {card.title}
                  </h3>
                  <p
                    style={{ color: colors.textMuted }}
                    className={`text-sm md:text-base leading-relaxed line-clamp-2 transition-all duration-500 transform ${
                      isHovered ? "translate-y-0 opacity-100" : "translate-y-1 opacity-80"
                    }`}
                  >
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 3. الأسهم الأنيقة بدون حواف تحت البطاقات */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex justify-center items-center gap-8 mt-12 md:mt-16"
          dir="rtl"
        >
          {/* زر السابق (يمين) */}
          <button
            onClick={handlePrev}
            className="transition-colors duration-300 p-2"
            style={{ color: colors.textMuted }}
            onMouseEnter={(e) => (e.currentTarget.style.color = colors.text)}
            onMouseLeave={(e) => (e.currentTarget.style.color = colors.textMuted)}
            aria-label="السابق"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* زر التالي (يسار) */}
          <button
            onClick={handleNext}
            className="transition-colors duration-300 p-2"
            style={{ color: colors.textMuted }}
            onMouseEnter={(e) => (e.currentTarget.style.color = colors.text)}
            onMouseLeave={(e) => (e.currentTarget.style.color = colors.textMuted)}
            aria-label="التالي"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </motion.div>

      </div>

      {/* 4. البوب أب (يُرسم على body عبر Portal عشان ما يتقص بسبب contain:paint بالسكشن) */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {activeCard && (
              <motion.div
                key="updates-modal"
                dir="rtl"
                role="dialog"
                aria-modal="true"
                aria-label={activeCard.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveIndex(null)}
                className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
              >
                {/* الطبقة الخلفية المعتمة مع بلور خفيف */}
                <div
                  className="absolute inset-0 backdrop-blur-[6px]"
                  style={{ background: isDark ? "rgba(0,0,0,0.82)" : "rgba(24,22,20,0.55)" }}
                />

                {/* لوح المقال — حواف مربعة تماماً + شدو عميق */}
                <motion.article
                  onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, y: 30, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 18, scale: 0.99 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full max-w-[900px] max-h-[88vh] overflow-y-auto border shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9),0_8px_30px_-12px_rgba(0,0,0,0.6)]"
                  style={{ background: colors.bg, borderColor: colors.border, borderRadius: 0 }}
                >
                  {/* زر الإغلاق — مربع بدون انحناء */}
                  <button
                    onClick={() => setActiveIndex(null)}
                    aria-label="إغلاق"
                    className="absolute top-4 left-4 z-20 w-10 h-10 flex items-center justify-center border backdrop-blur-md transition-opacity duration-300 hover:opacity-60"
                    style={{
                      borderColor: colors.border,
                      background: `rgba(${bgRGB},0.55)`,
                      color: colors.text,
                      borderRadius: 0,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>

                  {/* المحتوى: عمودين بالديسكتوب (الصورة يمين والنص يسار)، فوق بعض بالجوال */}
                  <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 md:gap-10 p-7 md:p-12">

                    {/* صورة المقال بنسبة 9:16 — نفس نسبة البوسترات */}
                    <div
                      className="relative w-full max-w-[240px] md:max-w-none mx-auto aspect-[9/16] overflow-hidden border"
                      style={{ borderColor: colors.border }}
                    >
                      <img
                        src={activeCard.articleImage}
                        alt={activeCard.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* جسم المقال */}
                    <div className="relative">
                      <div className="text-xs md:text-sm mb-3 font-mono" style={{ color: colors.textMuted }}>
                        {activeCard.date}
                      </div>

                      <h3
                        style={{
                          fontSize: "clamp(26px, 3vw, 40px)",
                          fontWeight: 400,
                          lineHeight: 1.25,
                          color: colors.text,
                        }}
                      >
                        {activeCard.title}
                      </h3>

                      <div className="w-16 h-px my-6 md:my-8" style={{ background: colors.border }} />

                      {activeCard.article.map((paragraph, i) => (
                        <p
                          key={i}
                          className="text-base md:text-lg font-light mb-5 last:mb-0"
                          style={{ color: colors.textMuted, lineHeight: 2 }}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.article>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};