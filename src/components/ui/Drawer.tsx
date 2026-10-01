import { useEffect,useId,useRef,type ReactNode } from "react";
import { X } from "lucide-react";
export function Drawer({open,title,children,onClose}:{open:boolean;title:string;children?:ReactNode;onClose:()=>void}){
  const ref=useRef<HTMLElement>(null),titleId=useId();
  useEffect(()=>{if(!open)return;const previous=document.activeElement as HTMLElement|null;ref.current?.focus();const handler=(event:KeyboardEvent)=>{if(event.key==="Escape")onClose();if(event.key==="Tab"&&ref.current){const focusable=Array.from(ref.current.querySelectorAll<HTMLElement>('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')).filter(x=>!x.hasAttribute("disabled"));if(!focusable.length){event.preventDefault();return}const first=focusable[0],last=focusable[focusable.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}};document.addEventListener("keydown",handler);document.body.style.overflow="hidden";return()=>{document.removeEventListener("keydown",handler);document.body.style.overflow="";previous?.focus()}},[open,onClose]);
  if(!open)return null;
  return <div className="fixed inset-0 z-[80] flex justify-end bg-slate-950/50 backdrop-blur-[1px]" onMouseDown={e=>{if(e.currentTarget===e.target)onClose()}}>
    <aside ref={ref} tabIndex={-1} className="h-full w-full max-w-[480px] overflow-auto border-l border-slate-200 bg-white shadow-2xl outline-none dark:border-slate-800 dark:bg-slate-900" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <header className="flex items-start justify-between gap-4 px-5 pt-5"><h2 className="text-lg font-semibold" id={titleId}>{title}</h2><button type="button" className="inline-grid size-10 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800" onClick={onClose} aria-label="Close drawer"><X size={20}/></button></header>
      <div className="p-5">{children}</div>
    </aside>
  </div>;
}
