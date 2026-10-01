import { Settings2 } from "lucide-react";
import { CompanyThemeSelector } from "./CompanyThemeSelector";
import { ThemeToggle } from "./ThemeToggle";

export function HeaderPreferencesMenu(){
  return <details className="group relative">
    <summary className="brand-focus flex cursor-pointer list-none items-center gap-2 rounded-lg px-1.5 py-1 transition hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Open account and appearance settings">
      <span className="grid size-8 place-items-center rounded-full brand-soft text-xs font-bold">JP</span>
      <span className="hidden text-left lg:grid"><strong className="text-[13px] leading-4">Justin Perez</strong><small className="text-[11px] text-slate-500 dark:text-slate-400">Developer</small></span>
    </summary>
    <div className="absolute right-0 z-60 mt-2 w-[280px] rounded-xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-3 flex items-center gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
        <Settings2 size={16} className="text-slate-400"/>
        <div><strong className="block text-sm">Preferences</strong><span className="text-xs text-slate-500 dark:text-slate-400">Appearance and company theme</span></div>
      </div>
      <div className="grid gap-3">
        <div>
          <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[.06em] text-slate-400">Company theme</span>
          <CompanyThemeSelector className="w-full"/>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800">
          <div><strong className="block text-sm">Appearance</strong><span className="text-xs text-slate-500 dark:text-slate-400">Light or dark mode</span></div>
          <ThemeToggle/>
        </div>
      </div>
    </div>
  </details>;
}
