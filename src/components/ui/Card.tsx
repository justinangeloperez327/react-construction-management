import type { HTMLAttributes,PropsWithChildren,ReactNode } from "react";
export function Card({className="",...props}:HTMLAttributes<HTMLElement>){return <section className={`rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm ${className}`.trim()} {...props}/>}
export function CardHeader({title,description,action}:{title:string;description?:string;action?:ReactNode}){return <header className="mb-4 flex items-start justify-between gap-4"><div><h2 className="mb-0 text-lg font-semibold">{title}</h2>{description&&<p className="mt-1 mb-0 text-sm text-[var(--color-text-muted)]">{description}</p>}</div>{action}</header>}
export function CardContent({children}:PropsWithChildren){return <div className="min-w-0">{children}</div>}
