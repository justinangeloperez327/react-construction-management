import { flexRender,getCoreRowModel,getFilteredRowModel,getPaginationRowModel,getSortedRowModel,useReactTable,type ColumnDef,type SortingState } from "@tanstack/react-table";
import { ArrowDown,ArrowUp,ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Button,EmptyState,Input } from "@/components/ui";

export function DataTable<TData>({data,columns,searchPlaceholder="Search...",emptyTitle="No records found",emptyDescription="There are no records matching the current view.",pageSize=10}:{data:TData[];columns:ColumnDef<TData,unknown>[];searchPlaceholder?:string;emptyTitle?:string;emptyDescription?:string;pageSize?:number}){
  const [sorting,setSorting]=useState<SortingState>([]);
  const [filter,setFilter]=useState("");
  const table=useReactTable({data,columns,state:{sorting,globalFilter:filter},onSortingChange:setSorting,onGlobalFilterChange:setFilter,getCoreRowModel:getCoreRowModel(),getSortedRowModel:getSortedRowModel(),getFilteredRowModel:getFilteredRowModel(),getPaginationRowModel:getPaginationRowModel(),initialState:{pagination:{pageSize}}});
  return <div className="min-w-0">
    <div className="mb-2.5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><Input className="sm:max-w-[320px]" value={filter} onChange={e=>setFilter(e.target.value)} placeholder={searchPlaceholder} aria-label="Search records"/><span className="text-sm text-slate-500 dark:text-slate-400">{table.getFilteredRowModel().rows.length} records</span></div>
    <div className="overflow-x-auto border border-slate-200 dark:border-slate-800">
      <table className="w-full border-collapse">
        <thead className="bg-slate-50 dark:bg-slate-950/70">{table.getHeaderGroups().map(group=><tr key={group.id}>{group.headers.map(header=><th className="border-b border-slate-200 px-2.5 py-2 text-left text-[10px] font-semibold tracking-[.015em] text-slate-500 dark:border-slate-800 dark:text-slate-400" key={header.id}>{header.isPlaceholder?null:header.column.getCanSort()?<button className="inline-flex items-center gap-1.5" onClick={header.column.getToggleSortingHandler()}>{flexRender(header.column.columnDef.header,header.getContext())}{header.column.getIsSorted()==="asc"?<ArrowUp size={13}/>:header.column.getIsSorted()==="desc"?<ArrowDown size={13}/>:<ChevronsUpDown size={13}/>}</button>:flexRender(header.column.columnDef.header,header.getContext())}</th>)}</tr>)}</thead>
        <tbody>{table.getRowModel().rows.map(row=><tr className="transition hover:bg-slate-50/80 dark:hover:bg-slate-800/50" key={row.id}>{row.getVisibleCells().map(cell=><td className="border-b border-slate-100 px-2.5 py-2 text-[12px] dark:border-slate-800" key={cell.id}>{flexRender(cell.column.columnDef.cell,cell.getContext())}</td>)}</tr>)}</tbody>
      </table>
      {table.getFilteredRowModel().rows.length===0&&<EmptyState title={emptyTitle} description={emptyDescription}/>}
    </div>
    <div className="mt-2.5 flex flex-col gap-2 border-t border-slate-200 pt-2.5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800"><span className="text-sm text-slate-500 dark:text-slate-400">Page {table.getState().pagination.pageIndex+1} of {Math.max(1,table.getPageCount())}</span><div className="grid grid-cols-2 gap-2 sm:flex"><Button variant="secondary" disabled={!table.getCanPreviousPage()} onClick={()=>table.previousPage()}>Previous</Button><Button variant="secondary" disabled={!table.getCanNextPage()} onClick={()=>table.nextPage()}>Next</Button></div></div>
  </div>;
}
