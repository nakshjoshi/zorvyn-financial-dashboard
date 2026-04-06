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
    <div className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(15,118,110,0.15),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(217,119,6,0.14),transparent_40%),var(--background)] text-foreground transition-colors">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-(--panel)/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-teal-500">Zorvyn Finance</p>
            <h1 className="font-heading text-2xl font-semibold text-foreground">Financial Pulse</h1>
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
                  "relative rounded-full px-4 py-2 text-sm font-medium transition",
                  active
                    ? "bg-teal-500/15 text-teal-400"
                    : "text-muted hover:bg-white/5 hover:text-foreground",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="active-tab"
                    className="absolute inset-0 rounded-full border border-teal-500/30"
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
