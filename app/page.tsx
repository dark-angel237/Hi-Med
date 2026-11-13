import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Stats } from "@/components/Stats";
import { Programs } from "@/components/Programs";
import { Centers } from "@/components/Centers";
import { Testimonials } from "@/components/Testimonials";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";
import { RegisterModalProvider } from "@/components/register/RegisterModalProvider";

export default function HomePage() {
  return (
    <RegisterModalProvider>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Stats />
        <Programs />
        <Centers />
        <Testimonials />
        <CtaBanner />
      </main>
      <Footer />
    </RegisterModalProvider>
  );
}
