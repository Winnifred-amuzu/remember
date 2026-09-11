import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

const items = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/memories", label: "Memories", icon: "🧠" },
  { to: "/people", label: "People", icon: "❤️" },
  { to: "/location", label: "Location", icon: "📍" },
  { to: "/help", label: "Help", icon: "🤝" },
] as const;

export function PatientShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background pb-28">
      <main className="mx-auto w-full max-w-2xl px-5 pt-6">{children}</main>

      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 border-t border-border bg-card/95 backdrop-blur"
      >
        <ul className="mx-auto flex max-w-2xl items-stretch justify-between px-2 py-2">
          {items.map((item) => {
            const active = path === item.to;
            return (
              <li key={item.to} className="flex-1">
                <Link
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className={`patient-type flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[15px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40 ${
                    active
                      ? "bg-primary/12 text-primary"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <span aria-hidden className="text-2xl leading-none">
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export function PatientHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-5">
      <h1 className="patient-type text-4xl font-bold tracking-tight text-foreground">{title}</h1>
      {subtitle ? (
        <p className="patient-type mt-2 text-xl text-muted-foreground">{subtitle}</p>
      ) : null}
    </header>
  );
}
