export type Discipline="architectural"|"civil"|"structural"|"mechanical"|"electrical"|"plumbing"|"fire-life-safety"|"landscape"|"interior"|"infrastructure"|"general";
export type ConstructionArea={id:string;name:string;code?:string;parentId?:string};
export type WorkBreakdownItem={id:string;projectId:string;code:string;name:string;parentId?:string;level:number};
export type InspectionResult="pending"|"passed"|"passed-with-comments"|"failed"|"cancelled";
export type IssueSeverity="low"|"medium"|"high"|"critical";
