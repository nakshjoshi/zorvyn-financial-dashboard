"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiRequest } from "@/lib/api";
import {
  Transaction,
  TransactionFilters,
  TransactionPayload,
  TransactionSort,
  UserRole,
} from "@/types/finance";

interface FinanceState {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  userRole: UserRole;
  theme: "light" | "dark";
  filters: TransactionFilters;
  sort: TransactionSort;
  loading: boolean;
  error: string | null;
  fetchTransactions: () => Promise<void>;
  addTransaction: (payload: TransactionPayload) => Promise<void>;
  updateTransaction: (id: string, payload: Partial<TransactionPayload>) => Promise<void>;
  setFilters: (filters: Partial<TransactionFilters>) => void;
  setSort: (sort: TransactionSort) => void;
  setRole: (role: UserRole) => void;
  toggleTheme: () => void;
  clearError: () => void;
}

function applyFiltersAndSort(
  items: Transaction[],
  filters: TransactionFilters,
  sort: TransactionSort,
): Transaction[] {
  const search = filters.search.toLowerCase().trim();

  const filtered = items.filter((tx) => {
    const searchTarget = `${tx.category} ${tx.type} ${tx.notes ?? ""}`.toLowerCase();
    const matchesSearch = search.length === 0 || searchTarget.includes(search);
    const matchesCategory =
      filters.category === "all" || tx.category.toLowerCase() === filters.category.toLowerCase();
    const matchesType = filters.type === "all" || tx.type === filters.type;

    return matchesSearch && matchesCategory && matchesType;
  });

  const sorted = [...filtered].sort((a, b) => {
    const dir = sort.direction === "asc" ? 1 : -1;

    if (sort.field === "date") {
      return (new Date(a.date).getTime() - new Date(b.date).getTime()) * dir;
    }

    if (sort.field === "amount") {
      return (a.amount - b.amount) * dir;
    }

    return a[sort.field].localeCompare(b[sort.field]) * dir;
  });

  return sorted;
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set, get) => ({
      transactions: [],
      filteredTransactions: [],
      userRole: "admin",
      theme: "light",
      filters: {
        search: "",
        category: "all",
        type: "all",
      },
      sort: {
        field: "date",
        direction: "desc",
      },
      loading: false,
      error: null,

      fetchTransactions: async () => {
        set({ loading: true, error: null });
        try {
          const response = await apiRequest<{ data: Transaction[] }>("/api/transactions");
          const filtered = applyFiltersAndSort(
            response.data,
            get().filters,
            get().sort,
          );

          set({
            transactions: response.data,
            filteredTransactions: filtered,
            loading: false,
          });
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : "Failed to fetch transactions",
          });
        }
      },

      addTransaction: async (payload) => {
        set({ loading: true, error: null });
        try {
          await apiRequest<{ data: Transaction }>("/api/transactions", {
            method: "POST",
            body: JSON.stringify(payload),
          });
          await get().fetchTransactions();
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : "Failed to add transaction",
          });
        }
      },

      updateTransaction: async (id, payload) => {
        set({ loading: true, error: null });
        try {
          await apiRequest<{ data: Transaction }>(`/api/transactions/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload),
          });
          await get().fetchTransactions();
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : "Failed to update transaction",
          });
        }
      },

      setFilters: (nextFilters) => {
        const filters = { ...get().filters, ...nextFilters };
        const filtered = applyFiltersAndSort(get().transactions, filters, get().sort);
        set({ filters, filteredTransactions: filtered });
      },

      setSort: (sort) => {
        const filtered = applyFiltersAndSort(get().transactions, get().filters, sort);
        set({ sort, filteredTransactions: filtered });
      },

      setRole: (role) => {
        set({ userRole: role });
      },

      toggleTheme: () => {
        const nextTheme = get().theme === "light" ? "dark" : "light";
        set({ theme: nextTheme });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "finance-dashboard-store",
      partialize: (state) => ({
        userRole: state.userRole,
        theme: state.theme,
      }),
    },
  ),
);
