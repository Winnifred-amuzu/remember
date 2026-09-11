import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

const nav = [
  { to: "/caregiver", label: "Dashboard" },
  { to: "/caregiver/memories", label: "Memories" },
  { to: "/caregiver/people", label: "People" },
  { to: "/caregiver/locations", label: "Locations" },
  { to: "/caregiver/safety", label: "Safety" },
] as const;

export function CaregiverShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-sidebar">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-5 py-4">
          <Link to="/caregiver" className="flex items-center gap-2 font-semibold text-foreground">
            <span
              aria-hidden
              className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground"
            >
              ✦
            </span>
            ReMember
            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
              Caregiver
            </span>
          </Link>
          <nav aria-label="Caregiver" className="flex flex-wrap gap-1 text-sm">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-lg px-3 py-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  path === item.to
                    ? "bg-primary/12 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/"
            className="ml-auto rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Patient view
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
}

export function StatusPill({ status }: { status: "safe" | "attention" | "alert" }) {
  const map = {
    safe: { label: "Safe", cls: "bg-success/35 text-success-foreground" },
    attention: { label: "Attention", cls: "bg-warning/35 text-warning-foreground" },
    alert: { label: "Alert", cls: "bg-destructive/15 text-destructive" },
  } as const;
  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${s.cls}`}>
      <span aria-hidden className="size-2 rounded-full bg-current" />
      {s.label}
    </span>
  );
}
