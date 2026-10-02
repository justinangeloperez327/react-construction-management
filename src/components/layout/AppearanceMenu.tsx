import { Palette } from "lucide-react";
import { AppearanceThemeSelector } from "./AppearanceThemeSelector";
import { ThemeToggle } from "./ThemeToggle";

export function AppearanceMenu(){
  return <details className="group relative">
    <summary className="app-focus inline-grid size-10 cursor-pointer list-none place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100" aria-label="Appearance settings" title="Appearance settings">
      <Palette size={19}/>
    </summary>
    <div className="absolute right-0 z-60 mt-2 w-[270px] rounded-xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-3">
        <strong className="block text-sm">Appearance</strong>
        <span className="text-xs text-slate-500 dark:text-slate-400">Choose a color theme and display mode.</span>
      </div>
      <AppearanceThemeSelector/>
      <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 dark:border-slate-800">
        <div>
          <strong className="block text-sm">Display mode</strong>
          <span className="text-xs text-slate-500 dark:text-slate-400">Light or dark</span>
        </div>
        <ThemeToggle/>
      </div>
    </div>
  </details>;
}
