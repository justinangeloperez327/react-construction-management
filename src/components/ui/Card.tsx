import type { HTMLAttributes,PropsWithChildren,ReactNode } from "react";
export function Card({className="",...props}:HTMLAttributes<HTMLElement>){return <section className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`.trim()} {...props}/>}
export function CardHeader({title,description,action}:{title:string;description?:string;action?:ReactNode}){return <header className="mb-4 flex items-start justify-between gap-4"><div><h2 className="mb-0 text-lg font-semibold">{title}</h2>{description&&<p className="mt-1 mb-0 text-sm text-slate-500 dark:text-slate-400">{description}</p>}</div>{action}</header>}
export function CardContent({children}:PropsWithChildren){return <div className="min-w-0">{children}</div>}
