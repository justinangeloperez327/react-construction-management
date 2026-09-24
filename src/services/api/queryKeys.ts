import type { ListQuery } from "./types";
export const queryKeys={projects:{all:["projects"] as const,list:(query:ListQuery={})=>["projects","list",query] as const,detail:(id:string)=>["projects","detail",id] as const}} as const;
