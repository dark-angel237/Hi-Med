"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = { className?: string; variant?: "dark" | "light"; onClick?: () => void };

/**
 * Logo badge (/public/hi-med-logo.png) + "Hi-Med Prepas" wordmark.
 * If the image is missing, only the wordmark is shown.
 */
export function Logo({ className, variant = "dark", onClick }: Props) {
  const [failed, setFailed] = useState(false);
  const onDark = variant === "light";

  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Hi-Med Prepas — home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      {!failed && (
        <span className="shrink-0 overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-slate-200 transition-transform duration-300 group-hover:scale-105">
          <Image
            src="/hi-med-logo.png"
            alt=""
            width={264}
            height={251}
            priority
            className="h-10 w-10 object-contain sm:h-12 sm:w-12"
            onError={() => setFailed(true)}
            ref={(img) => {
              // Catches a 404 that happened before hydration attached onError.
              if (img?.complete && img.naturalWidth === 0) setFailed(true);
            }}
          />
        </span>
      )}

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "bg-clip-text pb-0.5 text-xl font-extrabold tracking-tight text-transparent sm:text-2xl"
          )}
          style={{
            // Sampled from the logo's "Hi-Med" lettering. On dark backgrounds the
            // navy end would vanish, so use a lighter blend there.
            backgroundImage: onDark
              ? "linear-gradient(90deg, #FFFFFF 0%, #A6CBF2 100%)"
              : "linear-gradient(90deg, #2171B9 0%, #0D4D8B 50%, #0A1C2E 100%)",
            WebkitBackgroundClip: "text",
          }}
        >
          Hi-Med
        </span>
        <span
          className={cn(
            "mt-0.5 text-[10px] font-bold uppercase tracking-[0.28em] sm:text-[11px]",
            onDark ? "text-brand-200" : "text-navy"
          )}
        >
          Prepas
        </span>
      </span>
    </Link>
  );
}
