import type { ReactNode } from "react";

export type IconName =
  | "arrowUp"
  | "check"
  | "close"
  | "copy"
  | "file"
  | "github"
  | "linkedin"
  | "mail"
  | "moon"
  | "pin"
  | "sun"
  | "warning";

interface IconDefinition {
  viewBox: string;
  /** Los logos de marca van rellenos; el resto son íconos de línea. */
  filled?: boolean;
  content: ReactNode;
}

const ICONS: Record<IconName, IconDefinition> = {
  arrowUp: { viewBox: "0 0 24 24", content: <path d="M12 19V5M6 11l6-6 6 6" /> },
  check: { viewBox: "0 0 24 24", content: <path d="m5 12.5 4.5 4.5L19 7.5" /> },
  close: { viewBox: "0 0 24 24", content: <path d="M6 6l12 12M18 6 6 18" /> },
  copy: {
    viewBox: "0 0 24 24",
    content: (
      <>
        <rect x="9" y="9" width="11" height="11" rx="2" />
        <path d="M5 15V6a2 2 0 0 1 2-2h9" />
      </>
    ),
  },
  file: {
    viewBox: "0 0 24 24",
    content: (
      <>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5M12 11v6M9.5 14.5 12 17l2.5-2.5" />
      </>
    ),
  },
  github: {
    viewBox: "0 0 16 16",
    filled: true,
    content: (
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    ),
  },
  linkedin: {
    viewBox: "0 0 128 128",
    filled: true,
    content: (
      <path d="M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3zM39.17 107H21.06V48.73h18.11zm-9-66.21a10.5 10.5 0 1110.49-10.5 10.5 10.5 0 01-10.54 10.48zM107 107H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53V48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75z" />
    ),
  },
  mail: {
    viewBox: "0 0 24 24",
    content: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
  },
  moon: {
    viewBox: "0 0 24 24",
    content: <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />,
  },
  pin: {
    viewBox: "0 0 24 24",
    content: (
      <>
        <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
  sun: {
    viewBox: "0 0 24 24",
    content: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
  },
  warning: {
    viewBox: "0 0 24 24",
    content: (
      <>
        <path d="M12 4 2.5 20h19z" />
        <path d="M12 10v5M12 17.5v.5" />
      </>
    ),
  },
};

interface IconProps {
  name: IconName;
  /** Lado en píxeles. */
  size?: number;
  className?: string;
}

/** Ícono decorativo: el texto que lo acompaña es el que lo nombra. */
export function Icon({ name, size = 18, className }: IconProps) {
  const icon = ICONS[name];

  return (
    <svg
      className={className}
      viewBox={icon.viewBox}
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      fill={icon.filled ? "currentColor" : "none"}
      stroke={icon.filled ? undefined : "currentColor"}
      strokeWidth={icon.filled ? undefined : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icon.content}
    </svg>
  );
}
