export type StatusTone="neutral"|"info"|"success"|"warning"|"danger";
const statusTones:Record<string,StatusTone>={active:"success",approved:"success",completed:"success",passed:"success",pending:"warning","under-review":"warning","on-hold":"warning",overdue:"danger",failed:"danger",rejected:"danger",critical:"danger",cancelled:"neutral",draft:"neutral",planning:"info"};
export function getStatusTone(status:string):StatusTone{return statusTones[status.toLowerCase()]??"neutral"}
