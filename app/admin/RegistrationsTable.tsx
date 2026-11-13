"use client";

import { useMemo, useState, useTransition } from "react";
import { Loader2, Mail, Phone, Search, Trash2 } from "lucide-react";
import type { Registration } from "@/lib/db";
import { cn } from "@/lib/utils";
import { removeRegistration, saveRegistration } from "./actions";

type Option = { id: string; title: string };

const STATUS_STYLES: Record<string, string> = {
  new: "bg-brand-50 text-brand ring-brand/20",
  contacted: "bg-amber-50 text-amber-700 ring-amber-600/20",
  enrolled: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  cancelled: "bg-slate-100 text-slate-500 ring-slate-400/20",
};
const STATUSES = Object.keys(STATUS_STYLES);

const fmtDate = (d: string) =>
  new Date(d).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

const whatsapp = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits.startsWith("237") ? digits : `237${digits}`}`;
};

export function RegistrationsTable({
  registrations,
  programs,
  centers,
}: {
  registrations: Registration[];
  programs: Option[];
  centers: Option[];
}) {
  const [q, setQ] = useState("");
  const [program, setProgram] = useState("");
  const [center, setCenter] = useState("");
  const [status, setStatus] = useState("");

  const label = (opts: Option[], id: string) => opts.find((o) => o.id === id)?.title ?? id;

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return registrations.filter(
      (r) =>
        (!program || r.program === program) &&
        (!center || r.center === center) &&
        (!status || r.status === status) &&
        (!term || [r.name, r.email, r.phone].some((v) => v.toLowerCase().includes(term)))
    );
  }, [registrations, q, program, center, status]);

  return (
    <section className="mt-6 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="grid gap-3 border-b border-slate-200 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, phone, email"
            className="input pl-9"
          />
        </div>
        <Select value={program} onChange={setProgram} all="All programs" options={programs} />
        <Select value={center} onChange={setCenter} all="All centers" options={centers} />
        <Select
          value={status}
          onChange={setStatus}
          all="All statuses"
          options={STATUSES.map((s) => ({ id: s, title: s[0].toUpperCase() + s.slice(1) }))}
        />
      </div>

      <p className="px-4 pt-3 text-xs text-slate-500">
        Showing {filtered.length} of {registrations.length}
      </p>

      {filtered.length === 0 ? (
        <p className="p-10 text-center text-sm text-slate-500">
          {registrations.length === 0 ? "No pre-registrations yet." : "No registrations match these filters."}
        </p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {filtered.map((r) => (
            <Row
              key={r.id}
              r={r}
              programTitle={label(programs, r.program)}
              centerTitle={label(centers, r.center)}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

function Select({
  value,
  onChange,
  all,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  all: string;
  options: Option[];
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="input">
      <option value="">{all}</option>
      {options.map((o) => (
        <option key={o.id} value={o.id}>
          {o.title}
        </option>
      ))}
    </select>
  );
}

function Row({ r, programTitle, centerTitle }: { r: Registration; programTitle: string; centerTitle: string }) {
  const [status, setStatus] = useState(r.status);
  const [notes, setNotes] = useState(r.notes);
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  const [error, setError] = useState("");

  const save = (nextStatus: string, nextNotes: string) =>
    start(async () => {
      setError("");
      try {
        await saveRegistration(r.id, nextStatus, nextNotes);
      } catch {
        setError("Couldn't save — try again");
      }
    });

  const del = () => {
    if (!confirm(`Delete the registration for ${r.name}? This can't be undone.`)) return;
    start(async () => {
      try {
        await removeRegistration(r.id);
      } catch {
        setError("Couldn't delete — try again");
      }
    });
  };

  return (
    <li className={cn("p-4 transition", pending && "opacity-60")}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold text-navy">{r.name}</p>
            <span className="text-xs text-slate-400">#{r.id} · {fmtDate(r.created_at)}</span>
          </div>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
            <a href={`tel:${r.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1 hover:text-brand">
              <Phone className="h-3.5 w-3.5" /> {r.phone}
            </a>
            <a href={whatsapp(r.phone)} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
              WhatsApp
            </a>
            <a href={`mailto:${r.email}`} className="inline-flex min-w-0 items-center gap-1 break-all hover:text-brand">
              <Mail className="h-3.5 w-3.5 shrink-0" /> {r.email}
            </a>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            <span className="font-medium text-navy">{programTitle}</span> · {centerTitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={status}
            disabled={pending}
            onChange={(e) => {
              const s = e.target.value as Registration["status"];
              setStatus(s);
              save(s, notes);
            }}
            className={cn("rounded-full px-3 py-1.5 text-xs font-semibold capitalize ring-1 ring-inset", STATUS_STYLES[status])}
            aria-label="Status"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-full px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100"
          >
            {notes ? "Notes •" : "Notes"}
          </button>
          <button
            onClick={del}
            disabled={pending}
            className="rounded-full p-2 text-slate-400 hover:bg-accent/10 hover:text-accent"
            aria-label={`Delete ${r.name}`}
          >
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="e.g. Called on Monday, will come to Bamenda center to pay"
            className="input min-h-[2.75rem] flex-1"
          />
          <button
            onClick={() => save(status, notes)}
            disabled={pending}
            className="self-start rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600 disabled:opacity-60"
          >
            Save notes
          </button>
        </div>
      )}
      {error && <p className="mt-2 text-xs font-medium text-accent">{error}</p>}
    </li>
  );
}
