import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { Breadcrumbs } from "./Breadcrumbs";
import { Sidebar } from "./Sidebar";
export function AppShell(){const [navigationOpen,setNavigationOpen]=useState(false);return <div className="shell"><a className="skip-link" href="#main-content">Skip to content</a><Sidebar open={navigationOpen} onClose={()=>setNavigationOpen(false)}/><div className="workspace"><AppHeader onMenu={()=>setNavigationOpen(true)}/><main className="content" id="main-content" tabIndex={-1}><Breadcrumbs/><Outlet/></main></div></div>}
