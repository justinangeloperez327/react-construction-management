import { FileCheck2,FileClock,Files,Plus } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PageHeader } from "@/components/layout";
import { Button,ConfirmationDialog,Dialog,ErrorState,MetricCard,Skeleton } from "@/components/ui";
import type { Project } from "@/features/projects/types/project";
import { ReportForm } from "@/features/reports/components/ReportForm";
import { ReportsTable } from "@/features/reports/components/ReportsTable";
import { useCreateReport,useDeleteReport,useReports,useUpdateReport } from "@/features/reports/hooks/useReports";
import type { ProjectReport } from "@/features/reports/types/report";

export function ReportsPage(){
  const {project}=useOutletContext<{project:Project}>();
  const query=useReports(project.id),create=useCreateReport(project.id),update=useUpdateReport(project.id),remove=useDeleteReport(project.id);
  const [adding,setAdding]=useState(false),[editing,setEditing]=useState<ProjectReport>(),[deleting,setDeleting]=useState<string>();
  if(query.isLoading)return <div className="grid gap-2 [&>*]:h-10"><Skeleton/><Skeleton/><Skeleton/></div>;
  if(query.isError)return <ErrorState title="Unable to load reports" description="The project report register could not be retrieved." onRetry={()=>void query.refetch()}/>;
  const data=query.data??[],issued=data.filter(x=>x.status==="issued"),draft=data.filter(x=>["draft","generated"].includes(x.status));

  return <><PageHeader eyebrow={project.projectNumber} title="Reports" description="Manage controlled project reporting periods, revisions, issue status and report records." actions={<Button onClick={()=>setAdding(true)}><Plus size={16}/>New report</Button>}/><section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><MetricCard label="Reports" value={data.length} detail="Controlled report register" icon={<Files size={19}/>}/><MetricCard label="Draft / generated" value={draft.length} detail="Not yet issued" icon={<FileClock size={19}/>}/><MetricCard label="Issued" value={issued.length} detail="Issued reports" icon={<FileCheck2 size={19}/>}/><MetricCard label="Monthly reports" value={data.filter(x=>x.reportType==="monthly-progress").length} detail="Monthly progress series"/></section><section className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm"><ReportsTable items={data} onEdit={setEditing} onDelete={setDeleting}/></section><Dialog open={adding} title="New report" description="Register the report period and control metadata." onClose={()=>setAdding(false)}><ReportForm onCancel={()=>setAdding(false)} onSubmit={async values=>{await create.mutateAsync({...values,projectId:project.id});setAdding(false)}}/></Dialog><Dialog open={!!editing} title="Edit report" description="Update reporting period, revision, issue status and file reference." onClose={()=>setEditing(undefined)}>{editing&&<ReportForm defaultValues={editing} onCancel={()=>setEditing(undefined)} onSubmit={async values=>{await update.mutateAsync({id:editing.id,input:{...values,projectId:project.id}});setEditing(undefined)}}/>}</Dialog><ConfirmationDialog open={!!deleting} title="Delete report?" description="This removes the report metadata from the project report register." confirmLabel="Delete report" danger onClose={()=>setDeleting(undefined)} onConfirm={async()=>{if(deleting)await remove.mutateAsync(deleting);setDeleting(undefined)}}/></>;
}
