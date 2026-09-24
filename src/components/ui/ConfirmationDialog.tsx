import { Button } from "./Button";
import { Dialog } from "./Dialog";
export function ConfirmationDialog({open,title,description,confirmLabel="Confirm",danger=false,onConfirm,onClose}:{open:boolean;title:string;description:string;confirmLabel?:string;danger?:boolean;onConfirm:()=>void;onClose:()=>void}){return <Dialog open={open} title={title} description={description} onClose={onClose} footer={<><Button variant="secondary" onClick={onClose}>Cancel</Button><Button variant={danger?"danger":"primary"} onClick={onConfirm}>{confirmLabel}</Button></>}/>} 
