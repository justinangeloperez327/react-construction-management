import type { ComponentProps } from "react";
import { Progress as ProgressPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

export function ShadcnProgress({className,value,...props}:ComponentProps<typeof ProgressPrimitive.Root>){
  const normalized=Math.max(0,Math.min(100,value??0));
  return <ProgressPrimitive.Root data-slot="progress" className={cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/15",className)} value={normalized} {...props}><ProgressPrimitive.Indicator className="h-full w-full flex-1 bg-primary transition-transform" style={{transform:`translateX(-${100-normalized}%)`}}/></ProgressPrimitive.Root>;
}
