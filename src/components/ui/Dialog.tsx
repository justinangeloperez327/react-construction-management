import type { ReactNode } from "react";
import { ShadcnDialog,ShadcnDialogContent,ShadcnDialogDescription,ShadcnDialogFooter,ShadcnDialogHeader,ShadcnDialogTitle } from "@/components/shadcn/dialog";
export function Dialog({open,title,description,children,footer,onClose}:{open:boolean;title:string;description?:string;children?:ReactNode;footer?:ReactNode;onClose:()=>void}){
  return <ShadcnDialog open={open} onOpenChange={next=>{if(!next)onClose()}}><ShadcnDialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto"><ShadcnDialogHeader><ShadcnDialogTitle>{title}</ShadcnDialogTitle>{description&&<ShadcnDialogDescription>{description}</ShadcnDialogDescription>}</ShadcnDialogHeader>{children}{footer&&<ShadcnDialogFooter>{footer}</ShadcnDialogFooter>}</ShadcnDialogContent></ShadcnDialog>;
}
