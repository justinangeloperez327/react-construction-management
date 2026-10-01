import { differenceInCalendarDays,parseISO } from "date-fns";
import type { Activity } from "@/features/activities/types/activity";
import { scheduleRange } from "@/features/schedule/utils/schedule";

export function ScheduleTimeline({activities}:{activities:Activity[]}){
  const range=scheduleRange(activities);
  if(!range)return <p className="muted">No activities are available for the schedule.</p>;
  const start=parseISO(range.start);
  const total=Math.max(1,differenceInCalendarDays(parseISO(range.finish),start)+1);
  return <div className="schedule-timeline">{activities.map(activity=>{
    const left=differenceInCalendarDays(parseISO(activity.plannedStart),start)/total*100;
    const width=Math.max(1,(differenceInCalendarDays(parseISO(activity.plannedFinish),parseISO(activity.plannedStart))+1)/total*100);
    return <div className="timeline-row" key={activity.id}><span title={activity.name}>{activity.activityNumber}</span><div className="timeline-track"><div className="timeline-bar" style={{left:`${left}%`,width:`${width}%`}} title={`${activity.name}: ${activity.plannedStart} to ${activity.plannedFinish}`}><span style={{width:`${activity.progress}%`}}/></div></div></div>;
  })}</div>;
}
