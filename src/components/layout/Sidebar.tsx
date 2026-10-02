import { useEffect } from "react";
import { ChevronDown,X } from "lucide-react";
import { Link,NavLink,useLocation } from "react-router-dom";
import { getNavigationGroups,type NavigationGroup } from "@/app/navigation";
import { useCurrentProject } from "@/features/projects/hooks/useCurrentProject";

function NavItem({label,to,icon:Icon,onNavigate}:{label:string;to:string;icon:NavigationGroup["items"][number]["icon"];onNavigate?:()=>void}){
  return <NavLink
    to={to}
    end
    onClick={onNavigate}
    className={({isActive})=>`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive?"app-nav-active":"text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"}`}
  ><Icon size={17} aria-hidden="true"/><span>{label}</span></NavLink>;
}

function Navigation({projectId,onNavigate}:{projectId?:string;onNavigate?:()=>void}){
  const {pathname}=useLocation();
  const groups=getNavigationGroups(projectId);
  const [general,...projectGroups]=groups;

  return <nav className="grid gap-3" aria-label="Primary navigation">
    <section>
      <div className="grid gap-1">{general.items.map(item=><NavItem key={item.to} {...item} onNavigate={onNavigate}/>)}</div>
    </section>

    {projectGroups.length>0&&<div className="grid gap-1.5">
      {projectGroups.map(group=>{
        const active=group.items.some(item=>item.to===pathname);
        return <details className="sidebar-nav-group group rounded-lg" open={active||undefined} key={group.label+":"+pathname}>
          <summary className="flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-[11px] font-bold uppercase tracking-[.07em] text-slate-400 transition hover:bg-slate-50 hover:text-slate-700 dark:hover:bg-slate-900 dark:hover:text-slate-200">
            <span>{group.label}</span>
            <ChevronDown size={14} className="transition-transform group-open:rotate-180" aria-hidden="true"/>
          </summary>
          <div className="mt-1 grid gap-1 border-l border-slate-200 pl-2 dark:border-slate-800">
            {group.items.map(item=><NavItem key={item.to} {...item} onNavigate={onNavigate}/>)}
          </div>
        </details>;
      })}
    </div>}
  </nav>;
}

function SidebarBrand({onClose}:{onClose?:()=>void}){
  return <div className="mb-5 flex items-center justify-between gap-3 px-2 py-1">
    <div className="flex items-center gap-2.5">
      <span className="h-9 w-1 rounded-full bg-[var(--color-primary)]"/>
      <div><strong className="block text-base tracking-tight">Construction</strong><span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">Management</span></div>
    </div>
    {onClose&&<button className="inline-grid size-10 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800" onClick={onClose} aria-label="Close navigation"><X size={20}/></button>}
  </div>;
}

export function Sidebar({open,onClose}:{open:boolean;onClose:()=>void}){
  const {pathname}=useLocation();
  const {projectId,project}=useCurrentProject();

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

  const projectContext=project?<Link to={`/projects/${encodeURIComponent(project.id)}/overview`} onClick={onClose} className="mb-4 block rounded-lg border border-slate-200 px-3 py-2.5 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900">
    <span className="block text-[10px] font-bold uppercase tracking-[.08em] text-slate-400">Current project</span>
    <strong className="mt-1 block truncate text-sm">{project.projectNumber}</strong>
    <span className="mt-0.5 block truncate text-xs text-slate-500 dark:text-slate-400">{project.name}</span>
  </Link>:null;

  return <>
    <aside className="sticky top-0 hidden h-screen overflow-y-auto border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 lg:block" aria-label="Application sidebar">
      <SidebarBrand/>
      {projectContext}
      <Navigation projectId={projectId||undefined}/>
    </aside>

    {open&&<div className="lg:hidden">
      <button type="button" className="fixed inset-0 z-40 cursor-default bg-slate-950/50" onClick={onClose} aria-label="Close navigation overlay"/>
      <aside className="fixed inset-y-0 left-0 z-50 w-[min(320px,88vw)] overflow-y-auto border-r border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-800 dark:bg-slate-950" aria-label="Mobile navigation">
        <SidebarBrand onClose={onClose}/>
        {projectContext}
        <Navigation projectId={projectId||undefined} onNavigate={onClose}/>
      </aside>
    </div>}
  </>;
}
