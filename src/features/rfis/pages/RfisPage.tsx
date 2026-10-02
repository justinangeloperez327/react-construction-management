import { AlertTriangle,Clock3,Plus } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PageHeader } from "@/components/layout";
import { Button,ConfirmationDialog,Dialog,ErrorState,MetricCard,Skeleton } from "@/components/ui";
import type { Project } from "@/features/projects/types/project";
import { useWbs } from "@/features/wbs/hooks/useWbs";
import { useDrawings } from "@/features/drawings/hooks/useDrawings";
import { RfiForm } from "@/features/rfis/components/RfiForm";
import { RfisTable } from "@/features/rfis/components/RfisTable";
import { useCreateRfi,useDeleteRfi,useRfis,useUpdateRfi } from "@/features/rfis/hooks/useRfis";
import type { Rfi } from "@/features/rfis/types/rfi";

export function RfisPage(){
  const {project}=useOutletContext<{project:Project}>();
  const query=useRfis(project.id),wbs=useWbs(project.id),drawings=useDrawings(project.id);
  const create=useCreateRfi(project.id),update=useUpdateRfi(project.id),remove=useDeleteRfi(project.id);
  const [adding,setAdding]=useState(false),[editing,setEditing]=useState<Rfi>(),[deleting,setDeleting]=useState<string>();

  if(query.isLoading||wbs.isLoading||drawings.isLoading)return <div className="grid gap-2"><Skeleton/><Skeleton/><Skeleton/></div>;
  if(query.isError||wbs.isError||drawings.isError)return <ErrorState title="Unable to load RFIs" description="RFI data could not be retrieved." onRetry={()=>{void query.refetch();void wbs.refetch();void drawings.refetch()}}/>;

  const data=query.data??[];
  const today=new Date().toISOString().slice(0,10);
  const open=data.filter(x=>x.status==="open");
  const overdue=open.filter(x=>x.responseDueDate<today);
  const impact=open.filter(x=>x.costImpact||x.scheduleImpact);

  return <>
    <PageHeader eyebrow={project.projectNumber} title="RFIs" actions={<Button onClick={()=>setAdding(true)}><Plus size={16}/>New RFI</Button>}/>
    <section className="grid gap-3 sm:grid-cols-3">
      <MetricCard label="Open" value={open.length} icon={<Clock3 size={18}/>}/>
      <MetricCard label="Overdue" value={overdue.length} icon={<AlertTriangle size={18}/>}/>
      <MetricCard label="Impact flagged" value={impact.length}/>
    </section>
    <div className="mt-4"><RfisTable items={data} onEdit={setEditing} onDelete={setDeleting}/></div>
    <Dialog open={adding} title="New RFI" onClose={()=>setAdding(false)}>
      <RfiForm wbsItems={wbs.data??[]} drawings={drawings.data??[]} onCancel={()=>setAdding(false)} onSubmit={async values=>{await create.mutateAsync({...values,projectId:project.id});setAdding(false)}}/>
    </Dialog>
    <Dialog open={!!editing} title="Edit RFI" onClose={()=>setEditing(undefined)}>
      {editing&&<RfiForm wbsItems={wbs.data??[]} drawings={drawings.data??[]} defaultValues={editing} onCancel={()=>setEditing(undefined)} onSubmit={async values=>{await update.mutateAsync({id:editing.id,input:{...values,projectId:project.id}});setEditing(undefined)}}/>}
    </Dialog>
    <ConfirmationDialog open={!!deleting} title="Delete RFI?" description="This removes the RFI from the project." confirmLabel="Delete" danger onClose={()=>setDeleting(undefined)} onConfirm={async()=>{if(deleting)await remove.mutateAsync(deleting);setDeleting(undefined)}}/>
  </>;
}
