import type { LucideIcon } from "lucide-react";
import { BarChart3,Building2,CalendarDays,Camera,ClipboardCheck,FileQuestion,Files,HardHat,History,LayoutDashboard,Package,Search,ShieldCheck,ShoppingCart,Users,WalletCards,Wrench } from "lucide-react";

export type NavigationItem={label:string;to:string;icon:LucideIcon};
export type NavigationGroup={label:string;items:NavigationItem[]};

const projectPath=(projectId:string,path:string)=>`/projects/${encodeURIComponent(projectId)}/${path}`;

export function getNavigationGroups(projectId?:string):NavigationGroup[]{
  const groups:NavigationGroup[]=[
    {label:"Overview",items:[
      {label:"Dashboard",to:"/",icon:LayoutDashboard},
      {label:"Projects",to:"/projects",icon:Building2}
    ]}
  ];

  if(!projectId)return groups;

  groups.push(
    {label:"Project",items:[
      {label:"Overview",to:projectPath(projectId,"overview"),icon:Building2},
      {label:"Search",to:projectPath(projectId,"search"),icon:Search},
      {label:"WBS",to:projectPath(projectId,"wbs"),icon:ClipboardCheck},
      {label:"Schedule",to:projectPath(projectId,"schedule"),icon:CalendarDays},
      {label:"Activities",to:projectPath(projectId,"activities"),icon:ClipboardCheck},
      {label:"Daily Progress",to:projectPath(projectId,"daily-progress"),icon:BarChart3}
    ]},
    {label:"Resources",items:[
      {label:"Manpower",to:projectPath(projectId,"manpower"),icon:Users},
      {label:"Equipment",to:projectPath(projectId,"equipment"),icon:Wrench},
      {label:"Materials",to:projectPath(projectId,"materials"),icon:Package},
      {label:"Site Photos",to:projectPath(projectId,"attachments"),icon:Camera}
    ]},
    {label:"Commercial",items:[
      {label:"Procurement",to:projectPath(projectId,"procurement"),icon:ShoppingCart},
      {label:"Subcontractors",to:projectPath(projectId,"subcontractors"),icon:Building2},
      {label:"Variations",to:projectPath(projectId,"variations"),icon:FileQuestion},
      {label:"Costs",to:projectPath(projectId,"costs"),icon:WalletCards}
    ]},
    {label:"Document Control",items:[
      {label:"Documents",to:projectPath(projectId,"documents"),icon:Files},
      {label:"Drawings",to:projectPath(projectId,"drawings"),icon:Files},
      {label:"RFIs",to:projectPath(projectId,"rfis"),icon:FileQuestion}
    ]},
    {label:"Quality & Safety",items:[
      {label:"Inspections",to:projectPath(projectId,"inspections"),icon:ClipboardCheck},
      {label:"Quality",to:projectPath(projectId,"quality"),icon:ShieldCheck},
      {label:"Safety",to:projectPath(projectId,"safety"),icon:HardHat}
    ]},
    {label:"Management",items:[
      {label:"Issues & Actions",to:projectPath(projectId,"issues"),icon:ClipboardCheck},
      {label:"Reports",to:projectPath(projectId,"reports"),icon:Files},
      {label:"Analytics",to:projectPath(projectId,"analytics"),icon:BarChart3},
      {label:"Notifications",to:projectPath(projectId,"notifications"),icon:FileQuestion},
      {label:"Audit Trail",to:projectPath(projectId,"audit"),icon:History},
      {label:"Users & Access",to:projectPath(projectId,"users"),icon:Users}
    ]}
  );

  return groups;
}
