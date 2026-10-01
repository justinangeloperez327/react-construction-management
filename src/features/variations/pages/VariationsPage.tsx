import { CalendarClock,CircleDollarSign,FilePenLine,Plus } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PageHeader } from "@/components/layout";
import { Button,ConfirmationDialog,Dialog,ErrorState,MetricCard,Skeleton } from "@/components/ui";
import type { Project } from "@/features/projects/types/project";
import { useWbs } from "@/features/wbs/hooks/useWbs";
import { VariationForm } from "@/features/variations/components/VariationForm";
import { VariationsTable } from "@/features/variations/components/VariationsTable";
import { useCreateVariation,useDeleteVariation,useUpdateVariation,useVariations } from "@/features/variations/hooks/useVariations";
import type { Variation } from "@/features/variations/types/variation";

export function VariationsPage(){
  const {project}=useOutletContext<{project:Project}>();
  const query=useVariations(project.id),wbs=useWbs(project.id);
  const create=useCreateVariation(project.id),update=useUpdateVariation(project.id),remove=useDeleteVariation(project.id);
  const [adding,setAdding]=useState(false),[editing,setEditing]=useState<Variation>(),[deleting,setDeleting]=useState<string>();
  if(query.isLoading||wbs.isLoading)return <div className="table-loading"><Skeleton/><Skeleton/><Skeleton/></div>;
  if(query.isError||wbs.isError)return <ErrorState title="Unable to load variations" description="Variation or WBS records could not be retrieved." onRetry={()=>{void query.refetch();void wbs.refetch()}}/>;
  const data=query.data??[],open=data.filter(x=>["submitted","under-review"].includes(x.status)),approved=data.filter(x=>["approved","implemented"].includes(x.status));
  const approvedCost=approved.reduce((s,x)=>s+(x.approvedCostImpact??x.estimatedCostImpact),0),approvedDays=approved.reduce((s,x)=>s+(x.approvedTimeImpactDays??x.estimatedTimeImpactDays),0);

  return <><PageHeader eyebrow={project.projectNumber} title="Variations" description="Control scope changes, commercial impact, programme impact and approval status." actions={<Button onClick={()=>setAdding(true)}><Plus size={16}/>New variation</Button>}/><section className="metrics"><MetricCard label="Variations" value={data.length} detail="Project change register" icon={<FilePenLine size={19}/>}/><MetricCard label="Open changes" value={open.length} detail="Submitted or under review"/><MetricCard label="Approved cost impact" value={new Intl.NumberFormat("en-AE",{notation:"compact",maximumFractionDigits:1}).format(approvedCost)} detail="AED approved change" icon={<CircleDollarSign size={19}/>}/><MetricCard label="Approved time impact" value={approvedDays+" days"} detail="Approved extension impact" icon={<CalendarClock size={19}/>}/></section><section className="card"><VariationsTable items={data} wbsItems={wbs.data??[]} onEdit={setEditing} onDelete={setDeleting}/></section><Dialog open={adding} title="New variation" description="Register a project change and quantify its potential cost and time impact." onClose={()=>setAdding(false)}><VariationForm wbsItems={wbs.data??[]} onCancel={()=>setAdding(false)} onSubmit={async values=>{await create.mutateAsync({...values,projectId:project.id});setAdding(false)}}/></Dialog><Dialog open={!!editing} title="Edit variation" description="Update change status, approvals and commercial/programme impact." onClose={()=>setEditing(undefined)}>{editing&&<VariationForm wbsItems={wbs.data??[]} defaultValues={editing} onCancel={()=>setEditing(undefined)} onSubmit={async values=>{await update.mutateAsync({id:editing.id,input:{...values,projectId:project.id}});setEditing(undefined)}}/>}</Dialog><ConfirmationDialog open={!!deleting} title="Delete variation?" description="This removes the selected change from the variation register." confirmLabel="Delete variation" danger onClose={()=>setDeleting(undefined)} onConfirm={async()=>{if(deleting)await remove.mutateAsync(deleting);setDeleting(undefined)}}/></>;
}
