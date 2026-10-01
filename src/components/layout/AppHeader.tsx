import { Bell,Menu,Search } from "lucide-react";
import { Link,useLocation } from "react-router-dom";
import { useProject } from "@/features/projects/hooks/useProjects";
import { CompanyThemeSelector } from "./CompanyThemeSelector";
import { ThemeToggle } from "./ThemeToggle";

const iconButton="brand-focus inline-grid size-10 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100";

export function AppHeader({onMenu}:{onMenu:()=>void}){
  const {pathname}=useLocation();
  const match=pathname.match(/^\/projects\/([^/]+)/);
  const projectId=match?.[1]?decodeURIComponent(match[1]):"";
  const project=useProject(projectId);

  return <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-7 dark:border-slate-800 dark:bg-slate-950/90">
    <div className="flex min-w-0 items-center gap-2">
      <button className={iconButton+" lg:hidden"} onClick={onMenu} aria-label="Open navigation"><Menu size={20}/></button>
      <Link className="grid min-w-0 rounded-lg px-2 py-1 transition hover:bg-slate-50 dark:hover:bg-slate-900" to="/projects">
        <span className="text-[11px] text-slate-500 dark:text-slate-400">Current project</span>
        <strong className="truncate text-sm font-semibold">{project.data?.name??"All Projects"}</strong>
      </Link>
    </div>
    <div className="flex items-center gap-1">
      {projectId?<><Link className={iconButton} to={`/projects/${encodeURIComponent(projectId)}/search`} aria-label="Search project"><Search size={19}/></Link><Link className={iconButton+" relative"} to={`/projects/${encodeURIComponent(projectId)}/notifications`} aria-label="Project notifications"><Bell size={19}/></Link></>:<><button className={iconButton} type="button" disabled aria-label="Select a project to search"><Search size={19}/></button><button className={iconButton} type="button" disabled aria-label="Select a project to view notifications"><Bell size={19}/></button></>}
      <CompanyThemeSelector className="hidden w-[170px] md:flex"/>
      <ThemeToggle/>
      <div className="ml-1 flex items-center gap-2 rounded-lg px-1.5 py-1">
        <span className="grid size-8 place-items-center rounded-full brand-soft text-xs font-bold">JP</span>
        <span className="hidden text-left md:grid"><strong className="text-[13px]">Justin Perez</strong><small className="text-slate-500 dark:text-slate-400">Developer</small></span>
      </div>
    </div>
  </header>;
}
