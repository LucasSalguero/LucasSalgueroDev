import { Fragment } from "react";

const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`)/g;

/**
 * Formato mínimo para los textos de `src/content`:
 * `**negrita**` y `` `código` ``. Evita guardar HTML en el contenido.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(TOKEN).filter(Boolean);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
        if (part.startsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </>
  );
}
