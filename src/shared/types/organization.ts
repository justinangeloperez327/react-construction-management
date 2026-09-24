import type { AuditMetadata,EntityId } from "./common";
export type CompanyType="client"|"consultant"|"main-contractor"|"subcontractor"|"supplier"|"authority"|"other";
export interface Company extends AuditMetadata{id:EntityId;name:string;code?:string;type:CompanyType;active:boolean}
export interface Contact{id:EntityId;companyId?:EntityId;name:string;jobTitle?:string;email?:string;phone?:string}
