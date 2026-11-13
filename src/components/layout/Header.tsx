import Link from "next/link";

import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "/#mi-kiosco", label: "Mi Kiosco" },
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#formacion", label: "Formación" },
  { href: "/#contacto", label: "Contacto" },
] as const;

export function Header({ name }: { name: string }) {
  return (
    <header>
      <nav className={styles.nav} aria-label="Principal">
        <Link className={styles.brand} href="/">
          {name}
        </Link>
        <ul className={styles.links}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
