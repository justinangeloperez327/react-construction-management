import { Link } from "react-router-dom";
import { Card,CardContent,CardHeader,Progress,StatusBadge } from "@/components/ui";
import { getStatusTone } from "@/design/status";
import type { Project } from "@/features/projects/types/project";
import { humanize } from "@/shared/utils";
export function ProjectHealthTable({projects}:{projects:Project[]}){return <Card><CardHeader title="Project performance" description="Current portfolio progress and planned completion."/><CardContent><div className="table-scroll"><table className="table"><thead><tr><th>Project</th><th>Status</th><th>Progress</th><th>Manager</th><th>Completion</th></tr></thead><tbody>{projects.map(project=><tr key={project.id}><td><Link className="record-link" to={`/projects/${project.id}/overview`}><strong>{project.projectNumber}</strong></Link><div className="muted">{project.name}</div></td><td><StatusBadge tone={getStatusTone(project.status)}>{humanize(project.status)}</StatusBadge></td><td><div className="dashboard-progress"><Progress value={project.progress} label=""/></div></td><td>{project.manager}</td><td>{project.plannedCompletion}</td></tr>)}</tbody></table></div></CardContent></Card>}
