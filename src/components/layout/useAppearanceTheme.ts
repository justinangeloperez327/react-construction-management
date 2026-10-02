import { useEffect,useState } from "react";
import { appearanceThemeIds,defaultAppearanceTheme,type AppearanceThemeId } from "@/design/appearanceThemes";

const storageKey="construction-management-color-theme";
const eventName="construction-management-color-theme-change";

function initialTheme():AppearanceThemeId{
  if(typeof window==="undefined")return defaultAppearanceTheme;
  const saved=window.localStorage.getItem(storageKey) as AppearanceThemeId|null;
  return saved&&appearanceThemeIds.has(saved)?saved:defaultAppearanceTheme;
}

export function useAppearanceTheme(){
  const [theme,setThemeState]=useState<AppearanceThemeId>(initialTheme);

  useEffect(()=>{
    const sync=(event:Event)=>{
      const next=(event as CustomEvent<AppearanceThemeId>).detail;
      if(appearanceThemeIds.has(next))setThemeState(next);
    };
    window.addEventListener(eventName,sync);
    return()=>window.removeEventListener(eventName,sync);
  },[]);

  const setTheme=(next:AppearanceThemeId)=>{
    document.documentElement.dataset.appTheme=next;
    window.localStorage.setItem(storageKey,next);
    setThemeState(next);
    window.dispatchEvent(new CustomEvent<AppearanceThemeId>(eventName,{detail:next}));
  };

  return {theme,setTheme};
}
