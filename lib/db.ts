import "server-only";
import { neon } from "@neondatabase/serverless";

export const STATUSES = ["new", "contacted", "enrolled", "cancelled"] as const;
export type Status = (typeof STATUSES)[number];

export type Registration = {
  id: number;
  name: string;
  email: string;
  phone: string;
  program: string;
  center: string;
  status: Status;
  notes: string;
  created_at: string;
};

function sql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}

// Creates the table on first use, so no separate migration step is needed.
let schemaReady: Promise<unknown> | null = null;
function ensureSchema() {
  schemaReady ??= sql()`
    CREATE TABLE IF NOT EXISTS registrations (
      id         SERIAL PRIMARY KEY,
      name       TEXT NOT NULL,
      email      TEXT NOT NULL,
      phone      TEXT NOT NULL,
      program    TEXT NOT NULL,
      center     TEXT NOT NULL,
      status     TEXT NOT NULL DEFAULT 'new',
      notes      TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`.catch((err) => {
    schemaReady = null;
    throw err;
  });
  return schemaReady;
}

export async function insertRegistration(r: Pick<Registration, "name" | "email" | "phone" | "program" | "center">) {
  await ensureSchema();
  const rows = await sql()`
    INSERT INTO registrations (name, email, phone, program, center)
    VALUES (${r.name}, ${r.email}, ${r.phone}, ${r.program}, ${r.center})
    RETURNING id, created_at`;
  return rows[0] as { id: number; created_at: string };
}

export async function listRegistrations(): Promise<Registration[]> {
  await ensureSchema();
  const rows = await sql()`SELECT * FROM registrations ORDER BY created_at DESC`;
  return rows as Registration[];
}

export async function updateRegistration(id: number, status: Status, notes: string) {
  await ensureSchema();
  await sql()`UPDATE registrations SET status = ${status}, notes = ${notes} WHERE id = ${id}`;
}

export async function deleteRegistration(id: number) {
  await ensureSchema();
  await sql()`DELETE FROM registrations WHERE id = ${id}`;
}
