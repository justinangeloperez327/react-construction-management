import { createContext,useContext,useMemo,useState,type PropsWithChildren } from "react";

export type AuthUser={
  id:string;
  name:string;
  email:string;
  jobTitle:string;
  company:string;
};

type ProfileInput=Omit<AuthUser,"id">;

type AuthContextValue={
  isAuthenticated:boolean;
  user:AuthUser;
  signIn:(email:string,password:string)=>Promise<void>;
  signOut:()=>void;
  updateProfile:(input:ProfileInput)=>void;
};

const statusKey="construction-management-auth-status";
const userKey="construction-management-auth-user";

const defaultUser:AuthUser={
  id:"user-1",
  name:"Justin Perez",
  email:"justin.perez@example.com",
  jobTitle:"Project Manager",
  company:"Construction Management"
};

function readUser():AuthUser{
  if(typeof window==="undefined")return defaultUser;
  try{
    const raw=window.localStorage.getItem(userKey);
    return raw?{...defaultUser,...JSON.parse(raw)}:defaultUser;
  }catch{
    return defaultUser;
  }
}

function initialAuthenticated(){
  if(typeof window==="undefined")return true;
  return window.localStorage.getItem(statusKey)!=="signed-out";
}

const AuthContext=createContext<AuthContextValue|null>(null);

export function AuthProvider({children}:PropsWithChildren){
  const [user,setUser]=useState<AuthUser>(readUser);
  const [isAuthenticated,setAuthenticated]=useState(initialAuthenticated);

  const value=useMemo<AuthContextValue>(()=>({
    isAuthenticated,
    user,
    async signIn(email,password){
      if(!email.trim())throw new Error("Email is required.");
      if(password.length<6)throw new Error("Password must be at least 6 characters.");
      const next={...user,email:email.trim()};
      setUser(next);
      setAuthenticated(true);
      window.localStorage.setItem(userKey,JSON.stringify(next));
      window.localStorage.setItem(statusKey,"signed-in");
    },
    signOut(){
      setAuthenticated(false);
      window.localStorage.setItem(statusKey,"signed-out");
    },
    updateProfile(input){
      const next={...user,...input};
      setUser(next);
      window.localStorage.setItem(userKey,JSON.stringify(next));
    }
  }),[isAuthenticated,user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(){
  const value=useContext(AuthContext);
  if(!value)throw new Error("useAuth must be used within AuthProvider");
  return value;
}
