export type AttentionLevel="info"|"warning"|"danger";
export type AttentionItem={id:string;projectId:string;projectNumber:string;projectName:string;type:"RFI"|"Inspection"|"Quality"|"Safety"|"Schedule";title:string;detail:string;level:AttentionLevel};
export type SiteSnapshot={label:string;value:number;unit?:string};
