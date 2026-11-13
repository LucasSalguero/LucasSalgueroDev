# ADR 0001: Next.js con export estático

- **Estado:** aceptado
- **Fecha:** noviembre de 2026

## Contexto

El portafolio era un único `index.html`. Funcionaba, pero mezclaba contenido, estilos y
estructura en un archivo, y no permitía tener una página por proyecto sin duplicar HTML.

El sitio tiene pocas páginas, el contenido cambia pocas veces al año y siempre con un commit.
No necesita usuarios, formularios ni datos en tiempo real. Además, el repositorio es parte del
portafolio: tiene que mostrar el stack con el que trabajo.

## Decisión

Usar **Next.js 15 (App Router) + React 19 + TypeScript `strict`**, con `output: "export"`.

- `next build` genera HTML, CSS y JS estáticos en `out/`.
- Las páginas de proyecto se generan con `generateStaticParams`, y `dynamicParams = false` hace
  que cualquier otro slug sea un 404.
- `sitemap.ts` y `robots.ts` usan `dynamic = "force-static"` para poder exportarse.
- `trailingSlash: true` exporta cada ruta como carpeta con su `index.html`, así las URLs
  funcionan igual en cualquier hosting estático.
- El deploy es en Vercel.

## Consecuencias

**A favor**

- Sitio rápido y sin infraestructura que mantener: no hay servidor, base de datos ni secretos.
- Se puede publicar en cualquier hosting estático sin cambiar código.
- El repo usa el mismo stack que mis proyectos principales.

**En contra**

- No hay optimización de imágenes en el servidor. `next/image` se usa con `unoptimized`, así
  que las capturas se suben ya optimizadas (ver `docs/CONTENT.md`).
- No hay Route Handlers dinámicos, Server Actions ni middleware. Un formulario de contacto
  necesitaría un servicio externo.
- Cambiar un texto requiere un commit y un deploy.

**Notas de implementación**

- `npm run start` no puede usar `next start`, que no funciona con `output: "export"`. Sirve la
  carpeta `out/` con `npx serve`, sin sumar una dependencia al proyecto.
- ESLint usa `eslint-config-next` a través de `@eslint/eslintrc` (`FlatCompat`), que es la forma
  que indica Next.js 15 para el formato flat config. Es una dependencia solo de desarrollo.
- Dependabot ignora las versiones mayores de `next` para mantener el stack en Next.js 15 hasta
  decidir la migración.
