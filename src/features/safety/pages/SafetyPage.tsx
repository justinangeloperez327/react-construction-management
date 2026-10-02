import { AlertTriangle,HardHat,Plus,ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PageHeader } from "@/components/layout";
import { Button,ConfirmationDialog,Dialog,ErrorState,MetricCard,Skeleton } from "@/components/ui";
import type { Project } from "@/features/projects/types/project";
import { useWbs } from "@/features/wbs/hooks/useWbs";
import { useActivities } from "@/features/activities/hooks/useActivities";
import { SafetyForm } from "@/features/safety/components/SafetyForm";
import { SafetyTable } from "@/features/safety/components/SafetyTable";
import { useCreateSafetyRecord,useDeleteSafetyRecord,useSafety,useUpdateSafetyRecord } from "@/features/safety/hooks/useSafety";
import type { SafetyRecord } from "@/features/safety/types/safety";

export function SafetyPage(){
  const {project}=useOutletContext<{project:Project}>();
  const query=useSafety(project.id),wbs=useWbs(project.id),activities=useActivities(project.id);
  const create=useCreateSafetyRecord(project.id),update=useUpdateSafetyRecord(project.id),remove=useDeleteSafetyRecord(project.id);
  const [adding,setAdding]=useState(false),[editing,setEditing]=useState<SafetyRecord>(),[deleting,setDeleting]=useState<string>();
  if(query.isLoading||wbs.isLoading||activities.isLoading)return <div className="grid gap-2 [&>*]:h-10"><Skeleton/><Skeleton/><Skeleton/></div>;
  if(query.isError||wbs.isError||activities.isError)return <ErrorState title="Unable to load safety records" description="Safety or linked project records could not be retrieved." onRetry={()=>{void query.refetch();void wbs.refetch();void activities.refetch()}}/>;
  const data=query.data??[],open=data.filter(x=>!["closed","cancelled"].includes(x.status)),high=open.filter(x=>["high","critical"].includes(x.severity)),incidents=data.filter(x=>x.recordType==="incident"||x.recordType==="near-miss"),lostTime=data.filter(x=>x.lostTime);

  return <><PageHeader eyebrow={project.projectNumber} title="Safety" description="Track observations, near misses, incidents, investigations and corrective actions." actions={<Button onClick={()=>setAdding(true)}><Plus size={16}/>New safety record</Button>}/><section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><MetricCard label="Open safety items" value={open.length} detail="Requiring management" icon={<HardHat size={19}/>}/><MetricCard label="High / critical" value={high.length} detail="Open priority items" icon={<AlertTriangle size={19}/>}/><MetricCard label="Near misses / incidents" value={incidents.length} detail="Recorded events"/><MetricCard label="Lost-time incidents" value={lostTime.length} detail="Recorded LTI events" icon={<ShieldCheck size={19}/>}/></section><section className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm"><SafetyTable items={data} onEdit={setEditing} onDelete={setDeleting}/></section><Dialog open={adding} title="New safety record" description="Create a safety observation, event, inspection or toolbox-talk record." onClose={()=>setAdding(false)}><SafetyForm wbsItems={wbs.data??[]} activities={activities.data??[]} onCancel={()=>setAdding(false)} onSubmit={async values=>{await create.mutateAsync({...values,projectId:project.id});setAdding(false)}}/></Dialog><Dialog open={!!editing} title="Edit safety record" description="Update investigation, corrective action, outcome and closure status." onClose={()=>setEditing(undefined)}>{editing&&<SafetyForm wbsItems={wbs.data??[]} activities={activities.data??[]} defaultValues={editing} onCancel={()=>setEditing(undefined)} onSubmit={async values=>{await update.mutateAsync({id:editing.id,input:{...values,projectId:project.id}});setEditing(undefined)}}/>}</Dialog><ConfirmationDialog open={!!deleting} title="Delete safety record?" description="This removes the selected record from the project safety register." confirmLabel="Delete record" danger onClose={()=>setDeleting(undefined)} onConfirm={async()=>{if(deleting)await remove.mutateAsync(deleting);setDeleting(undefined)}}/></>;
}
