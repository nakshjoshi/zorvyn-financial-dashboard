"use client";

import { useFinanceStore } from "@/store/finance-store";

export function RoleToggle() {
  const role = useFinanceStore((state) => state.userRole);
  const setRole = useFinanceStore((state) => state.setRole);

  return (
    <div className="rounded-full border border-white/10 bg-white/5 p-1 text-xs">
      <button
        onClick={() => setRole("admin")}
        className={`rounded-full px-3 py-1.5 transition ${
          role === "admin" ? "bg-teal-500 text-black" : "text-muted hover:text-foreground"
        }`}
      >
        Admin
      </button>
      <button
        onClick={() => setRole("viewer")}
        className={`rounded-full px-3 py-1.5 transition ${
          role === "viewer" ? "bg-teal-500 text-black" : "text-muted hover:text-foreground"
        }`}
      >
        Viewer
      </button>
    </div>
  );
}
