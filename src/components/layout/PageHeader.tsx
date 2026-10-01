import type { ReactNode } from "react";

export function PageHeader({title,description,actions,eyebrow}:{title:string;description?:string;actions?:ReactNode;eyebrow?:string}){
  return <header className="mb-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:gap-6">
    <div className="min-w-0">
      {eyebrow&&<div className="mb-1 text-[11px] font-bold uppercase tracking-[.06em] brand-text">{eyebrow}</div>}
      <h1 className="m-0 text-2xl font-bold leading-tight tracking-tight text-slate-950 sm:text-[26px] dark:text-white">{title}</h1>
      {description&&<p className="mt-1 max-w-[68ch] text-sm leading-5 text-slate-500 dark:text-slate-400">{description}</p>}
    </div>
    {actions&&<div className="flex w-full flex-wrap gap-2 sm:w-auto sm:justify-end">{actions}</div>}
  </header>;
}
