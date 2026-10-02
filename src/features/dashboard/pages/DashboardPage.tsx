import { AlertCircle,Building2,TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { ErrorState,MetricCard,Skeleton } from "@/components/ui";
import { AttentionRequired } from "@/features/dashboard/components/AttentionRequired";
import { ProjectHealthTable } from "@/features/dashboard/components/ProjectHealthTable";
import { SiteToday } from "@/features/dashboard/components/SiteToday";
import { attentionItems,siteSnapshot } from "@/features/dashboard/data/dashboard.mock";
import { useProjects } from "@/features/projects/hooks/useProjects";

export function DashboardPage(){
  const {data:projects=[],isLoading,isError,refetch}=useProjects();

  if(isLoading)return <div className="grid gap-3 md:grid-cols-3"><Skeleton/><Skeleton/><Skeleton/></div>;
  if(isError)return <ErrorState title="Unable to load dashboard" description="Portfolio data could not be retrieved." onRetry={()=>void refetch()}/>;

  const active=projects.filter(project=>project.status==="active");
  const average=active.length?Math.round(active.reduce((sum,project)=>sum+project.progress,0)/active.length):0;

  return <>
    <PageHeader title="Dashboard"/>
    <section className="grid gap-3 md:grid-cols-3">
      <MetricCard label="Active projects" value={active.length} detail={projects.length+" total"} icon={<Building2 size={18}/>}/>
      <MetricCard label="Average progress" value={average+"%"} icon={<TrendingUp size={18}/>}/>
      <MetricCard label="Attention" value={attentionItems.length} icon={<AlertCircle size={18}/>}/>
    </section>
    <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(280px,.6fr)]">
      <AttentionRequired items={attentionItems}/>
      <SiteToday items={siteSnapshot}/>
    </div>
    <div className="mt-4"><ProjectHealthTable projects={projects}/></div>
  </>;
}
