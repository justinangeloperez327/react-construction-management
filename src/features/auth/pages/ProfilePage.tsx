import { LogOut,Save,UserRound } from "lucide-react";
import { useState,type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/layout";
import { Button,Card,CardContent,CardHeader,FormField,Input } from "@/components/ui";
import { useAuth } from "@/features/auth/context/AuthContext";

export function ProfilePage(){
  const {user,updateProfile,signOut}=useAuth();
  const navigate=useNavigate();
  const [name,setName]=useState(user.name);
  const [email,setEmail]=useState(user.email);
  const [jobTitle,setJobTitle]=useState(user.jobTitle);
  const [company,setCompany]=useState(user.company);
  const [saved,setSaved]=useState(false);

  const submit=(event:FormEvent)=>{
    event.preventDefault();
    updateProfile({name:name.trim(),email:email.trim(),jobTitle:jobTitle.trim(),company:company.trim()});
    setSaved(true);
    window.setTimeout(()=>setSaved(false),1800);
  };

  const logout=()=>{
    signOut();
    navigate("/login",{replace:true});
  };

  const initials=user.name.split(/\s+/).filter(Boolean).slice(0,2).map(part=>part[0]).join("").toUpperCase()||"U";

  return <>
    <PageHeader title="Profile"/>
    <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
      <Card>
        <CardContent>
          <div className="flex flex-col items-center text-center">
            <span className="grid size-16 place-items-center rounded-full bg-muted text-lg font-semibold">{initials}</span>
            <strong className="mt-3 text-sm font-medium">{user.name}</strong>
            <span className="mt-1 text-sm text-muted-foreground">{user.jobTitle}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Account details" action={<UserRound className="size-4 text-muted-foreground"/>}/>
        <CardContent>
          <form onSubmit={submit}>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField id="profile-name" label="Full name" required><Input id="profile-name" value={name} onChange={event=>setName(event.target.value)} required/></FormField>
              <FormField id="profile-email" label="Email" required><Input id="profile-email" type="email" value={email} onChange={event=>setEmail(event.target.value)} required/></FormField>
              <FormField id="profile-job-title" label="Job title"><Input id="profile-job-title" value={jobTitle} onChange={event=>setJobTitle(event.target.value)}/></FormField>
              <FormField id="profile-company" label="Company"><Input id="profile-company" value={company} onChange={event=>setCompany(event.target.value)}/></FormField>
            </div>
            <div className="mt-6 flex items-center justify-between gap-3">
              <span className="text-sm text-muted-foreground" role="status">{saved?"Profile saved.":""}</span>
              <Button type="submit"><Save size={15}/>Save changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="lg:col-start-2">
        <CardHeader title="Session"/>
        <CardContent>
          <Button variant="secondary" onClick={logout}><LogOut size={15}/>Sign out</Button>
        </CardContent>
      </Card>
    </div>
  </>;
}
