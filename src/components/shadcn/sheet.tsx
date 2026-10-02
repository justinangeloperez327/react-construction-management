import type { ComponentProps,HTMLAttributes } from "react";
import { X } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

export const ShadcnSheet=DialogPrimitive.Root;
export const ShadcnSheetTrigger=DialogPrimitive.Trigger;
export const ShadcnSheetClose=DialogPrimitive.Close;

export function ShadcnSheetOverlay({className,...props}:ComponentProps<typeof DialogPrimitive.Overlay>){
  return <DialogPrimitive.Overlay className={cn("fixed inset-0 z-50 bg-black/50",className)} {...props}/>;
}

export function ShadcnSheetContent({className,children,side="left",...props}:ComponentProps<typeof DialogPrimitive.Content>&{side?:"left"|"right"}){
  return <DialogPrimitive.Portal>
    <ShadcnSheetOverlay/>
    <DialogPrimitive.Content className={cn(
      "fixed inset-y-0 z-50 h-full w-[min(320px,88vw)] border bg-background p-4 shadow-lg outline-none",
      side==="left"?"left-0 border-r":"right-0 border-l",
      className
    )} {...props}>
      {children}
      <DialogPrimitive.Close className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40" aria-label="Close navigation">
        <X className="size-4"/>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>;
}

export function ShadcnSheetHeader({className,...props}:HTMLAttributes<HTMLDivElement>){
  return <div className={cn("mb-4 grid gap-1.5",className)} {...props}/>;
}

export function ShadcnSheetTitle({className,...props}:ComponentProps<typeof DialogPrimitive.Title>){
  return <DialogPrimitive.Title className={cn("font-semibold",className)} {...props}/>;
}

export function ShadcnSheetDescription({className,...props}:ComponentProps<typeof DialogPrimitive.Description>){
  return <DialogPrimitive.Description className={cn("text-sm text-muted-foreground",className)} {...props}/>;
}
