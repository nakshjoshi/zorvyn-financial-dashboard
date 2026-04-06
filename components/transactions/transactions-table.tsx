"use client";

import { Transaction, UserRole } from "@/types/finance";
import { formatCurrency, formatDate } from "@/lib/format";

interface Props {
  role: UserRole;
  transactions: Transaction[];
  onEdit: (tx: Transaction) => void;
}

export function TransactionsTable({ role, transactions, onEdit }: Props) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:hidden">
        {transactions.map((tx) => (
          <article
            key={tx.id}
            className="glass-card rounded-2xl border border-white/10 bg-(--panel) p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-foreground">{tx.category}</p>
                <p className="text-xs text-muted">{formatDate(tx.date)}</p>
              </div>
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  tx.type === "income"
                    ? "bg-cyan-500/15 text-cyan-300"
                    : "bg-indigo-500/20 text-indigo-200"
                }`}
              >
                {tx.type}
              </span>
            </div>

            <p className="mt-3 text-base font-semibold text-foreground">
              {formatCurrency(tx.amount)}
            </p>
            <p className="mt-1 text-xs text-muted">{tx.notes || "No notes"}</p>

            <div className="mt-3 flex justify-end">
              {role === "admin" ? (
                <button
                  onClick={() => onEdit(tx)}
                  className="control-surface rounded-lg border px-3 py-1.5 text-xs transition hover:border-accent/45 hover:bg-[var(--hover-bg)]"
                >
                  Edit
                </button>
              ) : (
                <span className="text-xs text-muted">Read-only</span>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="glass-card hidden overflow-hidden rounded-2xl border border-white/10 bg-(--panel) md:block">
        <div className="overflow-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-white/10 bg-[var(--control-bg)] text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Notes</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b border-white/5 transition hover:bg-[var(--hover-bg)] last:border-0"
                >
                  <td className="px-4 py-3">{formatDate(tx.date)}</td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {formatCurrency(tx.amount)}
                  </td>
                  <td className="px-4 py-3">{tx.category}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        tx.type === "income"
                          ? "bg-cyan-500/15 text-cyan-300"
                          : "bg-indigo-500/20 text-indigo-200"
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted">{tx.notes || "-"}</td>
                  <td className="px-4 py-3">
                    {role === "admin" ? (
                      <button
                        onClick={() => onEdit(tx)}
                        className="control-surface rounded-lg border px-3 py-1.5 text-xs transition hover:border-accent/45 hover:bg-[var(--hover-bg)]"
                      >
                        Edit
                      </button>
                    ) : (
                      <span className="text-xs text-muted">Read-only</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
