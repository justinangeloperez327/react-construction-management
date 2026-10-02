import { ChevronRight,Pencil,Trash2 } from "lucide-react";
import { Button,Progress,StatusBadge } from "@/components/ui";
import { getStatusTone } from "@/design/status";
import type { WbsItem } from "@/features/wbs/types/wbs";
import { humanize } from "@/shared/utils";

export function WbsTree({items,onEdit,onDelete}:{items:WbsItem[];onEdit:(item:WbsItem)=>void;onDelete:(id:string)=>void}){
  const ordered=[...items].sort((a,b)=>a.code.localeCompare(b.code,undefined,{numeric:true}));

  return <div className="overflow-x-auto rounded-md border">
    <div className="min-w-[860px]">
      <div className="grid grid-cols-[minmax(300px,2fr)_140px_130px_170px_80px_88px] gap-3 border-b bg-muted/50 px-3 py-2 text-xs font-medium text-muted-foreground">
        <span>WBS / Scope</span><span>Discipline</span><span>Status</span><span>Progress</span><span>Weight</span><span/>
      </div>
      {ordered.map(item=><div className="grid min-h-14 grid-cols-[minmax(300px,2fr)_140px_130px_170px_80px_88px] items-center gap-3 border-b px-3 py-2 text-sm last:border-b-0 hover:bg-muted/50" key={item.id}>
        <div className="flex min-w-0 items-center gap-1" style={{paddingLeft:item.level*22}}>
          {item.level>0&&<ChevronRight className="size-3.5 shrink-0 text-muted-foreground"/>}
          <span className="truncate"><strong>{item.code}</strong> {item.name}</span>
        </div>
        <span>{humanize(item.discipline)}</span>
        <span><StatusBadge tone={getStatusTone(item.status)}>{humanize(item.status)}</StatusBadge></span>
        <Progress value={item.progress} label=""/>
        <span>{item.weight}%</span>
        <div className="flex justify-end gap-1">
          <Button variant="ghost" aria-label={"Edit "+item.name} onClick={()=>onEdit(item)}><Pencil size={15}/></Button>
          <Button variant="ghost" aria-label={"Delete "+item.name} onClick={()=>onDelete(item.id)}><Trash2 size={15}/></Button>
        </div>
      </div>)}
    </div>
  </div>;
}
