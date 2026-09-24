import { z } from "zod";
export const projectStatusSchema=z.enum(["planning","active","on-hold","completed","cancelled"]);
export const projectSchema=z.object({id:z.string(),projectNumber:z.string(),name:z.string(),client:z.string(),manager:z.string(),progress:z.number().min(0).max(100),status:projectStatusSchema,plannedCompletion:z.string()});
export const projectListSchema=z.array(projectSchema);
export const projectInputSchema=projectSchema.omit({id:true});
export type ProjectInput=z.infer<typeof projectInputSchema>;
