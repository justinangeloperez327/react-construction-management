import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useProjects } from "./useProjects";

export const currentProjectStorageKey="construction-management-current-project";

function storedProjectId(){
  if(typeof window==="undefined")return "";
  return window.localStorage.getItem(currentProjectStorageKey)??"";
}

export function useCurrentProject(){
  const {pathname}=useLocation();
  const routeMatch=pathname.match(/^\/projects\/([^/]+)/);
  const routeProjectId=routeMatch?.[1]?decodeURIComponent(routeMatch[1]):"";
  const query=useProjects();
  const projects=query.data??[];
  const stored=storedProjectId();
  const storedExists=projects.some(project=>project.id===stored);
  const projectId=routeProjectId||(storedExists?stored:"")||projects[0]?.id||"";
  const project=projects.find(item=>item.id===projectId);

  useEffect(()=>{
    if(projectId)window.localStorage.setItem(currentProjectStorageKey,projectId);
  },[projectId]);

  return {...query,projectId,project};
}
