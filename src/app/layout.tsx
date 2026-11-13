import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Lucas Salguero",
  description:
    "Portafolio de Lucas Salguero, desarrollador Full Stack Junior en Córdoba, Argentina.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-AR">
      <body>{children}</body>
    </html>
  );
}
