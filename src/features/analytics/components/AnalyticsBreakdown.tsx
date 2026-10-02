import { Card,CardContent,CardHeader,Progress } from "@/components/ui";

export function AnalyticsBreakdown({metrics}:{metrics:{approvedVariationCost:number;openRfis:number;openQuality:number;openSafety:number;openIssues:number}}){
  const rows=[["Open RFIs",metrics.openRfis],["Open quality records",metrics.openQuality],["Open safety items",metrics.openSafety],["Open issues",metrics.openIssues]] as const;
  const max=Math.max(1,...rows.map(item=>item[1]));

  return <div className="mt-4 grid gap-4 lg:grid-cols-2">
    <Card>
      <CardHeader title="Open items"/>
      <CardContent>
        <div className="grid gap-4">
          {rows.map(([label,value])=><div key={label} className="grid gap-2">
            <div className="flex items-center justify-between gap-3 text-sm"><span>{label}</span><strong>{value}</strong></div>
            <Progress value={value/max*100} label=""/>
          </div>)}
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader title="Approved variations"/>
      <CardContent>
        <strong className="text-2xl font-semibold">{new Intl.NumberFormat("en-AE",{style:"currency",currency:"AED",notation:"compact",maximumFractionDigits:1}).format(metrics.approvedVariationCost)}</strong>
      </CardContent>
    </Card>
  </div>;
}
