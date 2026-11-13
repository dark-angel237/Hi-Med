import { Download, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/auth";
import { CENTERS, PROGRAMS } from "@/lib/data";
import { listRegistrations } from "@/lib/db";
import { logout } from "./actions";
import { RegistrationsTable } from "./RegistrationsTable";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdmin();
  const registrations = await listRegistrations();

  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const stats = [
    { label: "Total", value: registrations.length },
    { label: "New (not contacted)", value: registrations.filter((r) => r.status === "new").length },
    { label: "Last 7 days", value: registrations.filter((r) => new Date(r.created_at).getTime() > weekAgo).length },
    { label: "Enrolled", value: registrations.filter((r) => r.status === "enrolled").length },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="eyebrow">Hi-Med Prepas</span>
          <h1 className="mt-2 text-2xl font-extrabold text-navy sm:text-3xl">Pre-registrations</h1>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <a href="/api/admin/export">
              <Download className="h-4 w-4" /> Export CSV
            </a>
          </Button>
          <form action={logout}>
            <Button type="submit" variant="ghost" size="sm">
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </form>
        </div>
      </header>

      <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <p className="text-xs font-medium text-slate-500">{s.label}</p>
            <p className="mt-1 text-2xl font-extrabold text-navy">{s.value}</p>
          </div>
        ))}
      </section>

      <RegistrationsTable
        registrations={registrations}
        programs={PROGRAMS.map((p) => ({ id: p.id, title: p.title }))}
        centers={[...CENTERS.map((c) => ({ id: c.name, title: `${c.name} — ${c.city}` })), { id: "online", title: "Online classes" }]}
      />
    </main>
  );
}
