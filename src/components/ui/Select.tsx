import { forwardRef,type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Select=forwardRef<HTMLSelectElement,SelectHTMLAttributes<HTMLSelectElement>>(function Select({className,...props},ref){
  return <select ref={ref} className={cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50",className)} {...props}/>;
});
