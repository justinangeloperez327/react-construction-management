import { Menu,X } from "lucide-react";
import { useState } from "react";
import { NavLink,Outlet,useParams } from "react-router-dom";
import { Button,ErrorState,Skeleton,StatusBadge } from "@/components/ui";
import { getStatusTone } from "@/design/status";
import { useProject } from "@/features/projects/hooks/useProjects";
import { humanize } from "@/shared/utils";

const workspaceNav=[["overview","Overview"],["search","Search"],["notifications","Notifications"],["audit","Audit Trail"],["users","Users & Access"],["wbs","WBS"],["schedule","Schedule"],["activities","Activities"],["daily-progress","Daily Progress"],["attachments","Site Photos"],["manpower","Manpower"],["equipment","Equipment"],["materials","Materials"],["procurement","Procurement"],["subcontractors","Subcontractors"],["variations","Variations"],["documents","Documents"],["drawings","Drawings"],["rfis","RFIs"],["inspections","Inspections"],["quality","Quality"],["safety","Safety"],["issues","Issues & Actions"],["reports","Reports"],["analytics","Analytics"],["costs","Costs"]] as const;

export function ProjectWorkspace(){
  const {projectId=""}=useParams();
  const [modulesOpen,setModulesOpen]=useState(false);
  const {data:project,isLoading,isError,refetch}=useProject(projectId);
  if(isLoading)return <div className="table-loading"><Skeleton/><Skeleton/></div>;
  if(isError||!project)return <ErrorState title="Unable to load project workspace" description="The selected project could not be retrieved." onRetry={()=>void refetch()}/>;
  return <div className="grid gap-5">
    <header className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="grid min-w-0 gap-1 sm:flex sm:items-baseline sm:gap-2.5"><span className="w-fit rounded-md brand-soft px-2 py-1 text-xs font-bold">{project.projectNumber}</span><strong className="truncate">{project.name}</strong><span className="text-sm text-slate-500 dark:text-slate-400">{project.client}</span></div>
      <StatusBadge tone={getStatusTone(project.status)}>{humanize(project.status)}</StatusBadge>
    </header>
    <Button variant="secondary" className="w-full sm:w-fit lg:hidden" onClick={()=>setModulesOpen(x=>!x)} aria-expanded={modulesOpen} aria-controls="project-modules"><Menu size={17}/>{modulesOpen?"Hide modules":"Project modules"}</Button>
    <nav id="project-modules" className={`${modulesOpen?"flex":"hidden"} relative flex-wrap gap-1 rounded-xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:flex lg:flex-nowrap lg:overflow-x-auto`} aria-label="Project workspace">
      {workspaceNav.map(([path,label])=><NavLink key={path} to={path} end={path==="overview"} onClick={()=>setModulesOpen(false)} className={({isActive})=>`whitespace-nowrap rounded-lg px-3 py-2 text-[13px] font-semibold transition ${isActive?"brand-nav-active":"text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"}`}>{label}</NavLink>)}
      <button className="ml-auto inline-grid size-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden" onClick={()=>setModulesOpen(false)} aria-label="Close project modules"><X size={18}/></button>
    </nav>
    <Outlet context={{project}}/>
  </div>;
}
