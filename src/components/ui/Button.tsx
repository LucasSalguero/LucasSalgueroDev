import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./Button.module.css";
import { Icon, type IconName } from "./Icon";

type Variant = "default" | "primary";

function classFor(variant: Variant) {
  return variant === "primary" ? `${styles.btn} ${styles.primary}` : styles.btn;
}

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: IconName;
  /** Abre en una pestaña nueva (links externos y archivos). */
  external?: boolean;
}

/** Link con apariencia de botón. Los internos usan next/link. */
export function ButtonLink({
  href,
  children,
  variant = "default",
  icon,
  external,
}: ButtonLinkProps) {
  if (external) {
    return (
      <a className={classFor(variant)} href={href} target="_blank" rel="noopener noreferrer">
        {icon ? <Icon name={icon} /> : null}
        {children}
        <span className="visually-hidden"> (se abre en una pestaña nueva)</span>
      </a>
    );
  }

  return (
    <Link className={classFor(variant)} href={href}>
      {icon ? <Icon name={icon} /> : null}
      {children}
    </Link>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: IconName;
}

export function Button({
  variant = "default",
  type = "button",
  icon,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={classFor(variant)} type={type} {...rest}>
      {icon ? <Icon name={icon} /> : null}
      {children}
    </button>
  );
}
