import { motion, AnimatePresence } from "motion/react";
import { useState, type MouseEvent } from "react";
import { useTheme } from "./ThemeContext";

// استدعاء الشعارات
import hiddenCodeIcon from "../../imports/hidden-code.png";
import taifAuraIcon from "../../imports/taif-aura.png";
import masarAlArabIcon from "../../imports/masar-alarab.png";
import toStudioIcon from "../../imports/to-studio.png";
import toMediaIcon from "../../imports/to-media.png";
import lotrikIcon from "../../imports/lotrik.png";

type Company = {
  id: string;
  name: string;
  nameAr: string;
  tag: string;
  desc: string;
  icon: string;
  gradient: string;
};

// بيانات الشركات
const companies: Company[] = [
  {
    id: "hiddenCode",
    name: "Hidden Code",
    nameAr: "هيدن كود",
    tag: "التقنية",
    desc: "نختص بهندسة الحلول البرمجية وتطوير الأنظمة الرقمية المتقدمة التي تُمكّن المؤسسات من قيادة رحلة التحول الرقمي بكفاءة واقتدار.",
    icon: hiddenCodeIcon,
    gradient:
      "radial-gradient(circle, rgba(255,77,77,0.45) 0%, rgba(255,77,77,0) 70%)",
  },
  {
    id: "taifAura",
    name: "Taif Aura",
    nameAr: "الطائف أورا",
    tag: "الترفيه",
    desc: "مدينة ترفيهية مستدامة تُحوّل طبيعة الطائف الفريدة إلى تجربة حية تمتد من الحفلات الكبرى إلى مناطق الإقامة والاسترخاء والتجارب العائلية.",
    icon: taifAuraIcon,
    gradient:
      "radial-gradient(circle, rgba(169,128,224,0.45) 0%, rgba(169,128,224,0) 70%)",
  },
  {
    id: "masarAlArab",
    name: "Masar Al-Arab",
    nameAr: "مسار العرب الطبية",
    tag: "الصحة",
    desc: "نقدّم مجموعة متنوعة من المنتجات الصحية الموثوقة تشمل العناية بالفم والأسنان، وصحة الأطفال، والمكملات الغذائية، والعناية بالمرأة والرجل.",
    icon: masarAlArabIcon,
    gradient:
      "radial-gradient(circle, rgba(247,127,0,0.45) 0%, rgba(247,127,0,0) 70%)",
  },
  {
    id: "toStudio",
    name: "TO Studio",
    nameAr: "تي او ستديو",
    tag: "الإنتاج",
    desc: "منصة الإنتاج والتصوير الاحترافي التي تحوّل الأفكار إلى روائع مرئية، مقدمةً حلولاً بصرية وصناعة محتوى إبداعي يجسد قيمة العلامات التجارية.",
    icon: toStudioIcon,
    gradient:
      "radial-gradient(circle, rgba(139,147,156,0.45) 0%, rgba(139,147,156,0) 70%)",
  },
  {
    id: "toMedia",
    name: "TO Media",
    nameAr: "تي او ميديا",
    tag: "الإبداع",
    desc: "وكالة تسويقية وإبداعية متكاملة، تصنع الهوية وتصيغ المحتوى الرقمي المؤثر، لتبني تجارب تسويقية فريدة تضمن للعلامات التجارية حضورًا راسخًا.",
    icon: toMediaIcon,
    gradient:
      "radial-gradient(circle, rgba(244,162,97,0.45) 0%, rgba(244,162,97,0) 70%)",
  },
  {
    id: "lotrik",
    name: "Lotrik",
    nameAr: "لوتريك للمحاماة",
    tag: "القانون",
    desc: "شركة قانونية متكاملة تقدّم خدمات قانونية شاملة للأفراد وقطاع الأعمال؛ نلتزم بحلول قانونية عملية تجمع بين الخبرة القانونية والفهم العميق للأنظمة.",
    icon: lotrikIcon,
    gradient:
      "radial-gradient(circle, rgba(56,163,165,0.45) 0%, rgba(56,163,165,0) 70%)",
  },
];

const containerVariants = {
  hidden: {
    opacity: 0,
  },

  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },

  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ============================================================
// الخلفية الـ Immersive Flow Lines
// خطوط ناعمة وأنيقة تمتد من منطقة قائمة الشعارات
// إلى منطقة بطاقات الشركات.
// ============================================================

function ImmersiveLines({
  isDark,
  mousePos,
}: {
  isDark: boolean;
  mousePos: {
    x: number;
    y: number;
  };
}) {
  const lineColor = isDark
    ? "rgba(255,255,255,0.075)"
    : "rgba(0,0,0,0.055)";

  const glowColor = isDark
    ? "rgba(255,255,255,0.24)"
    : "rgba(0,0,0,0.16)";

  const paths = [
    "M -100 180 C 180 20, 380 420, 700 220 S 1180 40, 1700 300",

    "M -120 430 C 220 240, 420 650, 760 470 S 1230 260, 1720 560",

    "M -100 700 C 240 520, 480 900, 850 730 S 1280 540, 1700 850",

    "M -120 980 C 220 760, 520 1180, 900 960 S 1300 790, 1720 1120",

    "M -80 1260 C 260 1080, 540 1460, 920 1240 S 1320 1090, 1700 1410",

    "M -100 1530 C 260 1370, 560 1710, 950 1490 S 1330 1380, 1720 1680",
  ];

  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 overflow-hidden"
      style={{
        top: "31vh",
      }}
      animate={{
        x: mousePos.x * 0.18,
        y: mousePos.y * 0.12,
      }}
      transition={{
        type: "spring",
        stiffness: 25,
        damping: 30,
      }}
      aria-hidden="true"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1600 1800"
        preserveAspectRatio="none"
      >
        <defs>
          <filter
            id="immersiveLineGlow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur
              stdDeviation="3"
              result="blur"
            />
          </filter>
        </defs>

        {paths.map((path, index) => (
          <g key={index}>
            {/* الخط الأساسي */}
            <path
              d={path}
              fill="none"
              stroke={lineColor}
              strokeWidth={1}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />

            {/* لمعة ناعمة متحركة */}
            <motion.path
              d={path}
              fill="none"
              stroke={glowColor}
              strokeWidth={1.2}
              strokeLinecap="round"
              strokeDasharray="180 1500"
              vectorEffect="non-scaling-stroke"
              filter="url(#immersiveLineGlow)"
              animate={{
                strokeDashoffset: [0, -1680],
              }}
              transition={{
                duration: 18 + index * 2.5,
                repeat: Infinity,
                ease: "linear",
                delay: index * -2.4,
              }}
            />

            {/* خط ضوء إضافي أخف */}
            <motion.path
              d={path}
              fill="none"
              stroke={glowColor}
              strokeWidth={0.7}
              strokeLinecap="round"
              strokeDasharray="90 1600"
              vectorEffect="non-scaling-stroke"
              animate={{
                strokeDashoffset: [0, -1690],
              }}
              transition={{
                duration: 26 + index * 3,
                repeat: Infinity,
                ease: "linear",
                delay: index * -3,
              }}
            />
          </g>
        ))}
      </svg>
    </motion.div>
  );
}

// ============================================================
// مسار البطاقات البيضاوي
// ============================================================

type CarouselPath = {
  x: number[];
  y: number[];
  scale: number[];
  opacity: number[];
  zIndex: number[];
  filter: string[];
  rotate: number[];
  times: number[];
};

function buildCarouselPath(
  phase: number,
  radiusX: number,
  radiusY: number,
  steps: number,
  baseTilt: number,
): CarouselPath {
  const x: number[] = [];
  const y: number[] = [];
  const scale: number[] = [];
  const opacity: number[] = [];
  const zIndex: number[] = [];
  const filter: string[] = [];
  const rotate: number[] = [];
  const times: number[] = [];

  for (let step = 0; step <= steps; step++) {
    const progress = step / steps;

    // كل بطاقة تبدأ من نقطة مختلفة على نفس المدار
    const angle =
      (progress + phase) * Math.PI * 2 - Math.PI / 2;

    const horizontalPosition = Math.cos(angle);
    const verticalPosition = Math.sin(angle);

    /*
      أعلى المدار = أقرب للمشاهد.
      أسفل المدار = أبعد عن المشاهد.
    */
    const depth = (1 - verticalPosition) / 2;

    x.push(horizontalPosition * radiusX);
    y.push(verticalPosition * radiusY);

    // حجم البطاقة حسب العمق
    scale.push(0.58 + depth * 0.7);

    // البطاقة تبقى ظاهرة حتى وهي بالخلف
    opacity.push(0.2 + depth * 0.8);

    // ترتيب الظهور حسب العمق
    zIndex.push(Math.round(10 + depth * 190));

    // زيادة الـ blur في الجزء الخلفي
    filter.push(
      `blur(${((1 - depth) * 6).toFixed(2)}px)`,
    );

    // ميلان بسيط أثناء الحركة
    rotate.push(
      baseTilt + Math.sin(angle * 2) * 2.5,
    );

    times.push(progress);
  }

  return {
    x,
    y,
    scale,
    opacity,
    zIndex,
    filter,
    rotate,
    times,
  };
}

// ============================================================
// حركة بطاقات الشركات
// ============================================================

function CompanyOrbitCard({
  company,
}: {
  company: Company;
}) {
  const cardBg = "#F5F1EA";
  const innerBg = "#E7E0D2";
  const textColor = "#1C1712";

  return (
    <div
      className="p-3"
      style={{
        width: 176,
        background: cardBg,
        boxShadow:
          "0 18px 40px rgba(0,0,0,0.35)",
      }}
    >
      <div
        className="flex aspect-square items-center justify-center"
        style={{
          background: innerBg,
        }}
      >
        <img
          src={company.icon}
          alt={company.nameAr}
          className="h-2/3 w-2/3 object-contain"
          draggable={false}
        />
      </div>

      <div
        className="mt-3 text-center text-[11px] font-light tracking-wide"
        style={{
          color: textColor,
        }}
      >
        {company.nameAr}
      </div>
    </div>
  );
}

function CompanyCarouselOrbit({
  duration = 34,
}: {
  duration?: number;
}) {
  // نكرر الشركات حتى يكون المدار ممتلئ
  const cards = [...companies, ...companies];

  const tilts = [
    -8,
    6,
    -5,
    9,
    -6,
    4,
    7,
    -9,
    5,
    -4,
    8,
    -6,
  ];

  const steps = 140;

  // أبعاد المدار
  const radiusX = 620;
  const radiusY = 500;

  return (
    <>
      {cards.map((company, index) => {
        const phase =
          index / cards.length;

        const path =
          buildCarouselPath(
            phase,
            radiusX,
            radiusY,
            steps,
            tilts[index],
          );

        return (
          <div
            key={`${company.id}-${index}`}
            className="pointer-events-none absolute left-1/2 top-1/2"
          >
            <div
              style={{
                transform:
                  "translate(-50%, -50%)",
              }}
            >
              <motion.div
                className="pointer-events-auto cursor-pointer select-none"
                animate={{
                  x: path.x,
                  y: path.y,
                  scale: path.scale,
                  opacity: path.opacity,
                  zIndex: path.zIndex,
                  filter: path.filter,
                  rotate: path.rotate,
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "linear",
                  times: path.times,
                }}
                whileHover={{
                  scale: 1.4,
                  opacity: 1,
                  filter: "blur(0px)",
                  zIndex: 500,
                  transition: {
                    duration: 0.25,
                    ease: "easeOut",
                  },
                }}
                style={{
                  willChange:
                    "transform, opacity, filter",
                }}
              >
                <CompanyOrbitCard
                  company={company}
                />
              </motion.div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export function Ecosystem() {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const [isHovering, setIsHovering] =
    useState(false);

  const [mousePos, setMousePos] =
    useState({
      x: 0,
      y: 0,
    });

  const activeCompany =
    companies[activeIndex];

  const { isDark, colors } =
    useTheme();

  // تفاعل الخلفية مع الماوس
  const handleMouseMove = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    const {
      clientX,
      clientY,
    } = event;

    const {
      innerWidth,
      innerHeight,
    } = window;

    const x =
      (clientX / innerWidth - 0.5) *
      35;

    const y =
      (clientY / innerHeight - 0.5) *
      35;

    setMousePos({
      x,
      y,
    });
  };

  return (
    <section
      id="ecosystem"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen w-full flex-col overflow-hidden pt-[12vh] transition-colors duration-700"
      style={{
        background: colors.bg,
      }}
      dir="rtl"
    >
      {/* ========================================================
          الخلفية الـ Immersive
          تبدأ مع منطقة الشعارات وتمتد حتى منطقة البطاقات
      ======================================================== */}

      <ImmersiveLines
        isDark={isDark}
        mousePos={mousePos}
      />

      {/* طبقة مسح أعلى السكشن */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 z-[15]"
        style={{
          height: "24vh",
          background: `linear-gradient(
            to bottom,
            ${colors.bg} 0%,
            ${colors.bg} 15%,
            transparent 100%
          )`,
        }}
      />

      {/* ========================================================
          العنوان
      ======================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: -50,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          margin: "-10%",
        }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative z-20 mb-[10vh] text-center"
      >
        <span
          className="mb-4 block text-[14px] font-light tracking-widest"
          style={{
            color: colors.textMuted,
          }}
        >
          04 — منظومتنا
        </span>

        <h2
          className="text-[clamp(40px,6vw,84px)] font-light leading-[1.1] tracking-tight"
          style={{
            color: colors.text,
          }}
        >
          رؤية واحدة كيانات متعددة
        </h2>
      </motion.div>

      {/* ========================================================
          القائمة والمحتوى
      ======================================================== */}

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] px-8">
        {/* ======================================================
            القسم الأيمن
        ====================================================== */}

        <div className="flex w-6/12 flex-col justify-center pb-12 pr-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCompany.id}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="relative flex flex-col items-start"
            >
              <motion.div
                variants={itemVariants}
                className="relative mb-10 flex h-36 w-auto items-center justify-start"
              >
                {/* Aura للشعار الكبير */}
                <motion.div
                  key={`${activeCompany.id}-aura`}
                  className="pointer-events-none absolute -inset-10 z-0 rounded-full blur-[60px]"
                  animate={{
                    background:
                      activeCompany.gradient,
                    opacity: isDark
                      ? 0.75
                      : 0.4,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                />

                <img
                  src={activeCompany.icon}
                  alt={activeCompany.nameAr}
                  className="relative z-10 h-full w-full object-contain object-right"
                />
              </motion.div>

              <motion.span
                variants={itemVariants}
                className="mb-3 text-[15px] font-light uppercase tracking-wider"
                style={{
                  color:
                    colors.textMuted,
                }}
              >
                {activeCompany.tag}
              </motion.span>

              <motion.h3
                variants={itemVariants}
                className="mb-6 text-[44px] font-light"
                style={{
                  color: colors.text,
                }}
              >
                {activeCompany.nameAr}
              </motion.h3>

              <motion.p
                variants={itemVariants}
                className="max-w-xl text-xl font-light leading-[1.8]"
                style={{
                  color:
                    colors.textMuted,
                }}
              >
                {activeCompany.desc}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ======================================================
            القسم الأيسر - قائمة الشعارات
        ====================================================== */}

        <div
          className="relative flex w-6/12 flex-col justify-center pb-12 pl-12 pr-20"
          onMouseLeave={() =>
            setIsHovering(false)
          }
        >
          {companies.map(
            (company, index) => {
              const isCurrent =
                index === activeIndex;

              const showAsActive =
                isCurrent &&
                isHovering;

              return (
                <motion.div
                  key={company.id}
                  className="relative z-10 w-full"
                  initial={{
                    opacity: 0,
                    x: -60,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.9,
                    delay:
                      index * 0.1,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }}
                >
                  <div
                    onMouseEnter={() => {
                      setActiveIndex(
                        index,
                      );

                      setIsHovering(
                        true,
                      );
                    }}
                    className={`group relative flex h-24 w-full cursor-pointer items-center justify-end transition-all duration-500 ${
                      showAsActive
                        ? "opacity-100"
                        : "opacity-30 hover:opacity-60"
                    }`}
                  >
                    {/* =================================================
                        Wrapper للشعار + الـ Aura
                        الهالة متمركزة خلف الشعار نفسه
                    ================================================= */}

                    <div className="relative flex items-center justify-center">
                      {/* Aura رئيسية:
                          موجودة طوال الوقت
                          وتزيد وقت الـ Hover
                      */}
                      <motion.div
                        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{
                          width: 230,
                          height: 140,
                          background:
                            company.gradient,
                          filter:
                            "blur(42px)",
                        }}
                        animate={{
                          opacity:
                            showAsActive
                              ? 1
                              : 0.48,

                          scale:
                            showAsActive
                              ? 1.18
                              : 1,
                        }}
                        transition={{
                          duration: 0.45,
                          ease: [
                            0.16,
                            1,
                            0.3,
                            1,
                          ],
                        }}
                      />

                      {/* Aura أقرب للشعار */}
                      <motion.div
                        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{
                          width: 150,
                          height: 90,
                          background:
                            company.gradient,
                          filter:
                            "blur(28px)",
                        }}
                        animate={{
                          opacity:
                            showAsActive
                              ? 0.85
                              : 0.3,

                          scale:
                            showAsActive
                              ? 1.12
                              : 1,
                        }}
                        transition={{
                          duration: 0.45,
                          ease: [
                            0.16,
                            1,
                            0.3,
                            1,
                          ],
                        }}
                      />

                      {/* الشعار */}
                      <img
                        src={
                          company.icon
                        }
                        alt={
                          company.name
                        }
                        className="relative z-10 max-h-[60px] max-w-[180px] object-contain object-left transition-transform duration-700 ease-out"
                        style={{
                          transform:
                            showAsActive
                              ? "scale(1.08) translateX(-15px)"
                              : "scale(1) translateX(0px)",
                        }}
                      />
                    </div>
                  </div>

                  {/* الخط الفاصل بين الشعارات */}
                  {index !==
                    companies.length -
                      1 && (
                    <div
                      className="h-[1px] w-full transition-colors duration-500"
                      style={{
                        background:
                          colors.border,
                      }}
                    />
                  )}
                </motion.div>
              );
            },
          )}
        </div>
      </div>

      {/* ========================================================
          مشهد البطاقات
      ======================================================== */}

      <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-8 py-[10vh]">
        <div
          className="relative"
          style={{
            width: 1500,
            height: 1500,
            maxWidth: "96vw",
            maxHeight: "92vh",
          }}
        >
          {/* النص الثابت في المنتصف */}
          <div className="pointer-events-none absolute inset-0 z-[300] flex flex-col items-center justify-center gap-6 text-center">
            <motion.span
              initial={{
                opacity: 0,
                y: -30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 1,
                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
              className="text-6xl font-light md:text-7xl"
              style={{
                color: colors.text,
              }}
            >
              ست شركات
            </motion.span>

            <motion.span
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
              className="text-[clamp(24px,3vw,44px)] font-light"
              style={{
                color:
                  colors.textMuted,
              }}
            >
              منظومة واحدة تصنع الأثر
            </motion.span>
          </div>

          {/* البطاقات في مدار بيضاوي */}
          <CompanyCarouselOrbit
            duration={34}
          />
        </div>
      </div>
    </section>
  );
}