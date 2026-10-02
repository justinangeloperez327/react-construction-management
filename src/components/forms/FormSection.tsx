import type { PropsWithChildren,ReactNode } from "react";

export function FormSection({title,description,action,children}:PropsWithChildren<{title:string;description?:string;action?:ReactNode}>){
  return <section className="border-b py-5 first:pt-0 last:border-b-0">
    <header className="mb-4 flex items-start justify-between gap-4">
      <div>
        <h2 className="text-base font-semibold">{title}</h2>
        {description&&<p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </header>
    <div className="grid gap-4 md:grid-cols-2">{children}</div>
  </section>;
}
