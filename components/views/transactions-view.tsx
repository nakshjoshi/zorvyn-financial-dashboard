"use client";

import { useEffect, useMemo, useState } from "react";
import { TransactionModal } from "@/components/transactions/transaction-modal";
import { TransactionsFilters } from "@/components/transactions/transactions-filters";
import { TransactionsTable } from "@/components/transactions/transactions-table";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/states";
import { exportTransactionsCsv } from "@/lib/csv";
import { useFinanceStore } from "@/store/finance-store";
import { Transaction, TransactionPayload, TransactionSort } from "@/types/finance";

export function TransactionsView() {
  const role = useFinanceStore((state) => state.userRole);
  const transactions = useFinanceStore((state) => state.transactions);
  const filtered = useFinanceStore((state) => state.filteredTransactions);
  const loading = useFinanceStore((state) => state.loading);
  const error = useFinanceStore((state) => state.error);

  const fetchTransactions = useFinanceStore((state) => state.fetchTransactions);
  const setFilters = useFinanceStore((state) => state.setFilters);
  const setSort = useFinanceStore((state) => state.setSort);
  const addTransaction = useFinanceStore((state) => state.addTransaction);
  const updateTransaction = useFinanceStore((state) => state.updateTransaction);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);

  useEffect(() => {
    void fetchTransactions();
  }, [fetchTransactions]);

  const categories = useMemo(
    () => Array.from(new Set(transactions.map((tx) => tx.category))).sort(),
    [transactions],
  );

  const handleSubmit = async (payload: TransactionPayload, id?: string) => {
    if (id) {
      await updateTransaction(id, payload);
    } else {
      await addTransaction(payload);
    }

    setModalOpen(false);
    setEditing(null);
  };

  if (loading && transactions.length === 0) {
    return <LoadingState label="Loading transactions..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="space-y-4">
      <TransactionsFilters
        categories={categories}
        canEdit={role === "admin"}
        onSearch={(value) => setFilters({ search: value })}
        onCategory={(value) => setFilters({ category: value })}
        onType={(value) => setFilters({ type: value })}
        onSort={(value: TransactionSort) => setSort(value)}
        onExport={() => exportTransactionsCsv(filtered)}
        onOpenCreate={() => {
          setEditing(null);
          setModalOpen(true);
        }}
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="No matching transactions"
          message="Adjust your filters or add a new entry to populate your transaction feed."
        />
      ) : (
        <TransactionsTable
          role={role}
          transactions={filtered}
          onEdit={(tx) => {
            setEditing(tx);
            setModalOpen(true);
          }}
        />
      )}

      <TransactionModal
        key={`${editing?.id ?? "new"}-${modalOpen}`}
        open={modalOpen}
        initialValue={editing}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
