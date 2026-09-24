import type { WbsInput,WbsItem } from "@/features/wbs/types/wbs";
export interface WbsRepository{getByProject(projectId:string):Promise<WbsItem[]>;create(input:WbsInput):Promise<WbsItem>;update(id:string,input:WbsInput):Promise<WbsItem>;delete(id:string):Promise<void>}
