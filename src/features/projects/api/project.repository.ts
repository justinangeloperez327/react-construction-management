import type { Project } from "@/features/projects/types/project";
import type { ProjectInput } from "@/features/projects/schemas/project.api.schema";
export interface ProjectRepository{getAll():Promise<Project[]>;getById(id:string):Promise<Project>;create(input:ProjectInput):Promise<Project>;update(id:string,input:ProjectInput):Promise<Project>;delete(id:string):Promise<void>}
