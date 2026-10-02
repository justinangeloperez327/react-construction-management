import { FileText,Image,Trash2,Video } from "lucide-react";
import { Button,EmptyState,StatusBadge } from "@/components/ui";
import { ShadcnCard,ShadcnCardContent } from "@/components/shadcn/card";
import type { ProjectAttachment } from "@/features/attachments/types/attachment";

const icon=(kind:ProjectAttachment["kind"])=>kind==="photo"?<Image className="size-5"/>:kind==="video"?<Video className="size-5"/>:<FileText className="size-5"/>;
const size=(bytes:number)=>bytes<1024*1024?(bytes/1024).toFixed(0)+" KB":(bytes/1024/1024).toFixed(1)+" MB";

export function AttachmentGallery({items,onDelete}:{items:ProjectAttachment[];onDelete:(id:string)=>void}){
  if(!items.length)return <EmptyState title="No attachments" description="Upload site photos or supporting project files."/>;
  return <div className="grid gap-3">
    {items.map(item=><ShadcnCard key={item.id}>
      <ShadcnCardContent className="flex gap-3 p-4">
        <div className="grid size-10 shrink-0 place-items-center rounded-md bg-muted text-muted-foreground">{icon(item.kind)}</div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2"><StatusBadge tone="neutral">{item.entityType}</StatusBadge>{item.reference&&<strong className="text-xs">{item.reference}</strong>}</div>
          <strong className="mt-2 block truncate text-sm" title={item.fileName}>{item.fileName}</strong>
          {item.caption&&<p className="mt-1 text-sm text-muted-foreground">{item.caption}</p>}
          <div className="mt-2 text-xs text-muted-foreground">{item.location&&item.location+" · "}{size(item.sizeBytes)} · {item.uploadedBy}</div>
          <div className="text-xs text-muted-foreground">{new Date(item.uploadedAt).toLocaleString()}</div>
        </div>
        <Button variant="ghost" aria-label={"Delete "+item.fileName} onClick={()=>onDelete(item.id)}><Trash2 size={15}/></Button>
      </ShadcnCardContent>
    </ShadcnCard>)}
  </div>;
}
