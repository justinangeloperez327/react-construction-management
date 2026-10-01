import { z } from "zod";

const normalizedString=(value:unknown)=>{
  if(typeof value!=="string")return value;
  const normalized=value.trim().toLowerCase();
  return normalized===""?undefined:normalized;
};

const environmentSchema=z.preprocess(value=>{
  const normalized=normalizedString(value);
  if(normalized==="preview")return "staging";
  if(normalized==="local")return "development";
  return normalized;
},z.enum(["development","staging","production"]).default(import.meta.env.PROD?"production":"development"));

const schema=z.object({
  VITE_DATA_PROVIDER:z.preprocess(normalizedString,z.enum(["mock","http"]).default("mock")),
  VITE_API_BASE_URL:z.preprocess(value=>{
    if(typeof value!=="string")return value;
    const trimmed=value.trim();
    return trimmed===""?undefined:trimmed;
  },z.string().min(1).default("/api/v1")),
  VITE_APP_ENV:environmentSchema
});

const parsed=schema.safeParse(import.meta.env);

if(!parsed.success){
  console.error("Invalid environment configuration",parsed.error.flatten().fieldErrors);
  throw new Error("Invalid application environment configuration");
}

export const env=parsed.data;
