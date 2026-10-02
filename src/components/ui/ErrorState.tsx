import { Button } from "./Button";

export function ErrorState({title="Unable to load data",description="The requested information could not be retrieved.",onRetry}:{title?:string;description?:string;onRetry?:()=>void}){
  return <div className="rounded-lg border p-6 text-center" role="alert">
    <h3 className="text-sm font-medium">{title}</h3>
    <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">{description}</p>
    {onRetry&&<div className="mt-4"><Button variant="secondary" onClick={onRetry}>Try again</Button></div>}
  </div>;
}
