import { X } from "lucide-react";
import { NavLink,useLocation } from "react-router-dom";
import { getNavigationGroups } from "@/app/navigation";

export function Sidebar({open,onClose}:{open:boolean;onClose:()=>void}){
  const {pathname}=useLocation();
  const match=pathname.match(/^\/projects\/([^/]+)/);
  const projectId=match?.[1]?decodeURIComponent(match[1]):undefined;
  const groups=getNavigationGroups(projectId);

  return <>
    <div className={`fixed inset-0 z-40 bg-slate-950/50 transition-opacity lg:hidden ${open?"pointer-events-auto opacity-100":"pointer-events-none opacity-0"}`} onClick={onClose} aria-hidden="true"/>
    <aside className={`fixed inset-y-0 left-0 z-50 w-[min(320px,88vw)] overflow-y-auto border-r border-slate-200 bg-white p-4 shadow-2xl transition-transform duration-200 dark:border-slate-800 dark:bg-slate-950 lg:sticky lg:top-0 lg:z-40 lg:h-screen lg:w-auto lg:translate-x-0 lg:shadow-none ${open?"translate-x-0":"-translate-x-[105%]"}`} aria-label="Application sidebar">
      <div className="mb-6 flex items-center justify-between gap-3 px-2 py-1">
        <div className="flex items-center gap-2.5"><span className="h-9 w-1 rounded-full bg-[var(--brand-primary)]"/><div><strong className="block text-base tracking-tight">Construction</strong><span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">Management</span></div></div>
        <button className="inline-grid size-10 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 lg:hidden dark:text-slate-400 dark:hover:bg-slate-800" onClick={onClose} aria-label="Close navigation"><X size={20}/></button>
      </div>
      <nav className="grid gap-1" aria-label="Primary navigation">
        {groups.map(group=><section className="mb-5" key={group.label}>
          <h2 className="mb-1.5 px-3 text-[11px] font-bold uppercase tracking-[.08em] text-slate-400">{group.label}</h2>
          <div className="grid gap-1">{group.items.map(({label,to,icon:Icon})=><NavLink
            key={to}
            to={to}
            end={to==="/"||to.endsWith("/overview")}
            onClick={onClose}
            className={({isActive})=>`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive?"brand-nav-active":"text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"}`}
          ><Icon size={18} aria-hidden="true"/><span>{label}</span></NavLink>)}</div>
        </section>)}
      </nav>
    </aside>
  </>;
}
