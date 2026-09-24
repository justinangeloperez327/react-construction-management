import type { EntityId,ISODateTimeString } from "./common";
export interface Attachment{id:EntityId;fileName:string;contentType:string;size:number;url:string;uploadedAt:ISODateTimeString;uploadedBy:EntityId;description?:string}
export interface Comment{id:EntityId;entityType:string;entityId:EntityId;body:string;authorId:EntityId;createdAt:ISODateTimeString;editedAt?:ISODateTimeString}
export type ActivityAction="created"|"updated"|"submitted"|"approved"|"rejected"|"assigned"|"commented"|"attached"|"closed"|"reopened"|"deleted";
export interface ActivityEntry{id:EntityId;entityType:string;entityId:EntityId;action:ActivityAction;actorId:EntityId;occurredAt:ISODateTimeString;summary:string;changes?:Record<string,{from:unknown;to:unknown}>}
