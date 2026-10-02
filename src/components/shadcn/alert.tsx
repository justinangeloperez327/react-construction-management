import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function ShadcnAlert({className,...props}:HTMLAttributes<HTMLDivElement>){
  return <div role="alert" className={cn("relative w-full rounded-lg border px-4 py-3 text-sm",className)} {...props}/>;
}
export function ShadcnAlertTitle({className,...props}:HTMLAttributes<HTMLHeadingElement>){
  return <h5 className={cn("mb-1 font-medium leading-none tracking-tight",className)} {...props}/>;
}
export function ShadcnAlertDescription({className,...props}:HTMLAttributes<HTMLDivElement>){
  return <div className={cn("text-sm text-muted-foreground [&_p]:leading-relaxed",className)} {...props}/>;
}
