"use client";

import { motion } from "framer-motion";
import { BookOpenCheck, Trophy, UsersRound, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

const FEATURES: { icon: LucideIcon; title: string; text: string; tint: string }[] = [
  {
    icon: UsersRound,
    title: "Dedicated Personnel",
    text: "Our team is made up of passionate educators and high-achieving former students who have successfully passed the concours.",
    tint: "bg-brand-50 text-brand group-hover:bg-brand group-hover:text-white",
  },
  {
    icon: BookOpenCheck,
    title: "Proven Curriculum",
    text: "Our structured weekly program combines intensive lectures, mock exams, and personalized mentorship.",
    tint: "bg-navy-50 text-navy group-hover:bg-navy group-hover:text-white",
  },
  {
    icon: Trophy,
    title: "Outstanding Results",
    text: "With an 80%+ pass rate across our programs, our students consistently beat the national average.",
    tint: "bg-accent-50 text-accent group-hover:bg-accent group-hover:text-white",
  },
];

export function Features() {
  return (
    <section id="why-us" className="section bg-white">
      <div className="container">
        <SectionHeading
          eyebrow="Why choose us"
          title={
            <>
              Why Choose <span className="whitespace-nowrap text-brand">Hi-Med</span>{" "}
              <span className="whitespace-nowrap text-brand">
                Prepas<span className="text-navy">?</span>
              </span>
            </>
          }
          description="For over a decade, we have turned ambitious students into successful candidates through expert teaching and relentless practice."
        />

        {/* 1 col → 2 cols (3rd card spans the row) → 3 cols */}
        <RevealGroup className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {FEATURES.map(({ icon: Icon, title, text, tint }, i) => (
            <RevealItem key={title} className={i === 2 ? "sm:col-span-2 lg:col-span-1" : undefined}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative h-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8 transition-shadow duration-300 hover:shadow-card-hover"
              >
                <span className="absolute right-6 top-4 text-7xl font-black text-slate-100 transition-colors group-hover:text-brand-50">
                  0{i + 1}
                </span>
                <div
                  className={`relative flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300 ${tint}`}
                >
                  <Icon className="h-7 w-7" strokeWidth={1.75} />
                </div>
                <h3 className="relative mt-6 text-xl font-bold">{title}</h3>
                <p className="relative mt-3 leading-relaxed text-slate-600">{text}</p>
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand to-accent transition-transform duration-500 group-hover:scale-x-100" />
              </motion.article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
