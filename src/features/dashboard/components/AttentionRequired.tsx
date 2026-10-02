import { AlertTriangle,ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card,CardContent,CardHeader,StatusBadge } from "@/components/ui";
import type { AttentionItem } from "@/features/dashboard/types/dashboard";

const tones={info:"info",warning:"warning",danger:"danger"} as const;

export function AttentionRequired({items}:{items:AttentionItem[]}){
  return <Card>
    <CardHeader title="Attention"/>
    <CardContent>
      <div className="divide-y">
        {items.map(item=><Link className="flex items-center gap-3 py-3 first:pt-0 last:pb-0" to={"/projects/"+item.projectId+"/overview"} key={item.id}>
          <span className="grid size-8 shrink-0 place-items-center rounded-md bg-muted text-muted-foreground"><AlertTriangle size={15}/></span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2"><strong className="text-sm font-medium">{item.title}</strong><StatusBadge tone={tones[item.level]}>{item.type}</StatusBadge></span>
            <small className="mt-0.5 block truncate text-xs text-muted-foreground">{item.projectNumber+" · "+item.projectName}</small>
          </span>
          <ChevronRight className="size-4 shrink-0 text-muted-foreground"/>
        </Link>)}
      </div>
    </CardContent>
  </Card>;
}
