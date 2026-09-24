import { useMutation,useQuery,useQueryClient } from "@tanstack/react-query";import { wbsRepository } from "@/features/wbs/api";import type { WbsInput } from "@/features/wbs/types/wbs";
const key=(projectId:string)=>["projects",projectId,"wbs"] as const;
export function useWbs(projectId:string){return useQuery({queryKey:key(projectId),queryFn:()=>wbsRepository.getByProject(projectId),enabled:!!projectId})}
export function useCreateWbsItem(projectId:string){const client=useQueryClient();return useMutation({mutationFn:(input:WbsInput)=>wbsRepository.create(input),onSuccess:async()=>client.invalidateQueries({queryKey:key(projectId)})})}
export function useDeleteWbsItem(projectId:string){const client=useQueryClient();return useMutation({mutationFn:(id:string)=>wbsRepository.delete(id),onSuccess:async()=>client.invalidateQueries({queryKey:key(projectId)})})}
