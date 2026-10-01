import { AlertTriangle,ClipboardList,PackageCheck,Plus,ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PageHeader } from "@/components/layout";
import { Button,ConfirmationDialog,Dialog,ErrorState,MetricCard,Skeleton } from "@/components/ui";
import type { Project } from "@/features/projects/types/project";
import { useMaterials } from "@/features/materials/hooks/useMaterials";
import { ProcurementForm } from "@/features/procurement/components/ProcurementForm";
import { ProcurementTable } from "@/features/procurement/components/ProcurementTable";
import { useCreateProcurement,useDeleteProcurement,useProcurement,useUpdateProcurement } from "@/features/procurement/hooks/useProcurement";
import type { ProcurementItem } from "@/features/procurement/types/procurement";

export function ProcurementPage(){
  const {project}=useOutletContext<{project:Project}>();
  const query=useProcurement(project.id),materials=useMaterials(project.id);
  const create=useCreateProcurement(project.id),update=useUpdateProcurement(project.id),remove=useDeleteProcurement(project.id);
  const [adding,setAdding]=useState(false),[editing,setEditing]=useState<ProcurementItem>(),[deleting,setDeleting]=useState<string>();
  if(query.isLoading||materials.isLoading)return <div className="table-loading"><Skeleton/><Skeleton/><Skeleton/></div>;
  if(query.isError||materials.isError)return <ErrorState title="Unable to load procurement" description="Procurement or material records could not be retrieved." onRetry={()=>{void query.refetch();void materials.refetch()}}/>;
  const data=query.data??[],exposure=data.filter(x=>!["delivered","cancelled"].includes(x.status)).reduce((s,x)=>s+x.estimatedValue,0);

  return <><PageHeader eyebrow={project.projectNumber} title="Procurement" description="Manage project purchasing requirements from request through order and delivery." actions={<Button onClick={()=>setAdding(true)}><Plus size={16}/>New request</Button>}/><section className="metrics"><MetricCard label="Requests" value={data.length} detail="Procurement register" icon={<ClipboardList size={19}/>}/><MetricCard label="Ordered" value={data.filter(x=>["ordered","partially-delivered"].includes(x.status)).length} detail="Active purchase orders" icon={<ShoppingCart size={19}/>}/><MetricCard label="Critical" value={data.filter(x=>x.priority==="critical"&&!["delivered","cancelled"].includes(x.status)).length} detail="Requires attention" icon={<AlertTriangle size={19}/>}/><MetricCard label="Open estimated value" value={new Intl.NumberFormat("en-AE",{notation:"compact",maximumFractionDigits:1}).format(exposure)} detail="AED open requirements" icon={<PackageCheck size={19}/>}/></section><section className="card"><ProcurementTable items={data} onEdit={setEditing} onDelete={setDeleting}/></section><Dialog open={adding} title="New procurement request" description="Create a purchasing requirement and optionally link it to the material register." onClose={()=>setAdding(false)}><ProcurementForm materials={materials.data??[]} onCancel={()=>setAdding(false)} onSubmit={async values=>{await create.mutateAsync({...values,projectId:project.id});setAdding(false)}}/></Dialog><Dialog open={!!editing} title="Edit procurement request" description="Update supplier, commercial value, order and delivery status." onClose={()=>setEditing(undefined)}>{editing&&<ProcurementForm materials={materials.data??[]} defaultValues={editing} onCancel={()=>setEditing(undefined)} onSubmit={async values=>{await update.mutateAsync({id:editing.id,input:{...values,projectId:project.id}});setEditing(undefined)}}/>}</Dialog><ConfirmationDialog open={!!deleting} title="Delete procurement request?" description="This removes the selected requirement from the procurement register." confirmLabel="Delete request" danger onClose={()=>setDeleting(undefined)} onConfirm={async()=>{if(deleting)await remove.mutateAsync(deleting);setDeleting(undefined)}}/></>;
}
