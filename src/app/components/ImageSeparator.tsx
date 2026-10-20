import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import bgImage from "../../imports/updates-bg.jpg";

export function ImageSeparator() {
  const containerRef = useRef<HTMLDivElement>(null);

  // ربط الحركة بسكرول الصفحة
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // مدى حركة متوازن يضمن بقاء الصورة داخل النطاق المغطى عند نهاية السكرول
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[65vh] relative overflow-hidden bg-[#050505]"
    >
      {/* الصورة المتحركة بالبارالاكس مع ضمان التغطية الكاملة */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[140%] -top-[20%] will-change-transform transform-gpu"
      >
        <img
          src={bgImage}
          alt="Separator Background"
          className="w-full h-full object-cover object-center select-none pointer-events-none"
        />
      </motion.div>

      {/* التأثير السينمائي (Cinematic Overlay + Radial Vignette) */}
      <div 
        className="absolute inset-0 pointer-events-none bg-black/30"
        style={{
          backgroundImage: "radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.6) 100%)",
        }}
      />
    </div>
  );
}