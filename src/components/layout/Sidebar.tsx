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
    className={({isActive})=>`flex items-center gap-2.5 px-2.5 py-2 text-sm font-medium transition ${isActive?"app-nav-active":"text-[var(--color-text-muted)] hover:bg-[var(--theme-soft)] hover:text-[var(--color-text)]"}`}
  ><Icon size={17} aria-hidden="true"/><span>{label}</span></NavLink>;
}

function Navigation({projectId,onNavigate}:{projectId?:string;onNavigate?:()=>void}){
  const {pathname}=useLocation();
  const groups=getNavigationGroups(projectId);
  const [general,...projectGroups]=groups;

  return <nav className="grid gap-2" aria-label="Primary navigation">
    <section>
      <div className="grid gap-1">{general.items.map(item=><NavItem key={item.to} {...item} onNavigate={onNavigate}/>)}</div>
    </section>

    {projectGroups.length>0&&<div className="grid gap-1">
      {projectGroups.map(group=>{
        const active=group.items.some(item=>item.to===pathname);
        return <details className="sidebar-nav-group group rounded-lg" open={active||undefined} key={group.label+":"+pathname}>
          <summary className="flex cursor-pointer items-center justify-between gap-2 px-2.5 py-1.5 text-[11px] font-semibold tracking-[.02em] text-[var(--color-text-muted)] transition hover:bg-[var(--theme-soft)] hover:text-[var(--color-text)]">
            <span>{group.label}</span>
            <ChevronDown size={13} className="transition-transform group-open:rotate-180" aria-hidden="true"/>
          </summary>
          <div className="mt-0.5 grid gap-0.5 border-l border-[var(--color-border)] pl-1.5">
            {group.items.map(item=><NavItem key={item.to} {...item} onNavigate={onNavigate}/>)}
          </div>
        </details>;
      })}
    </div>}
  </nav>;
}

function SidebarBrand({onClose}:{onClose?:()=>void}){
  return <div className="mb-4 flex items-center justify-between gap-2 px-1.5">
    <div className="flex items-center gap-2.5">
      <span className="h-7 w-0.5 bg-[var(--color-primary)]"/>
      <div><strong className="block text-[14px] font-semibold tracking-[-.01em]">Construction</strong><span className="block text-[11px] text-[var(--color-text-muted)]">Management</span></div>
    </div>
    {onClose&&<button className="inline-grid size-9 place-items-center text-[var(--color-text-muted)] transition hover:bg-[var(--theme-soft)]" onClick={onClose} aria-label="Close navigation"><X size={18}/></button>}
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

  const projectContext=project?<Link to={`/projects/${encodeURIComponent(project.id)}/overview`} onClick={onClose} className="mb-4 block border border-[var(--color-border)] px-3 py-2.5 transition hover:bg-[var(--theme-soft)]">
    <span className="block text-[10px] font-medium text-slate-400">Current project</span>
    <strong className="mt-0.5 block truncate text-[12px] font-semibold">{project.projectNumber}</strong>
    <span className="block truncate text-[11px] text-[var(--color-text-muted)]">{project.name}</span>
  </Link>:null;

  return <>
    <aside className="sticky top-0 hidden h-screen overflow-y-auto border-r border-[var(--color-border)] bg-[var(--color-surface)] p-3 lg:block" aria-label="Application sidebar">
      <SidebarBrand/>
      {projectContext}
      <Navigation projectId={projectId||undefined}/>
    </aside>

    {open&&<div className="lg:hidden">
      <button type="button" className="fixed inset-0 z-40 cursor-default bg-slate-950/50" onClick={onClose} aria-label="Close navigation overlay"/>
      <aside className="fixed inset-y-0 left-0 z-50 w-[min(300px,88vw)] overflow-y-auto border-r border-slate-200 bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-slate-950" aria-label="Mobile navigation">
        <SidebarBrand onClose={onClose}/>
        {projectContext}
        <Navigation projectId={projectId||undefined} onNavigate={onClose}/>
      </aside>
    </div>}
  </>;
}
