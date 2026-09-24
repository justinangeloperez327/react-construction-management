import type { Project } from "@/features/projects/types/project";
export interface ProjectRepository{getAll():Promise<Project[]>;getById(id:string):Promise<Project>;}
