import type { ReactNode } from "react";
import { ShadcnTabs,ShadcnTabsContent,ShadcnTabsList,ShadcnTabsTrigger } from "@/components/shadcn/tabs";
export type TabItem={id:string;label:string;content:ReactNode};
export function Tabs({items,activeId,onChange,label="Sections"}:{items:TabItem[];activeId:string;onChange:(id:string)=>void;label?:string}){
  return <ShadcnTabs value={activeId} onValueChange={onChange}><ShadcnTabsList aria-label={label}>{items.map(item=><ShadcnTabsTrigger key={item.id} value={item.id}>{item.label}</ShadcnTabsTrigger>)}</ShadcnTabsList>{items.map(item=><ShadcnTabsContent key={item.id} value={item.id}>{item.content}</ShadcnTabsContent>)}</ShadcnTabs>;
}
