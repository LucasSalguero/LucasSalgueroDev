import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./ArrowLink.module.css";

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
}

/**
 * Link de texto terminado en flecha: "Ver caso →". Los externos usan "↗" para
 * anticipar que se abren en otra pestaña.
 */
export function ArrowLink({ href, children, external }: ArrowLinkProps) {
  if (external) {
    return (
      <a className={styles.link} href={href} target="_blank" rel="noopener noreferrer">
        {children} <span aria-hidden="true">↗</span>
        <span className="visually-hidden"> (se abre en una pestaña nueva)</span>
      </a>
    );
  }

  return (
    <Link className={styles.link} href={href}>
      {children} <span aria-hidden="true">→</span>
    </Link>
  );
}

export function ArrowLinkRow({ children }: { children: ReactNode }) {
  return <div className={styles.row}>{children}</div>;
}
