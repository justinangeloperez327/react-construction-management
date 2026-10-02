import { forwardRef,type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Radio=forwardRef<HTMLInputElement,InputHTMLAttributes<HTMLInputElement>>(function Radio({className,...props},ref){
  return <input ref={ref} type="radio" className={cn("size-4 border border-input accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",className)} {...props}/>;
});
