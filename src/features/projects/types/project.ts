import type { EntityId } from "@/shared/types";
export type ProjectStatus="planning"|"active"|"on-hold"|"completed"|"cancelled";
export interface Project{id:EntityId;projectNumber:string;name:string;client:string;manager:string;progress:number;status:ProjectStatus;plannedCompletion:string}
