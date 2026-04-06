"use client";

import { useFinanceStore } from "@/store/finance-store";

export function ThemeToggle() {
  const theme = useFinanceStore((state) => state.theme);
  const toggleTheme = useFinanceStore((state) => state.toggleTheme);

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-muted transition hover:text-foreground"
      aria-label="Toggle dark mode"
    >
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}
