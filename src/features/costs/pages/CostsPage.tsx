import { Banknote,CircleDollarSign,Plus,TrendingUp } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PageHeader } from "@/components/layout";
import { Button,ConfirmationDialog,Dialog,ErrorState,MetricCard,Skeleton } from "@/components/ui";
import type { Project } from "@/features/projects/types/project";
import { useWbs } from "@/features/wbs/hooks/useWbs";
import { CostForm } from "@/features/costs/components/CostForm";
import { CostsTable } from "@/features/costs/components/CostsTable";
import { useCosts,useCreateCost,useDeleteCost,useUpdateCost } from "@/features/costs/hooks/useCosts";
import type { CostItem } from "@/features/costs/types/cost";

const compact=(value:number)=>"AED "+new Intl.NumberFormat("en-AE",{notation:"compact",maximumFractionDigits:1}).format(value);

export function CostsPage(){
  const {project}=useOutletContext<{project:Project}>();
  const query=useCosts(project.id),wbs=useWbs(project.id);
  const create=useCreateCost(project.id),update=useUpdateCost(project.id),remove=useDeleteCost(project.id);
  const [adding,setAdding]=useState(false),[editing,setEditing]=useState<CostItem>(),[deleting,setDeleting]=useState<string>();

  if(query.isLoading||wbs.isLoading)return <div className="grid gap-2"><Skeleton/><Skeleton/><Skeleton/></div>;
  if(query.isError||wbs.isError)return <ErrorState title="Unable to load cost control" description="Cost data could not be retrieved." onRetry={()=>{void query.refetch();void wbs.refetch()}}/>;

  const data=query.data??[];
  const budget=data.reduce((sum,item)=>sum+item.budget,0);
  const committed=data.reduce((sum,item)=>sum+item.committed,0);
  const actual=data.reduce((sum,item)=>sum+item.actual,0);
  const forecast=data.reduce((sum,item)=>sum+item.forecast,0);
  const variance=budget-forecast;

  return <>
    <PageHeader eyebrow={project.projectNumber} title="Cost Control" actions={<Button onClick={()=>setAdding(true)}><Plus size={16}/>Add cost item</Button>}/>
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard label="Budget" value={compact(budget)} icon={<Banknote size={18}/>}/>
      <MetricCard label="Committed" value={compact(committed)} icon={<CircleDollarSign size={18}/>}/>
      <MetricCard label="Actual" value={compact(actual)}/>
      <MetricCard label="Forecast" value={compact(forecast)} detail={(variance>=0?"+":"")+compact(variance)+" variance"} icon={<TrendingUp size={18}/>}/>
    </section>
    <div className="mt-4"><CostsTable items={data} wbsItems={wbs.data??[]} onEdit={setEditing} onDelete={setDeleting}/></div>
    <Dialog open={adding} title="Add cost item" onClose={()=>setAdding(false)}>
      <CostForm wbsItems={wbs.data??[]} onCancel={()=>setAdding(false)} onSubmit={async values=>{await create.mutateAsync({...values,projectId:project.id});setAdding(false)}}/>
    </Dialog>
    <Dialog open={!!editing} title="Edit cost item" onClose={()=>setEditing(undefined)}>
      {editing&&<CostForm wbsItems={wbs.data??[]} defaultValues={editing} onCancel={()=>setEditing(undefined)} onSubmit={async values=>{await update.mutateAsync({id:editing.id,input:{...values,projectId:project.id}});setEditing(undefined)}}/>}
    </Dialog>
    <ConfirmationDialog open={!!deleting} title="Delete cost item?" description="This removes the cost item from the project." confirmLabel="Delete" danger onClose={()=>setDeleting(undefined)} onConfirm={async()=>{if(deleting)await remove.mutateAsync(deleting);setDeleting(undefined)}}/>
  </>;
}
