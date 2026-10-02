import { LogOut,Save,UserRound } from "lucide-react";
import { useState,type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/layout";
import { Button,Card,FormField,Input } from "@/components/ui";
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
    <PageHeader title="Profile" description="Manage your account details and current application session."/>
    <div className="grid gap-3 lg:grid-cols-[220px_minmax(0,1fr)]">
      <Card>
        <div className="flex flex-col items-center py-2 text-center">
          <span className="grid size-16 place-items-center bg-[var(--theme-soft)] text-lg font-semibold text-[var(--theme-soft-text)]">{initials}</span>
          <strong className="mt-3 text-[14px] font-semibold">{user.name}</strong>
          <span className="mt-0.5 text-[11px] text-[var(--color-text-muted)]">{user.jobTitle}</span>
          <span className="text-[11px] text-[var(--color-text-muted)]">{user.email}</span>
        </div>
      </Card>

      <Card>
        <div className="mb-3 flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
          <UserRound size={16} className="text-[var(--color-text-muted)]"/>
          <div><h2 className="text-[15px] font-semibold">Account details</h2><p className="text-[11px] text-[var(--color-text-muted)]">These details are stored locally in the current prototype.</p></div>
        </div>

        <form onSubmit={submit}>
          <div className="grid gap-3 md:grid-cols-2">
            <FormField id="profile-name" label="Full name" required><Input id="profile-name" value={name} onChange={event=>setName(event.target.value)} required/></FormField>
            <FormField id="profile-email" label="Email" required><Input id="profile-email" type="email" value={email} onChange={event=>setEmail(event.target.value)} required/></FormField>
            <FormField id="profile-job-title" label="Job title"><Input id="profile-job-title" value={jobTitle} onChange={event=>setJobTitle(event.target.value)}/></FormField>
            <FormField id="profile-company" label="Company"><Input id="profile-company" value={company} onChange={event=>setCompany(event.target.value)}/></FormField>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-3">
            <span className="text-[11px] text-[var(--color-text-muted)]" role="status">{saved?"Profile saved.":""}</span>
            <Button type="submit"><Save size={15}/>Save changes</Button>
          </div>
        </form>
      </Card>

      <Card className="lg:col-start-2">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div><h2 className="text-[14px] font-semibold">Session</h2><p className="mt-0.5 text-[11px] text-[var(--color-text-muted)]">Sign out of this browser session.</p></div>
          <Button variant="secondary" onClick={logout}><LogOut size={15}/>Sign out</Button>
        </div>
      </Card>
    </div>
  </>;
}
