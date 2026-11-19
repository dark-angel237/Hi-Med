"use client";

import { motion } from "framer-motion";
import { BellRing, CalendarDays, Download, GraduationCap, LogOut, Users } from "lucide-react";
import { Logo } from "@/components/Logo";
import { RoadMapBackground } from "@/components/Hero";
import { fadeUp, stagger } from "@/components/ui/reveal";
import { logout } from "./actions";

type Stats = { total: number; fresh: number; week: number; enrolled: number };
type ProgramCount = { id: string; title: string; count: number };

const BAR_COLORS = ["bg-brand", "bg-accent", "bg-brand-300", "bg-navy-700"];

export function DashboardHero({ stats, byProgram }: { stats: Stats; byProgram: ProgramCount[] }) {
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const cards = [
    { label: "Total registrations", value: stats.total, icon: Users, tint: "bg-brand-50 text-brand" },
    { label: "New — not contacted", value: stats.fresh, icon: BellRing, tint: "bg-accent-50 text-accent", pulse: stats.fresh > 0 },
    { label: "Last 7 days", value: stats.week, icon: CalendarDays, tint: "bg-brand-50 text-brand" },
    { label: "Enrolled", value: stats.enrolled, icon: GraduationCap, tint: "bg-emerald-50 text-emerald-600" },
  ];
  const maxCount = Math.max(1, ...byProgram.map((p) => p.count));

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy pb-32 pt-5 sm:pb-36">
        <RoadMapBackground />

        <div className="container relative z-10">
          <nav className="flex items-center justify-between gap-3">
            <Logo variant="light" />
            <div className="flex items-center gap-2">
              <a
                href="/api/admin/export"
                className="inline-flex h-9 items-center gap-2 rounded-full border-2 border-white/25 bg-white/5 px-4 text-sm font-semibold text-white backdrop-blur transition hover:border-white hover:bg-white/10"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export CSV</span>
              </a>
              <form action={logout}>
                <button
                  type="submit"
                  className="inline-flex h-9 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-navy shadow-lg transition hover:bg-accent hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign out</span>
                </button>
              </form>
            </div>
          </nav>

          <motion.div initial="hidden" animate="show" variants={stagger(0.12, 0.2)} className="mt-12 text-center sm:mt-16">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Admin dashboard
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-5xl"
            >
              Pre-
              <span className="relative whitespace-nowrap bg-gradient-to-r from-brand-200 to-white bg-clip-text text-transparent">
                registrations
                <svg viewBox="0 0 220 12" className="absolute -bottom-1 left-0 h-3 w-full text-accent" preserveAspectRatio="none" aria-hidden="true">
                  <motion.path
                    d="M2 9 C 60 2, 150 2, 218 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, delay: 0.8, ease: "easeInOut" }}
                  />
                </svg>
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-sm text-navy-100 sm:text-base">
              {today}
            </motion.p>
          </motion.div>
        </div>

        {/* Curved transition into the page body, same as the homepage hero */}
        <svg className="absolute inset-x-0 -bottom-px z-10 h-10 w-full text-slate-50 sm:h-16" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 80 C 360 0, 1080 0, 1440 80 Z" fill="currentColor" />
        </svg>
      </section>

      {/* Stat cards float over the curve, like the hero's floating cards */}
      <div className="container relative z-20 -mt-24 sm:-mt-28">
        <motion.ul initial="hidden" animate="show" variants={stagger(0.1, 0.5)} className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {cards.map((c, i) => (
            <motion.li key={c.label} variants={fadeUp}>
              <div
                className="flex h-full animate-float items-center gap-3 rounded-2xl bg-white/95 p-4 shadow-[0_20px_40px_-12px_rgba(10,28,46,0.35)] ring-1 ring-white/60 backdrop-blur sm:p-5"
                style={{ animationDelay: `${i * 0.8}s`, animationDuration: "8s" }}
              >
                <span className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${c.tint}`}>
                  <c.icon className="h-5 w-5" />
                  {c.pulse && <span className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-accent ring-2 ring-white" />}
                </span>
                <div className="min-w-0">
                  <p className="text-2xl font-extrabold leading-tight text-navy sm:text-3xl">{c.value}</p>
                  <p className="truncate text-xs text-slate-500">{c.label}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {stats.total > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
          >
            <p className="text-sm font-bold text-navy">By program</p>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {byProgram.map((p, i) => (
                <li key={p.id}>
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="font-medium text-slate-600">{p.title}</span>
                    <span className="font-bold text-navy">{p.count}</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      className={`h-full rounded-full ${BAR_COLORS[i % BAR_COLORS.length]}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(p.count / maxCount) * 100}%` }}
                      transition={{ delay: 1.1 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </>
  );
}
