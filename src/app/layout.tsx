import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getProfile } from "@/lib/profile";

import { fontVariables } from "./fonts";

import "@/styles/tokens.css";
import "@/styles/globals.css";

const profile = getProfile();

export const metadata: Metadata = {
  title: profile.name,
  description: profile.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-AR" className={fontVariables} data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <div className="wrap">
          <Header name={profile.name} />
          <main id="contenido">{children}</main>
          <Footer text={profile.footer} />
        </div>
      </body>
    </html>
  );
}
