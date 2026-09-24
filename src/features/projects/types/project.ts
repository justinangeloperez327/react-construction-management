export type ProjectStatus="planning"|"active"|"on-hold"|"completed"|"cancelled";
export interface Project{id:string;projectNumber:string;name:string;client:string;manager:string;progress:number;status:ProjectStatus;plannedCompletion:string;}
