import type { ReactNode } from "react";

export function PageHeader({title,description,actions,eyebrow}:{title:string;description?:string;actions?:ReactNode;eyebrow?:string}){
  return <header className="mb-4 flex flex-col items-start justify-between gap-2 sm:flex-row sm:gap-4">
    <div className="min-w-0">
      {eyebrow&&<div className="mb-0.5 text-[10px] font-semibold tracking-[.025em] app-text-primary">{eyebrow}</div>}
      <h1 className="m-0 text-[22px] font-semibold leading-tight tracking-[-.018em] text-[var(--color-text)] sm:text-[24px]">{title}</h1>
      {description&&<p className="mt-1 max-w-[68ch] text-[13px] leading-5 text-[var(--color-text-muted)]">{description}</p>}
    </div>
    {actions&&<div className="flex w-full flex-wrap gap-1.5 sm:w-auto sm:justify-end">{actions}</div>}
  </header>;
}
