import type { Project } from "@/lib/schemas";

import { billeteraVirtual } from "./billetera-virtual";
import { miKiosco } from "./mi-kiosco";
import { misAlquileres } from "./mis-alquileres";
import { pandoCba } from "./pando-cba";
import { trabajosAcademicos } from "./trabajos-academicos";

/**
 * Lista de proyectos del sitio. Para agregar uno: crear su archivo en esta
 * carpeta y sumarlo acá. El orden final lo define el campo `order`.
 */
export const projects: Project[] = [
  miKiosco,
  pandoCba,
  misAlquileres,
  billeteraVirtual,
  trabajosAcademicos,
];
