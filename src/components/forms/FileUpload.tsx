import { Upload } from "lucide-react";
import { useRef,type ChangeEvent } from "react";
import { Button } from "@/components/ui/Button";

export function FileUpload({label="Upload files",accept,multiple=true,onFiles}:{label?:string;accept?:string;multiple?:boolean;onFiles?:(files:File[])=>void}){
  const ref=useRef<HTMLInputElement>(null);
  const change=(event:ChangeEvent<HTMLInputElement>)=>onFiles?.(Array.from(event.target.files??[]));

  return <div className="grid place-items-center gap-2 rounded-lg border border-dashed p-8 text-center">
    <Upload className="size-5 text-muted-foreground" aria-hidden="true"/>
    <strong className="text-sm font-medium">{label}</strong>
    <span className="text-sm text-muted-foreground">Choose files from your device</span>
    <Button type="button" variant="secondary" onClick={()=>ref.current?.click()}>Browse files</Button>
    <input ref={ref} className="sr-only" type="file" accept={accept} multiple={multiple} onChange={change}/>
  </div>;
}
