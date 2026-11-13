"use client";

import { ArrowRight } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import type { ProgramId } from "@/lib/data";
import { useRegisterModal } from "./RegisterModalProvider";

type Props = ButtonProps & { program?: ProgramId; withArrow?: boolean };

export function PreRegisterButton({ program, withArrow, children = "Pre-Register Now", onClick, ...props }: Props) {
  const { openRegister } = useRegisterModal();
  return (
    <Button
      {...props}
      className={withArrow ? `group ${props.className ?? ""}` : props.className}
      onClick={(e) => {
        onClick?.(e);
        openRegister(program);
      }}
    >
      {children}
      {withArrow && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
    </Button>
  );
}
