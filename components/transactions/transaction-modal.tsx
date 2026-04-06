"use client";

import { useMemo, useState } from "react";
import { Transaction, TransactionPayload } from "@/types/finance";

interface Props {
  open: boolean;
  initialValue?: Transaction | null;
  categories: string[];
  onAddCategory: (category: string) => void;
  onClose: () => void;
  onSubmit: (payload: TransactionPayload, id?: string) => Promise<void>;
}

export function TransactionModal({
  open,
  initialValue,
  categories,
  onAddCategory,
  onClose,
  onSubmit,
}: Props) {
  const defaultForm: TransactionPayload = initialValue
    ? {
        date: initialValue.date,
        amount: initialValue.amount,
        category: initialValue.category,
        type: initialValue.type,
        notes: initialValue.notes ?? "",
      }
    : {
        date: new Date().toISOString().slice(0, 10),
        amount: 0,
        category: "",
        type: "expense",
        notes: "",
      };

  const [form, setForm] = useState<TransactionPayload>({
    ...defaultForm,
  });
  const [newCategory, setNewCategory] = useState("");

  const title = useMemo(
    () => (initialValue ? "Edit Transaction" : "Add Transaction"),
    [initialValue],
  );

  if (!open) {
    return null;
  }

  return (
    <div className="overlay-surface fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="glass-card w-full max-w-md rounded-2xl border border-white/10 bg-(--panel-strong) p-5 shadow-[0_28px_70px_-34px_rgba(2,8,23,0.95)]">
        <h3 className="font-semibold">{title}</h3>
        <form
          className="mt-4 space-y-3"
          onSubmit={async (event) => {
            event.preventDefault();
            await onSubmit(form, initialValue?.id);
          }}
        >
          <input
            required
            type="date"
            value={form.date}
            onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
            className="control-surface w-full rounded-xl border px-3 py-2 text-sm outline-none ring-(--ring) focus:ring"
          />

          <input
            required
            type="number"
            min={0}
            step="0.01"
            value={form.amount}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, amount: Number(event.target.value) }))
            }
            placeholder="Amount"
            className="control-surface w-full rounded-xl border px-3 py-2 text-sm outline-none ring-(--ring) focus:ring"
          />

          <input
            required
            type="text"
            value={form.category}
            onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
            placeholder="Category"
            list="transaction-categories"
            className="control-surface w-full rounded-xl border px-3 py-2 text-sm outline-none ring-(--ring) focus:ring"
          />
          <datalist id="transaction-categories">
            {categories.map((category) => (
              <option key={category} value={category} />
            ))}
          </datalist>

          <div className="rounded-xl border border-white/10 bg-black/10 p-3">
            <p className="text-xs text-muted">Add your own category</p>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={newCategory}
                onChange={(event) => setNewCategory(event.target.value)}
                placeholder="e.g. Health, Travel"
                className="control-surface w-full rounded-xl border px-3 py-2 text-sm outline-none ring-(--ring) focus:ring"
              />
              <button
                type="button"
                onClick={() => {
                  const nextCategory = newCategory.trim();
                  if (!nextCategory) {
                    return;
                  }

                  onAddCategory(nextCategory);
                  setForm((prev) => ({ ...prev, category: nextCategory }));
                  setNewCategory("");
                }}
                className="rounded-xl border border-accent/45 px-3 py-2 text-xs font-semibold text-accent transition hover:bg-[var(--hover-bg)]"
              >
                Add
              </button>
            </div>
            {categories.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {categories.slice(0, 10).map((category) => (
                  <button
                    type="button"
                    key={category}
                    onClick={() => setForm((prev) => ({ ...prev, category }))}
                    className="rounded-full border border-white/20 px-2.5 py-1 text-xs text-muted transition hover:border-accent/45 hover:text-foreground"
                  >
                    {category}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <select
            value={form.type}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                type: event.target.value as "income" | "expense",
              }))
            }
            className="control-surface w-full rounded-xl border px-3 py-2 text-sm outline-none ring-(--ring) focus:ring"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <textarea
            value={form.notes}
            onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
            placeholder="Notes"
            className="control-surface h-24 w-full rounded-xl border px-3 py-2 text-sm outline-none ring-(--ring) focus:ring"
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="control-surface rounded-xl border px-4 py-2 text-sm transition hover:border-accent/45 hover:bg-[var(--hover-bg)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[linear-gradient(94deg,var(--accent),var(--accent-soft))] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_-14px_rgba(61,139,253,0.85)] transition hover:brightness-110"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
