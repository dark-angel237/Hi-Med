import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <main className="flex min-h-dvh items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl">
        <span className="eyebrow">Hi-Med Prepas</span>
        <h1 className="mt-3 text-2xl font-extrabold text-navy">Admin sign in</h1>
        <p className="mt-1.5 text-sm text-slate-600">View and manage pre-registrations.</p>
        <LoginForm />
      </div>
    </main>
  );
}
