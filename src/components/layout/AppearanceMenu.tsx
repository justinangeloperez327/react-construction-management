import { Palette } from "lucide-react";
import { AppearanceThemeSelector } from "./AppearanceThemeSelector";
import { ThemeToggle } from "./ThemeToggle";

export function AppearanceMenu(){
  return <details className="group relative">
    <summary className="app-focus inline-grid size-10 cursor-pointer list-none place-items-center rounded-lg text-[var(--color-text-muted)] transition hover:bg-[var(--theme-soft)] hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2" aria-label="Appearance settings" title="Appearance settings">
      <Palette size={19}/>
    </summary>
    <div className="absolute right-0 z-60 mt-2 w-[270px] rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-xl">
      <div className="mb-3">
        <strong className="block text-sm">Appearance</strong>
        <span className="text-xs text-[var(--color-text-muted)]">Choose a color theme and display mode.</span>
      </div>
      <AppearanceThemeSelector/>
      <div className="mt-3 flex items-center justify-between border-t border-[var(--color-border)] pt-3">
        <div>
          <strong className="block text-sm">Display mode</strong>
          <span className="text-xs text-[var(--color-text-muted)]">Light or dark</span>
        </div>
        <ThemeToggle/>
      </div>
    </div>
  </details>;
}
