import { forwardRef,type InputHTMLAttributes } from "react";
export type InputProps=InputHTMLAttributes<HTMLInputElement>&{invalid?:boolean};
export const Input=forwardRef<HTMLInputElement,InputProps>(function Input({className="",invalid=false,...props},ref){return <input ref={ref} aria-invalid={invalid||undefined} className={`input ${invalid?"input--invalid":""} ${className}`.trim()} {...props}/>});
