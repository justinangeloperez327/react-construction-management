import type { ButtonHTMLAttributes } from "react";
type Variant="primary"|"secondary"|"danger"|"ghost";
type Props=ButtonHTMLAttributes<HTMLButtonElement>&{variant?:Variant};

const variants:Record<Variant,string>={
  primary:"border-blue-600 bg-blue-600 text-white hover:border-blue-700 hover:bg-blue-700 dark:border-blue-500 dark:bg-blue-500 dark:hover:border-blue-400 dark:hover:bg-blue-400 dark:hover:text-slate-950",
  secondary:"border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800",
  danger:"border-red-700 bg-red-700 text-white hover:bg-red-800 dark:border-red-500 dark:bg-red-600 dark:hover:bg-red-500",
  ghost:"border-transparent bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
};

export function Button({variant="primary",className="",...props}:Props){
  return <button className={`inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:shrink-0 ${variants[variant]} ${className}`.trim()} {...props}/>;
}
