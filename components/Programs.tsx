"use client";

import { motion } from "framer-motion";
import { Cpu, GraduationCap, HeartPulse, Stethoscope, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { useRegisterModal } from "@/components/register/RegisterModalProvider";
import { PROGRAMS, type ProgramId } from "@/lib/data";

const ICONS: Record<ProgramId, LucideIcon> = {
  medicine: Stethoscope,
  engineering: Cpu,
  nursing: HeartPulse,
  teaching: GraduationCap,
};

export function Programs() {
  const { openRegister } = useRegisterModal();

  return (
    <section id="programs" className="section bg-surface">
      <div className="container">
        <SectionHeading
          eyebrow="Our programs"
          title="Programs Built for Your Target School"
          description="Each track is tailored to the exact format, syllabus and difficulty of the concours you are aiming for."
        />

        <RevealGroup className="grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          {PROGRAMS.map((program) => {
            const Icon = ICONS[program.id];
            return (
              <RevealItem key={program.id}>
                <motion.article
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group flex h-full flex-col rounded-3xl border-2 border-transparent bg-white p-6 shadow-card sm:p-7 transition-[border-color,box-shadow] duration-300 hover:border-brand hover:shadow-card-hover"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand transition-all duration-300 group-hover:rotate-6 group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-7 w-7" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{program.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{program.description}</p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {program.schools.map((s) => (
                      <li
                        key={s}
                        className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-navy ring-1 ring-slate-200 transition-colors group-hover:bg-brand-50 group-hover:ring-brand-100"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => openRegister(program.id)}
                    className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-semibold text-brand transition-colors hover:text-accent"
                  >
                    Enroll in {program.title.split(" ")[0]}
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </button>
                </motion.article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
