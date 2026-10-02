import { AlertTriangle,CalendarCheck2,ClipboardCheck,Plus } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PageHeader } from "@/components/layout";
import { Button,ConfirmationDialog,Dialog,ErrorState,MetricCard,Skeleton } from "@/components/ui";
import type { Project } from "@/features/projects/types/project";
import { useWbs } from "@/features/wbs/hooks/useWbs";
import { useActivities } from "@/features/activities/hooks/useActivities";
import { useMaterials } from "@/features/materials/hooks/useMaterials";
import { useDrawings } from "@/features/drawings/hooks/useDrawings";
import { InspectionForm } from "@/features/inspections/components/InspectionForm";
import { InspectionsTable } from "@/features/inspections/components/InspectionsTable";
import { useCreateInspection,useDeleteInspection,useInspections,useUpdateInspection } from "@/features/inspections/hooks/useInspections";
import type { Inspection } from "@/features/inspections/types/inspection";

export function InspectionsPage(){
  const {project}=useOutletContext<{project:Project}>();
  const query=useInspections(project.id),wbs=useWbs(project.id),activities=useActivities(project.id),materials=useMaterials(project.id),drawings=useDrawings(project.id);
  const create=useCreateInspection(project.id),update=useUpdateInspection(project.id),remove=useDeleteInspection(project.id);
  const [adding,setAdding]=useState(false),[editing,setEditing]=useState<Inspection>(),[deleting,setDeleting]=useState<string>();
  if(query.isLoading||wbs.isLoading||activities.isLoading||materials.isLoading||drawings.isLoading)return <div className="grid gap-2 [&>*]:h-10"><Skeleton/><Skeleton/><Skeleton/></div>;
  if(query.isError||wbs.isError||activities.isError||materials.isError||drawings.isError)return <ErrorState title="Unable to load inspections" description="Inspection or linked project records could not be retrieved." onRetry={()=>{void query.refetch();void wbs.refetch();void activities.refetch();void materials.refetch();void drawings.refetch()}}/>;
  const data=query.data??[],pending=data.filter(x=>["requested","scheduled"].includes(x.status)),passed=data.filter(x=>["passed","passed-with-comments"].includes(x.status)),failed=data.filter(x=>x.status==="failed");

  return <><PageHeader eyebrow={project.projectNumber} title="Inspections" description="Manage work and material inspection requests, results and quality follow-up." actions={<Button onClick={()=>setAdding(true)}><Plus size={16}/>New inspection</Button>}/><section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><MetricCard label="Inspections" value={data.length} detail="Inspection register" icon={<ClipboardCheck size={19}/>}/><MetricCard label="Pending" value={pending.length} detail="Requested or scheduled" icon={<CalendarCheck2 size={19}/>}/><MetricCard label="Passed" value={passed.length} detail="Accepted inspections"/><MetricCard label="Failed" value={failed.length} detail="Requires attention" icon={<AlertTriangle size={19}/>}/></section><section className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm"><InspectionsTable items={data} onEdit={setEditing} onDelete={setDeleting}/></section><Dialog open={adding} title="New inspection" description="Register an inspection and link it to the relevant project records." onClose={()=>setAdding(false)}><InspectionForm wbsItems={wbs.data??[]} activities={activities.data??[]} materials={materials.data??[]} drawings={drawings.data??[]} onCancel={()=>setAdding(false)} onSubmit={async values=>{await create.mutateAsync({...values,projectId:project.id});setAdding(false)}}/></Dialog><Dialog open={!!editing} title="Edit inspection" description="Update scheduling, result and corrective-action requirements." onClose={()=>setEditing(undefined)}>{editing&&<InspectionForm wbsItems={wbs.data??[]} activities={activities.data??[]} materials={materials.data??[]} drawings={drawings.data??[]} defaultValues={editing} onCancel={()=>setEditing(undefined)} onSubmit={async values=>{await update.mutateAsync({id:editing.id,input:{...values,projectId:project.id}});setEditing(undefined)}}/>}</Dialog><ConfirmationDialog open={!!deleting} title="Delete inspection?" description="This removes the inspection from the project register." confirmLabel="Delete inspection" danger onClose={()=>setDeleting(undefined)} onConfirm={async()=>{if(deleting)await remove.mutateAsync(deleting);setDeleting(undefined)}}/></>;
}
