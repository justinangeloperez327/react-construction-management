import { forwardRef,type TextareaHTMLAttributes } from "react";
import { ShadcnTextarea } from "@/components/shadcn/textarea";
export const Textarea=forwardRef<HTMLTextAreaElement,TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea(props,ref){return <ShadcnTextarea ref={ref} {...props}/>});
