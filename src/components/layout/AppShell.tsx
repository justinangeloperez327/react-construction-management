import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { Breadcrumbs } from "./Breadcrumbs";
import { Sidebar } from "./Sidebar";

export function AppShell(){
  const [navigationOpen,setNavigationOpen]=useState(false);

  return <div className="min-h-screen bg-background text-foreground lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
    <a className="fixed left-3 -top-16 z-[100] rounded-md border bg-background px-3 py-2 text-sm font-medium shadow-sm focus:top-3" href="#main-content">Skip to content</a>
    <Sidebar open={navigationOpen} onOpenChange={setNavigationOpen}/>
    <div className="min-w-0">
      <AppHeader onMenu={()=>setNavigationOpen(true)}/>
      <main className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8" id="main-content" tabIndex={-1}>
        <Breadcrumbs/>
        <Outlet/>
      </main>
    </div>
  </div>;
}
