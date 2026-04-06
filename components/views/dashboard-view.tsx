"use client";

import { useEffect, useMemo, useState } from "react";
import { BalanceLineChart } from "@/components/charts/balance-line-chart";
import { CategoryPieChart } from "@/components/charts/category-pie-chart";
import { SummaryCards } from "@/components/summary-cards";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/states";
import { apiRequest } from "@/lib/api";
import { useFinanceStore } from "@/store/finance-store";
import { CategoryBreakdown, Summary } from "@/types/finance";

export function DashboardView() {
  const transactions = useFinanceStore((state) => state.transactions);
  const loading = useFinanceStore((state) => state.loading);
  const error = useFinanceStore((state) => state.error);
  const fetchTransactions = useFinanceStore((state) => state.fetchTransactions);

  const [summary, setSummary] = useState<Summary | null>(null);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetchTransactions();
      try {
        const response = await apiRequest<{ data: Summary }>("/api/summary");
        setSummary(response.data);
      } catch (err) {
        setSummaryError(err instanceof Error ? err.message : "Failed to fetch summary");
      }
    };

    void fetchData();
  }, [fetchTransactions]);

  const categoryData = useMemo<CategoryBreakdown[]>(() => {
    const grouped = transactions
      .filter((tx) => tx.type === "expense")
      .reduce<Record<string, number>>((acc, tx) => {
        acc[tx.category] = (acc[tx.category] ?? 0) + tx.amount;
        return acc;
      }, {});

    return Object.entries(grouped).map(([category, value]) => ({ category, value }));
  }, [transactions]);

  const balanceData = useMemo(() => {
    const sorted = [...transactions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    return sorted.reduce<Array<{ date: string; balance: number }>>((acc, tx) => {
      const previousBalance = acc.length === 0 ? 0 : acc[acc.length - 1].balance;
      const nextBalance = previousBalance + (tx.type === "income" ? tx.amount : -tx.amount);
      acc.push({ date: tx.date.slice(5), balance: nextBalance });
      return acc;
    }, []);
  }, [transactions]);

  if (loading && transactions.length === 0) {
    return <LoadingState label="Loading dashboard..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (summaryError) {
    return <ErrorState message={summaryError} />;
  }

  if (!summary || transactions.length === 0) {
    return (
      <EmptyState
        title="No finance data yet"
        message="Add your first transaction to see balance trends and spending breakdown."
      />
    );
  }

  return (
    <div className="space-y-5">
      <SummaryCards summary={summary} />

      <div className="grid gap-5 xl:grid-cols-2">
        <BalanceLineChart data={balanceData} />
        <CategoryPieChart data={categoryData} />
      </div>
    </div>
  );
}
