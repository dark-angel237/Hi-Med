"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { ProgramId } from "@/lib/data";
import { RegisterModal } from "./RegisterModal";

type Ctx = { openRegister: (program?: ProgramId) => void };

const RegisterModalContext = createContext<Ctx | null>(null);

export function RegisterModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [program, setProgram] = useState<ProgramId | undefined>();

  const openRegister = useCallback((p?: ProgramId) => {
    setProgram(p);
    setOpen(true);
  }, []);

  return (
    <RegisterModalContext.Provider value={{ openRegister }}>
      {children}
      <RegisterModal open={open} onOpenChange={setOpen} defaultProgram={program} />
    </RegisterModalContext.Provider>
  );
}

export function useRegisterModal() {
  const ctx = useContext(RegisterModalContext);
  if (!ctx) throw new Error("useRegisterModal must be used inside <RegisterModalProvider>");
  return ctx;
}
