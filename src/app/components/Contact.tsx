import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";

import contactHeroImg from "../../imports/contact-hero.jpg";
import logoMain from "../../imports/logo-main.png";

export function Contact() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const internalY = useTransform(scrollYProgress, [0, 0.4], [30, 0]);
  const internalOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  // روابط الأقسام بالشريط السفلي — تأكد إن كل id يطابق فعلياً id السكشن بملفه
  const links = [
    { label: "الرئيسية", href: "#hero" },
    { label: "من نحن", href: "#who" },
    { label: "منظومتنا", href: "#ecosystem" },
    { label: "ركائز البناء", href: "#build" },
    { label: "المستجدات", href: "#updates" },
    { label: "أعمالنا", href: "#archive" },
    { label: "تواصل", href: "#contact" },
  ];

  return (
    <div ref={wrapperRef} className="relative z-0 -mt-[100vh]">
      <section
        id="contact"
        ref={containerRef}
        style={{ fontFamily: "'Almarai', sans-serif" }}
        className="relative h-[200vh] bg-[#0c0d0e]"
      >
        <div
          className="sticky top-0 h-screen w-full overflow-hidden flex flex-col"
          dir="rtl"
        >
          {/* ==================== الجزء العلوي: الكونتاكت ==================== */}
          <div className="flex-1 min-h-0 w-full flex flex-col md:flex-row">
            {/* ---------- النصف الأول: الصورة والمعلومات ---------- */}
            <div className="relative w-full md:w-1/2 h-[35%] md:h-full overflow-hidden flex items-end p-6 md:p-12 lg:p-16">
              <img
                src={contactHeroImg}
                alt="Contact Hero"
                className="absolute inset-0 w-full h-full object-cover z-0"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e] via-[#0c0d0e]/60 to-black/40 z-10" />

              <motion.div
                style={{ y: internalY, opacity: internalOpacity }}
                className="relative z-20 w-full text-white space-y-5 md:space-y-6"
              >
                <div className="space-y-3 border-r-2 border-white/20 pr-4">
                  <span className="text-[11px] md:text-xs text-white/50 block tracking-wide">
                    موقعنا ومعلومات الاتصال
                  </span>
                  <div className="text-sm md:text-base font-medium text-white/90">
                    الطائف، المملكة العربية السعودية
                  </div>

                  <a
                    href="mailto:info@turkiomar.com"
                    className="flex items-center gap-3 text-white/70 hover:text-white transition-colors w-fit mt-2"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 6-10 7L2 6" />
                    </svg>
                    <span dir="ltr" className="text-sm md:text-base tracking-wide">info@turkiomar.com</span>
                  </a>

                  <a
                    href="tel:+966559793959"
                    className="flex items-center gap-3 text-white/70 hover:text-white transition-colors w-fit"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span dir="ltr" className="text-sm md:text-base tracking-wide">+966 55 979 3959</span>
                  </a>
                </div>

                <div className="flex items-center gap-5 pt-2" dir="ltr">
                  <a href="#" aria-label="TikTok" className="opacity-50 hover:opacity-100 transition-opacity">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.68a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="Instagram" className="opacity-50 hover:opacity-100 transition-opacity">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="Snapchat" className="opacity-50 hover:opacity-100 transition-opacity">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF">
                      <path d="M12.017 0C8.396 0 5.073 1.966 3.28 5.154c-.9 1.614-1.332 3.407-1.28 5.22-.234.13-.476.234-.728.31-.487.148-.992.195-1.272.42-.176.14-.25.345-.2.54.06.24.27.395.52.406.734.03 1.37.28 1.856.726.174.16.304.355.38.572.09.26.06.53-.09.75-.42.62-1.19 1.01-2.27 1.158-.37.05-.64.37-.61.74.01.11.05.22.12.31.29.39.78.58 1.57.76.13.03.24.14.27.28.05.23.08.47.1.72.02.24.22.42.46.42h.04c.34-.02.61-.04.87-.04.43 0 .84.07 1.22.28.77.43 1.38 1.15 2.4 1.15.94 0 1.51-.54 2.36-.96.44-.21.92-.34 1.42-.34s.98.13 1.42.34c.85.42 1.42.96 2.36.96 1.02 0 1.63-.72 2.4-1.15.38-.21.79-.28 1.22-.28.26 0 .53.02.87.04h.04c.24 0 .44-.18.46-.42.02-.25.05-.49.1-.72.03-.14.14-.25.27-.28.79-.18 1.28-.37 1.57-.76.07-.09.11-.2.12-.31.03-.37-.24-.69-.61-.74-1.08-.148-1.85-.538-2.27-1.158-.15-.22-.18-.49-.09-.75.076-.217.206-.412.38-.572.486-.446 1.122-.696 1.856-.726.25-.011.46-.166.52-.406.05-.195-.024-.4-.2-.54-.28-.225-.785-.272-1.272-.42-.252-.076-.494-.18-.728-.31.052-1.813-.38-3.606-1.28-5.22C18.944 1.966 15.638 0 12.017 0z"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="LinkedIn" className="opacity-50 hover:opacity-100 transition-opacity">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </motion.div>
            </div>

            {/* ---------- النصف الثاني: العنوان والنموذج ---------- */}
            <div className="w-full md:w-1/2 h-[65%] md:h-full bg-[#0c0d0e] flex items-center justify-center p-6 md:p-10 lg:p-14 border-t md:border-t-0 md:border-r border-white/5">
              <motion.div
                style={{ y: internalY, opacity: internalOpacity }}
                className="w-full max-w-[380px] space-y-5"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-white mb-2 leading-tight">
                    لنصنع قصة النجاح القادمة
                  </h2>
                  <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                    معك، نحوّل الفكرة الطموحة إلى كيان يترك أثراً يدوم
                  </p>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  <div>
                    <label className="text-[11px] md:text-xs text-white/40 block mb-1.5">
                      الاسم
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 focus:border-white/60 outline-none pb-2 text-white text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] md:text-xs text-white/40 block mb-1.5">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      dir="ltr"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 focus:border-white/60 outline-none pb-2 text-white text-sm text-right transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] md:text-xs text-white/40 block mb-1.5">
                      تفاصيل المشروع
                    </label>
                    <textarea
                      rows={2}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 focus:border-white/60 outline-none pb-2 text-white text-sm transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 pt-2 text-xs md:text-sm text-white hover:text-white/70 transition-colors"
                  >
                    <span>إرسال النموذج</span>
                    <span className="group-hover:-translate-x-1.5 transition-transform duration-300">
                      ←
                    </span>
                  </button>
                </form>
              </motion.div>
            </div>
          </div>

          {/* ==================== الشريط السفلي: الفوتر المدمج ==================== */}
          <div className="shrink-0 border-t border-white/10 px-6 md:px-12 lg:px-16 py-3 md:py-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
              {/* الشعار + الاسم */}
              <div className="flex items-center gap-3 shrink-0">
                <img
                  src={logoMain}
                  alt="مجموعة تركي عمر"
                  className="h-6 md:h-7 w-auto object-contain"
                />
                <span className="text-white/40 text-[11px] md:text-xs hidden sm:inline">
                  © {new Date().getFullYear()} جميع الحقوق محفوظة
                </span>
              </div>

              {/* روابط الأقسام */}
              <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white text-[11px] md:text-xs transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* روابط قانونية */}
              <div className="flex items-center gap-5 shrink-0" dir="ltr">
                <a href="#" className="text-white/40 hover:text-white/70 text-[11px] md:text-xs transition-colors">
                  سياسة الخصوصية
                </a>
                <a href="#" className="text-white/40 hover:text-white/70 text-[11px] md:text-xs transition-colors">
                  الشروط والأحكام
                </a>
              </div>
            </div>

            {/* حقوق النشر بالجوال */}
            <p className="text-white/40 text-[11px] text-center mt-2 sm:hidden">
              © {new Date().getFullYear()} مجموعة تركي عمر. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}