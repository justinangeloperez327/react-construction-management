import { differenceInCalendarDays,parseISO } from "date-fns";import type { Activity } from "@/features/activities/types/activity";
export function activityDuration(activity:Activity){return differenceInCalendarDays(parseISO(activity.plannedFinish),parseISO(activity.plannedStart))+1}
export function scheduleRange(activities:Activity[]){if(!activities.length)return null;const starts=activities.map(x=>x.plannedStart).sort();const finishes=activities.map(x=>x.plannedFinish).sort();return {start:starts[0],finish:finishes.at(-1)!}}
export function isLate(activity:Activity,today=new Date()){return activity.status!=="completed"&&activity.status!=="cancelled"&&parseISO(activity.plannedFinish)<today}
