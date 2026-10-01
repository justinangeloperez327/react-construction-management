import { AlertTriangle,Plus,Settings,Truck } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PageHeader } from "@/components/layout";
import { Button,ConfirmationDialog,Dialog,ErrorState,MetricCard,Skeleton } from "@/components/ui";
import type { Project } from "@/features/projects/types/project";
import { EquipmentForm } from "@/features/equipment/components/EquipmentForm";
import { EquipmentTable } from "@/features/equipment/components/EquipmentTable";
import { useCreateEquipment,useDeleteEquipment,useEquipment,useUpdateEquipment } from "@/features/equipment/hooks/useEquipment";
import type { EquipmentEntry } from "@/features/equipment/types/equipment";

export function EquipmentPage(){
  const {project}=useOutletContext<{project:Project}>();
  const query=useEquipment(project.id);
  const create=useCreateEquipment(project.id),update=useUpdateEquipment(project.id),remove=useDeleteEquipment(project.id);
  const [adding,setAdding]=useState(false),[editing,setEditing]=useState<EquipmentEntry>(),[deleting,setDeleting]=useState<string>();
  if(query.isLoading)return <div className="table-loading"><Skeleton/><Skeleton/><Skeleton/></div>;
  if(query.isError)return <ErrorState title="Unable to load equipment" description="Project equipment records could not be retrieved." onRetry={()=>void query.refetch()}/>;
  const data=query.data??[],today=new Date().toISOString().slice(0,10);
  const serviceDue=data.filter(x=>x.nextServiceDate&&x.nextServiceDate<=today&&x.status!=="off-hire").length;

  return <><PageHeader eyebrow={project.projectNumber} title="Equipment" description="Manage project plant, equipment deployment, operating status and maintenance visibility." actions={<Button onClick={()=>setAdding(true)}><Plus size={16}/>Add equipment</Button>}/><section className="metrics"><MetricCard label="Registered equipment" value={data.length} detail="Project plant register" icon={<Truck size={19}/>}/><MetricCard label="In use" value={data.filter(x=>x.status==="in-use").length} detail="Currently deployed"/><MetricCard label="Maintenance / breakdown" value={data.filter(x=>x.status==="under-maintenance"||x.status==="breakdown").length} detail="Unavailable for operations" icon={<Settings size={19}/>}/><MetricCard label="Service due" value={serviceDue} detail="Due through today" icon={<AlertTriangle size={19}/>}/></section><section className="card"><EquipmentTable items={data} onEdit={setEditing} onDelete={setDeleting}/></section><Dialog open={adding} title="Add equipment" description="Register plant or equipment deployed to this project." onClose={()=>setAdding(false)}><EquipmentForm onCancel={()=>setAdding(false)} onSubmit={async values=>{await create.mutateAsync({...values,projectId:project.id});setAdding(false)}}/></Dialog><Dialog open={!!editing} title="Edit equipment" description="Update deployment, operating status and maintenance information." onClose={()=>setEditing(undefined)}>{editing&&<EquipmentForm defaultValues={editing} onCancel={()=>setEditing(undefined)} onSubmit={async values=>{await update.mutateAsync({id:editing.id,input:{...values,projectId:project.id}});setEditing(undefined)}}/>}</Dialog><ConfirmationDialog open={!!deleting} title="Delete equipment?" description="This removes the selected equipment from the project register." confirmLabel="Delete equipment" danger onClose={()=>setDeleting(undefined)} onConfirm={async()=>{if(deleting)await remove.mutateAsync(deleting);setDeleting(undefined)}}/></>;
}
