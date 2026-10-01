import type { PropsWithChildren } from "react";
type Tone="neutral"|"info"|"success"|"warning"|"danger";
const tones:Record<Tone,string>={
  neutral:"border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
  info:"border-blue-100 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/70 dark:text-blue-300",
  success:"border-emerald-100 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300",
  warning:"border-amber-100 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/60 dark:text-amber-300",
  danger:"border-red-100 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/60 dark:text-red-300"
};
export function StatusBadge({tone="neutral",children}:PropsWithChildren<{tone?:Tone}>){return <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${tones[tone]}`}>{children}</span>}
