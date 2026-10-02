import { useState } from "react";
import { Camera,Upload } from "lucide-react";
import { FileUpload } from "@/components/forms";
import { Button,Input,Select } from "@/components/ui";
import type { AttachmentEntityType,AttachmentInput } from "@/features/attachments/types/attachment";

export function AttachmentUpload({projectId,onSubmit}:{projectId:string;onSubmit:(input:AttachmentInput)=>Promise<unknown>}){
  const [files,setFiles]=useState<File[]>([]);
  const [entityType,setEntityType]=useState<AttachmentEntityType>("project");
  const [reference,setReference]=useState("");
  const [caption,setCaption]=useState("");
  const [location,setLocation]=useState("");

  const submit=async()=>{
    for(const file of files)await onSubmit({projectId,entityType,reference:reference||undefined,fileName:file.name,mimeType:file.type||"application/octet-stream",sizeBytes:file.size,caption:caption||undefined,location:location||undefined,takenAt:file.type.startsWith("image/")?new Date().toISOString():undefined,uploadedBy:"Current User"});
    setFiles([]);
    setCaption("");
    setReference("");
  };

  return <div className="grid gap-4">
    <FileUpload label="Add site photos or attachments" accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx" onFiles={setFiles}/>
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      <Select value={entityType} onChange={event=>setEntityType(event.target.value as AttachmentEntityType)} aria-label="Related record type">
        {["project","activity","daily-progress","material","document","drawing","rfi","inspection","quality","safety","issue"].map(item=><option key={item} value={item}>{item}</option>)}
      </Select>
      <Input value={reference} onChange={event=>setReference(event.target.value)} placeholder="Related reference"/>
      <Input value={location} onChange={event=>setLocation(event.target.value)} placeholder="Site location"/>
      <Input value={caption} onChange={event=>setCaption(event.target.value)} placeholder="Caption"/>
    </div>
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled={!files.length} onClick={()=>void submit()}><Upload size={16}/>Upload{files.length?" ("+files.length+")":""}</Button>
      {files.length>0&&<span className="inline-flex min-w-0 items-center gap-1 text-sm text-muted-foreground"><Camera size={14}/><span className="truncate">{files.map(file=>file.name).join(", ")}</span></span>}
    </div>
  </div>;
}
