import type { PropsWithChildren } from "react";
type Tone="neutral"|"info"|"success"|"warning"|"danger";
export function StatusBadge({tone="neutral",children}:PropsWithChildren<{tone?:Tone}>){return <span className={`status-badge status-badge--${tone}`}>{children}</span>}
