import { NextResponse } from "next/server";
import { CENTERS, PROGRAMS } from "@/lib/data";
import { insertRegistration } from "@/lib/db";
import { sendRegistrationEmail } from "@/lib/notify";

const CM_PHONE = /^(\+?237)?\s?[62](\s?\d){8}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CENTER_NAMES = new Set<string>([...CENTERS.map((c) => c.name), "online"]);
const PROGRAM_IDS = new Set<string>(PROGRAMS.map((p) => p.id));

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field; bots usually do.
  if (str(body.website, 200)) return NextResponse.json({ ok: true });

  const data = {
    name: str(body.name, 120),
    email: str(body.email, 200).toLowerCase(),
    phone: str(body.phone, 30),
    program: str(body.program, 40),
    center: str(body.center, 120),
  };

  if (
    data.name.length < 3 ||
    !EMAIL.test(data.email) ||
    !CM_PHONE.test(data.phone) ||
    !PROGRAM_IDS.has(data.program) ||
    !CENTER_NAMES.has(data.center)
  ) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 422 });
  }

  let saved;
  try {
    saved = await insertRegistration(data);
  } catch (err) {
    console.error("Failed to save registration", err);
    return NextResponse.json(
      { error: "We couldn't save your registration. Please try again or call us." },
      { status: 500 }
    );
  }

  await sendRegistrationEmail({ id: saved.id, ...data });

  return NextResponse.json({ ok: true });
}
