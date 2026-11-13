import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Hi-Med Prepas",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh bg-slate-50">{children}</div>;
}
