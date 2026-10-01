import { Bell,Menu,Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useCurrentProject } from "@/features/projects/hooks/useCurrentProject";
import { HeaderPreferencesMenu } from "./HeaderPreferencesMenu";

const iconButton="brand-focus inline-grid size-10 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100";

export function AppHeader({onMenu}:{onMenu:()=>void}){
  const {projectId,project}=useCurrentProject();
  const projectBase=projectId?`/projects/${encodeURIComponent(projectId)}`:"";

  return <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-7 dark:border-slate-800 dark:bg-slate-950/90">
    <div className="flex min-w-0 items-center gap-2">
      <button className={iconButton+" lg:hidden"} onClick={onMenu} aria-label="Open navigation"><Menu size={20}/></button>
      <Link className="grid min-w-0 rounded-lg px-2 py-1 transition hover:bg-slate-50 dark:hover:bg-slate-900" to={projectBase?projectBase+"/overview":"/projects"}>
        <span className="text-[11px] text-slate-500 dark:text-slate-400">{project?"Current project":"Workspace"}</span>
        <strong className="max-w-[220px] truncate text-sm font-semibold sm:max-w-[320px]">{project?.name??"All Projects"}</strong>
      </Link>
    </div>
    <div className="flex items-center gap-1">
      {projectId&&<Link className={iconButton} to={projectBase+"/search"} aria-label="Search project"><Search size={19}/></Link>}
      {projectId&&<Link className={iconButton} to={projectBase+"/notifications"} aria-label="Project notifications"><Bell size={19}/></Link>}
      <HeaderPreferencesMenu/>
    </div>
  </header>;
}
