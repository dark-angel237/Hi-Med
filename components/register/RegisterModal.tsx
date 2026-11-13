"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/ui/social-icons";
import { CENTERS, PROGRAMS, SITE, type ProgramId } from "@/lib/data";
import { cn } from "@/lib/utils";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  program: ProgramId | "";
  center: string;
  website: string; // honeypot — hidden from humans, filled by spam bots
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultProgram?: ProgramId;
};

// Accepts 6XX XXX XXX / 2XX XXX XXX, optionally prefixed with +237 or 237.
const CM_PHONE = /^(\+?237)?\s?[62](\s?\d){8}$/;

export function RegisterModal({ open, onOpenChange, defaultProgram }: Props) {
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { name: "", email: "", phone: "", program: "", center: "", website: "" },
  });

  // Reset whenever the modal opens, pre-selecting the program that triggered it.
  useEffect(() => {
    if (open) {
      setSubmitted(null);
      setServerError(null);
      reset({ name: "", email: "", phone: "", program: defaultProgram ?? "", center: "", website: "" });
    }
  }, [open, defaultProgram, reset]);

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/pre-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong.");
      }
      setSubmitted(data.name.trim().split(" ")[0]);
    } catch (err) {
      setServerError(
        err instanceof Error && err.message !== "Failed to fetch"
          ? err.message
          : "Network error. Check your connection and try again."
      );
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[60] bg-navy/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <div className="pointer-events-none fixed inset-0 z-[61] flex items-end justify-center sm:items-center sm:p-4">
            <Dialog.Content asChild forceMount aria-describedby="register-desc">
              <motion.div
                className="pointer-events-auto relative max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:max-w-lg sm:rounded-3xl sm:p-8"
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.98 }}
                transition={{ type: "spring", damping: 28, stiffness: 320 }}
              >
                <Dialog.Close
                  className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-navy"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </Dialog.Close>

                {submitted ? (
                  <SuccessState name={submitted} onClose={() => onOpenChange(false)} />
                ) : (
                  <>
                    <div className="mb-6 pr-8">
                      <span className="eyebrow">Pre-registration open</span>
                      <Dialog.Title className="mt-3 text-2xl font-extrabold text-navy">Secure your spot</Dialog.Title>
                      <Dialog.Description id="register-desc" className="mt-1.5 text-sm text-slate-600">
                        Fill in your details and our team will call you within 24 hours.
                      </Dialog.Description>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                      <Field label="Full name" error={errors.name?.message} htmlFor="name">
                        <input
                          id="name"
                          autoComplete="name"
                          placeholder="e.g. Brenda Nkeng"
                          className={cn("input", errors.name && "border-accent focus:ring-accent/20")}
                          {...register("name", {
                            required: "Please enter your full name",
                            minLength: { value: 3, message: "Name looks too short" },
                          })}
                        />
                      </Field>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Email" error={errors.email?.message} htmlFor="email">
                          <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            className={cn("input", errors.email && "border-accent focus:ring-accent/20")}
                            {...register("email", {
                              required: "Email is required",
                              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                            })}
                          />
                        </Field>
                        <Field label="Phone" error={errors.phone?.message} htmlFor="phone">
                          <input
                            id="phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder="6XX XXX XXX"
                            className={cn("input", errors.phone && "border-accent focus:ring-accent/20")}
                            {...register("phone", {
                              required: "Phone number is required",
                              pattern: { value: CM_PHONE, message: "Enter a valid Cameroon number" },
                            })}
                          />
                        </Field>
                      </div>

                      <Field label="Program of interest" error={errors.program?.message} htmlFor="program">
                        <select
                          id="program"
                          className={cn("input", errors.program && "border-accent focus:ring-accent/20")}
                          {...register("program", { required: "Choose a program" })}
                        >
                          <option value="">Select a program</option>
                          {PROGRAMS.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.title}
                            </option>
                          ))}
                        </select>
                      </Field>

                      <Field label="Center location" error={errors.center?.message} htmlFor="center">
                        <select
                          id="center"
                          className={cn("input", errors.center && "border-accent focus:ring-accent/20")}
                          {...register("center", { required: "Choose a center" })}
                        >
                          <option value="">Select a center</option>
                          {CENTERS.map((c) => (
                            <option key={c.name} value={c.name}>
                              {c.name} — {c.city}
                            </option>
                          ))}
                          <option value="online">Online classes</option>
                        </select>
                      </Field>

                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        className="absolute -left-[9999px] h-0 w-0 opacity-0"
                        {...register("website")}
                      />

                      {serverError && (
                        <p role="alert" className="rounded-xl bg-accent/10 px-4 py-3 text-sm font-medium text-accent">
                          {serverError}
                        </p>
                      )}

                      <Button type="submit" size="lg" className="mt-2 w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" /> Submitting…
                          </>
                        ) : (
                          "Submit Pre-Registration"
                        )}
                      </Button>
                      <p className="text-center text-xs text-slate-500">
                        We&apos;ll never share your details. Prefer to talk?{" "}
                        <a href={SITE.phoneHref} className="font-medium text-brand hover:underline">
                          Call {SITE.phone}
                        </a>
                      </p>
                    </form>
                  </>
                )}
              </motion.div>
            </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1 text-xs font-medium text-accent"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function SuccessState({ name, onClose }: { name: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center py-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.1, stiffness: 260, damping: 15 }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand"
      >
        <CheckCircle2 className="h-9 w-9" />
      </motion.div>
      <Dialog.Title className="mt-5 text-2xl font-extrabold text-navy">You&apos;re on the list, {name}!</Dialog.Title>
      <Dialog.Description id="register-desc" className="mt-2 max-w-sm text-sm text-slate-600">
        Our admissions team will contact you shortly to confirm your registration and share the program schedule.
      </Dialog.Description>
      <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
        <Button asChild variant="outline" className="flex-1">
          <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
            <WhatsappIcon className="h-4 w-4" /> Chat on WhatsApp
          </a>
        </Button>
        <Button onClick={onClose} className="flex-1">
          Done
        </Button>
      </div>
    </motion.div>
  );
}
