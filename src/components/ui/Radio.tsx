import { forwardRef,type InputHTMLAttributes } from "react";
export const Radio=forwardRef<HTMLInputElement,InputHTMLAttributes<HTMLInputElement>>(function Radio({className="",...props},ref){return <input ref={ref} type="radio" className={`size-4 border-slate-300 text-blue-600 accent-blue-600 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950 ${className}`.trim()} {...props}/>});
