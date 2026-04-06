"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { RoleToggle } from "@/components/role-toggle";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/transactions", label: "Transactions" },
  { href: "/insights", label: "Insights" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="surface-grid relative min-h-screen overflow-x-hidden text-foreground transition-colors">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-(--panel-strong)/95 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-accent-soft">Zorvyn Finance</p>
            <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
              Financial Pulse
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <RoleToggle />
            <ThemeToggle />
          </div>
        </div>

        <nav className="mx-auto flex w-full max-w-7xl gap-2 px-4 pb-4 sm:px-6 lg:px-8">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition duration-200",
                  active
                    ? "bg-[linear-gradient(90deg,rgba(61,139,253,0.18),rgba(39,211,192,0.16))] text-foreground"
                    : "text-muted hover:bg-[var(--hover-bg)] hover:text-foreground",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="active-tab"
                    className="absolute inset-0 rounded-full border border-accent/45"
                    transition={{ type: "spring", stiffness: 380, damping: 35 }}
                  />
                ) : null}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
