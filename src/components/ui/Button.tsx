import type { ButtonHTMLAttributes } from "react";
type Variant="primary"|"secondary"|"danger"|"ghost";
type Props=ButtonHTMLAttributes<HTMLButtonElement>&{variant?:Variant};

const variants:Record<Variant,string>={
  primary:"app-button-primary",
  secondary:"border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--theme-soft)]",
  danger:"border-red-700 bg-red-700 text-white hover:bg-red-800 dark:border-red-500 dark:bg-red-600 dark:hover:bg-red-500",
  ghost:"border-transparent bg-transparent text-[var(--color-text)] hover:bg-[var(--theme-soft)]"
};

export function Button({variant="primary",className="",...props}:Props){
  return <button className={`inline-flex min-h-9 items-center justify-center gap-1.5 border px-3 py-1.5 text-[13px] font-medium transition focus-visible:outline-none focus-visible:ring-2 app-focus disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:shrink-0 ${variants[variant]} ${className}`.trim()} {...props}/>;
}
