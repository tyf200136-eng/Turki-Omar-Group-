import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useTheme } from "./ThemeContext";

const pillars = [
  {
    n: "01",
    title: "الابتكار التقني",
    desc: "نقود التحول الرقمي للمؤسسات، ونبتكر حلولاً برمجية متقدمة تدعم الكفاءة وتعزز مسارات النمو المستدام.",
  },
  {
    n: "02",
    title: "الشراكات الاستراتيجية",
    desc: "عقد تحالفات راسخة وطويلة الأمد لفتح آفاق استثمارية جديدة وتحقيق نجاحات مشتركة.",
  },
  {
    n: "03",
    title: "إدارة وتشغيل الفعاليات",
    desc: "تصميم وإدارة تجارب ترفيهية وفعاليات نوعية بأعلى معايير الاحترافية، من التخطيط والتنظيم إلى التشغيل الكامل على أرض الواقع.",
  },
  {
    n: "04",
    title: "تطوير الأعمال",
    desc: "الأخذ بيد الشركات والمشاريع الواعدة للوصول بها إلى مستويات استثنائية من التوسع والاستقرار المالي.",
  },
];

const HOVERABLE = "transition-opacity duration-300 hover:opacity-40 cursor-default";

function PillarItem({ item, textColor, mutedColor, numberColor }: { item: (typeof pillars)[number]; textColor: string; mutedColor: string; numberColor: string }) {
  const ref = useRef<HTMLDivElement>(null);

  // تتبع السكرول لكل عنصر لحركة النزول من الأعلى
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 45%"],
  });

  // تأثير النزول من الأعلى (من -60px إلى 0) مع زيادة الشفافية
  const y = useTransform(scrollYProgress, [0, 1], [-60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="py-12">
      <motion.div style={{ y, opacity }} className="grid grid-cols-12 gap-6 items-start">
        {/* العنوان والوصف */}
        <div className="col-span-12 md:col-span-9 order-2 md:order-1">
          <h3
            style={{ fontSize: "clamp(28px, 3.5vw, 46px)", color: textColor }}
            className={`font-normal leading-tight mb-4 ${HOVERABLE}`}
          >
            {item.title}
          </h3>
          <p
            style={{ fontSize: 18, lineHeight: 1.9, maxWidth: 560, color: mutedColor }}
            className={`font-light ${HOVERABLE}`}
          >
            {item.desc}
          </p>
        </div>

        {/* الرقم */}
        <div className="col-span-12 md:col-span-3 order-1 md:order-2 flex justify-start md:justify-end">
          <span
            dir="ltr"
            style={{ fontSize: "clamp(50px, 6vw, 90px)", color: numberColor }}
            className={`font-medium leading-none ${HOVERABLE}`}
          >
            {item.n}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export function WhatWeBuild() {
  const headerRef = useRef<HTMLDivElement>(null);
  const { colors } = useTheme();

  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ["start 90%", "start 40%"],
  });

  // حركة نزول الهيدر من الأعلى
  const headerY = useTransform(headerProgress, [0, 1], [-60, 0]);
  const headerOpacity = useTransform(headerProgress, [0, 1], [0, 1]);

  return (
    <section
      id="build"
      className="relative min-h-screen py-32 md:py-44 px-8 md:px-20 transition-colors duration-700"
      style={{ background: colors.bg, color: colors.text }}
    >
      <div className="max-w-[1400px] mx-auto" dir="rtl">

        {/* هيدر السكشن ينزل من الأعلى عند السكرول */}
        <motion.div
          ref={headerRef}
          style={{ y: headerY, opacity: headerOpacity }}
          className="grid grid-cols-12 gap-8 mb-28"
        >
          <div className="col-span-12 flex items-center gap-4 opacity-55 mb-2">
            <span className="w-10 h-px" style={{ background: colors.border }} />
            <span style={{ fontSize: 13, color: colors.textMuted }} className={HOVERABLE}>
              05 — ركائز البناء
            </span>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <h2
              style={{ fontSize: "clamp(44px, 7vw, 100px)", color: colors.text }}
              className={`font-normal leading-[1.1] ${HOVERABLE}`}
            >
              ركائز البناء الاستراتيجي
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:pt-6">
            <p
              style={{ fontSize: 19, lineHeight: 1.9, color: colors.textMuted }}
              className={`font-light ${HOVERABLE}`}
            >
              أربع ركائز تشكّل جوهر ما نبنيه؛ يجمعها الانضباط الاستراتيجي، وتقودها الرؤية، وتُترجم يوميًا إلى نتائج ملموسة.
            </p>
          </div>
        </motion.div>

        {/* قائمة الركائز (كل ركيزة تنزل بشكل منفصل وسلس عند الوصول إليها) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
          {pillars.map((pillar) => (
            <PillarItem key={pillar.n} item={pillar} textColor={colors.text} mutedColor={colors.textMuted} numberColor={colors.textMuted} />
          ))}
        </div>

      </div>
    </section>
  );
}