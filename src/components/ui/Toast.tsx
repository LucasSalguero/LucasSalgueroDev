import { Icon } from "./Icon";
import styles from "./Toast.module.css";

export interface ToastMessage {
  text: string;
  tone: "success" | "error";
}

interface ToastProps {
  message: ToastMessage | null;
  onClose: () => void;
}

/**
 * Aviso flotante. La región `role="status"` está siempre en el DOM para que
 * los lectores de pantalla anuncien el mensaje cuando aparece.
 */
export function Toast({ message, onClose }: ToastProps) {
  return (
    <div className={styles.region} role="status" aria-live="polite">
      {message ? (
        <div
          className={message.tone === "error" ? `${styles.toast} ${styles.error}` : styles.toast}
        >
          <Icon name={message.tone === "error" ? "warning" : "check"} className={styles.icon} />
          <span className={styles.text}>{message.text}</span>
          <button
            className={styles.close}
            type="button"
            onClick={onClose}
            aria-label="Cerrar aviso"
          >
            <Icon name="close" size={16} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
