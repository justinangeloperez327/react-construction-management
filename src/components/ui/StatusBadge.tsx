import type { PropsWithChildren } from "react";
import { ShadcnBadge } from "@/components/shadcn/badge";

type Tone="neutral"|"info"|"success"|"warning"|"danger";

export function StatusBadge({tone="neutral",children}:PropsWithChildren<{tone?:Tone}>){
  const variant=tone==="danger"?"destructive":tone==="info"||tone==="warning"?"outline":"secondary";
  return <ShadcnBadge data-tone={tone} variant={variant}>{children}</ShadcnBadge>;
}
