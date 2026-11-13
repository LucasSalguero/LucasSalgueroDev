import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sitio 100 % estático: `next build` deja el resultado en `out/`.
  output: "export",
  // Cada ruta se exporta como carpeta con su index.html (URLs limpias en cualquier hosting).
  trailingSlash: true,
  // El export estático no tiene servidor que optimice imágenes.
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
