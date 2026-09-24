export type DependencyType="finish-to-start"|"start-to-start"|"finish-to-finish"|"start-to-finish";
export interface ActivityDependency{id:string;projectId:string;predecessorId:string;successorId:string;type:DependencyType;lagDays:number}
export interface ProjectBaseline{id:string;projectId:string;name:string;dataDate:string;createdAt:string;activityDates:Record<string,{plannedStart:string;plannedFinish:string}>}
