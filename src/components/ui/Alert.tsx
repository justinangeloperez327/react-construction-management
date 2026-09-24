import type { PropsWithChildren,ReactNode } from "react";
type Tone="info"|"success"|"warning"|"danger";
export function Alert({tone="info",title,children,action}:{tone?:Tone;title:string;children?:ReactNode;action?:ReactNode}){return <div className={`alert alert--${tone}`} role={tone==="danger"?"alert":"status"}><div><strong>{title}</strong>{children&&<div className="alert-content">{children}</div>}</div>{action}</div>}
