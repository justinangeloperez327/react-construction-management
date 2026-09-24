import { useOutletContext } from "react-router-dom";
import { PageHeader } from "@/components/layout";
import { Card,CardContent,CardHeader } from "@/components/ui";
import type { Project } from "@/features/projects/types/project";
export function ProjectModulePage({title,description}:{title:string;description:string}){const {project}=useOutletContext<{project:Project}>();return <><PageHeader eyebrow={project.projectNumber} title={title} description={description}/><Card><CardHeader title={`${project.name} — ${title}`} description="This project-scoped module is connected to the workspace. Its business workflow will be implemented in the corresponding development group."/><CardContent><p className="muted">All records created here will belong to {project.projectNumber}.</p></CardContent></Card></>}
