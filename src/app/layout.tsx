import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getProfile } from "@/lib/profile";
import { getFeaturedProject } from "@/lib/projects";

import { fontVariables } from "./fonts";

import "@/styles/tokens.css";
import "@/styles/globals.css";

const profile = getProfile();
const featured = getFeaturedProject();

/**
 * Aplica el tema elegido antes del primer pintado, para que no parpadee.
 * La clave "theme" es la misma que usa ThemeToggle.
 */
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} · ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.description,
  authors: [{ name: profile.name, url: profile.links.github }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: profile.name,
    title: `${profile.name} · ${profile.role}`,
    description: profile.description,
    url: "/",
  },
  twitter: { card: "summary" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f6f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1118" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="es-AR"
      className={fontVariables}
      data-scroll-behavior="smooth"
      // El script de tema agrega data-theme antes de que React hidrate.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <div className="wrap">
          <Header name={profile.name} featured={{ id: featured.slug, label: featured.title }} />
          <main id="contenido">{children}</main>
          <Footer
            text={profile.footer}
            github={profile.links.github}
            linkedin={profile.links.linkedin}
            cvPath={profile.cvPath}
          />
        </div>
      </body>
    </html>
  );
}
