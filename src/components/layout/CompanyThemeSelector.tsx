import { Palette } from "lucide-react";
import { useEffect,useState } from "react";
import { companyThemes,companyThemeIds,defaultCompanyTheme,type CompanyThemeId } from "@/design/companyThemes";

const storageKey="construction-management-company-theme";

function initialTheme():CompanyThemeId{
  if(typeof window==="undefined")return defaultCompanyTheme;
  const stored=window.localStorage.getItem(storageKey) as CompanyThemeId|null;
  return stored&&companyThemeIds.has(stored)?stored:defaultCompanyTheme;
}

export function CompanyThemeSelector(){
  const [theme,setTheme]=useState<CompanyThemeId>(initialTheme);
  useEffect(()=>{
    document.documentElement.dataset.companyTheme=theme;
    window.localStorage.setItem(storageKey,theme);
  },[theme]);

  return <label className="flex min-w-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-1.5 dark:border-slate-700 dark:bg-slate-900" title="Company theme">
    <Palette size={16} className="shrink-0 text-[var(--brand-primary)]" aria-hidden="true"/>
    <span className="sr-only">Company theme</span>
    <select
      aria-label="Company theme"
      value={theme}
      onChange={event=>setTheme(event.target.value as CompanyThemeId)}
      className="w-[92px] min-w-0 bg-transparent text-xs font-semibold text-slate-700 outline-none sm:w-[150px] dark:text-slate-200"
    >
      {companyThemes.map(item=><option key={item.id} value={item.id}>{item.shortName}</option>)}
    </select>
  </label>;
}
