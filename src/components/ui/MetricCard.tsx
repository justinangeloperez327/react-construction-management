import type { ReactNode } from "react";
export function MetricCard({label,value,detail,icon}:{label:string;value:ReactNode;detail?:ReactNode;icon?:ReactNode}){return <article className="card metric-card"><div className="metric-card-top"><span className="muted">{label}</span>{icon}</div><div className="metric">{value}</div>{detail&&<div className="metric-detail">{detail}</div>}</article>}
