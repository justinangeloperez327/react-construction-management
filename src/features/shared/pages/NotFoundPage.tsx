import { Link } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
export function NotFoundPage(){return <><PageHeader title="Page not found" description="The requested construction management page does not exist."/><Link className="button button--primary" to="/">Return to dashboard</Link></>}
