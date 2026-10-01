import type { ReactNode } from "react";

export function MetricCard({label,value,detail,icon}:{label:string;value:ReactNode;detail?:ReactNode;icon?:ReactNode}){
  return <article className="rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
    <div className="flex items-center justify-between gap-2 text-slate-500 dark:text-slate-400">
      <span className="text-xs font-medium">{label}</span>
      {icon&&<span className="opacity-70">{icon}</span>}
    </div>
    <div className="mt-1 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">{value}</div>
    {detail&&<div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{detail}</div>}
  </article>;
}
