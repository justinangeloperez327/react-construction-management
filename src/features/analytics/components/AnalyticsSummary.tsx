import { AlertTriangle,BarChart3,CircleDollarSign,Gauge } from "lucide-react";
import { MetricCard } from "@/components/ui";

export function AnalyticsSummary({metrics}:{metrics:{physicalProgress:number;lateActivities:number;budget:number;forecast:number;costVariance:number;approvedVariationCost:number;openRfis:number;openQuality:number;openSafety:number;openIssues:number}}){
  const money=(value:number)=>new Intl.NumberFormat("en-AE",{style:"currency",currency:"AED",notation:"compact",maximumFractionDigits:1}).format(value);

  return <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    <MetricCard label="Physical progress" value={metrics.physicalProgress.toFixed(1)+"%"} icon={<Gauge size={18}/>}/>
    <MetricCard label="Late activities" value={metrics.lateActivities} icon={<AlertTriangle size={18}/>}/>
    <MetricCard label="Forecast at completion" value={money(metrics.forecast)} detail={"Budget "+money(metrics.budget)} icon={<CircleDollarSign size={18}/>}/>
    <MetricCard label="Cost variance" value={money(metrics.costVariance)} icon={<BarChart3 size={18}/>}/>
  </section>;
}
