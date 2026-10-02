import { Bell,Menu,Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useCurrentProject } from "@/features/projects/hooks/useCurrentProject";
import { AccountMenu } from "./AccountMenu";
import { AppearanceMenu } from "./AppearanceMenu";

const iconButton="app-focus inline-grid size-9 place-items-center text-[var(--color-text-muted)] transition hover:bg-[var(--theme-soft)] hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-40";

export function AppHeader({onMenu}:{onMenu:()=>void}){
  const {projectId,project}=useCurrentProject();
  const projectBase=projectId?`/projects/${encodeURIComponent(projectId)}`:"";

  return <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_95%,transparent)] px-4 backdrop-blur sm:px-6 lg:px-7">
    <div className="flex min-w-0 items-center gap-2">
      <button className={iconButton+" lg:hidden"} onClick={onMenu} aria-label="Open navigation"><Menu size={18}/></button>
      <Link className="grid min-w-0 px-2 py-1 transition hover:bg-[var(--theme-soft)]" to={projectBase?projectBase+"/overview":"/projects"}>
        <span className="text-[10px] leading-3 text-[var(--color-text-muted)]">{project?"Current project":"Workspace"}</span>
        <strong className="max-w-[220px] truncate text-[13px] font-semibold leading-4 sm:max-w-[320px]">{project?.name??"All Projects"}</strong>
      </Link>
    </div>
    <div className="flex items-center gap-0.5">
      {projectId&&<Link className={iconButton} to={projectBase+"/search"} aria-label="Search project"><Search size={17}/></Link>}
      {projectId&&<Link className={iconButton} to={projectBase+"/notifications"} aria-label="Project notifications"><Bell size={17}/></Link>}
      <AppearanceMenu/>
      <AccountMenu/>
    </div>
  </header>;
}
