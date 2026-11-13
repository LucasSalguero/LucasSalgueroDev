import styles from "./Footer.module.css";

export function Footer({ text }: { text: string }) {
  return <footer className={styles.footer}>{text}</footer>;
}
