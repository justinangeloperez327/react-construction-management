import { forwardRef,type InputHTMLAttributes } from "react";
export const Checkbox=forwardRef<HTMLInputElement,InputHTMLAttributes<HTMLInputElement>>(function Checkbox({className="",...props},ref){return <input ref={ref} type="checkbox" className={`checkbox ${className}`.trim()} {...props}/>});
