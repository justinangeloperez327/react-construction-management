import { ChevronDown,LogOut,UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  ShadcnDropdownMenu,
  ShadcnDropdownMenuContent,
  ShadcnDropdownMenuItem,
  ShadcnDropdownMenuLabel,
  ShadcnDropdownMenuSeparator,
  ShadcnDropdownMenuTrigger
} from "@/components/shadcn/dropdown-menu";
import { useAuth } from "@/features/auth/context/AuthContext";

export function AccountMenu(){
  const {user,signOut}=useAuth();
  const navigate=useNavigate();
  const initials=user.name.split(/\s+/).filter(Boolean).slice(0,2).map(part=>part[0]).join("").toUpperCase()||"U";

  const logout=()=>{
    signOut();
    navigate("/login",{replace:true});
  };

  return <ShadcnDropdownMenu>
    <ShadcnDropdownMenuTrigger asChild>
      <button type="button" className="flex h-9 items-center gap-2 rounded-md px-2 text-left text-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40" aria-label="Account menu">
        <span className="grid size-6 place-items-center rounded-md bg-muted text-[10px] font-semibold">{initials}</span>
        <span className="hidden max-w-36 truncate lg:block">{user.name}</span>
        <ChevronDown className="hidden size-3.5 text-muted-foreground lg:block"/>
      </button>
    </ShadcnDropdownMenuTrigger>

    <ShadcnDropdownMenuContent align="end" className="w-56">
      <ShadcnDropdownMenuLabel className="font-normal">
        <strong className="block truncate text-sm font-medium">{user.name}</strong>
        <span className="block truncate text-xs text-muted-foreground">{user.email}</span>
      </ShadcnDropdownMenuLabel>
      <ShadcnDropdownMenuSeparator/>
      <ShadcnDropdownMenuItem onSelect={()=>navigate("/profile")}><UserRound className="size-4"/>Profile</ShadcnDropdownMenuItem>
      <ShadcnDropdownMenuSeparator/>
      <ShadcnDropdownMenuItem className="text-destructive focus:text-destructive" onSelect={logout}><LogOut className="size-4"/>Sign out</ShadcnDropdownMenuItem>
    </ShadcnDropdownMenuContent>
  </ShadcnDropdownMenu>;
}
