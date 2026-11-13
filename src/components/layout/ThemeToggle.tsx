"use client";

import { Icon } from "@/components/ui/Icon";

import styles from "./ThemeToggle.module.css";

/** Clave de localStorage. La lee también el script de `app/layout.tsx`. */
const STORAGE_KEY = "theme";

type Theme = "light" | "dark";

function getCurrentTheme(): Theme {
  const forced = document.documentElement.dataset.theme;
  if (forced === "light" || forced === "dark") return forced;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Cambia entre tema claro y oscuro y recuerda la elección. No guarda estado en
 * React: el tema vive en `data-theme` de <html> y el ícono se resuelve por CSS.
 */
export function ThemeToggle() {
  function handleClick() {
    const next: Theme = getCurrentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;

    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Sin almacenamiento (modo privado): el cambio vale hasta recargar.
    }
  }

  return (
    <button
      className={styles.toggle}
      type="button"
      onClick={handleClick}
      aria-label="Cambiar entre tema claro y oscuro"
      title="Cambiar tema"
    >
      <Icon name="moon" className={styles.moon} />
      <Icon name="sun" className={styles.sun} />
    </button>
  );
}
