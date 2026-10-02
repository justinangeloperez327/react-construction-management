import type { HTMLAttributes,TableHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function ShadcnTable({className,...props}:TableHTMLAttributes<HTMLTableElement>){
  return <div className="relative w-full overflow-x-auto"><table className={cn("w-full caption-bottom text-sm",className)} {...props}/></div>;
}
export function ShadcnTableHeader({className,...props}:HTMLAttributes<HTMLTableSectionElement>){
  return <thead className={cn("[&_tr]:border-b",className)} {...props}/>;
}
export function ShadcnTableBody({className,...props}:HTMLAttributes<HTMLTableSectionElement>){
  return <tbody className={cn("[&_tr:last-child]:border-0",className)} {...props}/>;
}
export function ShadcnTableRow({className,...props}:HTMLAttributes<HTMLTableRowElement>){
  return <tr className={cn("border-b transition-colors hover:bg-muted/50",className)} {...props}/>;
}
export function ShadcnTableHead({className,...props}:HTMLAttributes<HTMLTableCellElement>){
  return <th className={cn("h-10 whitespace-nowrap px-2 text-left align-middle text-sm font-medium",className)} {...props}/>;
}
export function ShadcnTableCell({className,...props}:HTMLAttributes<HTMLTableCellElement>){
  return <td className={cn("whitespace-nowrap p-2 align-middle",className)} {...props}/>;
}
