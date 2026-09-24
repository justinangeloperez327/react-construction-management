import type { HTMLAttributes } from "react";
type Gap="xs"|"sm"|"md"|"lg";
export function Inline({gap="sm",className="",...props}:HTMLAttributes<HTMLDivElement>&{gap?:Gap}){return <div className={`inline inline--${gap} ${className}`.trim()} {...props}/>}
