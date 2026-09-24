import { useState,type ReactNode } from "react";
export function Dropdown({trigger,children,align="end"}:{trigger:ReactNode;children:ReactNode;align?:"start"|"end"}){const [open,setOpen]=useState(false);return <div className="dropdown"><div onClick={()=>setOpen(v=>!v)}>{trigger}</div>{open&&<div className={`dropdown-menu dropdown-menu--${align}`} role="menu" onClick={()=>setOpen(false)}>{children}</div>}</div>}
export function DropdownItem({children,onClick}:{children:ReactNode;onClick?:()=>void}){return <button className="dropdown-item" role="menuitem" onClick={onClick}>{children}</button>}
