import { Plus } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/layout";
import { Button,Dialog,ErrorState,Skeleton } from "@/components/ui";
import { ProjectForm } from "@/features/projects/components/ProjectForm";
import { ProjectsTable } from "@/features/projects/components/ProjectsTable";
import { useCreateProject,useProjects } from "@/features/projects/hooks/useProjects";
export function ProjectsPage(){const {data=[],isLoading,isError,refetch}=useProjects();const createProject=useCreateProject();const [creating,setCreating]=useState(false);return <><PageHeader title="Projects" description="Construction project register." actions={<Button onClick={()=>setCreating(true)}><Plus size={16} aria-hidden="true"/> New project</Button>}/><section className="card">{isLoading?<div className="table-loading"><Skeleton/><Skeleton/><Skeleton/><Skeleton/></div>:isError?<ErrorState title="Unable to load projects" description="The project register could not be retrieved." onRetry={()=>void refetch()}/>:<ProjectsTable projects={data}/>}</section><Dialog open={creating} title="Create project" description="Add the core project information." onClose={()=>setCreating(false)}><ProjectForm onSubmit={async values=>{await createProject.mutateAsync(values);setCreating(false)}}/></Dialog></>}
