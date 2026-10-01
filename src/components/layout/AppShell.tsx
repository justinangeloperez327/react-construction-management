import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { Breadcrumbs } from "./Breadcrumbs";
import { Sidebar } from "./Sidebar";

export function AppShell(){
  const [navigationOpen,setNavigationOpen]=useState(false);
  return <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 lg:grid lg:grid-cols-[252px_minmax(0,1fr)]">
    <a className="fixed left-4 -top-16 z-[100] rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold shadow-lg focus:top-3 dark:border-slate-700 dark:bg-slate-900" href="#main-content">Skip to content</a>
    <Sidebar open={navigationOpen} onClose={()=>setNavigationOpen(false)}/>
    <div className="min-w-0">
      <AppHeader onMenu={()=>setNavigationOpen(true)}/>
      <main className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-7 lg:py-7" id="main-content" tabIndex={-1}>
        <Breadcrumbs/>
        <Outlet/>
      </main>
    </div>
  </div>;
}
