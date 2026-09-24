import { z,type ZodType } from "zod";
import { ApiError } from "./ApiError";
type RequestOptions<T>={method?:"GET"|"POST"|"PUT"|"PATCH"|"DELETE";body?:unknown;schema:ZodType<T>;signal?:AbortSignal};
export class ApiClient{constructor(private readonly baseUrl:string){}async request<T>(path:string,{method="GET",body,schema,signal}:RequestOptions<T>):Promise<T>{const response=await fetch(`${this.baseUrl}${path}`,{method,signal,headers:body===undefined?undefined:{"Content-Type":"application/json","Accept":"application/json"},body:body===undefined?undefined:JSON.stringify(body)});if(!response.ok)throw await ApiError.fromResponse(response);if(response.status===204)return schema.parse(undefined);return schema.parse(await response.json())}}
export const emptyResponseSchema=z.undefined();
