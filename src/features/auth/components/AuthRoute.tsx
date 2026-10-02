import type { PropsWithChildren } from "react";
import { Navigate,useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";

export function ProtectedRoute({children}:PropsWithChildren){
  const {isAuthenticated}=useAuth();
  const location=useLocation();
  if(!isAuthenticated)return <Navigate to="/login" replace state={{from:location.pathname+location.search}}/>;
  return children;
}

export function GuestRoute({children}:PropsWithChildren){
  const {isAuthenticated}=useAuth();
  if(isAuthenticated)return <Navigate to="/" replace/>;
  return children;
}
