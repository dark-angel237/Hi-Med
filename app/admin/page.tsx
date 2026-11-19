import { LogOut } from "lucide-react";
import { RoadMapBackground } from "@/components/Hero";
import { requireAdmin } from "@/lib/auth";
import { CENTERS, PROGRAMS } from "@/lib/data";
import { listRegistrations } from "@/lib/db";
import { logout } from "./actions";
import { DashboardHero } from "./DashboardHero";
import { RegistrationsTable } from "./RegistrationsTable";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdmin();

  if (!process.env.DATABASE_URL) {
    return (
      <SetupNotice title="Database not connected">
        <code>DATABASE_URL</code> is empty. Paste your Neon connection string into <code>.env.local</code> (or the
        Vercel environment variables), then restart the server.
      </SetupNotice>
    );
  }

  let registrations;
  try {
    registrations = await listRegistrations();
  } catch (err) {
    console.error("Failed to load registrations", err);
    return (
      <SetupNotice title="Can't reach the database">
        The connection string in <code>DATABASE_URL</code> didn&apos;t work. Check that it was copied in full from
        Neon (it starts with <code>postgresql://</code>) and that the database is active.
      </SetupNotice>
    );
  }

  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const stats = {
    total: registrations.length,
    fresh: registrations.filter((r) => r.status === "new").length,
    week: registrations.filter((r) => new Date(r.created_at).getTime() > weekAgo).length,
    enrolled: registrations.filter((r) => r.status === "enrolled").length,
  };
  const byProgram = PROGRAMS.map((p) => ({
    id: p.id,
    title: p.title,
    count: registrations.filter((r) => r.program === p.id).length,
  }));

  return (
    <main className="pb-16">
      <DashboardHero stats={stats} byProgram={byProgram} />
      <div className="container">
        <RegistrationsTable
          registrations={registrations}
          programs={PROGRAMS.map((p) => ({ id: p.id, title: p.title }))}
          centers={[
            ...CENTERS.map((c) => ({ id: c.name, title: `${c.name} — ${c.city}` })),
            { id: "online", title: "Online classes" },
          ]}
        />
      </div>
    </main>
  );
}

function SetupNotice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden bg-navy p-4">
      <RoadMapBackground />
      <div className="relative z-10 w-full max-w-md rounded-3xl bg-white/95 p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.55)] ring-1 ring-white/40 backdrop-blur">
        <span className="eyebrow">Admin setup</span>
        <h1 className="mt-3 text-2xl font-extrabold text-navy">{title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 [&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1 [&_code]:text-navy">
          {children}
        </p>
        <form action={logout} className="mt-6">
          <button
            type="submit"
            className="inline-flex h-9 items-center gap-2 rounded-full border-2 border-navy/15 px-4 text-sm font-semibold text-navy transition hover:border-brand hover:text-brand"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </form>
      </div>
    </main>
  );
}
