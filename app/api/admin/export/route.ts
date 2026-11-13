import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { listRegistrations } from "@/lib/db";
import { centerLabel, programLabel } from "@/lib/notify";

export const dynamic = "force-dynamic";

// Quote every cell; prefix formula-like values so Excel won't execute them.
const cell = (v: string | number) => {
  let s = String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await listRegistrations();
  const header = ["ID", "Date", "Name", "Phone", "Email", "Program", "Center", "Status", "Notes"];
  const lines = [
    header.map(cell).join(","),
    ...rows.map((r) =>
      [
        r.id,
        new Date(r.created_at).toISOString().slice(0, 16).replace("T", " "),
        r.name,
        r.phone,
        r.email,
        programLabel(r.program),
        centerLabel(r.center),
        r.status,
        r.notes,
      ]
        .map(cell)
        .join(",")
    ),
  ];

  const date = new Date().toISOString().slice(0, 10);
  // BOM so Excel opens accented names (e.g. Ngoa-Ekellé) correctly.
  return new NextResponse("﻿" + lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="hi-med-registrations-${date}.csv"`,
    },
  });
}
