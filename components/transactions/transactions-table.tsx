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
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-(--panel)">
      <div className="overflow-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase tracking-wider text-muted">
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
              <tr key={tx.id} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-3">{formatDate(tx.date)}</td>
                <td className="px-4 py-3 font-medium">{formatCurrency(tx.amount)}</td>
                <td className="px-4 py-3">{tx.category}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      tx.type === "income"
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-amber-500/15 text-amber-300"
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
                      className="rounded-lg border border-white/15 px-3 py-1.5 text-xs hover:bg-white/5"
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
  );
}
