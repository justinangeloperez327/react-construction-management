import { isRouteErrorResponse,useRouteError } from "react-router-dom";

export function RouteErrorPage(){
  const error=useRouteError();
  const message=isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : "Unexpected application error";

  return <main className="fatal-error" role="alert">
    <div className="card">
      <p className="page-eyebrow">Application error</p>
      <h1>Unable to load this page</h1>
      <p className="muted">The application could not complete this request. Reload the page and try again.</p>
      {import.meta.env.DEV&&<pre className="error-details">{message}</pre>}
      <div className="page-actions">
        <button className="button button--primary" type="button" onClick={()=>window.location.reload()}>Reload page</button>
        <button className="button button--secondary" type="button" onClick={()=>window.location.assign("/")}>Return to dashboard</button>
      </div>
    </div>
  </main>;
}
