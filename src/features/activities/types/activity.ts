import type { Discipline,Priority,WorkStatus } from "@/shared/types";
export interface Activity{id:string;projectId:string;wbsId:string;activityNumber:string;name:string;description?:string;discipline:Discipline;priority:Priority;status:WorkStatus;plannedStart:string;plannedFinish:string;progress:number;responsible:string}
export type ActivityInput=Omit<Activity,"id">;
