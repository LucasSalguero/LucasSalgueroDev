"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "./Button";
import styles from "./CopyEmailButton.module.css";

type Status = "idle" | "copied" | "selected";

const LABELS: Record<Status, string> = {
  idle: "Copiar email",
  copied: "Copiado",
  selected: "Seleccionado",
};

/** Muestra el email y lo copia al portapapeles. Si no puede, lo deja seleccionado. */
export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const emailRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function show(next: Status) {
    setStatus(next);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setStatus("idle"), 2000);
  }

  function selectText() {
    const node = emailRef.current;
    const selection = window.getSelection();
    if (!node || !selection) return;

    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
    show("selected");
  }

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(email);
      show("copied");
    } catch {
      selectText();
    }
  }

  return (
    <div className={styles.mail}>
      <span ref={emailRef} className={styles.address}>
        {email}
      </span>
      <Button onClick={handleClick}>
        <span aria-live="polite">{LABELS[status]}</span>
      </Button>
    </div>
  );
}
