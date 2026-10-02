import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function ShadcnCard({className,...props}:HTMLAttributes<HTMLDivElement>){
  return <div data-slot="card" className={cn("rounded-xl border bg-card text-card-foreground shadow-sm",className)} {...props}/>;
}
export function ShadcnCardHeader({className,...props}:HTMLAttributes<HTMLDivElement>){
  return <div data-slot="card-header" className={cn("grid gap-1.5 p-6",className)} {...props}/>;
}
export function ShadcnCardTitle({className,...props}:HTMLAttributes<HTMLHeadingElement>){
  return <h3 data-slot="card-title" className={cn("font-semibold leading-none tracking-tight",className)} {...props}/>;
}
export function ShadcnCardDescription({className,...props}:HTMLAttributes<HTMLParagraphElement>){
  return <p data-slot="card-description" className={cn("text-sm text-muted-foreground",className)} {...props}/>;
}
export function ShadcnCardContent({className,...props}:HTMLAttributes<HTMLDivElement>){
  return <div data-slot="card-content" className={cn("p-6 pt-0",className)} {...props}/>;
}
export function ShadcnCardFooter({className,...props}:HTMLAttributes<HTMLDivElement>){
  return <div data-slot="card-footer" className={cn("flex items-center p-6 pt-0",className)} {...props}/>;
}
