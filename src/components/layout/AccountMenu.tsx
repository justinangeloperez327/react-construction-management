import { ChevronDown,LogOut,UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dropdown,DropdownItem } from "@/components/ui";
import { useAuth } from "@/features/auth/context/AuthContext";

export function AccountMenu(){
  const {user,signOut}=useAuth();
  const navigate=useNavigate();
  const initials=user.name.split(/\s+/).filter(Boolean).slice(0,2).map(part=>part[0]).join("").toUpperCase()||"U";

  const logout=()=>{
    signOut();
    navigate("/login",{replace:true});
  };

  return <Dropdown
    trigger={<button type="button" className="app-focus ml-1 flex items-center gap-2 px-1.5 py-1 text-left transition hover:bg-[var(--theme-soft)] focus-visible:outline-none focus-visible:ring-2" aria-label="Account menu">
      <span className="grid size-7 place-items-center bg-[var(--theme-soft)] text-[11px] font-semibold text-[var(--theme-soft-text)]">{initials}</span>
      <span className="hidden min-w-0 lg:grid"><strong className="max-w-[140px] truncate text-[12px] font-semibold leading-4">{user.name}</strong><small className="max-w-[140px] truncate text-[10px] leading-3 text-[var(--color-text-muted)]">{user.jobTitle}</small></span>
      <ChevronDown size={13} className="hidden text-[var(--color-text-muted)] lg:block"/>
    </button>}
  >
    <div className="border-b border-[var(--color-border)] px-2 py-2">
      <strong className="block truncate text-[12px] font-semibold">{user.name}</strong>
      <span className="block truncate text-[10px] text-[var(--color-text-muted)]">{user.email}</span>
    </div>
    <DropdownItem onClick={()=>navigate("/profile")}><span className="flex items-center gap-2"><UserRound size={14}/>Profile</span></DropdownItem>
    <div className="my-1 border-t border-[var(--color-border)]"/>
    <DropdownItem onClick={logout}><span className="flex items-center gap-2 text-red-700 dark:text-red-300"><LogOut size={14}/>Sign out</span></DropdownItem>
  </Dropdown>;
}
