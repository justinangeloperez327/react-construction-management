import { useState,type FormEvent } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { Alert,Button,Card,CardContent,CardHeader,FormField,Input } from "@/components/ui";
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

  return <main className="relative flex min-h-svh items-center justify-center bg-background px-4 py-10">
    <div className="absolute right-4 top-4"><ThemeToggle/></div>
    <Card className="w-full max-w-sm">
      <CardHeader title="Sign in" description="Construction Management"/>
      <CardContent>
        <form className="grid gap-4" onSubmit={submit}>
          <FormField id="login-email" label="Email" required>
            <Input id="login-email" type="email" autoComplete="email" value={email} onChange={event=>setEmail(event.target.value)} required/>
          </FormField>
          <FormField id="login-password" label="Password" required>
            <Input id="login-password" type="password" autoComplete="current-password" value={password} onChange={event=>setPassword(event.target.value)} required/>
          </FormField>
          {error&&<Alert tone="danger" title={error}/>}
          <Button className="w-full" type="submit" disabled={submitting}>{submitting?"Signing in...":"Sign in"}</Button>
        </form>
        <p className="mt-4 text-xs text-muted-foreground">Demo: use any password with at least 6 characters.</p>
      </CardContent>
    </Card>
  </main>;
}
