import { forwardRef,type InputHTMLAttributes,type ReactNode } from "react";
export type CheckboxProps=InputHTMLAttributes<HTMLInputElement>&{label?:ReactNode};
export const Checkbox=forwardRef<HTMLInputElement,CheckboxProps>(function Checkbox({className="",label,...props},ref){const input=<input ref={ref} type="checkbox" className={`checkbox ${className}`.trim()} {...props}/>;return label?<label className="checkbox-label">{input}<span>{label}</span></label>:input});
