import { useState } from "react";
import { motion } from "motion/react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    // TODO: ربط فعلي بخدمة النشرة البريدية لاحقاً
  };

  // روابط الأقسام — تأكد إن كل id يطابق فعلياً id السكشن بملفه
  // (id="contact" موجود بالفعل بـContact.tsx، الباقي تحتاج تتأكد/تضيفه)
  const links = [
    { label: "الرئيسية", href: "#hero" },
    { label: "من نحن", href: "#who" },
    { label: "منظومتنا", href: "#ecosystem" },
    { label: "ركائز البناء", href: "#build" },
    { label: "المستجدات", href: "#updates" },
    { label: "أعمالنا", href: "#archive" },
    { label: "تواصل", href: "#contact" },
  ];

  const socials = [
    {
      label: "TikTok",
      href: "#",
      path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.68a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z",
    },
    {
      label: "Instagram",
      href: "#",
      path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
    },
    {
      label: "Snapchat",
      href: "#",
      path: "M12.017 0C8.396 0 5.073 1.966 3.28 5.154c-.9 1.614-1.332 3.407-1.28 5.22-.234.13-.476.234-.728.31-.487.148-.992.195-1.272.42-.176.14-.25.345-.2.54.06.24.27.395.52.406.734.03 1.37.28 1.856.726.174.16.304.355.38.572.09.26.06.53-.09.75-.42.62-1.19 1.01-2.27 1.158-.37.05-.64.37-.61.74.01.11.05.22.12.31.29.39.78.58 1.57.76.13.03.24.14.27.28.05.23.08.47.1.72.02.24.22.42.46.42h.04c.34-.02.61-.04.87-.04.43 0 .84.07 1.22.28.77.43 1.38 1.15 2.4 1.15.94 0 1.51-.54 2.36-.96.44-.21.92-.34 1.42-.34s.98.13 1.42.34c.85.42 1.42.96 2.36.96 1.02 0 1.63-.72 2.4-1.15.38-.21.79-.28 1.22-.28.26 0 .53.02.87.04h.04c.24 0 .44-.18.46-.42.02-.25.05-.49.1-.72.03-.14.14-.25.27-.28.79-.18 1.28-.37 1.57-.76.07-.09.11-.2.12-.31.03-.37-.24-.69-.61-.74-1.08-.148-1.85-.538-2.27-1.158-.15-.22-.18-.49-.09-.75.076-.217.206-.412.38-.572.486-.446 1.122-.696 1.856-.726.25-.011.46-.166.52-.406.05-.195-.024-.4-.2-.54-.28-.225-.785-.272-1.272-.42-.252-.076-.494-.18-.728-.31.052-1.813-.38-3.606-1.28-5.22C18.944 1.966 15.638 0 12.017 0z",
    },
    {
      label: "LinkedIn",
      href: "#",
      path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    },
  ];

  return (
    <footer
      dir="rtl"
      style={{ fontFamily: "'Almarai', sans-serif" }}
      className="relative bg-[#0c0d0e] border-t border-white/10 pt-20 pb-8 px-8 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* الصف العلوي: الشعار + النشرة البريدية */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 pb-16 border-b border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-md"
          >
            <h3
              style={{ fontSize: "clamp(24px, 2.4vw, 34px)", fontWeight: 500 }}
              className="text-white mb-3"
            >
              مجموعة تركي عمر
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">
              ريادة التشغيل وبناء المستقبل — عبر شركات تجمع بين الابتكار التقني
              والشراكات الاستراتيجية.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full md:w-auto md:min-w-[340px]"
          >
            <span className="text-xs text-white/40 block mb-3">
              اشترك ليصلك كل جديد عن المجموعة
            </span>
            {subscribed ? (
              <p className="text-sm text-white/80">
                تم الاشتراك بنجاح، شكراً لك.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-4">
                <input
                  type="email"
                  dir="ltr"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="بريدك الإلكتروني"
                  className="flex-1 bg-transparent border-b border-white/15 focus:border-white outline-none pb-2 text-white text-sm text-right placeholder:text-white/30 transition-colors"
                />
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 pb-2 text-sm text-white hover:opacity-80 transition-opacity shrink-0"
                >
                  <span>اشتراك</span>
                  <span className="group-hover:-translate-x-2 transition-transform duration-300">
                    ←
                  </span>
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* الصف الأوسط: روابط الأقسام + التواصل السريع */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16 border-b border-white/10">
          <div className="col-span-2 md:col-span-2">
            <span className="text-xs text-white/40 block mb-5">الأقسام</span>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-xs text-white/40 block mb-5">تواصل</span>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@turkiomar.com"
                  dir="ltr"
                  className="text-white/70 hover:text-white text-sm transition-colors block text-right"
                >
                  info@turkiomar.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+966559793959"
                  dir="ltr"
                  className="text-white/70 hover:text-white text-sm transition-colors block text-right"
                >
                  +966 55 979 3959
                </a>
              </li>
              <li className="text-white/70 text-sm">
                الطائف، المملكة العربية السعودية
              </li>
            </ul>
          </div>

          <div>
            <span className="text-xs text-white/40 block mb-5">تابعنا</span>
            <div className="flex items-center gap-5" dir="ltr">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* الصف السفلي: حقوق النشر */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} مجموعة تركي عمر. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-6" dir="ltr">
            <a href="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">
              سياسة الخصوصية
            </a>
            <a href="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">
              الشروط والأحكام
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
