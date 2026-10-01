import { Bell,Menu,Search } from "lucide-react";
import { Link,useLocation } from "react-router-dom";
import { useProject } from "@/features/projects/hooks/useProjects";

export function AppHeader({onMenu}:{onMenu:()=>void}){
  const {pathname}=useLocation();
  const match=pathname.match(/^\/projects\/([^/]+)/);
  const projectId=match?.[1]?decodeURIComponent(match[1]):"";
  const project=useProject(projectId);

  return <header className="header"><div className="header-left"><button className="icon-button mobile-menu" onClick={onMenu} aria-label="Open navigation"><Menu size={20}/></button><Link className="project-selector" to="/projects"><span className="project-selector-label">Current project</span><strong>{project.data?.name??"All Projects"}</strong></Link></div><div className="header-actions">{projectId?<><Link className="icon-button" to={`/projects/${encodeURIComponent(projectId)}/search`} aria-label="Search project"><Search size={19}/></Link><Link className="icon-button notification-button" to={`/projects/${encodeURIComponent(projectId)}/notifications`} aria-label="Project notifications"><Bell size={19}/></Link></>:<><button className="icon-button" type="button" disabled aria-label="Select a project to search"><Search size={19}/></button><button className="icon-button" type="button" disabled aria-label="Select a project to view notifications"><Bell size={19}/></button></>}<div className="user-button" aria-label="Current user"><span className="avatar">JP</span><span className="user-copy"><strong>Justin Perez</strong><small>Developer</small></span></div></div></header>;
}
