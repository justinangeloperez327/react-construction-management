import type { ReactNode } from "react";

export function MetricCard({label,value,detail,icon}:{label:string;value:ReactNode;detail?:ReactNode;icon?:ReactNode}){
  return <article className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
    <div className="flex items-center justify-between gap-2 text-[var(--color-text-muted)]">
      <span className="text-xs font-medium">{label}</span>
      {icon&&<span className="opacity-70">{icon}</span>}
    </div>
    <div className="mt-1 text-2xl font-bold tracking-tight text-[var(--color-text)]">{value}</div>
    {detail&&<div className="mt-0.5 text-xs text-[var(--color-text-muted)]">{detail}</div>}
  </article>;
}
