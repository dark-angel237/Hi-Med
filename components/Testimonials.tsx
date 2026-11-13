"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { TESTIMONIALS } from "@/lib/data";
import { cn } from "@/lib/utils";

const AVATAR_COLORS = ["bg-brand", "bg-navy", "bg-accent", "bg-brand-400"];

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function Testimonials() {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return;
    setActive(Math.round((el.scrollLeft / max) * (TESTIMONIALS.length - 1)));
  };

  const goTo = (i: number) => {
    const card = scroller.current?.children[i] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section id="testimonials" className="section overflow-hidden bg-surface">
      <div className="container">
        <SectionHeading
          eyebrow="Success stories"
          title="Hear From Our Admitted Students"
          description="Thousands of Hi-Med students now study in Cameroon's top faculties and professional schools."
        />

        {/* Swipeable carousel on phones, grid from tablet up */}
        <RevealGroup
          ref={scroller}
          onScroll={onScroll}
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
        >
          {TESTIMONIALS.map((t, i) => (
            <RevealItem key={t.name} className="w-[85%] shrink-0 snap-center sm:w-[55%] md:w-auto">
              <motion.figure
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative flex h-full flex-col rounded-3xl bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover sm:p-7"
              >
                <Quote className="absolute right-6 top-6 h-10 w-10 text-brand-50" fill="currentColor" aria-hidden="true" />
                <div className="flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4" fill="currentColor" />
                  ))}
                </div>
                <blockquote className="relative mt-4 flex-1 text-[15px] leading-relaxed text-ink">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
                  >
                    {initials(t.name)}
                  </span>
                  <div>
                    <p className="font-bold text-navy">{t.name}</p>
                    <p className="text-xs font-medium text-brand">{t.school}</p>
                  </div>
                </figcaption>
              </motion.figure>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Carousel position dots — phones only */}
        <div className="mt-6 flex justify-center gap-2 md:hidden">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              onClick={() => goTo(i)}
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={active === i}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                active === i ? "w-6 bg-brand" : "w-2 bg-slate-300 hover:bg-slate-400"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
