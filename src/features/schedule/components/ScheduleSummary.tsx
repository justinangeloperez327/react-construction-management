import { AlertTriangle,CalendarDays,CheckCircle2,Clock3 } from "lucide-react";
import { MetricCard } from "@/components/ui";
import type { Activity } from "@/features/activities/types/activity";
import { isLate,scheduleRange } from "@/features/schedule/utils/schedule";

export function ScheduleSummary({activities}:{activities:Activity[]}){
  const range=scheduleRange(activities);
  const late=activities.filter(item=>isLate(item)).length;
  const completed=activities.filter(item=>item.status==="completed").length;

  return <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    <MetricCard label="Planned activities" value={activities.length} detail={range?range.start+" → "+range.finish:"No schedule"} icon={<CalendarDays size={18}/>}/>
    <MetricCard label="In progress" value={activities.filter(item=>item.status==="in-progress").length} icon={<Clock3 size={18}/>}/>
    <MetricCard label="Completed" value={completed} detail={activities.length?Math.round(completed/activities.length*100)+"%":"0%"} icon={<CheckCircle2 size={18}/>}/>
    <MetricCard label="Late" value={late} icon={<AlertTriangle size={18}/>}/>
  </section>;
}
