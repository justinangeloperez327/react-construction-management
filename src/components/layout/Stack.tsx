import type { CSSProperties,HTMLAttributes } from "react";
type Gap="xs"|"sm"|"md"|"lg"|"xl";
export function Stack({gap="md",className="",style,...props}:HTMLAttributes<HTMLDivElement>&{gap?:Gap}){return <div className={`stack stack--${gap} ${className}`.trim()} style={style as CSSProperties} {...props}/>}
