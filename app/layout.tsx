import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hi-Med Prepas | Best Preparation for National Competitive Entrance Exams",
  description:
    "Hi-Med Prepas prepares students across Cameroon for Medicine, Engineering, Nursing and Teaching concours. 10,000+ students since 2015 with an 80%+ pass rate.",
  keywords: ["concours Cameroon", "medicine entrance exam", "FMBS", "Polytechnic", "ENS", "prepa", "Hi-Med Prepas"],
  icons: { icon: "/hi-med-logo.png" },
  openGraph: {
    title: "Hi-Med Prepas",
    description: "The best preparation for national competitive entrance exams in Cameroon.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0056B3",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>{children}</body>
    </html>
  );
}
