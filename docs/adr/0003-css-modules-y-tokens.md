# ADR 0003: CSS Modules y tokens en custom properties

- **Estado:** aceptado
- **Fecha:** noviembre de 2026

## Contexto

El diseño ya existía en el `index.html` original, con sus colores, tipografías y modo claro y
oscuro definidos como variables en `:root`. Había que pasarlo a componentes sin cambiar cómo se
ve y sin sumar dependencias.

## Decisión

- **Tokens globales** en `src/styles/tokens.css`: los colores, las fuentes y las medidas del
  `:root` original, como CSS custom properties.
- **CSS Modules**: un archivo `.module.css` por componente, que solo consume tokens.
- **Sin Tailwind ni librerías de UI.**
- **Fuentes con `next/font/google`** (Bricolage Grotesque, IBM Plex Sans e IBM Plex Mono). Se
  descargan en el build y se sirven desde el mismo dominio, sin pedidos a Google en el navegador.
- **Tema** según `prefers-color-scheme`, con `data-theme="light" | "dark"` en `<html>` para
  forzarlo.

## Consecuencias

**A favor**

- Cero JavaScript para los estilos y cero dependencias.
- Los estilos de un componente no afectan a otro: las clases son locales.
- Cambiar un color o sumar un tema es editar un archivo.
- El CSS original se pudo pasar casi sin cambios, así que el diseño se mantiene.

**En contra**

- No hay utilidades listas: cada componente escribe su CSS.
- Los valores del tema oscuro están repetidos en dos bloques (`@media` y `[data-theme="dark"]`),
  porque CSS no permite compartirlos sin un preprocesador.

## Cambios respecto del diseño original

Se hicieron los ajustes mínimos para cumplir los requisitos de accesibilidad:

| Cambio                                                                               | Motivo                                                    |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| `--live` en modo claro pasa de `#1f8a4c` a `#197540`                                 | El original daba 3,8:1 sobre `--live-soft`; AA pide 4,5:1 |
| Los links del menú y los links de texto miden 44 px de alto                          | Controles táctiles de al menos 44 px                      |
| Link "Saltar al contenido" al inicio de la página                                    | Navegación con teclado                                    |
| Las tarjetas suman borde de acento y elevación en hover, y el texto "Ver proyecto →" | Ahora toda la tarjeta es un link al detalle               |

La tarjeta completa es clickeable con la técnica del link estirado: el `<Link>` del título
cubre la tarjeta con un pseudo-elemento, y los links externos (repositorio y demo) quedan por
encima. Así no hay links anidados, que no son HTML válido.
