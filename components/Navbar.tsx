"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { PreRegisterButton } from "@/components/register/PreRegisterButton";
import { NAV_LINKS, SITE } from "@/lib/data";
import { cn } from "@/lib/utils";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  // At the top of the page the navbar sits on the dark-blue hero → use light styling.
  const onDark = !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/40 bg-white/70 shadow-[0_4px_24px_-8px_rgba(10,28,46,0.12)] backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav className="container flex h-16 items-center justify-between sm:h-20" aria-label="Main">
        <Logo variant={onDark ? "light" : "dark"} />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    onDark
                      ? isActive
                        ? "text-white"
                        : "text-white/75 hover:text-white"
                      : isActive
                        ? "text-brand"
                        : "text-navy/80 hover:text-brand"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className={cn("absolute inset-0 -z-10 rounded-full", onDark ? "bg-white/15" : "bg-brand-50")}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <PreRegisterButton
            size="sm"
            className={cn(
              "hidden sm:inline-flex sm:h-10 sm:px-5",
              onDark && "bg-white text-brand shadow-none hover:bg-accent hover:text-white"
            )}
          />
          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger
              className={cn(
                "rounded-full p-2.5 transition lg:hidden",
                onDark ? "text-white hover:bg-white/10" : "text-navy hover:bg-navy/5"
              )}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </Dialog.Trigger>
            <AnimatePresence>
              {menuOpen && (
                <Dialog.Portal forceMount>
                  <Dialog.Overlay asChild forceMount>
                    <motion.div
                      className="fixed inset-0 z-[55] bg-navy/60 backdrop-blur-sm lg:hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  </Dialog.Overlay>
                  <Dialog.Content asChild forceMount aria-describedby={undefined}>
                    <motion.div
                      className="fixed inset-y-0 right-0 z-[56] flex w-[85%] max-w-sm flex-col bg-white shadow-2xl lg:hidden"
                      initial={{ x: "100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "100%" }}
                      transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    >
                      <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
                        <Dialog.Title className="sr-only">Navigation</Dialog.Title>
                        <Logo onClick={() => setMenuOpen(false)} />
                        <Dialog.Close className="rounded-full p-2 text-navy hover:bg-navy/5" aria-label="Close menu">
                          <X className="h-6 w-6" />
                        </Dialog.Close>
                      </div>

                      <motion.ul
                        className="flex-1 space-y-1 overflow-y-auto px-3 py-6"
                        initial="hidden"
                        animate="show"
                        variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
                      >
                        {NAV_LINKS.map((link) => (
                          <motion.li
                            key={link.href}
                            variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }}
                          >
                            <a
                              href={link.href}
                              onClick={() => setMenuOpen(false)}
                              className={cn(
                                "flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-semibold transition",
                                active === link.href.slice(1)
                                  ? "bg-brand-50 text-brand"
                                  : "text-navy hover:bg-surface"
                              )}
                            >
                              {link.label}
                            </a>
                          </motion.li>
                        ))}
                      </motion.ul>

                      <div className="space-y-4 border-t border-slate-100 p-5">
                        <div className="space-y-2 text-sm text-slate-600">
                          <a href={SITE.phoneHref} className="flex items-center gap-2 hover:text-brand">
                            <Phone className="h-4 w-4 text-brand" /> {SITE.phone}
                          </a>
                          <p className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-brand" /> {SITE.hours}
                          </p>
                        </div>
                        <PreRegisterButton size="lg" withArrow className="w-full" onClick={() => setMenuOpen(false)} />
                      </div>
                    </motion.div>
                  </Dialog.Content>
                </Dialog.Portal>
              )}
            </AnimatePresence>
          </Dialog.Root>
        </div>
      </nav>
    </motion.header>
  );
}
