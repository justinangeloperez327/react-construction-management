import { ShieldCheck,UserPlus,Users } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PageHeader } from "@/components/layout";
import { Button,ConfirmationDialog,Dialog,ErrorState,MetricCard,Skeleton } from "@/components/ui";
import type { Project } from "@/features/projects/types/project";
import { UserForm } from "@/features/users/components/UserForm";
import { UsersTable } from "@/features/users/components/UsersTable";
import { useCreateUser,useDeleteUser,useUpdateUser,useUsers } from "@/features/users/hooks/useUsers";
import type { ProjectUser } from "@/features/users/types/user";

export function UsersPage(){
  const {project}=useOutletContext<{project:Project}>();
  const query=useUsers(project.id),create=useCreateUser(project.id),update=useUpdateUser(project.id),remove=useDeleteUser(project.id);
  const [adding,setAdding]=useState(false),[editing,setEditing]=useState<ProjectUser>(),[deleting,setDeleting]=useState<string>();
  if(query.isLoading)return <div className="grid gap-2 [&>*]:h-10"><Skeleton/><Skeleton/></div>;
  if(query.isError)return <ErrorState title="Unable to load project users" description="Project access records could not be retrieved." onRetry={()=>void query.refetch()}/>;
  const data=query.data??[];

  return <><PageHeader eyebrow={project.projectNumber} title="Users & Authorization" description="Manage project membership and role-based permissions." actions={<Button onClick={()=>setAdding(true)}><UserPlus size={16}/>Add user</Button>}/><section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><MetricCard label="Project users" value={data.length} detail="Assigned members" icon={<Users size={19}/>}/><MetricCard label="Active" value={data.filter(x=>x.status==="active").length} detail="Active access"/><MetricCard label="Privileged roles" value={data.filter(x=>x.permissions.includes("users.manage")||x.permissions.includes("commercial.manage")).length} detail="Administrative or commercial access" icon={<ShieldCheck size={19}/>}/></section><section className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm"><UsersTable items={data} onEdit={setEditing} onDelete={setDeleting}/></section><Dialog open={adding} title="Add project user" description="Role policies determine the user's project permissions." onClose={()=>setAdding(false)}><UserForm onCancel={()=>setAdding(false)} onSubmit={async values=>{await create.mutateAsync({...values,projectId:project.id});setAdding(false)}}/></Dialog><Dialog open={!!editing} title="Edit project user" description="Update project role and membership status." onClose={()=>setEditing(undefined)}>{editing&&<UserForm defaultValues={editing} onCancel={()=>setEditing(undefined)} onSubmit={async values=>{await update.mutateAsync({id:editing.id,input:{...values,projectId:project.id}});setEditing(undefined)}}/>}</Dialog><ConfirmationDialog open={!!deleting} title="Remove project user?" description="This removes the user's membership from the current project." confirmLabel="Remove user" danger onClose={()=>setDeleting(undefined)} onConfirm={async()=>{if(deleting)await remove.mutateAsync(deleting);setDeleting(undefined)}}/></>;
}
