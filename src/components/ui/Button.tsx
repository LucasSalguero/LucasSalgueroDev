import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./Button.module.css";

type Variant = "default" | "primary";

function classFor(variant: Variant) {
  return variant === "primary" ? `${styles.btn} ${styles.primary}` : styles.btn;
}

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Abre en una pestaña nueva (links externos y archivos). */
  external?: boolean;
}

/** Link con apariencia de botón. Los internos usan next/link. */
export function ButtonLink({ href, children, variant = "default", external }: ButtonLinkProps) {
  if (external) {
    return (
      <a className={classFor(variant)} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link className={classFor(variant)} href={href}>
      {children}
    </Link>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ variant = "default", type = "button", ...rest }: ButtonProps) {
  return <button className={classFor(variant)} type={type} {...rest} />;
}
