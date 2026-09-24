import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { Progress,StatusBadge } from "@/components/ui";
import { getStatusTone } from "@/design/status";
import type { Project } from "@/features/projects/types/project";
const columns:ColumnDef<Project,unknown>[]=[{accessorKey:"projectNumber",header:"Project",cell:({row})=><div><strong>{row.original.projectNumber}</strong><div className="muted">{row.original.name}</div></div>},{accessorKey:"client",header:"Client"},{accessorKey:"manager",header:"Manager"},{accessorKey:"progress",header:"Progress",cell:({row})=><div className="table-progress"><Progress value={row.original.progress} label=""/></div>},{accessorKey:"status",header:"Status",cell:({row})=><StatusBadge tone={getStatusTone(row.original.status)}>{row.original.status.replace("-"," ")}</StatusBadge>},{accessorKey:"plannedCompletion",header:"Completion"}];
export function ProjectsTable({projects}:{projects:Project[]}){return <DataTable data={projects} columns={columns} searchPlaceholder="Search projects..." emptyTitle="No projects found" emptyDescription="Try changing your search or create the first project."/>}
