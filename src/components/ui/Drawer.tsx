import type { ReactNode } from "react";
import { ShadcnSheet,ShadcnSheetContent,ShadcnSheetDescription,ShadcnSheetTitle } from "@/components/shadcn/sheet";

export function Drawer({open,title,children,onClose}:{open:boolean;title:string;children?:ReactNode;onClose:()=>void}){
  return <ShadcnSheet open={open} onOpenChange={next=>{if(!next)onClose()}}>
    <ShadcnSheetContent side="right" className="w-full max-w-lg overflow-y-auto sm:w-[480px]">
      <ShadcnSheetTitle>{title}</ShadcnSheetTitle>
      <ShadcnSheetDescription className="sr-only">{title}</ShadcnSheetDescription>
      <div className="mt-4">{children}</div>
    </ShadcnSheetContent>
  </ShadcnSheet>;
}
