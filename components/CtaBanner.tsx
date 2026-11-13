"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { PreRegisterButton } from "@/components/register/PreRegisterButton";
import { SITE } from "@/lib/data";

export function CtaBanner() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand-gradient px-6 py-14 text-center shadow-2xl sm:px-12 sm:py-20">
            <div aria-hidden="true" className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-grid-pattern [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
              <motion.div
                className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand-400/40 blur-3xl"
                animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-accent/25 blur-3xl"
                animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <h2 className="mx-auto max-w-3xl text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Ready to Start Your Journey?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">
              Pre-registration is open — secure your spot today.
            </p>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <PreRegisterButton variant="accent" size="lg" withArrow />
              <Button asChild variant="white" size="lg">
                <a href={SITE.phoneHref}>
                  <Phone className="h-4 w-4" /> Call {SITE.phone}
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
