import type { AuditMetadata,EntityId } from "./common";
export type UserStatus="invited"|"active"|"suspended"|"inactive";
export interface User extends AuditMetadata{id:EntityId;name:string;email:string;jobTitle?:string;companyId?:EntityId;status:UserStatus;avatarUrl?:string}
export type ProjectRole="project-manager"|"construction-manager"|"site-engineer"|"planning-engineer"|"quantity-surveyor"|"quality-engineer"|"safety-engineer"|"procurement"|"document-controller"|"subcontractor"|"client"|"consultant";
export interface ProjectMembership{id:EntityId;projectId:EntityId;userId:EntityId;role:ProjectRole;active:boolean}
