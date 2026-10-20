import { ReactNode } from "react";

// نسخة محايدة مؤقتة: بدون أي تدخل بالسكرول (سكرول المتصفح الطبيعي)
// عشان نضمن الموقع ما يعلّق. نرجع للسموذ سكرول لما نتأكد من طريقة مضمونة أكثر.
export function LenisProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}