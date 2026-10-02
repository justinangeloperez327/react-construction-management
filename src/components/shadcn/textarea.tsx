import { forwardRef,type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const ShadcnTextarea=forwardRef<HTMLTextAreaElement,TextareaHTMLAttributes<HTMLTextAreaElement>>(function ShadcnTextarea({className,...props},ref){
  return <textarea ref={ref} data-slot="textarea" className={cn("flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50",className)} {...props}/>;
});
