import { Outlet,useParams } from "react-router-dom";
import { ErrorState,Skeleton } from "@/components/ui";
import { useProject } from "@/features/projects/hooks/useProjects";

export function ProjectWorkspace(){
  const {projectId=""}=useParams();
  const {data:project,isLoading,isError,refetch}=useProject(projectId);

  if(isLoading)return <div className="grid gap-2 [&>*]:h-10"><Skeleton/><Skeleton/></div>;
  if(isError||!project)return <ErrorState title="Unable to load project workspace" description="The selected project could not be retrieved." onRetry={()=>void refetch()}/>;

  return <Outlet context={{project}}/>;
}
