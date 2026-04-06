"use client";

import { useEffect } from "react";
import { useFinanceStore } from "@/store/finance-store";

export function ThemeSync(): null {
  const theme = useFinanceStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
  }, [theme]);

  return null;
}
