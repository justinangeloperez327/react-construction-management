import { Plus } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PageHeader } from "@/components/layout";
import { Button,ConfirmationDialog,Dialog,ErrorState,MetricCard,Skeleton } from "@/components/ui";
import type { Project } from "@/features/projects/types/project";
import { DailyProgressForm } from "@/features/daily-progress/components/DailyProgressForm";
import { DailyProgressList } from "@/features/daily-progress/components/DailyProgressList";
import { useCreateDailyProgress,useDailyProgress,useDeleteDailyProgress } from "@/features/daily-progress/hooks/useDailyProgress";

export function DailyProgressPage(){
  const {project}=useOutletContext<{project:Project}>();
  const reports=useDailyProgress(project.id);
  const create=useCreateDailyProgress(project.id);
  const remove=useDeleteDailyProgress(project.id);
  const [adding,setAdding]=useState(false);
  const [deleting,setDeleting]=useState<string>();

  if(reports.isLoading)return <div className="grid gap-2"><Skeleton/><Skeleton/><Skeleton/></div>;
  if(reports.isError)return <ErrorState title="Unable to load daily progress" description="Daily reports could not be retrieved." onRetry={()=>void reports.refetch()}/>;

  const data=reports.data??[];
  const latest=data[0];

  return <>
    <PageHeader eyebrow={project.projectNumber} title="Daily Progress" actions={<Button onClick={()=>setAdding(true)}><Plus size={16}/>New report</Button>}/>
    <section className="grid gap-3 sm:grid-cols-3">
      <MetricCard label="Reports" value={data.length}/>
      <MetricCard label="Latest manpower" value={latest?.manpowerTotal??0} detail={latest?.reportDate}/>
      <MetricCard label="Equipment in use" value={latest?.equipmentTotal??0}/>
    </section>
    <div className="mt-4"><DailyProgressList reports={data} onDelete={setDeleting}/></div>
    <Dialog open={adding} title="New daily report" onClose={()=>setAdding(false)}>
      <DailyProgressForm onCancel={()=>setAdding(false)} onSubmit={async values=>{await create.mutateAsync({...values,projectId:project.id,entries:[]});setAdding(false)}}/>
    </Dialog>
    <ConfirmationDialog open={!!deleting} title="Delete daily report?" description="This removes the report from the project." confirmLabel="Delete" danger onClose={()=>setDeleting(undefined)} onConfirm={async()=>{if(deleting)await remove.mutateAsync(deleting);setDeleting(undefined)}}/>
  </>;
}
