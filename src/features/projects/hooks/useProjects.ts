import { useMutation,useQuery,useQueryClient } from "@tanstack/react-query";
import { projectRepository } from "@/features/projects/api";
import type { ProjectInput } from "@/features/projects/schemas/project.api.schema";
import { queryKeys } from "@/services/api";
export function useProjects(){return useQuery({queryKey:queryKeys.projects.all,queryFn:()=>projectRepository.getAll()})}
export function useProject(id:string){return useQuery({queryKey:queryKeys.projects.detail(id),queryFn:()=>projectRepository.getById(id),enabled:!!id})}
export function useCreateProject(){const client=useQueryClient();return useMutation({mutationFn:(input:ProjectInput)=>projectRepository.create(input),onSuccess:async()=>{await client.invalidateQueries({queryKey:queryKeys.projects.all})}})}
export function useUpdateProject(){const client=useQueryClient();return useMutation({mutationFn:({id,input}:{id:string;input:ProjectInput})=>projectRepository.update(id,input),onSuccess:async project=>{client.setQueryData(queryKeys.projects.detail(project.id),project);await client.invalidateQueries({queryKey:queryKeys.projects.all})}})}
export function useDeleteProject(){const client=useQueryClient();return useMutation({mutationFn:(id:string)=>projectRepository.delete(id),onSuccess:async()=>{await client.invalidateQueries({queryKey:queryKeys.projects.all})}})}
