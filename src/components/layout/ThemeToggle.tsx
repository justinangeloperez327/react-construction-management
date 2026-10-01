import { Moon,Sun } from "lucide-react";
import { useEffect,useState } from "react";

type Theme="light"|"dark";
const storageKey="construction-management-theme";

function initialTheme():Theme{
  if(typeof window==="undefined")return"light";
  const saved=window.localStorage.getItem(storageKey);
  if(saved==="light"||saved==="dark")return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
}

export function ThemeToggle(){
  const [theme,setTheme]=useState<Theme>(initialTheme);
  useEffect(()=>{
    const root=document.documentElement;
    root.classList.toggle("dark",theme==="dark");
    root.style.colorScheme=theme;
    window.localStorage.setItem(storageKey,theme);
  },[theme]);
  const dark=theme==="dark";
  return <button
    type="button"
    onClick={()=>setTheme(dark?"light":"dark")}
    className="inline-grid size-10 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
    aria-label={dark?"Use light mode":"Use dark mode"}
    title={dark?"Use light mode":"Use dark mode"}
  >{dark?<Sun size={18}/>:<Moon size={18}/>}</button>;
}
