import type { PropsWithChildren } from "react";
import { ShadcnBadge } from "@/components/shadcn/badge";
type Tone="neutral"|"info"|"success"|"warning"|"danger";
const toneClass:Record<Tone,string>={
  neutral:"bg-muted text-muted-foreground border-transparent",
  info:"bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-900",
  success:"bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-900",
  warning:"bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-900",
  danger:"bg-red-50 text-red-700 border-red-100 dark:bg-red-950/60 dark:text-red-300 dark:border-red-900"
};
export function StatusBadge({tone="neutral",children}:PropsWithChildren<{tone?:Tone}>){return <ShadcnBadge data-tone={tone} variant="outline" className={toneClass[tone]}>{children}</ShadcnBadge>}
