import type { Activity,ActivityInput } from "@/features/activities/types/activity";
export interface ActivityRepository{getByProject(projectId:string):Promise<Activity[]>;create(input:ActivityInput):Promise<Activity>;update(id:string,input:ActivityInput):Promise<Activity>;delete(id:string):Promise<void>}
