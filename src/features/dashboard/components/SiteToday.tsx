import { Card,CardContent,CardHeader } from "@/components/ui";
import type { SiteSnapshot } from "@/features/dashboard/types/dashboard";
export function SiteToday({items}:{items:SiteSnapshot[]}){return <Card><CardHeader title="Site today" description="Operational snapshot across active projects."/><CardContent><div className="site-snapshot">{items.map(item=><div key={item.label}><strong>{item.value}{item.unit??""}</strong><span className="muted">{item.label}</span></div>)}</div></CardContent></Card>}
