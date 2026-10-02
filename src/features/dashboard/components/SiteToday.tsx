import { Card,CardContent,CardHeader } from "@/components/ui";
import type { SiteSnapshot } from "@/features/dashboard/types/dashboard";

export function SiteToday({items}:{items:SiteSnapshot[]}){
  return <Card>
    <CardHeader title="Site today"/>
    <CardContent>
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border bg-border">
        {items.map(item=><div className="bg-card p-3" key={item.label}>
          <strong className="block text-xl font-semibold">{item.value}{item.unit??""}</strong>
          <span className="text-xs text-muted-foreground">{item.label}</span>
        </div>)}
      </div>
    </CardContent>
  </Card>;
}
