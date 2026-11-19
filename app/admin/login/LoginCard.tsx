"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Logo } from "@/components/Logo";
import { LoginForm } from "./LoginForm";

export function LoginCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 w-full max-w-sm"
    >
      <div className="mb-6 flex justify-center">
        <Logo variant="light" />
      </div>

      <div className="rounded-3xl bg-white/95 p-7 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.55)] ring-1 ring-white/40 backdrop-blur sm:p-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Admin area
        </span>
        <h1 className="mt-4 flex items-center gap-2 text-2xl font-extrabold text-navy">
          <Lock className="h-5 w-5 text-brand" /> Sign in
        </h1>
        <p className="mt-1.5 text-sm text-slate-600">View and manage pre-registrations.</p>
        <LoginForm />
      </div>

      <p className="mt-6 text-center text-xs text-navy-100">
        <a href="/" className="hover:text-white hover:underline">
          ← Back to website
        </a>
      </p>
    </motion.div>
  );
}
