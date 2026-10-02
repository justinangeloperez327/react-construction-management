import { Trash2 } from "lucide-react";
import { Button,EmptyState,StatusBadge } from "@/components/ui";
import { ShadcnCard,ShadcnCardContent } from "@/components/shadcn/card";
import type { DailyProgressReport } from "@/features/daily-progress/types/dailyProgress";
import { getStatusTone } from "@/design/status";
import { humanize } from "@/shared/utils";

export function DailyProgressList({reports,onDelete}:{reports:DailyProgressReport[];onDelete:(id:string)=>void}){
  if(!reports.length)return <EmptyState title="No daily reports" description="Create the first site progress report."/>;

  return <div className="grid gap-4">
    {reports.map(report=><ShadcnCard key={report.id}>
      <ShadcnCardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <strong className="text-sm">{report.reportNumber}</strong>
            <div className="mt-1 text-sm text-muted-foreground">{report.reportDate} · {humanize(report.weather)}{report.temperatureC!==undefined?" · "+report.temperatureC+"°C":""}</div>
          </div>
          <div className="flex items-center gap-1">
            <StatusBadge tone={getStatusTone(report.status)}>{humanize(report.status)}</StatusBadge>
            <Button variant="ghost" aria-label={"Delete "+report.reportNumber} onClick={()=>onDelete(report.id)}><Trash2 size={15}/></Button>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6">{report.summary}</p>
        <div className="mt-4 flex flex-wrap gap-4 border-y py-3 text-sm">
          <span><strong>{report.manpowerTotal}</strong> manpower</span>
          <span><strong>{report.equipmentTotal}</strong> equipment</span>
          <span><strong>{report.entries.length}</strong> activity updates</span>
        </div>
        {report.delays&&<div className="mt-4 rounded-md bg-muted p-3 text-sm"><strong className="block font-medium">Delays / constraints</strong><span className="mt-1 block text-muted-foreground">{report.delays}</span></div>}
        <div className="mt-4 text-xs text-muted-foreground">Prepared by {report.preparedBy}</div>
      </ShadcnCardContent>
    </ShadcnCard>)}
  </div>;
}
