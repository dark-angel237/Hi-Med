"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, createSession, destroySession, requireAdmin } from "@/lib/auth";
import { STATUSES, deleteRegistration, updateRegistration, type Status } from "@/lib/db";

export async function login(_prev: { error?: string } | undefined, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    // Slow down password guessing.
    await new Promise((r) => setTimeout(r, 800));
    return { error: "Incorrect password" };
  }
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

export async function saveRegistration(id: number, status: string, notes: string) {
  await requireAdmin();
  if (!STATUSES.includes(status as Status)) throw new Error("Invalid status");
  await updateRegistration(id, status as Status, notes.slice(0, 2000));
  revalidatePath("/admin");
}

export async function removeRegistration(id: number) {
  await requireAdmin();
  await deleteRegistration(id);
  revalidatePath("/admin");
}
