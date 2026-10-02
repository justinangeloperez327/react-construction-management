import { Pencil,Trash2 } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { Button,Progress,StatusBadge } from "@/components/ui";
import { getStatusTone } from "@/design/status";
import type { MaterialEntry } from "@/features/materials/types/material";
import { humanize } from "@/shared/utils";

export function MaterialsTable({items,onEdit,onDelete}:{items:MaterialEntry[];onEdit:(item:MaterialEntry)=>void;onDelete:(id:string)=>void}){
  const columns:ColumnDef<MaterialEntry,unknown>[]=[
    {accessorKey:"materialNumber",header:"Material",cell:({row})=><div><strong>{row.original.materialNumber}</strong><div className="text-xs text-muted-foreground">{row.original.name}</div></div>},
    {accessorKey:"category",header:"Category"},
    {id:"quantities",header:"Delivered / Required",cell:({row})=><div className="grid min-w-40 gap-1"><span>{row.original.deliveredQuantity} / {row.original.requiredQuantity} {row.original.unit}</span><Progress value={row.original.requiredQuantity?Math.min(100,row.original.deliveredQuantity/row.original.requiredQuantity*100):0} label=""/></div>},
    {accessorKey:"consumedQuantity",header:"Consumed",cell:({row})=>row.original.consumedQuantity+" "+row.original.unit},
    {accessorKey:"supplier",header:"Supplier",cell:({row})=>row.original.supplier||"—"},
    {accessorKey:"status",header:"Supply",cell:({row})=><StatusBadge tone={getStatusTone(row.original.status)}>{humanize(row.original.status)}</StatusBadge>},
    {accessorKey:"inspectionStatus",header:"Inspection",cell:({row})=><StatusBadge tone={getStatusTone(row.original.inspectionStatus)}>{humanize(row.original.inspectionStatus)}</StatusBadge>},
    {id:"actions",header:"",enableSorting:false,cell:({row})=><div className="flex justify-end gap-1"><Button variant="ghost" aria-label={"Edit "+row.original.name} onClick={()=>onEdit(row.original)}><Pencil size={15}/></Button><Button variant="ghost" aria-label={"Delete "+row.original.name} onClick={()=>onDelete(row.original.id)}><Trash2 size={15}/></Button></div>}
  ];

  return <DataTable data={items} columns={columns} searchPlaceholder="Search materials..." emptyTitle="No materials registered" emptyDescription="Add project material requirements and deliveries."/>;
}
