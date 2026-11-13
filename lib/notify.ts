import "server-only";
import { CENTERS, PROGRAMS, SITE } from "@/lib/data";

type NewRegistration = {
  id: number;
  name: string;
  email: string;
  phone: string;
  program: string;
  center: string;
};

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function programLabel(id: string) {
  return PROGRAMS.find((p) => p.id === id)?.title ?? id;
}

export function centerLabel(name: string) {
  if (name === "online") return "Online classes";
  const c = CENTERS.find((c) => c.name === name);
  return c ? `${c.name} — ${c.city}` : name;
}

/**
 * Emails the admissions team about a new pre-registration via Resend.
 * Returns false (never throws) so a mail outage can't lose a registration —
 * it is already saved in the database and visible in the dashboard.
 */
export async function sendRegistrationEmail(r: NewRegistration): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping notification email");
    return false;
  }

  const to = (process.env.NOTIFY_EMAIL ?? SITE.email).split(",").map((s) => s.trim());
  const from = process.env.NOTIFY_FROM ?? "Hi-Med Prepas <onboarding@resend.dev>";
  const siteUrl = (process.env.SITE_URL ?? "").replace(/\/$/, "");

  const rows: [string, string][] = [
    ["Name", r.name],
    ["Phone", r.phone],
    ["Email", r.email],
    ["Program", programLabel(r.program)],
    ["Center", centerLabel(r.center)],
  ];

  const html = `
  <div style="font-family:Arial,sans-serif;max-width:520px;color:#0A1C2E">
    <h2 style="color:#0056B3;margin:0 0 12px">New pre-registration #${r.id}</h2>
    <table style="border-collapse:collapse;width:100%">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:8px 12px;border:1px solid #D3E5F9;background:#EBF3FC;font-weight:bold;width:110px">${k}</td><td style="padding:8px 12px;border:1px solid #D3E5F9">${esc(v)}</td></tr>`
        )
        .join("")}
    </table>
    ${
      siteUrl
        ? `<p style="margin-top:20px"><a href="${siteUrl}/admin" style="background:#0056B3;color:#fff;padding:10px 18px;border-radius:999px;text-decoration:none;font-weight:bold">Open admin dashboard</a></p>`
        : ""
    }
  </div>`;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + (siteUrl ? `\n\nDashboard: ${siteUrl}/admin` : "");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        reply_to: r.email,
        subject: `New pre-registration: ${r.name} — ${programLabel(r.program)}`,
        html,
        text,
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to send notification email", err);
    return false;
  }
}
