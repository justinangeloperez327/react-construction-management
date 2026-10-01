import type { CSSProperties,HTMLAttributes } from "react";
type Gap="xs"|"sm"|"md"|"lg"|"xl";
const gaps:Record<Gap,string>={xs:"gap-1",sm:"gap-2",md:"gap-4",lg:"gap-6",xl:"gap-8"};
export function Stack({gap="md",className="",style,...props}:HTMLAttributes<HTMLDivElement>&{gap?:Gap}){return <div className={`flex flex-col ${gaps[gap]} ${className}`.trim()} style={style as CSSProperties} {...props}/>}
