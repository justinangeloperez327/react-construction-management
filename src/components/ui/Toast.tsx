import type { ReactNode } from "react";
type Tone="info"|"success"|"warning"|"danger";
export function Toast({tone="info",title,children,onDismiss}:{tone?:Tone;title:string;children?:ReactNode;onDismiss?:()=>void}){return <div className={`toast toast--${tone}`} role={tone==="danger"?"alert":"status"}><div><strong>{title}</strong>{children&&<div className="toast-content">{children}</div>}</div>{onDismiss&&<button className="toast-dismiss" onClick={onDismiss} aria-label="Dismiss notification">×</button>}</div>}
