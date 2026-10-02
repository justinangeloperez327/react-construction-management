import type { HTMLAttributes,PropsWithChildren,ReactNode } from "react";
export function Card({className="",...props}:HTMLAttributes<HTMLElement>){return <section className={`border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 ${className}`.trim()} {...props}/>}
export function CardHeader({title,description,action}:{title:string;description?:string;action?:ReactNode}){return <header className="mb-3 flex items-start justify-between gap-3"><div><h2 className="mb-0 text-[16px] font-semibold">{title}</h2>{description&&<p className="mt-0.5 mb-0 text-[12px] text-[var(--color-text-muted)]">{description}</p>}</div>{action}</header>}
export function CardContent({children}:PropsWithChildren){return <div className="min-w-0">{children}</div>}
