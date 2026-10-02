import { useCallback,useState } from "react";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { Breadcrumbs } from "./Breadcrumbs";
import { Sidebar } from "./Sidebar";

export function AppShell(){
  const [navigationOpen,setNavigationOpen]=useState(false);
  const openNavigation=useCallback(()=>setNavigationOpen(true),[]);
  const closeNavigation=useCallback(()=>setNavigationOpen(false),[]);

  return <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] transition-colors lg:grid lg:grid-cols-[236px_minmax(0,1fr)]">
    <a className="fixed left-3 -top-16 z-[100] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[13px] font-medium shadow-md focus:top-3" href="#main-content">Skip to content</a>
    <Sidebar open={navigationOpen} onClose={closeNavigation}/>
    <div className="min-w-0">
      <AppHeader onMenu={openNavigation}/>
      <main className="mx-auto max-w-[1600px] px-4 py-4 sm:px-5 lg:px-6 lg:py-5" id="main-content" tabIndex={-1}>
        <Breadcrumbs/>
        <Outlet/>
      </main>
    </div>
  </div>;
}
