import { useEffect,useState } from "react";
import { appearanceThemes,appearanceThemeIds,defaultAppearanceTheme,type AppearanceThemeId } from "@/design/appearanceThemes";

const storageKey="construction-management-color-theme";
const eventName="construction-management-color-theme-change";

function initialTheme():AppearanceThemeId{
  if(typeof window==="undefined")return defaultAppearanceTheme;
  const saved=window.localStorage.getItem(storageKey) as AppearanceThemeId|null;
  return saved&&appearanceThemeIds.has(saved)?saved:defaultAppearanceTheme;
}

function applyTheme(theme:AppearanceThemeId){
  document.documentElement.dataset.appTheme=theme;
  window.localStorage.setItem(storageKey,theme);
  window.dispatchEvent(new CustomEvent<AppearanceThemeId>(eventName,{detail:theme}));
}

export function AppearanceThemeSelector(){
  const [theme,setTheme]=useState<AppearanceThemeId>(initialTheme);

  useEffect(()=>{
    document.documentElement.dataset.appTheme=theme;
    const sync=(event:Event)=>{
      const next=(event as CustomEvent<AppearanceThemeId>).detail;
      if(appearanceThemeIds.has(next))setTheme(next);
    };
    window.addEventListener(eventName,sync);
    return()=>window.removeEventListener(eventName,sync);
  },[theme]);

  return <div className="grid grid-cols-1 gap-1.5" role="radiogroup" aria-label="Color theme">
    {appearanceThemes.map(item=>{
      const selected=item.id===theme;
      return <button
        type="button"
        role="radio"
        aria-checked={selected}
        key={item.id}
        onClick={()=>{setTheme(item.id);applyTheme(item.id)}}
        className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition ${selected?"border-[var(--color-primary)] bg-[var(--theme-soft)] text-[var(--theme-soft-text)]":"border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"}`}
      >
        <span className="font-medium">{item.name}</span>
        <span className="flex -space-x-1" aria-hidden="true">
          {item.swatches.map(color=><span key={color} className="size-4 rounded-full border border-white/80 shadow-sm dark:border-slate-900" style={{backgroundColor:color}}/>)}
        </span>
      </button>;
    })}
  </div>;
}
