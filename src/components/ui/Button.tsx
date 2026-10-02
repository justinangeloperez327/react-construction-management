import type { ButtonHTMLAttributes } from "react";
import { ShadcnButton,type ShadcnButtonProps } from "@/components/shadcn/button";
type Variant="primary"|"secondary"|"danger"|"ghost";
type Props=ButtonHTMLAttributes<HTMLButtonElement>&{variant?:Variant};
const map:Record<Variant,ShadcnButtonProps["variant"]>={primary:"default",secondary:"outline",danger:"destructive",ghost:"ghost"};
export function Button({variant="primary",...props}:Props){return <ShadcnButton variant={map[variant]} {...props}/>}
