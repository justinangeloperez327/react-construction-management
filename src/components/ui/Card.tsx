import type { HTMLAttributes,PropsWithChildren,ReactNode } from "react";
export function Card({className="",...props}:HTMLAttributes<HTMLElement>){return <section className={`card ${className}`.trim()} {...props}/>}
export function CardHeader({title,description,action}:{title:string;description?:string;action?:ReactNode}){return <header className="card-header"><div><h2>{title}</h2>{description&&<p className="muted">{description}</p>}</div>{action}</header>}
export function CardContent({children}:PropsWithChildren){return <div className="card-content">{children}</div>}
