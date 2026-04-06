"use client";

import { useMemo, useState } from "react";
import { Transaction, TransactionPayload } from "@/types/finance";

interface Props {
  open: boolean;
  initialValue?: Transaction | null;
  onClose: () => void;
  onSubmit: (payload: TransactionPayload, id?: string) => Promise<void>;
}

export function TransactionModal({ open, initialValue, onClose, onSubmit }: Props) {
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

  const title = useMemo(
    () => (initialValue ? "Edit Transaction" : "Add Transaction"),
    [initialValue],
  );

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-(--panel) p-5">
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
            className="w-full rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm"
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
            className="w-full rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm"
          />

          <input
            required
            type="text"
            value={form.category}
            onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
            placeholder="Category"
            className="w-full rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm"
          />

          <select
            value={form.type}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                type: event.target.value as "income" | "expense",
              }))
            }
            className="w-full rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <textarea
            value={form.notes}
            onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
            placeholder="Notes"
            className="h-24 w-full rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm"
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/15 px-4 py-2 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-black"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
