import { ArrowLeft,Pencil } from "lucide-react";
import { useState } from "react";
import { Link,useOutletContext,useParams } from "react-router-dom";
import { PageHeader } from "@/components/layout";
import { Button,Dialog,ErrorState,Skeleton,StatusBadge } from "@/components/ui";
import { getStatusTone } from "@/design/status";
import { ProjectForm } from "@/features/projects/components/ProjectForm";
import { ProjectSummary } from "@/features/projects/components/ProjectSummary";
import { useProject,useUpdateProject } from "@/features/projects/hooks/useProjects";
import { humanize } from "@/shared/utils";
export function ProjectDetailsPage(){const {project:workspaceProject}=useOutletContext<{project:import("@/features/projects/types/project").Project}>();const {projectId=""}=useParams();const {data:project=workspaceProject,isLoading,isError,refetch}=useProject(projectId);const update=useUpdateProject();const [editing,setEditing]=useState(false);if(isLoading)return <div className="table-loading"><Skeleton/><Skeleton/><Skeleton/></div>;if(isError||!project)return <ErrorState title="Unable to load project" description="The requested project could not be retrieved." onRetry={()=>void refetch()}/>;return <><Link className="back-link" to="/projects"><ArrowLeft size={16}/>Projects</Link><PageHeader eyebrow={project.projectNumber} title={project.name} description={project.client} actions={<><StatusBadge tone={getStatusTone(project.status)}>{humanize(project.status)}</StatusBadge><Button variant="secondary" onClick={()=>setEditing(true)}><Pencil size={16}/>Edit project</Button></>}/><ProjectSummary project={project}/><Dialog open={editing} title="Edit project" description="Update the project register information." onClose={()=>setEditing(false)}><ProjectForm defaultValues={project} onCancel={()=>setEditing(false)} onSubmit={async values=>{await update.mutateAsync({id:project.id,input:values});setEditing(false)}}/></Dialog></>}
