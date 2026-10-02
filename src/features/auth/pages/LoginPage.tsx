import { LockKeyhole } from "lucide-react";
import { useState,type FormEvent } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { Button,FormField,Input } from "@/components/ui";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useAuth } from "@/features/auth/context/AuthContext";

export function LoginPage(){
  const {user,signIn}=useAuth();
  const navigate=useNavigate();
  const location=useLocation();
  const [email,setEmail]=useState(user.email);
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [submitting,setSubmitting]=useState(false);

  const submit=async(event:FormEvent)=>{
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try{
      await signIn(email,password);
      const from=(location.state as {from?:string}|null)?.from;
      navigate(from&&from!=="/login"?from:"/",{replace:true});
    }catch(err){
      setError(err instanceof Error?err.message:"Unable to sign in.");
    }finally{
      setSubmitting(false);
    }
  };

  return <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
    <div className="absolute right-4 top-4"><ThemeToggle/></div>
    <div className="mx-auto flex min-h-screen w-full max-w-[420px] items-center px-5 py-10">
      <section className="w-full border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <div className="mb-5 flex items-center gap-3 border-b border-[var(--color-border)] pb-4">
          <span className="grid size-9 place-items-center bg-[var(--theme-soft)] text-[var(--theme-soft-text)]"><LockKeyhole size={17}/></span>
          <div>
            <strong className="block text-[15px] font-semibold">Construction Management</strong>
            <span className="text-[11px] text-[var(--color-text-muted)]">Project delivery workspace</span>
          </div>
        </div>

        <div className="mb-4">
          <h1 className="text-[22px] font-semibold">Sign in</h1>
          <p className="mt-1 text-[12px] leading-5 text-[var(--color-text-muted)]">Use your project account to continue.</p>
        </div>

        <form className="grid gap-3" onSubmit={submit}>
          <FormField id="login-email" label="Email" required>
            <Input id="login-email" type="email" autoComplete="email" value={email} onChange={event=>setEmail(event.target.value)} required/>
          </FormField>
          <FormField id="login-password" label="Password" required>
            <Input id="login-password" type="password" autoComplete="current-password" value={password} onChange={event=>setPassword(event.target.value)} required/>
          </FormField>
          {error&&<div className="border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300" role="alert">{error}</div>}
          <Button type="submit" disabled={submitting}>{submitting?"Signing in...":"Sign in"}</Button>
        </form>

        <p className="mt-4 border-t border-[var(--color-border)] pt-3 text-[11px] leading-5 text-[var(--color-text-muted)]">Demo authentication: use the displayed email and any password with at least 6 characters.</p>
      </section>
    </div>
  </main>;
}
