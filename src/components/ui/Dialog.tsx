import { useEffect,useId,useRef,type ReactNode } from "react";
import { X } from "lucide-react";
export function Dialog({open,title,description,children,footer,onClose}:{open:boolean;title:string;description?:string;children?:ReactNode;footer?:ReactNode;onClose:()=>void}){
  const ref=useRef<HTMLElement>(null),titleId=useId(),descriptionId=useId();
  useEffect(()=>{if(!open)return;const previous=document.activeElement as HTMLElement|null;const root=ref.current;root?.focus();const handler=(event:KeyboardEvent)=>{if(event.key==="Escape")onClose();if(event.key==="Tab"&&root){const focusable=Array.from(root.querySelectorAll<HTMLElement>('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')).filter(x=>!x.hasAttribute("disabled"));if(!focusable.length){event.preventDefault();return}const first=focusable[0],last=focusable[focusable.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}};document.addEventListener("keydown",handler);document.body.style.overflow="hidden";return()=>{document.removeEventListener("keydown",handler);document.body.style.overflow="";previous?.focus()}},[open,onClose]);
  if(!open)return null;
  return <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/50 p-5 backdrop-blur-[1px]" role="presentation" onMouseDown={e=>{if(e.currentTarget===e.target)onClose()}}>
    <section ref={ref} tabIndex={-1} className="max-h-[calc(100vh-40px)] w-full max-w-[560px] overflow-auto rounded-2xl border border-slate-200 bg-white shadow-2xl outline-none dark:border-slate-800 dark:bg-slate-900" role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={description?descriptionId:undefined}>
      <header className="flex items-start justify-between gap-4 px-5 pt-5"><div><h2 className="mb-1 text-lg font-semibold" id={titleId}>{title}</h2>{description&&<p id={descriptionId} className="m-0 text-sm text-slate-500 dark:text-slate-400">{description}</p>}</div><button type="button" className="inline-grid size-10 shrink-0 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800" onClick={onClose} aria-label="Close dialog"><X size={20}/></button></header>
      {children&&<div className="p-5">{children}</div>}
      {footer&&<footer className="flex flex-col-reverse gap-2 border-t border-slate-200 px-5 py-4 sm:flex-row sm:justify-end dark:border-slate-800">{footer}</footer>}
    </section>
  </div>;
}
