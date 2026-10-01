import type { ReactNode } from "react";
type Tone="info"|"success"|"warning"|"danger";
const tones:Record<Tone,string>={
  info:"border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900 dark:bg-blue-950/60 dark:text-blue-200",
  success:"border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200",
  warning:"border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/60 dark:text-amber-200",
  danger:"border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950/60 dark:text-red-200"
};
export function Alert({tone="info",title,children,action}:{tone?:Tone;title:string;children?:ReactNode;action?:ReactNode}){return <div className={`flex justify-between gap-4 rounded-xl border px-4 py-3.5 text-sm ${tones[tone]}`} role={tone==="danger"?"alert":"status"}><div><strong className="font-semibold">{title}</strong>{children&&<div className="mt-1 text-[13px] leading-5 opacity-90">{children}</div>}</div>{action}</div>}
