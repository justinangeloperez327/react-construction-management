import { differenceInCalendarDays,parseISO } from "date-fns";
import type { Activity } from "@/features/activities/types/activity";
import { scheduleRange } from "@/features/schedule/utils/schedule";

export function ScheduleTimeline({activities}:{activities:Activity[]}){
  const range=scheduleRange(activities);
  if(!range)return <p className="text-sm text-muted-foreground">No scheduled activities.</p>;

  const start=parseISO(range.start);
  const total=Math.max(1,differenceInCalendarDays(parseISO(range.finish),start)+1);

  return <div className="grid min-w-[680px] gap-2 overflow-x-auto">
    {activities.map(activity=>{
      const left=differenceInCalendarDays(parseISO(activity.plannedStart),start)/total*100;
      const width=Math.max(1,(differenceInCalendarDays(parseISO(activity.plannedFinish),parseISO(activity.plannedStart))+1)/total*100);

      return <div className="grid grid-cols-[90px_minmax(520px,1fr)] items-center gap-3 text-xs" key={activity.id}>
        <span className="truncate font-medium text-muted-foreground" title={activity.name}>{activity.activityNumber}</span>
        <div className="relative h-6 overflow-hidden rounded-md bg-muted">
          <div className="absolute top-1 h-4 min-w-1 overflow-hidden rounded-sm bg-secondary" style={{left:left+"%",width:width+"%"}} title={activity.name+": "+activity.plannedStart+" to "+activity.plannedFinish}>
            <span className="block h-full bg-primary" style={{width:activity.progress+"%"}}/>
          </div>
        </div>
      </div>;
    })}
  </div>;
}
