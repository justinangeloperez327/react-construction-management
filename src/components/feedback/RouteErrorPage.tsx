import { isRouteErrorResponse,useRouteError } from "react-router-dom";
import { Button,Card,CardContent,CardHeader } from "@/components/ui";

export function RouteErrorPage(){
  const error=useRouteError();
  const message=isRouteErrorResponse(error)
    ? error.status+" "+error.statusText
    : error instanceof Error
      ? error.message
      : "Unexpected application error";

  return <main className="grid min-h-svh place-items-center bg-background p-6" role="alert">
    <Card className="w-full max-w-lg">
      <CardHeader title="Unable to load this page"/>
      <CardContent>
        <p className="text-sm text-muted-foreground">The application could not complete this request. Reload the page and try again.</p>
        {import.meta.env.DEV&&<pre className="mt-4 overflow-auto rounded-md bg-muted p-3 text-xs">{message}</pre>}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" onClick={()=>window.location.reload()}>Reload page</Button>
          <Button variant="secondary" type="button" onClick={()=>window.location.assign("/")}>Return to dashboard</Button>
        </div>
      </CardContent>
    </Card>
  </main>;
}
