import { AlertTriangle,ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card,CardContent,CardHeader,StatusBadge } from "@/components/ui";
import type { AttentionItem } from "@/features/dashboard/types/dashboard";
const tones={info:"info",warning:"warning",danger:"danger"} as const;
export function AttentionRequired({items}:{items:AttentionItem[]}){return <Card><CardHeader title="Attention required" description="Exceptions and actions that may affect delivery."/><CardContent><div className="attention-list">{items.map(item=><Link className="attention-item" to={`/projects/${item.projectId}/overview`} key={item.id}><span className={`attention-icon attention-icon--${item.level}`}><AlertTriangle size={17}/></span><span className="attention-copy"><span><strong>{item.title}</strong><StatusBadge tone={tones[item.level]}>{item.type}</StatusBadge></span><small>{item.projectNumber} · {item.projectName}</small><span className="muted">{item.detail}</span></span><ChevronRight size={18}/></Link>)}</div></CardContent></Card>}
