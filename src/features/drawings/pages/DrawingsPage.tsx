import { Clock3,FileCheck2,Layers3,Plus } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PageHeader } from "@/components/layout";
import { Button,ConfirmationDialog,Dialog,ErrorState,MetricCard,Skeleton } from "@/components/ui";
import type { Project } from "@/features/projects/types/project";
import { useDocuments } from "@/features/documents/hooks/useDocuments";
import { DrawingForm } from "@/features/drawings/components/DrawingForm";
import { DrawingsTable } from "@/features/drawings/components/DrawingsTable";
import { useCreateDrawing,useDeleteDrawing,useDrawings,useUpdateDrawing } from "@/features/drawings/hooks/useDrawings";
import type { Drawing } from "@/features/drawings/types/drawing";

export function DrawingsPage(){
  const {project}=useOutletContext<{project:Project}>();
  const query=useDrawings(project.id),documents=useDocuments(project.id);
  const create=useCreateDrawing(project.id),update=useUpdateDrawing(project.id),remove=useDeleteDrawing(project.id);
  const [adding,setAdding]=useState(false),[editing,setEditing]=useState<Drawing>(),[deleting,setDeleting]=useState<string>();
  if(query.isLoading||documents.isLoading)return <div className="table-loading"><Skeleton/><Skeleton/><Skeleton/></div>;
  if(query.isError||documents.isError)return <ErrorState title="Unable to load drawings" description="Drawing or document records could not be retrieved." onRetry={()=>{void query.refetch();void documents.refetch()}}/>;
  const data=query.data??[],review=data.filter(x=>["submitted","under-review"].includes(x.status)),approved=data.filter(x=>["approved","approved-with-comments"].includes(x.status)),current=data.filter(x=>x.status!=="superseded");

  return <><PageHeader eyebrow={project.projectNumber} title="Drawings" description="Control design, shop, coordination and as-built drawing revisions." actions={<Button onClick={()=>setAdding(true)}><Plus size={16}/>Add drawing</Button>}/><section className="metrics"><MetricCard label="Current drawings" value={current.length} detail="Non-superseded revisions" icon={<Layers3 size={19}/>}/><MetricCard label="Under review" value={review.length} detail="Awaiting review" icon={<Clock3 size={19}/>}/><MetricCard label="Approved" value={approved.length} detail="Approved / comments" icon={<FileCheck2 size={19}/>}/><MetricCard label="As-built" value={data.filter(x=>x.drawingType==="as-built"&&x.status!=="superseded").length} detail="Current as-built records"/></section><section className="card"><DrawingsTable items={data} onEdit={setEditing} onDelete={setDeleting}/></section><Dialog open={adding} title="Add drawing" description="Register drawing-specific control information. Link it to Documents when a controlled document entry already exists." onClose={()=>setAdding(false)}><DrawingForm documents={documents.data??[]} onCancel={()=>setAdding(false)} onSubmit={async values=>{await create.mutateAsync({...values,projectId:project.id});setAdding(false)}}/></Dialog><Dialog open={!!editing} title="Edit drawing" description="Update revision, status and controlled-document linkage." onClose={()=>setEditing(undefined)}>{editing&&<DrawingForm documents={documents.data??[]} defaultValues={editing} onCancel={()=>setEditing(undefined)} onSubmit={async values=>{await update.mutateAsync({id:editing.id,input:{...values,projectId:project.id}});setEditing(undefined)}}/>}</Dialog><ConfirmationDialog open={!!deleting} title="Delete drawing?" description="This removes the drawing register entry. It does not delete a linked controlled document." confirmLabel="Delete drawing" danger onClose={()=>setDeleting(undefined)} onConfirm={async()=>{if(deleting)await remove.mutateAsync(deleting);setDeleting(undefined)}}/></>;
}
