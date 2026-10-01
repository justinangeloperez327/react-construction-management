import { useMemo } from "react";
import { useWbs } from "@/features/wbs/hooks/useWbs";
import { useActivities } from "@/features/activities/hooks/useActivities";
import { useManpower } from "@/features/manpower/hooks/useManpower";
import { useEquipment } from "@/features/equipment/hooks/useEquipment";
import { useMaterials } from "@/features/materials/hooks/useMaterials";
import { useProcurement } from "@/features/procurement/hooks/useProcurement";
import { useSubcontractors } from "@/features/subcontractors/hooks/useSubcontractors";
import { useVariations } from "@/features/variations/hooks/useVariations";
import { useCosts } from "@/features/costs/hooks/useCosts";
import { useDocuments } from "@/features/documents/hooks/useDocuments";
import { useDrawings } from "@/features/drawings/hooks/useDrawings";
import { useRfis } from "@/features/rfis/hooks/useRfis";
import { useInspections } from "@/features/inspections/hooks/useInspections";
import { useQuality } from "@/features/quality/hooks/useQuality";
import { useSafety } from "@/features/safety/hooks/useSafety";
import { useIssues } from "@/features/issues/hooks/useIssues";
import { useReports } from "@/features/reports/hooks/useReports";
import { useUsers } from "@/features/users/hooks/useUsers";
import { useAttachments } from "@/features/attachments/hooks/useAttachments";
import type { ProjectSearchResult } from "@/features/search/types/search";

export function useProjectSearch(projectId:string){
  const wbs=useWbs(projectId),activities=useActivities(projectId),manpower=useManpower(projectId),equipment=useEquipment(projectId),materials=useMaterials(projectId),procurement=useProcurement(projectId),subcontractors=useSubcontractors(projectId),variations=useVariations(projectId),costs=useCosts(projectId),documents=useDocuments(projectId),drawings=useDrawings(projectId),rfis=useRfis(projectId),inspections=useInspections(projectId),quality=useQuality(projectId),safety=useSafety(projectId),issues=useIssues(projectId),reports=useReports(projectId),users=useUsers(projectId),attachments=useAttachments(projectId);
  const queries=[wbs,activities,manpower,equipment,materials,procurement,subcontractors,variations,costs,documents,drawings,rfis,inspections,quality,safety,issues,reports,users,attachments];

  const results=useMemo<ProjectSearchResult[]>(()=>{
    const make=(x:Omit<ProjectSearchResult,"searchText">)=>({...x,searchText:[x.reference,x.title,x.description,x.status,x.discipline,x.owner].filter(Boolean).join(" ").toLowerCase()});
    return [
      ...(wbs.data??[]).map(x=>make({id:x.id,entityType:"wbs",reference:x.code,title:x.name,description:x.description??"",status:x.status,discipline:x.discipline,date:undefined,path:"wbs"})),
      ...(activities.data??[]).map(x=>make({id:x.id,entityType:"activity",reference:x.activityNumber,title:x.name,description:x.description??"",status:x.status,discipline:x.discipline,owner:x.responsible,date:x.plannedFinish,path:"activities"})),
      ...(manpower.data??[]).map(x=>make({id:x.id,entityType:"manpower",reference:x.date,title:`${x.trade} · ${x.contractor}`,description:`${x.headcount} personnel · ${x.category}`,owner:x.contractor,date:x.date,path:"manpower"})),
      ...(equipment.data??[]).map(x=>make({id:x.id,entityType:"equipment",reference:x.equipmentNumber,title:x.name,description:[x.category,x.location,x.operator].filter(Boolean).join(" · "),status:x.status,owner:x.provider,date:x.nextServiceDate,path:"equipment"})),
      ...(materials.data??[]).map(x=>make({id:x.id,entityType:"material",reference:x.materialNumber,title:x.name,description:[x.category,x.storageLocation].filter(Boolean).join(" · "),status:x.status,owner:x.supplier,date:x.requiredDate,path:"materials"})),
      ...(procurement.data??[]).map(x=>make({id:x.id,entityType:"procurement",reference:x.requestNumber,title:x.title,description:[x.category,x.purchaseOrderNumber].filter(Boolean).join(" · "),status:x.status,owner:x.supplier,date:x.requiredDate,path:"procurement"})),
      ...(subcontractors.data??[]).map(x=>make({id:x.id,entityType:"subcontractor",reference:x.packageNumber,title:x.companyName,description:x.scope,status:x.status,owner:x.contactPerson,date:x.completionDate,path:"subcontractors"})),
      ...(variations.data??[]).map(x=>make({id:x.id,entityType:"variation",reference:x.variationNumber,title:x.title,description:x.description,status:x.status,owner:x.responsible,date:x.submittedDate,path:"variations"})),
      ...(costs.data??[]).map(x=>make({id:x.id,entityType:"cost",reference:x.costCode,title:x.description,description:[x.category,x.reference].filter(Boolean).join(" · "),status:x.status,owner:x.responsible,path:"costs"})),
      ...(documents.data??[]).map(x=>make({id:x.id,entityType:"document",reference:x.documentNumber,title:x.title,description:x.description??"",status:x.status,discipline:x.discipline,owner:x.originator,date:x.responseDueDate,path:"documents"})),
      ...(drawings.data??[]).map(x=>make({id:x.id,entityType:"drawing",reference:x.drawingNumber,title:x.title,description:[x.drawingType,x.zone,x.level].filter(Boolean).join(" · "),status:x.status,discipline:x.discipline,owner:x.originator,date:x.responseDueDate,path:"drawings"})),
      ...(rfis.data??[]).map(x=>make({id:x.id,entityType:"rfi",reference:x.rfiNumber,title:x.subject,description:x.question,status:x.status,discipline:x.discipline,owner:x.assignedTo,date:x.responseDueDate,path:"rfis"})),
      ...(inspections.data??[]).map(x=>make({id:x.id,entityType:"inspection",reference:x.inspectionNumber,title:x.title,description:x.location,status:x.status,discipline:x.discipline,owner:x.inspector,date:x.scheduledDate,path:"inspections"})),
      ...(quality.data??[]).map(x=>make({id:x.id,entityType:"quality",reference:x.recordNumber,title:x.title,description:x.description,status:x.status,discipline:x.discipline,owner:x.responsibleParty,date:x.dueDate,path:"quality"})),
      ...(safety.data??[]).map(x=>make({id:x.id,entityType:"safety",reference:x.recordNumber,title:x.title,description:x.description,status:x.status,owner:x.responsibleParty,date:x.dueDate,path:"safety"})),
      ...(issues.data??[]).map(x=>make({id:x.id,entityType:"issue",reference:x.issueNumber,title:x.title,description:x.description,status:x.status,owner:x.owner,date:x.dueDate,path:"issues"})),
      ...(reports.data??[]).map(x=>make({id:x.id,entityType:"report",reference:x.reportNumber,title:x.title,description:[x.reportType,x.revision].join(" · "),status:x.status,owner:x.preparedBy,date:x.dataDate,path:"reports"})),
      ...(users.data??[]).map(x=>make({id:x.id,entityType:"user",reference:x.email,title:x.name,description:[x.jobTitle,x.company,x.role].join(" · "),status:x.status,owner:x.company,date:x.lastActiveAt,path:"users"})),
      ...(attachments.data??[]).map(x=>make({id:x.id,entityType:"attachment",reference:x.reference??x.fileName,title:x.fileName,description:[x.caption,x.location,x.entityType].filter(Boolean).join(" · "),owner:x.uploadedBy,date:x.takenAt??x.uploadedAt,path:"attachments"}))
    ];
  },[wbs.data,activities.data,manpower.data,equipment.data,materials.data,procurement.data,subcontractors.data,variations.data,costs.data,documents.data,drawings.data,rfis.data,inspections.data,quality.data,safety.data,issues.data,reports.data,users.data,attachments.data]);

  return {results,isLoading:queries.some(x=>x.isLoading),isError:queries.some(x=>x.isError),refetch:()=>Promise.all(queries.map(x=>x.refetch()))};
}
