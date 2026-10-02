import { ChevronRight } from "lucide-react";
import { Link,useLocation } from "react-router-dom";

const labels:Record<string,string>={"daily-progress":"Daily Progress",rfis:"RFIs"};

export function Breadcrumbs(){
  const {pathname}=useLocation();
  const parts=pathname.split("/").filter(Boolean);
  if(parts.length===0)return null;

  return <nav className="mb-4 flex items-center gap-1 overflow-x-auto whitespace-nowrap text-xs text-muted-foreground" aria-label="Breadcrumb">
    <Link className="transition-colors hover:text-foreground" to="/">Dashboard</Link>
    {parts.map((part,index)=>{
      const to="/"+parts.slice(0,index+1).join("/");
      const current=index===parts.length-1;
      const label=labels[part]??part.replaceAll("-"," ").replace(/\b\w/g,c=>c.toUpperCase());

      return <span className="flex items-center gap-1" key={to}>
        <ChevronRight className="size-3" aria-hidden="true"/>
        {current
          ?<span className="font-medium text-foreground" aria-current="page">{label}</span>
          :<Link className="transition-colors hover:text-foreground" to={to}>{label}</Link>}
      </span>;
    })}
  </nav>;
}
