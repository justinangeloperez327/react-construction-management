import type { ComponentProps,HTMLAttributes } from "react";
import { X } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

export const ShadcnDialog=DialogPrimitive.Root;
export const ShadcnDialogTrigger=DialogPrimitive.Trigger;
export const ShadcnDialogClose=DialogPrimitive.Close;

export function ShadcnDialogOverlay({className,...props}:ComponentProps<typeof DialogPrimitive.Overlay>){
  return <DialogPrimitive.Overlay data-slot="dialog-overlay" className={cn("fixed inset-0 z-50 bg-black/50",className)} {...props}/>;
}

export function ShadcnDialogContent({className,children,showCloseButton=true,...props}:ComponentProps<typeof DialogPrimitive.Content>&{showCloseButton?:boolean}){
  return <DialogPrimitive.Portal>
    <ShadcnDialogOverlay/>
    <DialogPrimitive.Content data-slot="dialog-content" className={cn("fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border bg-background p-6 shadow-lg outline-none",className)} {...props}>
      {children}
      {showCloseButton&&<DialogPrimitive.Close className="absolute right-4 top-4 rounded-xs text-muted-foreground opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring/40" aria-label="Close"><X className="size-4"/></DialogPrimitive.Close>}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>;
}
export function ShadcnDialogHeader({className,...props}:HTMLAttributes<HTMLDivElement>){return <div className={cn("flex flex-col gap-2 text-left",className)} {...props}/>}
export function ShadcnDialogFooter({className,...props}:HTMLAttributes<HTMLDivElement>){return <div className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",className)} {...props}/>}
export function ShadcnDialogTitle({className,...props}:ComponentProps<typeof DialogPrimitive.Title>){return <DialogPrimitive.Title className={cn("text-lg font-semibold",className)} {...props}/>}
export function ShadcnDialogDescription({className,...props}:ComponentProps<typeof DialogPrimitive.Description>){return <DialogPrimitive.Description className={cn("text-sm text-muted-foreground",className)} {...props}/>}
