"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "./Button";
import styles from "./CopyEmailButton.module.css";
import { Icon } from "./Icon";
import { Toast, type ToastMessage } from "./Toast";

const SUCCESS_MS = 4000;
/** El aviso de error muestra el email para copiarlo a mano: queda más tiempo. */
const ERROR_MS = 12000;

interface CopyEmailButtonProps {
  email: string;
  /** `button`: botón "Copiar email". `address`: la dirección completa, clickeable. */
  variant?: "button" | "address";
}

/** Copia el email al portapapeles y avisa con un toast si pudo o no. */
export function CopyEmailButton({ email, variant = "button" }: CopyEmailButtonProps) {
  const [message, setMessage] = useState<ToastMessage | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function close() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMessage(null);
  }

  function notify(next: ToastMessage, duration: number) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMessage(next);
    timeoutRef.current = setTimeout(() => setMessage(null), duration);
  }

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(email);
      notify({ tone: "success", text: `Email copiado: ${email}` }, SUCCESS_MS);
    } catch {
      notify({ tone: "error", text: `No se pudo copiar. Mi email es ${email}` }, ERROR_MS);
    }
  }

  const copied = message?.tone === "success";

  return (
    <>
      {variant === "address" ? (
        <button
          className={styles.address}
          type="button"
          onClick={handleClick}
          aria-label={`Copiar email ${email}`}
        >
          <span className={styles.email}>{email}</span>
          <span className={styles.hint}>
            <Icon name={copied ? "check" : "copy"} size={16} />
            {copied ? "Copiado" : "Copiar"}
          </span>
        </button>
      ) : (
        <Button onClick={handleClick} icon={copied ? "check" : "mail"}>
          {copied ? "Email copiado" : "Copiar email"}
        </Button>
      )}
      <Toast message={message} onClose={close} />
    </>
  );
}
