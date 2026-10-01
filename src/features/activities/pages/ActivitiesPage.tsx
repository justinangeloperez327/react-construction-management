import { Plus } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PageHeader } from "@/components/layout";
import { Button,ConfirmationDialog,Dialog,ErrorState,Skeleton } from "@/components/ui";
import type { Project } from "@/features/projects/types/project";
import { ActivityForm } from "@/features/activities/components/ActivityForm";
import { ActivitiesTable } from "@/features/activities/components/ActivitiesTable";
import { useActivities,useCreateActivity,useDeleteActivity,useUpdateActivity } from "@/features/activities/hooks/useActivities";
import type { Activity } from "@/features/activities/types/activity";
import { useWbs } from "@/features/wbs/hooks/useWbs";

export function ActivitiesPage(){
  const {project}=useOutletContext<{project:Project}>();
  const activities=useActivities(project.id),wbs=useWbs(project.id);
  const create=useCreateActivity(project.id),update=useUpdateActivity(project.id),remove=useDeleteActivity(project.id);
  const [adding,setAdding]=useState(false),[editing,setEditing]=useState<Activity>(),[deleting,setDeleting]=useState<string>();
  const loading=activities.isLoading||wbs.isLoading,failed=activities.isError||wbs.isError;

  return <><PageHeader eyebrow={project.projectNumber} title="Activities" description="Plan and control execution activities against the project Work Breakdown Structure." actions={<Button onClick={()=>setAdding(true)} disabled={!wbs.data?.length}><Plus size={16}/>Add activity</Button>}/><section className="card">{loading?<div className="table-loading"><Skeleton/><Skeleton/><Skeleton/></div>:failed?<ErrorState title="Unable to load activities" description="Activities or WBS scope could not be retrieved." onRetry={()=>{void activities.refetch();void wbs.refetch()}}/>:<ActivitiesTable activities={activities.data??[]} wbsItems={wbs.data??[]} onEdit={setEditing} onDelete={setDeleting}/>}</section><Dialog open={adding} title="Add activity" description="Create an execution activity linked to a WBS scope item." onClose={()=>setAdding(false)}><ActivityForm wbsItems={wbs.data??[]} onCancel={()=>setAdding(false)} onSubmit={async values=>{await create.mutateAsync({...values,projectId:project.id});setAdding(false)}}/></Dialog><Dialog open={!!editing} title="Edit activity" description="Update responsibility, dates, status and progress." onClose={()=>setEditing(undefined)}>{editing&&<ActivityForm wbsItems={wbs.data??[]} defaultValues={editing} onCancel={()=>setEditing(undefined)} onSubmit={async values=>{await update.mutateAsync({id:editing.id,input:{...values,projectId:project.id}});setEditing(undefined)}}/>}</Dialog><ConfirmationDialog open={!!deleting} title="Delete activity?" description="This removes the activity from the current project plan." confirmLabel="Delete activity" danger onClose={()=>setDeleting(undefined)} onConfirm={async()=>{if(deleting)await remove.mutateAsync(deleting);setDeleting(undefined)}}/></>;
}
