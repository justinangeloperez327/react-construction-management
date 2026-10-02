import type { ReactNode } from "react";
type Tone="info"|"success"|"warning"|"danger";

export function Toast({tone="info",title,children,onDismiss}:{tone?:Tone;title:string;children?:ReactNode;onDismiss?:()=>void}){
  return <div className="flex w-[min(380px,calc(100vw-2rem))] justify-between gap-4 rounded-lg border bg-background p-4 text-sm shadow-lg" role={tone==="danger"?"alert":"status"}>
    <div>
      <strong className={tone==="danger"?"font-medium text-destructive":"font-medium"}>{title}</strong>
      {children&&<div className="mt-1 text-sm text-muted-foreground">{children}</div>}
    </div>
    {onDismiss&&<button className="text-lg leading-none text-muted-foreground hover:text-foreground" onClick={onDismiss} aria-label="Dismiss notification">×</button>}
  </div>;
}
