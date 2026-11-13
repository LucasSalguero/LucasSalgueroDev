import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./ArrowLink.module.css";

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
}

/** Link de texto terminado en flecha: "Ver repositorio →". */
export function ArrowLink({ href, children, external }: ArrowLinkProps) {
  const content = (
    <>
      {children} <span aria-hidden="true">→</span>
    </>
  );

  if (external) {
    return (
      <a className={styles.link} href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link className={styles.link} href={href}>
      {content}
    </Link>
  );
}

export function ArrowLinkRow({ children }: { children: ReactNode }) {
  return <div className={styles.row}>{children}</div>;
}
