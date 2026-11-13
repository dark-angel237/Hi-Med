"use client";

import { motion } from "framer-motion";
import { Award, BookOpen, ChevronDown, MapPin, Stethoscope, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PreRegisterButton } from "@/components/register/PreRegisterButton";
import { fadeUp, stagger } from "@/components/ui/reveal";

const DISCIPLINES = ["Medicine", "Engineering", "Nursing", "Teaching", "& More"];

// The road winds from bottom-left to top-right across the whole hero.
// Coordinates are in the SVG's 1440×900 viewBox (scaled with "slice" to cover).
// Milestones sit on segment endpoints, placed out to the sides so they never cover the headline.
const ROAD =
  "M -80 980 C 60 880, 160 780, 250 720 S 420 600, 600 590 S 900 600, 1040 430 S 1150 180, 1270 130 S 1460 20, 1540 -60";
const MILESTONES = [
  { x: 250, y: 720, delay: 1.4 },
  { x: 1270, y: 130, delay: 2.0 },
];

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy pb-24 pt-28 sm:pb-28 sm:pt-32 md:min-h-[760px] lg:min-h-[100svh]">
      <RoadMapBackground />
      <FloatingCards />

      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger(0.12, 0.3)}
        className="container relative z-10 text-center"
      >
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="hidden min-[380px]:inline">2026/2027 pre-registration is open</span>
          <span className="min-[380px]:hidden">Pre-registration open</span>
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="mx-auto mt-6 max-w-4xl text-[2rem] font-extrabold leading-[1.1] text-white [text-wrap:balance] min-[380px]:text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
        >
          The Best Preparation for{" "}
          <span className="relative whitespace-nowrap bg-gradient-to-r from-brand-200 to-white bg-clip-text text-transparent">
            National
            <svg
              viewBox="0 0 220 12"
              className="absolute -bottom-1 left-0 h-3 w-full text-accent"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.path
                d="M2 9 C 60 2, 150 2, 218 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: 1.1, ease: "easeInOut" }}
              />
            </svg>
          </span>{" "}
          Competitive Entrance Exams
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-base text-navy-100 sm:text-lg"
        >
          <span className="font-semibold text-white">
            {DISCIPLINES.slice(0, -1).join(" · ")} {DISCIPLINES.at(-1)}.
          </span>{" "}
          We equip students across Cameroon with the tools to succeed.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mx-auto mt-9 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center"
        >
          <PreRegisterButton
            size="lg"
            withArrow
            className="bg-white text-brand shadow-[0_8px_30px_-6px_rgba(255,255,255,0.35)] hover:bg-accent hover:text-white"
          />
          <Button
            asChild
            size="lg"
            className="border-2 border-white/25 bg-white/5 text-white shadow-none backdrop-blur hover:border-white hover:bg-white/10"
          >
            <a href="#programs">Explore Programs</a>
          </Button>
        </motion.div>

        {/* Compact stats — replaces the floating cards on smaller screens */}
        <motion.ul
          variants={fadeUp}
          className="mx-auto mt-10 grid max-w-md grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/5 py-3 backdrop-blur-md xl:hidden"
        >
          {[
            { v: "80%+", l: "Pass rate" },
            { v: "10k+", l: "Students" },
            { v: "2015", l: "Since" },
          ].map((s) => (
            <li key={s.l} className="px-2">
              <p className="text-lg font-extrabold text-white sm:text-xl">{s.v}</p>
              <p className="text-[11px] text-navy-100 sm:text-xs">{s.l}</p>
            </li>
          ))}
        </motion.ul>

        <motion.div variants={fadeUp} className="mt-10 hidden items-center justify-center gap-4 xl:flex">
          <div className="flex -space-x-2.5">
            {["BN", "KT", "GA", "SF"].map((i, idx) => (
              <span
                key={i}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-navy text-[11px] font-bold text-white"
                style={{ background: ["#0056B3", "#3381D6", "#C1121F", "#13314F"][idx] }}
              >
                {i}
              </span>
            ))}
          </div>
          <p className="text-left text-sm text-navy-100">
            <span className="block font-bold text-white">10,000+ students</span>
            trained since 2015
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#why-us"
        aria-label="Scroll to next section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 2 }, y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute bottom-14 left-1/2 z-10 hidden -translate-x-1/2 rounded-full border border-white/20 p-2 text-white/70 transition-colors hover:text-white md:block"
      >
        <ChevronDown className="h-5 w-5" />
      </motion.a>

      {/* Curved transition into the next (white) section */}
      <svg
        className="absolute inset-x-0 -bottom-px z-10 h-10 w-full text-white sm:h-16"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 80 C 360 0, 1080 0, 1440 80 Z" fill="currentColor" />
      </svg>
    </section>
  );
}

function RoadMapBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {/* Base gradient: brand blue → deep navy (same as the old panel) */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#0056B3_0%,#0A3A75_45%,#0A1C2E_100%)]" />
      {/* Map grid */}
      <div className="absolute inset-0 bg-grid-pattern [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" />
      {/* Glows */}
      <div className="absolute -left-40 top-1/4 h-[28rem] w-[28rem] rounded-full bg-brand-400/30 blur-[120px]" />
      <div className="absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-accent/20 blur-[120px]" />
      <div className="absolute -left-24 -top-24 h-96 w-96 animate-spin-slow rounded-full border-[40px] border-white/[0.04]" />

      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          {/* Reveal mask lets the dashed centre line keep its dashes while "drawing" in */}
          <mask id="road-reveal">
            <motion.path
              d={ROAD}
              fill="none"
              stroke="white"
              strokeWidth="160"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, delay: 0.3, ease: "easeInOut" }}
            />
          </mask>
        </defs>

        {/* Faint contour lines, like a topographic map */}
        <g fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="1.5">
          <path d="M -20 220 C 300 140, 520 300, 820 220 S 1300 120, 1460 200" />
          <path d="M -20 280 C 320 200, 540 360, 840 280 S 1300 180, 1460 260" />
          <path d="M -20 760 C 260 700, 600 820, 900 740 S 1280 660, 1460 720" />
          <path d="M -20 820 C 280 760, 620 880, 920 800 S 1300 720, 1460 780" />
        </g>

        <g mask="url(#road-reveal)">
          {/* Road edges + surface */}
          <path d={ROAD} fill="none" stroke="white" strokeOpacity="0.14" strokeWidth="104" strokeLinecap="round" />
          <path d={ROAD} fill="none" stroke="#0A2A50" strokeOpacity="0.55" strokeWidth="96" strokeLinecap="round" />
          {/* Dashed centre line, slowly travelling */}
          <path
            d={ROAD}
            fill="none"
            stroke="white"
            strokeOpacity="0.55"
            strokeWidth="4"
            strokeDasharray="22 22"
            strokeLinecap="round"
            className="animate-road-dash"
          />
        </g>

        {/* Milestones along the road */}
        {MILESTONES.map((m) => (
          <motion.g
            key={m.x}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: m.delay, type: "spring", stiffness: 200, damping: 12 }}
          >
            <circle
              cx={m.x}
              cy={m.y}
              r="22"
              fill="#C1121F"
              fillOpacity="0.35"
              className="animate-ping-slow [transform-box:fill-box] [transform-origin:center]"
            />
            <circle cx={m.x} cy={m.y} r="9" fill="white" />
            <circle cx={m.x} cy={m.y} r="5" fill="#C1121F" />
          </motion.g>
        ))}
      </svg>

      {/* Darken the centre slightly so the headline always reads well */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,28,46,0.45)_0%,transparent_65%)]" />
    </div>
  );
}

const CARDS = [
  {
    pos: "left-[4%] top-[24%] 2xl:left-[8%]",
    delay: 1.2,
    float: "0s",
    icon: <TrendingUp className="h-5 w-5" />,
    iconBg: "bg-brand-50 text-brand",
    title: "80%+",
    sub: "Pass rate",
  },
  {
    pos: "right-[4%] top-[22%] 2xl:right-[8%]",
    delay: 1.4,
    float: "1.5s",
    icon: <Award className="h-5 w-5" />,
    iconBg: "bg-accent-50 text-accent",
    title: "Since 2015",
    sub: "Trusted results",
  },
  {
    pos: "left-[6%] bottom-[22%] 2xl:left-[10%]",
    delay: 1.6,
    float: "3s",
    icon: (
      <span className="flex -space-x-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white ring-2 ring-white">
          <Stethoscope className="h-4 w-4" />
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-white ring-2 ring-white">
          <BookOpen className="h-4 w-4" />
        </span>
      </span>
    ),
    iconBg: "",
    title: "Weekly mock exams",
    sub: "Real concours format",
  },
  {
    pos: "right-[5%] bottom-[24%] 2xl:right-[9%]",
    delay: 1.8,
    float: "2.2s",
    icon: <MapPin className="h-5 w-5" />,
    iconBg: "bg-brand-50 text-brand",
    title: "5 regions",
    sub: "Centers nationwide",
  },
];

function FloatingCards() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden xl:block">
      {CARDS.map((c) => (
        <motion.div
          key={c.title}
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: c.delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute ${c.pos}`}
        >
          <div
            className="flex animate-float items-center gap-3 rounded-2xl bg-white/95 p-3 pr-5 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.45)] ring-1 ring-white/40 backdrop-blur"
            style={{ animationDelay: c.float }}
          >
            {c.iconBg ? (
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.iconBg}`}>{c.icon}</span>
            ) : (
              c.icon
            )}
            <div className="text-left">
              <p className="text-base font-extrabold leading-tight text-navy">{c.title}</p>
              <p className="text-xs text-slate-500">{c.sub}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

