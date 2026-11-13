import { Icon } from "@/components/ui/Icon";

import styles from "./Footer.module.css";

interface FooterProps {
  text: string;
  github: string;
  linkedin: string;
  cvPath: string;
}

export function Footer({ text, github, linkedin, cvPath }: FooterProps) {
  const links = [
    { href: github, label: "GitHub", icon: "github" },
    { href: linkedin, label: "LinkedIn", icon: "linkedin" },
    { href: cvPath, label: "CV (PDF)", icon: "file" },
  ] as const;

  return (
    <footer className={styles.footer}>
      <p className={styles.text}>{text}</p>
      <ul className={styles.links}>
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              <Icon name={link.icon} size={16} />
              {link.label}
              <span className="visually-hidden"> (se abre en una pestaña nueva)</span>
            </a>
          </li>
        ))}
      </ul>
      <a className={styles.top} href="#contenido">
        <Icon name="arrowUp" size={16} />
        Volver arriba
      </a>
    </footer>
  );
}
