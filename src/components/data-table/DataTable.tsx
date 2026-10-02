import { flexRender,getCoreRowModel,getFilteredRowModel,getPaginationRowModel,getSortedRowModel,useReactTable,type ColumnDef,type SortingState } from "@tanstack/react-table";
import { ArrowDown,ArrowUp,ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { ShadcnTable,ShadcnTableBody,ShadcnTableCell,ShadcnTableHead,ShadcnTableHeader,ShadcnTableRow } from "@/components/shadcn/table";
import { Button,EmptyState,Input } from "@/components/ui";

export function DataTable<TData>({data,columns,searchPlaceholder="Search...",emptyTitle="No records found",emptyDescription="There are no records matching the current view.",pageSize=10}:{data:TData[];columns:ColumnDef<TData,unknown>[];searchPlaceholder?:string;emptyTitle?:string;emptyDescription?:string;pageSize?:number}){
  const [sorting,setSorting]=useState<SortingState>([]);
  const [filter,setFilter]=useState("");
  const table=useReactTable({data,columns,state:{sorting,globalFilter:filter},onSortingChange:setSorting,onGlobalFilterChange:setFilter,getCoreRowModel:getCoreRowModel(),getSortedRowModel:getSortedRowModel(),getFilteredRowModel:getFilteredRowModel(),getPaginationRowModel:getPaginationRowModel(),initialState:{pagination:{pageSize}}});

  return <div className="space-y-4">
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <Input className="sm:max-w-sm" value={filter} onChange={event=>setFilter(event.target.value)} placeholder={searchPlaceholder} aria-label="Search records"/>
      <span className="text-sm text-muted-foreground">{table.getFilteredRowModel().rows.length} records</span>
    </div>

    <div className="rounded-md border">
      <ShadcnTable>
        <ShadcnTableHeader>
          {table.getHeaderGroups().map(group=><ShadcnTableRow key={group.id}>
            {group.headers.map(header=><ShadcnTableHead key={header.id}>
              {header.isPlaceholder?null:header.column.getCanSort()
                ?<button className="inline-flex items-center gap-1.5" onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(header.column.columnDef.header,header.getContext())}
                  {header.column.getIsSorted()==="asc"?<ArrowUp className="size-3.5"/>:header.column.getIsSorted()==="desc"?<ArrowDown className="size-3.5"/>:<ChevronsUpDown className="size-3.5 text-muted-foreground"/>}
                </button>
                :flexRender(header.column.columnDef.header,header.getContext())}
            </ShadcnTableHead>)}
          </ShadcnTableRow>)}
        </ShadcnTableHeader>
        <ShadcnTableBody>
          {table.getRowModel().rows.map(row=><ShadcnTableRow key={row.id}>
            {row.getVisibleCells().map(cell=><ShadcnTableCell key={cell.id}>{flexRender(cell.column.columnDef.cell,cell.getContext())}</ShadcnTableCell>)}
          </ShadcnTableRow>)}
        </ShadcnTableBody>
      </ShadcnTable>
      {table.getFilteredRowModel().rows.length===0&&<EmptyState title={emptyTitle} description={emptyDescription}/>}
    </div>

    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm text-muted-foreground">Page {table.getState().pagination.pageIndex+1} of {Math.max(1,table.getPageCount())}</span>
      <div className="flex gap-2">
        <Button variant="secondary" disabled={!table.getCanPreviousPage()} onClick={()=>table.previousPage()}>Previous</Button>
        <Button variant="secondary" disabled={!table.getCanNextPage()} onClick={()=>table.nextPage()}>Next</Button>
      </div>
    </div>
  </div>;
}
