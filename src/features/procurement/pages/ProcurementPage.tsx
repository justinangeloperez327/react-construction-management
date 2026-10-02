import { AlertTriangle,PackageCheck,Plus,ShoppingCart } from "lucide-react";
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

const compact=(value:number)=>new Intl.NumberFormat("en-AE",{notation:"compact",maximumFractionDigits:1}).format(value);

export function ProcurementPage(){
  const {project}=useOutletContext<{project:Project}>();
  const query=useProcurement(project.id),materials=useMaterials(project.id);
  const create=useCreateProcurement(project.id),update=useUpdateProcurement(project.id),remove=useDeleteProcurement(project.id);
  const [adding,setAdding]=useState(false),[editing,setEditing]=useState<ProcurementItem>(),[deleting,setDeleting]=useState<string>();

  if(query.isLoading||materials.isLoading)return <div className="grid gap-2"><Skeleton/><Skeleton/><Skeleton/></div>;
  if(query.isError||materials.isError)return <ErrorState title="Unable to load procurement" description="Procurement data could not be retrieved." onRetry={()=>{void query.refetch();void materials.refetch()}}/>;

  const data=query.data??[];
  const exposure=data.filter(x=>!["delivered","cancelled"].includes(x.status)).reduce((sum,item)=>sum+item.estimatedValue,0);
  const ordered=data.filter(x=>["ordered","partially-delivered"].includes(x.status)).length;
  const critical=data.filter(x=>x.priority==="critical"&&!["delivered","cancelled"].includes(x.status)).length;

  return <>
    <PageHeader eyebrow={project.projectNumber} title="Procurement" actions={<Button onClick={()=>setAdding(true)}><Plus size={16}/>New request</Button>}/>
    <section className="grid gap-3 sm:grid-cols-3">
      <MetricCard label="Ordered" value={ordered} icon={<ShoppingCart size={18}/>}/>
      <MetricCard label="Critical" value={critical} icon={<AlertTriangle size={18}/>}/>
      <MetricCard label="Open value" value={"AED "+compact(exposure)} icon={<PackageCheck size={18}/>}/>
    </section>
    <div className="mt-4"><ProcurementTable items={data} onEdit={setEditing} onDelete={setDeleting}/></div>
    <Dialog open={adding} title="New procurement request" onClose={()=>setAdding(false)}>
      <ProcurementForm materials={materials.data??[]} onCancel={()=>setAdding(false)} onSubmit={async values=>{await create.mutateAsync({...values,projectId:project.id});setAdding(false)}}/>
    </Dialog>
    <Dialog open={!!editing} title="Edit procurement request" onClose={()=>setEditing(undefined)}>
      {editing&&<ProcurementForm materials={materials.data??[]} defaultValues={editing} onCancel={()=>setEditing(undefined)} onSubmit={async values=>{await update.mutateAsync({id:editing.id,input:{...values,projectId:project.id}});setEditing(undefined)}}/>}
    </Dialog>
    <ConfirmationDialog open={!!deleting} title="Delete procurement request?" description="This removes the request from the project." confirmLabel="Delete" danger onClose={()=>setDeleting(undefined)} onConfirm={async()=>{if(deleting)await remove.mutateAsync(deleting);setDeleting(undefined)}}/>
  </>;
}
