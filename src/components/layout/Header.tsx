import Link from "next/link";

import styles from "./Header.module.css";
import { NavLinks, type NavLink } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  name: string;
  /** Proyecto destacado: su sección tiene un link propio en el menú. */
  featured: NavLink;
}

export function Header({ name, featured }: HeaderProps) {
  const links: NavLink[] = [
    { id: "sobre-mi", label: "Sobre mí" },
    featured,
    { id: "proyectos", label: "Proyectos" },
    { id: "formacion", label: "Formación" },
    { id: "habilidades", label: "Habilidades" },
    { id: "contacto", label: "Contacto" },
  ];

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Principal">
        <Link className={styles.brand} href="/">
          {name}
        </Link>
        <NavLinks links={links} />
        <ThemeToggle />
      </nav>
    </header>
  );
}
