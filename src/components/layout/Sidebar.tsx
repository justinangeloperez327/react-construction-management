import { X } from "lucide-react";
import { NavLink,useLocation } from "react-router-dom";
import { getNavigationGroups } from "@/app/navigation";

export function Sidebar({open,onClose}:{open:boolean;onClose:()=>void}){
  const {pathname}=useLocation();
  const match=pathname.match(/^\/projects\/([^/]+)/);
  const projectId=match?.[1]?decodeURIComponent(match[1]):undefined;
  const groups=getNavigationGroups(projectId);

  return <><div className={`sidebar-backdrop ${open?"is-open":""}`} onClick={onClose} aria-hidden="true"/><aside className={`sidebar ${open?"is-open":""}`} aria-label="Application sidebar"><div className="sidebar-brand"><div><strong>Construction</strong><span>Management</span></div><button className="icon-button sidebar-close" onClick={onClose} aria-label="Close navigation"><X size={20}/></button></div><nav className="nav" aria-label="Primary navigation">{groups.map(group=><section className="nav-group" key={group.label}><h2>{group.label}</h2>{group.items.map(({label,to,icon:Icon})=><NavLink key={to} to={to} end={to==="/"||to.endsWith("/overview")} onClick={onClose}><Icon size={18} aria-hidden="true"/><span>{label}</span></NavLink>)}</section>)}</nav></aside></>;
}
