import type { ComponentProps } from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

export function ShadcnTabs({className,...props}:ComponentProps<typeof TabsPrimitive.Root>){return <TabsPrimitive.Root className={cn("flex flex-col gap-2",className)} {...props}/>}
export function ShadcnTabsList({className,...props}:ComponentProps<typeof TabsPrimitive.List>){return <TabsPrimitive.List className={cn("inline-flex h-9 w-fit items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",className)} {...props}/>}
export function ShadcnTabsTrigger({className,...props}:ComponentProps<typeof TabsPrimitive.Trigger>){return <TabsPrimitive.Trigger className={cn("inline-flex h-7 items-center justify-center rounded-md px-2.5 text-sm font-medium whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",className)} {...props}/>}
export function ShadcnTabsContent({className,...props}:ComponentProps<typeof TabsPrimitive.Content>){return <TabsPrimitive.Content className={cn("outline-none focus-visible:ring-2 focus-visible:ring-ring/40",className)} {...props}/>}
