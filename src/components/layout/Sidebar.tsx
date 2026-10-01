import { useEffect } from "react";
import { X } from "lucide-react";
import { NavLink,useLocation } from "react-router-dom";
import { getNavigationGroups } from "@/app/navigation";
import { CompanyThemeSelector } from "./CompanyThemeSelector";

function Navigation({projectId,onNavigate}:{projectId?:string;onNavigate?:()=>void}){
  const groups=getNavigationGroups(projectId);
  return <nav className="grid gap-1" aria-label="Primary navigation">
    {groups.map(group=><section className="mb-5" key={group.label}>
      <h2 className="mb-1.5 px-3 text-[11px] font-bold uppercase tracking-[.08em] text-slate-400">{group.label}</h2>
      <div className="grid gap-1">{group.items.map(({label,to,icon:Icon})=><NavLink
        key={to}
        to={to}
        end
        onClick={onNavigate}
        className={({isActive})=>`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive?"brand-nav-active":"text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"}`}
      ><Icon size={18} aria-hidden="true"/><span>{label}</span></NavLink>)}</div>
    </section>)}
  </nav>;
}

function SidebarBrand({onClose}:{onClose?:()=>void}){
  return <div className="mb-6 flex items-center justify-between gap-3 px-2 py-1">
    <div className="flex items-center gap-2.5">
      <span className="h-9 w-1 rounded-full bg-[var(--brand-primary)]"/>
      <div><strong className="block text-base tracking-tight">Construction</strong><span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">Management</span></div>
    </div>
    {onClose&&<button className="inline-grid size-10 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800" onClick={onClose} aria-label="Close navigation"><X size={20}/></button>}
  </div>;
}

export function Sidebar({open,onClose}:{open:boolean;onClose:()=>void}){
  const {pathname}=useLocation();
  const match=pathname.match(/^\/projects\/([^/]+)/);
  const projectId=match?.[1]?decodeURIComponent(match[1]):undefined;

  useEffect(()=>{onClose()},[pathname,onClose]);

  useEffect(()=>{
    if(!open)return;
    const previous=document.body.style.overflow;
    document.body.style.overflow="hidden";
    const onKeyDown=(event:KeyboardEvent)=>{if(event.key==="Escape")onClose()};
    document.addEventListener("keydown",onKeyDown);
    return()=>{
      document.body.style.overflow=previous;
      document.removeEventListener("keydown",onKeyDown);
    };
  },[open,onClose]);

  return <>
    <aside className="sticky top-0 hidden h-screen overflow-y-auto border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 lg:block" aria-label="Application sidebar">
      <SidebarBrand/>
      <Navigation projectId={projectId}/>
    </aside>

    {open&&<div className="lg:hidden">
      <button type="button" className="fixed inset-0 z-40 cursor-default bg-slate-950/50" onClick={onClose} aria-label="Close navigation overlay"/>
      <aside className="fixed inset-y-0 left-0 z-50 w-[min(320px,88vw)] overflow-y-auto border-r border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-800 dark:bg-slate-950" aria-label="Mobile navigation">
        <SidebarBrand onClose={onClose}/>
        <div className="mb-5 px-2"><CompanyThemeSelector className="w-full"/></div>
        <Navigation projectId={projectId} onNavigate={onClose}/>
      </aside>
    </div>}
  </>;
}
