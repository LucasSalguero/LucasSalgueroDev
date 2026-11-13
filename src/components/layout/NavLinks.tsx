"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "./NavLinks.module.css";

export interface NavLink {
  /** Id de la sección de la home. */
  id: string;
  label: string;
}

/** Id del encabezado de la home: mientras se ve, ningún link queda marcado. */
const TOP_SECTION_ID = "inicio";

/** Links del menú. En la home marcan la sección que se está leyendo. */
export function NavLinks({ links }: { links: readonly NavLink[] }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [visibleId, setVisibleId] = useState<string | null>(null);

  useEffect(() => {
    if (!isHome) return;

    const sections = [TOP_SECTION_ID, ...links.map((link) => link.id)]
      .map((id) => document.getElementById(id))
      .filter((section) => section !== null);

    // Franja angosta en el tercio superior: la sección que la cruza es la actual.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setVisibleId(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome, links]);

  const currentId = isHome ? visibleId : null;

  return (
    <ul className={styles.links}>
      {links.map((link) => (
        <li key={link.id}>
          <Link
            className={styles.link}
            href={`/#${link.id}`}
            aria-current={currentId === link.id ? "location" : undefined}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
