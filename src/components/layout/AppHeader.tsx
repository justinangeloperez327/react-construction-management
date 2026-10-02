import { Bell,Menu,Search } from "lucide-react";
import { Link } from "react-router-dom";
import { ShadcnButton,buttonVariants } from "@/components/shadcn/button";
import { useCurrentProject } from "@/features/projects/hooks/useCurrentProject";
import { AccountMenu } from "./AccountMenu";
import { AppearanceMenu } from "./AppearanceMenu";

export function AppHeader({onMenu}:{onMenu:()=>void}){
  const {projectId,project}=useCurrentProject();
  const projectBase=projectId?`/projects/${encodeURIComponent(projectId)}`:"";

  return <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:px-6 lg:px-8">
    <div className="flex min-w-0 items-center gap-2">
      <ShadcnButton className="lg:hidden" variant="ghost" size="icon" onClick={onMenu} aria-label="Open navigation">
        <Menu className="size-4"/>
      </ShadcnButton>
      <Link className="min-w-0 truncate text-sm font-medium transition-colors hover:text-primary" to={projectBase?projectBase+"/overview":"/projects"}>
        {project?.name??"Projects"}
      </Link>
    </div>
    <div className="flex items-center gap-1">
      {projectId&&<Link className={buttonVariants({variant:"ghost",size:"icon"})} to={projectBase+"/search"} aria-label="Search project"><Search className="size-4"/></Link>}
      {projectId&&<Link className={buttonVariants({variant:"ghost",size:"icon"})} to={projectBase+"/notifications"} aria-label="Project notifications"><Bell className="size-4"/></Link>}
      <AppearanceMenu/>
      <AccountMenu/>
    </div>
  </header>;
}
