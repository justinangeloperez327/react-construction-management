export type SortDirection="asc"|"desc";
export type ListQuery={page?:number;pageSize?:number;search?:string;sortBy?:string;sortDirection?:SortDirection;filters?:Record<string,string|number|boolean|undefined>};
export type PageMeta={page:number;pageSize:number;total:number;totalPages:number};
export type PagedResult<T>={data:T[];meta:PageMeta};
export type ApiErrorBody={message?:string;code?:string;errors?:Record<string,string[]>};
