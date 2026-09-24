import { forwardRef,type InputHTMLAttributes } from "react";
export const Radio=forwardRef<HTMLInputElement,InputHTMLAttributes<HTMLInputElement>>(function Radio({className="",...props},ref){return <input ref={ref} type="radio" className={`radio ${className}`.trim()} {...props}/>});
