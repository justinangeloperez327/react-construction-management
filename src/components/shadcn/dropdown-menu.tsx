import type { ComponentProps } from "react";
import { Check,ChevronRight,Circle } from "lucide-react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

export const ShadcnDropdownMenu=DropdownMenuPrimitive.Root;
export const ShadcnDropdownMenuTrigger=DropdownMenuPrimitive.Trigger;
export const ShadcnDropdownMenuGroup=DropdownMenuPrimitive.Group;
export const ShadcnDropdownMenuPortal=DropdownMenuPrimitive.Portal;
export const ShadcnDropdownMenuSub=DropdownMenuPrimitive.Sub;
export const ShadcnDropdownMenuRadioGroup=DropdownMenuPrimitive.RadioGroup;

export function ShadcnDropdownMenuContent({className,sideOffset=4,...props}:ComponentProps<typeof DropdownMenuPrimitive.Content>){
  return <DropdownMenuPrimitive.Portal><DropdownMenuPrimitive.Content data-slot="dropdown-menu-content" sideOffset={sideOffset} className={cn("z-50 min-w-40 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",className)} {...props}/></DropdownMenuPrimitive.Portal>;
}
export function ShadcnDropdownMenuItem({className,inset,...props}:ComponentProps<typeof DropdownMenuPrimitive.Item>&{inset?:boolean}){
  return <DropdownMenuPrimitive.Item data-slot="dropdown-menu-item" className={cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",inset&&"pl-8",className)} {...props}/>;
}
export function ShadcnDropdownMenuLabel({className,inset,...props}:ComponentProps<typeof DropdownMenuPrimitive.Label>&{inset?:boolean}){return <DropdownMenuPrimitive.Label className={cn("px-2 py-1.5 text-sm font-semibold",inset&&"pl-8",className)} {...props}/>}
export function ShadcnDropdownMenuSeparator({className,...props}:ComponentProps<typeof DropdownMenuPrimitive.Separator>){return <DropdownMenuPrimitive.Separator className={cn("-mx-1 my-1 h-px bg-muted",className)} {...props}/>}
export function ShadcnDropdownMenuSubTrigger({className,inset,children,...props}:ComponentProps<typeof DropdownMenuPrimitive.SubTrigger>&{inset?:boolean}){return <DropdownMenuPrimitive.SubTrigger className={cn("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent",inset&&"pl-8",className)} {...props}>{children}<ChevronRight className="ml-auto size-4"/></DropdownMenuPrimitive.SubTrigger>}
export function ShadcnDropdownMenuSubContent({className,...props}:ComponentProps<typeof DropdownMenuPrimitive.SubContent>){return <DropdownMenuPrimitive.SubContent className={cn("z-50 min-w-40 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",className)} {...props}/>}
export function ShadcnDropdownMenuCheckboxItem({className,children,checked,...props}:ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>){return <DropdownMenuPrimitive.CheckboxItem className={cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none focus:bg-accent",className)} checked={checked} {...props}><span className="absolute left-2 flex size-3.5 items-center justify-center"><DropdownMenuPrimitive.ItemIndicator><Check className="size-4"/></DropdownMenuPrimitive.ItemIndicator></span>{children}</DropdownMenuPrimitive.CheckboxItem>}
export function ShadcnDropdownMenuRadioItem({className,children,...props}:ComponentProps<typeof DropdownMenuPrimitive.RadioItem>){return <DropdownMenuPrimitive.RadioItem className={cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none focus:bg-accent",className)} {...props}><span className="absolute left-2 flex size-3.5 items-center justify-center"><DropdownMenuPrimitive.ItemIndicator><Circle className="size-2 fill-current"/></DropdownMenuPrimitive.ItemIndicator></span>{children}</DropdownMenuPrimitive.RadioItem>}
