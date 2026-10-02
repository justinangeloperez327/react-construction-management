import { Check,Palette } from "lucide-react";
import { ShadcnButton } from "@/components/shadcn/button";
import {
  ShadcnDropdownMenu,
  ShadcnDropdownMenuContent,
  ShadcnDropdownMenuItem,
  ShadcnDropdownMenuLabel,
  ShadcnDropdownMenuSeparator,
  ShadcnDropdownMenuTrigger
} from "@/components/shadcn/dropdown-menu";
import { appearanceThemes } from "@/design/appearanceThemes";
import { ThemeToggle } from "./ThemeToggle";
import { useAppearanceTheme } from "./useAppearanceTheme";

export function AppearanceMenu(){
  const {theme,setTheme}=useAppearanceTheme();

  return <ShadcnDropdownMenu>
    <ShadcnDropdownMenuTrigger asChild>
      <ShadcnButton variant="ghost" size="icon" aria-label="Appearance settings">
        <Palette className="size-4"/>
      </ShadcnButton>
    </ShadcnDropdownMenuTrigger>
    <ShadcnDropdownMenuContent align="end" className="w-52">
      <ShadcnDropdownMenuLabel>Theme</ShadcnDropdownMenuLabel>
      {appearanceThemes.map(item=><ShadcnDropdownMenuItem key={item.id} onSelect={()=>setTheme(item.id)}>
        <span className="flex flex-1 items-center justify-between gap-3">
          <span>{item.name}</span>
          {theme===item.id&&<Check className="size-4"/>}
        </span>
      </ShadcnDropdownMenuItem>)}
      <ShadcnDropdownMenuSeparator/>
      <div className="flex items-center justify-between px-2 py-1.5 text-sm">
        <span>Dark mode</span>
        <ThemeToggle compact/>
      </div>
    </ShadcnDropdownMenuContent>
  </ShadcnDropdownMenu>;
}
