import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { FloatingCards, RoadMapBackground } from "@/components/Hero";
import { LoginCard } from "./LoginCard";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <main className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden bg-navy px-4 py-12">
      <RoadMapBackground />
      <FloatingCards />
      <LoginCard />
    </main>
  );
}
