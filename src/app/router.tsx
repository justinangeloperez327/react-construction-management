import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { ProjectsPage } from "@/features/projects/pages/ProjectsPage";

export const router=createBrowserRouter([{path:"/",element:<AppShell />,children:[{index:true,element:<DashboardPage />},{path:"projects",element:<ProjectsPage />}]}]);
