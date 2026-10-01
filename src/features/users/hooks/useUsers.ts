import { useMutation,useQuery,useQueryClient } from "@tanstack/react-query";
import { userRepository } from "@/features/users/api";
import type { ProjectUserInput } from "@/features/users/types/user";

const key=(projectId:string)=>["projects",projectId,"users"] as const;

export function useUsers(projectId:string){
  return useQuery({queryKey:key(projectId),queryFn:()=>userRepository.getByProject(projectId),enabled:!!projectId});
}

export function useCreateUser(projectId:string){
  const client=useQueryClient();
  return useMutation({mutationFn:(input:ProjectUserInput)=>userRepository.create(input),onSuccess:async()=>client.invalidateQueries({queryKey:key(projectId)})});
}

export function useUpdateUser(projectId:string){
  const client=useQueryClient();
  return useMutation({mutationFn:({id,input}:{id:string;input:ProjectUserInput})=>userRepository.update(id,input),onSuccess:async()=>client.invalidateQueries({queryKey:key(projectId)})});
}

export function useDeleteUser(projectId:string){
  const client=useQueryClient();
  return useMutation({mutationFn:(id:string)=>userRepository.delete(id),onSuccess:async()=>client.invalidateQueries({queryKey:key(projectId)})});
}
