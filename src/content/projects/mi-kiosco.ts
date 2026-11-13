import type { Project } from "@/lib/schemas";

export const miKiosco: Project = {
  slug: "mi-kiosco",
  title: "Mi Kiosco",
  tagline:
    "El punto de venta de un comercio de barrio, pensado para seguir vendiendo sin internet.",
  kind: "produccion",
  year: 2026,
  featured: true,
  order: 1,
  stack: [
    "Next.js 16",
    "React 19",
    "TypeScript strict",
    "PostgreSQL",
    "Prisma 7",
    "PWA",
    "IndexedDB",
    "GitHub Actions",
  ],
  summary:
    "El negocio vendía sin registrar nada y no sabía cuánto ingresaba por día. Relevé el problema con el dueño, definí un MVP y lo construí en sprints semanales. Hoy se usa a diario en el mostrador.",
  problem:
    "El negocio vendía sin registrar nada y no sabía cuánto ingresaba por día. Además, en un kiosco el wifi se corta: la app tiene que seguir vendiendo y no puede duplicar ventas cuando vuelve la conexión.",
  solution:
    "Relevé el problema con el dueño, definí un MVP y lo construí en sprints semanales. El resultado es una PWA offline-first que registra ventas, fiados y caja desde el celular: las ventas hechas sin conexión se guardan en el dispositivo y se sincronizan solas, sin duplicados. Está en uso diario en el comercio desde octubre de 2026.",
  features: [
    {
      title: "Venta rápida",
      description:
        "Grilla de productos con filtro por categoría. Una venta se registra en dos toques como máximo; es una regla escrita en las convenciones del repo.",
    },
    {
      title: "Fiados por cliente",
      description:
        "Ventas a cobrar hoy, cuentas mensuales y pagos parciales. El saldo se calcula a partir de ventas y pagos; nunca se guarda como columna.",
    },
    {
      title: "Caja diaria",
      description:
        "Egresos, retiros e ingresos, arqueo de efectivo y cierre del día. El cierre guarda una foto que no se puede modificar después.",
    },
    {
      title: "Productos",
      description:
        "Categoría, marca y código de barras. Actualización masiva de precios con vista previa antes de aplicar.",
    },
    {
      title: "Medio de pago",
      description:
        "Cada venta cobrada guarda si fue en efectivo o por transferencia, con un botón para cada medio: el flujo sigue siendo producto → cobrar.",
    },
    {
      title: "Historial y resumen diario",
      description:
        "Ventas por día, con las pendientes de sincronizar y las que requieren revisión. El resumen separa lo vendido, lo cobrado y la deuda pendiente.",
    },
    {
      title: "Reportes de caja",
      description:
        "La pantalla de caja muestra lo cobrado por medio de pago, los productos más vendidos, las ventas por hora y el efectivo esperado.",
    },
    {
      title: "Catálogo sin conexión",
      description:
        "El catálogo queda cacheado en el dispositivo y la app se instala como PWA, con un service worker que solo se registra en producción.",
    },
  ],
  decisions: [
    {
      title: "Vertical slices",
      description:
        "Cada dominio (ventas, fiados, caja, productos, sync offline, historial, auth) tiene sus propias `actions/`, `lib/` y `ui/`.",
    },
    {
      title: "Server Actions + Route Handler",
      description:
        "La mayoría de la lógica corre en Server Actions. Las ventas usan un endpoint REST para que el sincronizador offline pueda llamarlo con `fetch`.",
    },
    {
      title: "Errores como valores",
      description:
        "Las funciones de negocio devuelven `Resultado<T>` con un código (`validation`, `network`…) que decide si reintentar o no.",
    },
    {
      title: "Dinero sin floats",
      description:
        "Importes en `Decimal(12,2)` con Prisma y transacciones al registrar ventas y pagos.",
    },
    {
      title: "Seguridad",
      description:
        "PIN con hash scrypt, sesión firmada con HMAC en cookie HttpOnly + SameSite=Strict, y 5 intentos por ventana de 15 min guardados en PostgreSQL.",
    },
    {
      title: "Calidad",
      description:
        "19 archivos de tests con `node:test`. CI en cada push y PR: tests, typecheck y lint. Nueve migraciones versionadas.",
    },
  ],
  role: "Proyecto propio: relevamiento con el dueño del comercio, definición del MVP, desarrollo full stack y mantenimiento.",
  nextSteps: [
    "alinear la versión de Node: la CI corre con Node 22 y el README pide Node 24",
    "quitar `vitest` de las dependencias (los tests corren con `node:test`) o migrar los tests",
    "actualizar el README, que todavía describe el proyecto como “etapa inicial del MVP”",
  ],
  links: {
    repo: "https://github.com/LucasSalguero/MiKiosco",
  },
  images: [],

  heading: "Mi Kiosco: el punto de venta de un comercio de barrio",
  eyebrow: "Proyecto destacado · en producción desde octubre 2026",
  highlights: [
    {
      label: "Venta rápida",
      text: "Grilla de productos con filtro por categoría. Una venta se registra en dos toques como máximo; es una regla escrita en las convenciones del repo.",
    },
    {
      label: "Fiados por cliente",
      text: "Ventas a cobrar hoy, cuentas mensuales y pagos parciales. El saldo se calcula a partir de ventas y pagos; nunca se guarda como columna.",
    },
    {
      label: "Caja diaria",
      text: "Egresos, retiros e ingresos, arqueo de efectivo y cierre del día. El cierre guarda una foto que no se puede modificar después.",
    },
    {
      label: "Productos",
      text: "Categoría, marca y código de barras. Actualización masiva de precios con vista previa antes de aplicar.",
    },
  ],
  note: "Es la evolución de una versión de escritorio que hice en 2024 con C#, .NET, Windows Forms y SQL Server.",
  offlineFlow: {
    title: "Cómo funciona sin internet",
    intro:
      "En un kiosco el wifi se corta. La app tiene que seguir vendiendo y no puede duplicar ventas cuando vuelve la conexión.",
    steps: [
      "Cada venta nace con un UUID propio (`claveOperacion`) generado en el dispositivo.",
      "Si no hay conexión o el servidor no responde en 8 s, la venta queda en una cola en IndexedDB con el precio acordado.",
      "Al volver la conexión se reintenta en orden, con espera creciente: 5 s, 15 s, 1 min y 5 min.",
      "El servidor busca la clave antes de insertar, y la columna es única en PostgreSQL. Si la venta ya llegó, devuelve la existente: no hay duplicados.",
      "Si el servidor rechaza los datos, la venta queda marcada “requiere revisión” en lugar de reintentarse sin fin.",
    ],
  },
  ticket: {
    label: "Ejemplo de venta registrada",
    store: "MI KIOSCO",
    sale: "Venta #1284 · ejemplo",
    date: "13/11/2026 18:42",
    items: [
      { description: "2 × Agua 500 ml", amount: "$1.800,00" },
      { description: "1 × Alfajor triple", amount: "$1.250,00" },
      { description: "1 × Pan (1/2 kg)", amount: "$1.100,00" },
    ],
    total: "$4.150,00",
    meta: ["medioPago: EFECTIVO", "estadoPago: PAGADA", "clave: 3f9c2a1e-…-b7d04e"],
    state: "SINCRONIZADA",
    note: "Guardada offline 18:42 · enviada 18:47 al volver la conexión.",
  },
};
