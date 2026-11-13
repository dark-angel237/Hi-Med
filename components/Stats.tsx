"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

function Counter({ to, suffix = "", duration = 2.2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

const SECONDARY = [
  { to: 80, suffix: "%+", label: "Average pass rate" },
  { to: 5, suffix: "", label: "Regions served" },
  { to: new Date().getFullYear() - 2015, suffix: "+", label: "Years of excellence" },
];

export function Stats() {
  return (
    <section className="relative isolate overflow-hidden bg-navy py-20 text-white sm:py-24">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/30 blur-[120px]" />
      </div>

      <div className="container text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white">
            Since 2015
          </span>
          <p className="mt-6 bg-gradient-to-b from-white to-brand-200 bg-clip-text text-6xl font-black tracking-tight text-transparent sm:text-7xl lg:text-8xl">
            <Counter to={10000} suffix="+" />
          </p>
          <p className="mx-auto mt-4 max-w-xl text-lg text-navy-100 sm:text-xl">
            Students Passed Through Hi-Med Since 2015
          </p>
        </Reveal>

        <RevealGroup className="mx-auto mt-14 grid max-w-3xl grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] py-6 backdrop-blur">
          {SECONDARY.map((s) => (
            <RevealItem key={s.label} className="px-2 sm:px-6">
              <motion.p className="text-2xl font-extrabold text-white sm:text-4xl">
                <Counter to={s.to} suffix={s.suffix} duration={1.8} />
              </motion.p>
              <p className="mt-1 text-xs text-navy-100 sm:text-sm">{s.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
