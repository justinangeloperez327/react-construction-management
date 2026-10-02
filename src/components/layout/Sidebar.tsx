import { useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Link,NavLink,useLocation } from "react-router-dom";
import { getNavigationGroups,type NavigationGroup } from "@/app/navigation";
import { ShadcnCollapsible,ShadcnCollapsibleContent,ShadcnCollapsibleTrigger } from "@/components/shadcn/collapsible";
import { ShadcnSeparator } from "@/components/shadcn/separator";
import { ShadcnSheet,ShadcnSheetContent,ShadcnSheetDescription,ShadcnSheetTitle } from "@/components/shadcn/sheet";
import { cn } from "@/lib/utils";
import { useCurrentProject } from "@/features/projects/hooks/useCurrentProject";

function NavItem({label,to,icon:Icon,onNavigate}:{label:string;to:string;icon:NavigationGroup["items"][number]["icon"];onNavigate?:()=>void}){
  return <NavLink
    to={to}
    end
    onClick={onNavigate}
    className={({isActive})=>cn(
      "flex h-9 items-center gap-2 rounded-md px-2.5 text-sm font-medium transition-colors",
      isActive?"bg-accent text-accent-foreground":"text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    )}
  >
    <Icon className="size-4 shrink-0" aria-hidden="true"/>
    <span className="truncate">{label}</span>
  </NavLink>;
}

function NavigationGroupSection({group,pathname,onNavigate}:{group:NavigationGroup;pathname:string;onNavigate?:()=>void}){
  const active=group.items.some(item=>item.to===pathname);

  return <ShadcnCollapsible defaultOpen={active}>
    <ShadcnCollapsibleTrigger className="flex h-8 w-full items-center justify-between rounded-md px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
      <span>{group.label}</span>
      <ChevronDown className="size-3.5 transition-transform data-[state=open]:rotate-180"/>
    </ShadcnCollapsibleTrigger>
    <ShadcnCollapsibleContent className="mt-1 grid gap-1 pl-2">
      {group.items.map(item=><NavItem key={item.to} {...item} onNavigate={onNavigate}/>)}
    </ShadcnCollapsibleContent>
  </ShadcnCollapsible>;
}

function Navigation({projectId,onNavigate}:{projectId?:string;onNavigate?:()=>void}){
  const {pathname}=useLocation();
  const groups=getNavigationGroups(projectId);
  const [general,...projectGroups]=groups;

  return <nav className="grid gap-3" aria-label="Primary navigation">
    <div className="grid gap-1">{general.items.map(item=><NavItem key={item.to} {...item} onNavigate={onNavigate}/>)}</div>
    {projectGroups.length>0&&<>
      <ShadcnSeparator/>
      <div className="grid gap-1">
        {projectGroups.map(group=><NavigationGroupSection key={`${group.label}:${pathname}`} group={group} pathname={pathname} onNavigate={onNavigate}/>)}
      </div>
    </>}
  </nav>;
}

function SidebarContent({onNavigate}:{onNavigate?:()=>void}){
  const {projectId,project}=useCurrentProject();

  return <>
    <Link to="/projects" onClick={onNavigate} className="mb-4 block px-2">
      <strong className="block text-sm font-semibold">Construction Management</strong>
    </Link>

    {project&&<>
      <Link to={`/projects/${encodeURIComponent(project.id)}/overview`} onClick={onNavigate} className="mb-3 block rounded-md border bg-card p-2.5 transition-colors hover:bg-accent">
        <strong className="block truncate text-xs font-semibold">{project.projectNumber}</strong>
        <span className="mt-0.5 block truncate text-xs text-muted-foreground">{project.name}</span>
      </Link>
      <ShadcnSeparator className="mb-3"/>
    </>}

    <Navigation projectId={projectId||undefined} onNavigate={onNavigate}/>
  </>;
}

export function Sidebar({open,onOpenChange}:{open:boolean;onOpenChange:(open:boolean)=>void}){
  const {pathname}=useLocation();

  useEffect(()=>{onOpenChange(false)},[pathname,onOpenChange]);

  return <>
    <aside className="sticky top-0 hidden h-screen overflow-y-auto border-r bg-background p-3 lg:block" aria-label="Application sidebar">
      <SidebarContent/>
    </aside>

    <ShadcnSheet open={open} onOpenChange={onOpenChange}>
      <ShadcnSheetContent side="left" className="overflow-y-auto p-3 lg:hidden">
        <ShadcnSheetTitle className="sr-only">Navigation</ShadcnSheetTitle>
        <ShadcnSheetDescription className="sr-only">Application navigation</ShadcnSheetDescription>
        <SidebarContent onNavigate={()=>onOpenChange(false)}/>
      </ShadcnSheetContent>
    </ShadcnSheet>
  </>;
}
