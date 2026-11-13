import type { Metadata } from "next";
import type { ReactNode } from "react";

import { fontVariables } from "./fonts";

import "@/styles/tokens.css";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Lucas Salguero",
  description:
    "Portafolio de Lucas Salguero, desarrollador Full Stack Junior en Córdoba, Argentina.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-AR" className={fontVariables} data-scroll-behavior="smooth">
      <body>
        <div className="wrap">{children}</div>
      </body>
    </html>
  );
}
