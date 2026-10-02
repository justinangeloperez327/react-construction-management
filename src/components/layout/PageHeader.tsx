import type { ReactNode } from "react";

export function PageHeader({title,description,actions,eyebrow}:{title:string;description?:string;actions?:ReactNode;eyebrow?:string}){
  return <header className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
    <div className="min-w-0">
      {eyebrow&&<div className="mb-1 text-xs font-medium text-muted-foreground">{eyebrow}</div>}
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {description&&<p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>}
    </div>
    {actions&&<div className="flex flex-wrap gap-2 sm:justify-end">{actions}</div>}
  </header>;
}
