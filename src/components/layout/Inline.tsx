import type { HTMLAttributes } from "react";
type Gap="xs"|"sm"|"md"|"lg";
const gaps:Record<Gap,string>={xs:"gap-1",sm:"gap-2",md:"gap-4",lg:"gap-6"};
export function Inline({gap="sm",className="",...props}:HTMLAttributes<HTMLDivElement>&{gap?:Gap}){return <div className={`flex flex-wrap items-center ${gaps[gap]} ${className}`.trim()} {...props}/>}
