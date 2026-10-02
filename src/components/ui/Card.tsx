import type { HTMLAttributes,PropsWithChildren,ReactNode } from "react";
import { ShadcnCard,ShadcnCardContent,ShadcnCardDescription,ShadcnCardHeader,ShadcnCardTitle } from "@/components/shadcn/card";
export function Card({className="",...props}:HTMLAttributes<HTMLElement>){return <ShadcnCard className={className} {...props}/>}
export function CardHeader({title,description,action}:{title:string;description?:string;action?:ReactNode}){return <ShadcnCardHeader className="flex flex-row items-start justify-between gap-4"><div className="grid gap-1"><ShadcnCardTitle>{title}</ShadcnCardTitle>{description&&<ShadcnCardDescription>{description}</ShadcnCardDescription>}</div>{action}</ShadcnCardHeader>}
export function CardContent({children}:PropsWithChildren){return <ShadcnCardContent>{children}</ShadcnCardContent>}
