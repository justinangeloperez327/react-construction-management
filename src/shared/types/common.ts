export type EntityId=string;
export type ISODateString=string;
export type ISODateTimeString=string;
export type AuditMetadata={createdAt:ISODateTimeString;createdBy:EntityId;updatedAt:ISODateTimeString;updatedBy:EntityId};
export type SoftDeleteMetadata={deletedAt?:ISODateTimeString;deletedBy?:EntityId};
export type EntityReference={id:EntityId;label:string;reference?:string};
