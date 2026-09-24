import type { PropsWithChildren } from "react";
export function Tooltip({content,children}:PropsWithChildren<{content:string}>){return <span className="tooltip" data-tooltip={content}>{children}</span>}
