import { useQuery } from "@tanstack/react-query";
import { projectRepository } from "@/features/projects/api";
export function useProjects(){return useQuery({queryKey:["projects"],queryFn:()=>projectRepository.getAll()})}
