import { Plus } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/layout";
import { Button,Dialog,ErrorState,Skeleton } from "@/components/ui";
import { ProjectForm } from "@/features/projects/components/ProjectForm";
import { ProjectsTable } from "@/features/projects/components/ProjectsTable";
import { useCreateProject,useProjects } from "@/features/projects/hooks/useProjects";

export function ProjectsPage(){
  const {data=[],isLoading,isError,refetch}=useProjects();
  const createProject=useCreateProject();
  const [creating,setCreating]=useState(false);

  return <>
    <PageHeader title="Projects" actions={<Button onClick={()=>setCreating(true)}><Plus size={16} aria-hidden="true"/>New project</Button>}/>
    {isLoading
      ?<div className="grid gap-2"><Skeleton/><Skeleton/><Skeleton/><Skeleton/></div>
      :isError
        ?<ErrorState title="Unable to load projects" description="The project register could not be retrieved." onRetry={()=>void refetch()}/>
        :<ProjectsTable projects={data}/>}
    <Dialog open={creating} title="Create project" onClose={()=>setCreating(false)}>
      <ProjectForm onCancel={()=>setCreating(false)} onSubmit={async values=>{await createProject.mutateAsync(values);setCreating(false)}}/>
    </Dialog>
  </>;
}
