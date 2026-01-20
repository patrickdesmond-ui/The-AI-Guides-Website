import Link from "next/link";
import { ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export default function Button({ href, children, variant = "primary" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition",
        variant === "primary" &&
          "bg-brand-600 text-white shadow-sm hover:bg-brand-700",
        variant === "secondary" &&
          "border border-brand-200 bg-white text-brand-700 hover:border-brand-300",
        variant === "ghost" && "text-brand-700 hover:text-brand-900"
      )}
    >
      {children}
    </Link>
  );
}
