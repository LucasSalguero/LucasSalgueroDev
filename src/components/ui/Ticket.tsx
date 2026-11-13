import type { Ticket as TicketData } from "@/lib/schemas";

import styles from "./Ticket.module.css";

/** Ticket de venta de ejemplo, con estética de papel térmico. */
export function Ticket({ ticket }: { ticket: TicketData }) {
  return (
    <aside className={styles.ticket} aria-label={ticket.label}>
      <div className={styles.head}>
        <b>{ticket.store}</b>
        <span>{ticket.sale}</span>
        <span>{ticket.date}</span>
      </div>
      <table className={styles.items}>
        <tbody>
          {ticket.items.map((item) => (
            <tr key={item.description}>
              <td>{item.description}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.total}>
        <span>TOTAL</span>
        <span>{ticket.total}</span>
      </div>
      <div className={styles.meta}>
        {ticket.meta.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
      <span className={styles.state}>{ticket.state}</span>
      <p className={styles.note}>{ticket.note}</p>
    </aside>
  );
}
