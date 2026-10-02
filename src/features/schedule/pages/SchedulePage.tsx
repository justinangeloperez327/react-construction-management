import { useOutletContext } from "react-router-dom";
import { PageHeader } from "@/components/layout";
import { Card,CardContent,CardHeader,ErrorState,Skeleton } from "@/components/ui";
import type { Project } from "@/features/projects/types/project";
import { useActivities } from "@/features/activities/hooks/useActivities";
import { useWbs } from "@/features/wbs/hooks/useWbs";
import { ScheduleSummary } from "@/features/schedule/components/ScheduleSummary";
import { ScheduleTable } from "@/features/schedule/components/ScheduleTable";
import { ScheduleTimeline } from "@/features/schedule/components/ScheduleTimeline";

export function SchedulePage(){
  const {project}=useOutletContext<{project:Project}>();
  const activities=useActivities(project.id);
  const wbs=useWbs(project.id);

  if(activities.isLoading||wbs.isLoading)return <div className="grid gap-2"><Skeleton/><Skeleton/><Skeleton/></div>;
  if(activities.isError||wbs.isError)return <ErrorState title="Unable to load schedule" description="Schedule data could not be retrieved." onRetry={()=>{void activities.refetch();void wbs.refetch()}}/>;

  const data=activities.data??[];

  return <>
    <PageHeader eyebrow={project.projectNumber} title="Schedule"/>
    <ScheduleSummary activities={data}/>
    <div className="mt-4 grid gap-4">
      <Card><CardHeader title="Timeline"/><CardContent><ScheduleTimeline activities={data}/></CardContent></Card>
      <Card><CardHeader title="Activities"/><CardContent><ScheduleTable activities={data} wbsItems={wbs.data??[]}/></CardContent></Card>
    </div>
  </>;
}
