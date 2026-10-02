import type { Activity } from "@/features/activities/types/activity";
import type { WbsItem } from "@/features/wbs/types/wbs";
import { Progress,StatusBadge } from "@/components/ui";
import { ShadcnTable,ShadcnTableBody,ShadcnTableCell,ShadcnTableHead,ShadcnTableHeader,ShadcnTableRow } from "@/components/shadcn/table";
import { getStatusTone } from "@/design/status";
import { activityDuration,isLate } from "@/features/schedule/utils/schedule";
import { humanize } from "@/shared/utils";

export function ScheduleTable({activities,wbsItems}:{activities:Activity[];wbsItems:WbsItem[]}){
  return <ShadcnTable className="min-w-[900px]">
    <ShadcnTableHeader><ShadcnTableRow><ShadcnTableHead>Activity</ShadcnTableHead><ShadcnTableHead>WBS</ShadcnTableHead><ShadcnTableHead>Start</ShadcnTableHead><ShadcnTableHead>Finish</ShadcnTableHead><ShadcnTableHead>Duration</ShadcnTableHead><ShadcnTableHead>Status</ShadcnTableHead><ShadcnTableHead>Progress</ShadcnTableHead></ShadcnTableRow></ShadcnTableHeader>
    <ShadcnTableBody>
      {[...activities].sort((a,b)=>a.plannedStart.localeCompare(b.plannedStart)).map(activity=>{
        const wbs=wbsItems.find(item=>item.id===activity.wbsId);
        const late=isLate(activity);
        return <ShadcnTableRow key={activity.id}>
          <ShadcnTableCell>
            <strong>{activity.activityNumber}</strong>
            <div className="text-xs text-muted-foreground">{activity.name}</div>
            {late&&<div className="text-xs text-destructive">Past planned finish</div>}
          </ShadcnTableCell>
          <ShadcnTableCell>{wbs?wbs.code+" · "+wbs.name:"—"}</ShadcnTableCell>
          <ShadcnTableCell>{activity.plannedStart}</ShadcnTableCell>
          <ShadcnTableCell>{activity.plannedFinish}</ShadcnTableCell>
          <ShadcnTableCell>{activityDuration(activity)} days</ShadcnTableCell>
          <ShadcnTableCell><StatusBadge tone={late?"danger":getStatusTone(activity.status)}>{late?"Late":humanize(activity.status)}</StatusBadge></ShadcnTableCell>
          <ShadcnTableCell className="min-w-40"><Progress value={activity.progress} label=""/></ShadcnTableCell>
        </ShadcnTableRow>;
      })}
    </ShadcnTableBody>
  </ShadcnTable>;
}
