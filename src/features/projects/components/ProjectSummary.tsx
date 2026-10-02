import { ShadcnCard,ShadcnCardContent } from "@/components/shadcn/card";
import { ShadcnProgress } from "@/components/shadcn/progress";
import type { Project } from "@/features/projects/types/project";

export function ProjectSummary({project}:{project:Project}){
  return <ShadcnCard className="shadow-none">
    <ShadcnCardContent className="p-4">
      <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">
        <div><dt className="text-xs text-muted-foreground">Client</dt><dd className="mt-1 text-sm font-medium">{project.client}</dd></div>
        <div><dt className="text-xs text-muted-foreground">Project manager</dt><dd className="mt-1 text-sm font-medium">{project.manager}</dd></div>
        <div><dt className="text-xs text-muted-foreground">Planned completion</dt><dd className="mt-1 text-sm font-medium">{project.plannedCompletion}</dd></div>
        <div>
          <dt className="text-xs text-muted-foreground">Progress</dt>
          <dd className="mt-1 flex items-center gap-3"><ShadcnProgress className="max-w-36" value={project.progress}/><span className="text-sm font-medium">{project.progress}%</span></dd>
        </div>
      </dl>
    </ShadcnCardContent>
  </ShadcnCard>;
}
