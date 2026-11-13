import Image from "next/image";

import type { ProjectImage } from "@/lib/schemas";

import styles from "./Gallery.module.css";

/**
 * Galería de capturas. Sin imágenes no renderiza nada: no hay placeholders.
 * `unoptimized` porque el export estático no tiene servidor de imágenes.
 */
export function Gallery({ images }: { images: readonly ProjectImage[] }) {
  if (images.length === 0) return null;

  return (
    <ul className={images.length === 1 ? styles.single : styles.gallery}>
      {images.map((image, index) => (
        <li key={image.src}>
          <figure className={styles.figure}>
            <div className={styles.frame}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                unoptimized
                sizes="(max-width: 860px) 100vw, 540px"
                priority={index === 0}
              />
            </div>
            {image.caption ? <figcaption>{image.caption}</figcaption> : null}
          </figure>
        </li>
      ))}
    </ul>
  );
}
