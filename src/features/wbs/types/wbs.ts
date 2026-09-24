import type { Discipline } from "@/shared/types";
export type WbsStatus="planned"|"in-progress"|"completed"|"on-hold";
export interface WbsItem{id:string;projectId:string;code:string;name:string;description?:string;parentId?:string;level:number;discipline:Discipline;status:WbsStatus;progress:number;weight:number;sortOrder:number}
export type WbsInput=Omit<WbsItem,"id"|"level"|"sortOrder">;
