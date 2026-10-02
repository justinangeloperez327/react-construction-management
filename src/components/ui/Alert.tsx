import type { ReactNode } from "react";
import { ShadcnAlert,ShadcnAlertDescription,ShadcnAlertTitle } from "@/components/shadcn/alert";
type Tone="info"|"success"|"warning"|"danger";

export function Alert({tone="info",title,children,action}:{tone?:Tone;title:string;children?:ReactNode;action?:ReactNode}){
  return <ShadcnAlert className={tone==="danger"?"border-destructive/40 text-destructive":undefined}>
    <div className="flex items-start justify-between gap-4">
      <div>
        <ShadcnAlertTitle>{title}</ShadcnAlertTitle>
        {children&&<ShadcnAlertDescription>{children}</ShadcnAlertDescription>}
      </div>
      {action}
    </div>
  </ShadcnAlert>;
}
