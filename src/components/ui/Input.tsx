import { forwardRef,type InputHTMLAttributes } from "react";
import { ShadcnInput } from "@/components/shadcn/input";
export type InputProps=InputHTMLAttributes<HTMLInputElement>&{invalid?:boolean};
export const Input=forwardRef<HTMLInputElement,InputProps>(function Input({invalid=false,...props},ref){return <ShadcnInput ref={ref} aria-invalid={invalid||undefined} {...props}/>});
