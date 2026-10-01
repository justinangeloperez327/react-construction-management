import { env } from "@/app/env";export function selectRepository<T>(mock:()=>T,http:()=>T):T{return env.VITE_DATA_PROVIDER==="http"?http():mock()}
