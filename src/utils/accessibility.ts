export function describedBy(...ids:Array<string|undefined|false>){const value=ids.filter(Boolean).join(" ");return value||undefined}
export function announceableCount(count:number,singular:string,plural=`${singular}s`){return `${count} ${count===1?singular:plural}`}
