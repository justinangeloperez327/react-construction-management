import type { ReactNode } from "react";

export function FormField({id,label,description,error,required,children}:{id:string;label:string;description?:string;error?:string;required?:boolean;children:ReactNode}){
  const helpId=description?id+"-description":undefined;
  const errorId=error?id+"-error":undefined;

  return <div className="grid gap-2">
    <label className="text-sm font-medium leading-none" htmlFor={id}>{label}{required&&<span aria-hidden="true"> *</span>}</label>
    {description&&<p id={helpId} className="text-sm text-muted-foreground">{description}</p>}
    <div>{children}</div>
    {error&&<p id={errorId} className="text-sm text-destructive" role="alert">{error}</p>}
  </div>;
}
