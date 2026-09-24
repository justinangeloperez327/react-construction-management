import { z } from "zod";
export const projectSchema=z.object({projectNumber:z.string().trim().min(1,"Project number is required"),name:z.string().trim().min(2,"Project name is required"),client:z.string().trim().min(2,"Client is required"),manager:z.string().trim().min(2,"Project manager is required"),progress:z.coerce.number().min(0).max(100),status:z.enum(["planning","active","on-hold","completed","cancelled"]),plannedCompletion:z.string().min(1,"Planned completion date is required")});
export type ProjectFormValues=z.infer<typeof projectSchema>;
