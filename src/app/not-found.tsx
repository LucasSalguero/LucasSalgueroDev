import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className={styles.notFound} aria-labelledby="no-encontrada-titulo">
      <Eyebrow>Error 404</Eyebrow>
      <h1 id="no-encontrada-titulo" className={styles.title}>
        Esta página no existe
      </h1>
      <p className={styles.text}>
        Puede que el link esté mal escrito o que el proyecto ya no esté.
      </p>
      <div className={styles.actions}>
        <ButtonLink href="/" variant="primary">
          Ir al inicio
        </ButtonLink>
        <ButtonLink href="/#proyectos">Ver proyectos</ButtonLink>
      </div>
    </section>
  );
}
