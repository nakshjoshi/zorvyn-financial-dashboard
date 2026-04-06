"use client";

import { ChangeEvent } from "react";
import { TransactionSort } from "@/types/finance";

interface Props {
  categories: string[];
  onSearch: (value: string) => void;
  onCategory: (value: string) => void;
  onType: (value: "all" | "income" | "expense") => void;
  onSort: (value: TransactionSort) => void;
  onExport: () => void;
  canEdit: boolean;
  onOpenCreate: () => void;
}

export function TransactionsFilters({
  categories,
  onSearch,
  onCategory,
  onType,
  onSort,
  onExport,
  canEdit,
  onOpenCreate,
}: Props) {
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    const [field, direction] = event.target.value.split("|") as [
      TransactionSort["field"],
      TransactionSort["direction"],
    ];
    onSort({ field, direction });
  };

  return (
    <div className="glass-card grid gap-3 rounded-2xl border border-white/10 bg-(--panel) p-4 md:grid-cols-6">
      <input
        placeholder="Search category, note, type"
        onChange={(event) => onSearch(event.target.value)}
        className="control-surface md:col-span-2 rounded-xl border px-3 py-2 text-sm outline-none ring-(--ring) focus:ring"
      />

      <select
        onChange={(event) => onCategory(event.target.value)}
        className="control-surface rounded-xl border px-3 py-2 text-sm outline-none"
      >
        <option value="all">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        onChange={(event) => onType(event.target.value as "all" | "income" | "expense")}
        className="control-surface rounded-xl border px-3 py-2 text-sm outline-none"
      >
        <option value="all">All types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        onChange={handleSort}
        defaultValue="date|desc"
        className="control-surface rounded-xl border px-3 py-2 text-sm outline-none"
      >
        <option value="date|desc">Newest first</option>
        <option value="date|asc">Oldest first</option>
        <option value="amount|desc">Amount high to low</option>
        <option value="amount|asc">Amount low to high</option>
        <option value="category|asc">Category A-Z</option>
      </select>

      <div className="flex gap-2">
        <button
          onClick={onExport}
          className="control-surface w-full rounded-xl border px-3 py-2 text-sm font-medium transition hover:border-accent/45 hover:bg-[var(--hover-bg)]"
        >
          Export CSV
        </button>
        {canEdit ? (
          <button
            onClick={onOpenCreate}
            className="w-full rounded-xl bg-[linear-gradient(94deg,var(--accent),var(--accent-soft))] px-3 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_-14px_rgba(61,139,253,0.85)] transition hover:brightness-110"
          >
            Add
          </button>
        ) : null}
      </div>
    </div>
  );
}
