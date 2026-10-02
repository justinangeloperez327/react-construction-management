import { Moon,Sun } from "lucide-react";
import { useEffect,useState } from "react";
import { ShadcnButton } from "@/components/shadcn/button";

type Theme="light"|"dark";
const storageKey="construction-management-theme";

function initialTheme():Theme{
  if(typeof window==="undefined")return"light";
  const saved=window.localStorage.getItem(storageKey);
  if(saved==="light"||saved==="dark")return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
}

export function ThemeToggle({compact=false}:{compact?:boolean}){
  const [theme,setTheme]=useState<Theme>(initialTheme);

  useEffect(()=>{
    const root=document.documentElement;
    root.classList.toggle("dark",theme==="dark");
    root.style.colorScheme=theme;
    window.localStorage.setItem(storageKey,theme);
  },[theme]);

  const dark=theme==="dark";

  return <ShadcnButton
    type="button"
    variant="ghost"
    size={compact?"sm":"icon"}
    onClick={()=>setTheme(dark?"light":"dark")}
    aria-label={dark?"Use light mode":"Use dark mode"}
    title={dark?"Use light mode":"Use dark mode"}
  >
    {dark?<Sun className="size-4"/>:<Moon className="size-4"/>}
  </ShadcnButton>;
}
