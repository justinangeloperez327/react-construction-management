import { forwardRef,type InputHTMLAttributes,type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CheckboxProps=InputHTMLAttributes<HTMLInputElement>&{label?:ReactNode};

export const Checkbox=forwardRef<HTMLInputElement,CheckboxProps>(function Checkbox({className,label,...props},ref){
  const input=<input ref={ref} type="checkbox" className={cn("size-4 rounded border border-input accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",className)} {...props}/>;
  return label?<label className="inline-flex items-center gap-2 text-sm">{input}<span>{label}</span></label>:input;
});
