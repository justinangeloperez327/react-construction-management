import { Link } from "react-router-dom";
import { Card,CardContent,CardHeader,Progress,StatusBadge } from "@/components/ui";
import { getStatusTone } from "@/design/status";
import type { Project } from "@/features/projects/types/project";
import { humanize } from "@/shared/utils";

export function ProjectHealthTable({projects}:{projects:Project[]}){
  return <Card>
    <CardHeader title="Projects"/>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b text-left text-xs text-muted-foreground">
            <tr><th className="px-2 py-2 font-medium">Project</th><th className="px-2 py-2 font-medium">Status</th><th className="px-2 py-2 font-medium">Progress</th><th className="px-2 py-2 font-medium">Manager</th><th className="px-2 py-2 font-medium">Completion</th></tr>
          </thead>
          <tbody className="divide-y">
            {projects.map(project=><tr className="hover:bg-muted/50" key={project.id}>
              <td className="px-2 py-2.5"><Link className="font-medium hover:text-primary" to={"/projects/"+project.id+"/overview"}>{project.projectNumber}</Link><div className="text-xs text-muted-foreground">{project.name}</div></td>
              <td className="px-2 py-2.5"><StatusBadge tone={getStatusTone(project.status)}>{humanize(project.status)}</StatusBadge></td>
              <td className="min-w-36 px-2 py-2.5"><Progress value={project.progress} label=""/></td>
              <td className="px-2 py-2.5">{project.manager}</td>
              <td className="px-2 py-2.5">{project.plannedCompletion}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>;
}
