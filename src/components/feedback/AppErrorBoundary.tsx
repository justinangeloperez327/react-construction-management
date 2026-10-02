import { Component,type ErrorInfo,type ReactNode } from "react";
import { Button,Card,CardContent,CardHeader } from "@/components/ui";

type Props={children:ReactNode};
type State={error:Error|null};

export class AppErrorBoundary extends Component<Props,State>{
  state:State={error:null};

  static getDerivedStateFromError(error:Error){return {error}}

  componentDidCatch(error:Error,info:ErrorInfo){
    if(import.meta.env.DEV)console.error("Unhandled application error",error,info.componentStack);
  }

  render(){
    if(!this.state.error)return this.props.children;

    return <main className="grid min-h-svh place-items-center bg-background p-6" role="alert">
      <Card className="w-full max-w-lg">
        <CardHeader title="Something went wrong"/>
        <CardContent>
          <p className="text-sm text-muted-foreground">The application encountered an unexpected error. Reload the page and try again.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={()=>window.location.reload()}>Reload application</Button>
            <Button variant="secondary" onClick={()=>{this.setState({error:null});window.location.assign("/")}}>Return to dashboard</Button>
          </div>
        </CardContent>
      </Card>
    </main>;
  }
}
