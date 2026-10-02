import type { ReactNode } from "react";
import { ShadcnCard,ShadcnCardContent } from "@/components/shadcn/card";

export function MetricCard({label,value,detail,icon}:{label:string;value:ReactNode;detail?:ReactNode;icon?:ReactNode}){
  return <ShadcnCard className="shadow-none">
    <ShadcnCardContent className="p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-muted-foreground">{label}</span>
        {icon&&<span className="text-muted-foreground">{icon}</span>}
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
      {detail&&<div className="mt-1 text-xs text-muted-foreground">{detail}</div>}
    </ShadcnCardContent>
  </ShadcnCard>;
}
