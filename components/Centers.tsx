"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, MonitorSmartphone } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { CENTERS } from "@/lib/data";

export function Centers() {
  const regionCount = new Set(CENTERS.map((c) => c.region)).size;

  return (
    <section id="centers" className="section bg-white">
      <div className="container">
        <SectionHeading
          eyebrow="Our centers nationwide"
          title={
            <>
              Serving students across <span className="text-brand">{regionCount} regions</span> in Cameroon
            </>
          }
          description="Find a Hi-Med Prepas center near you. Same curriculum, same expert tutors, same results — wherever you are."
        />

        {/* Data-driven grid: add entries to CENTERS in lib/data.ts and the layout adapts. */}
        <RevealGroup staggerBy={0.07} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CENTERS.map((c) => (
            <RevealItem key={c.name}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group flex h-full items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-[border-color,box-shadow] hover:border-brand/40 hover:shadow-card-hover"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <MapPin className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold">{c.name}</h3>
                    <span className="rounded-full bg-accent-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                      {c.region}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm font-semibold text-brand">{c.city}</p>
                  <p className="mt-1 text-sm text-slate-500">{c.address}</p>
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-10">
          <div className="relative overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-r from-brand-50 to-white p-6 sm:p-8">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand/10 blur-2xl" aria-hidden="true" />
            <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-card">
                  <MonitorSmartphone className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-lg font-bold">Can&apos;t find your area?</h3>
                  <p className="mt-1 text-slate-600">
                    Contact us — we may have a center near you or can arrange online classes.
                  </p>
                </div>
              </div>
              <Button asChild variant="primary" className="group w-full shrink-0 sm:w-auto">
                <a href="#contact">
                  Contact Us <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
