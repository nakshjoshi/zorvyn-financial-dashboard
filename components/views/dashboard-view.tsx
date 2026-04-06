"use client";

import { useEffect, useMemo, useState } from "react";
import { BalanceLineChart } from "@/components/charts/balance-line-chart";
import { CategoryPieChart } from "@/components/charts/category-pie-chart";
import { IncomeExpenseComparisonChart } from "@/components/charts/income-expense-comparison-chart";
import { MonthlyExpenseBarChart } from "@/components/charts/monthly-expense-bar-chart";
import { DashboardFilters } from "@/components/dashboard/dashboard-filters";
import { SummaryCards } from "@/components/summary-cards";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/states";
import { useFinanceStore } from "@/store/finance-store";
import {
  CategoryBreakdown,
  DashboardDateRange,
  IncomeExpensePoint,
  MonthlyExpensePoint,
  Summary,
} from "@/types/finance";

const monthLabel = new Intl.DateTimeFormat("en-IN", {
  month: "short",
  year: "2-digit",
});

const RANGE_TO_DAYS: Record<Exclude<DashboardDateRange, "all">, number> = {
  "30d": 30,
  "90d": 90,
  "180d": 180,
  "365d": 365,
};

export function DashboardView() {
  const transactions = useFinanceStore((state) => state.transactions);
  const loading = useFinanceStore((state) => state.loading);
  const error = useFinanceStore((state) => state.error);
  const fetchTransactions = useFinanceStore((state) => state.fetchTransactions);
  const [dateRange, setDateRange] = useState<DashboardDateRange>("90d");
  const [expenseCategory, setExpenseCategory] = useState("all");

  useEffect(() => {
    void fetchTransactions();
  }, [fetchTransactions]);

  const latestTransactionTime = useMemo(
    () =>
      transactions.reduce((latest, tx) => {
        const time = new Date(tx.date).getTime();
        if (!Number.isFinite(time)) {
          return latest;
        }
        return Math.max(latest, time);
      }, 0),
    [transactions],
  );

  const expenseCategories = useMemo(
    () =>
      Array.from(
        new Set(transactions.filter((tx) => tx.type === "expense").map((tx) => tx.category)),
      ).sort((a, b) => a.localeCompare(b)),
    [transactions],
  );

  const dateFilteredTransactions = useMemo(() => {
    if (dateRange === "all") {
      return transactions;
    }

    const days = RANGE_TO_DAYS[dateRange];
    const threshold = latestTransactionTime - days * 24 * 60 * 60 * 1000;

    return transactions.filter((tx) => {
      const txTime = new Date(tx.date).getTime();
      return Number.isFinite(txTime) && txTime >= threshold;
    });
  }, [transactions, dateRange, latestTransactionTime]);

  const expenseTransactions = useMemo(
    () =>
      dateFilteredTransactions.filter(
        (tx) =>
          tx.type === "expense" &&
          (expenseCategory === "all" || tx.category.toLowerCase() === expenseCategory.toLowerCase()),
      ),
    [dateFilteredTransactions, expenseCategory],
  );

  const summary = useMemo<Summary>(() => {
    return dateFilteredTransactions.reduce(
      (acc, tx) => {
        if (tx.type === "income") {
          acc.totalIncome += tx.amount;
          acc.totalBalance += tx.amount;
        } else {
          acc.totalExpenses += tx.amount;
          acc.totalBalance -= tx.amount;
        }

        return acc;
      },
      { totalBalance: 0, totalIncome: 0, totalExpenses: 0 },
    );
  }, [dateFilteredTransactions]);

  const categoryData = useMemo<CategoryBreakdown[]>(() => {
    const grouped = expenseTransactions.reduce<Record<string, number>>((acc, tx) => {
        acc[tx.category] = (acc[tx.category] ?? 0) + tx.amount;
        return acc;
      }, {});

    return Object.entries(grouped)
      .map(([category, value]) => ({ category, value }))
      .sort((a, b) => b.value - a.value);
  }, [expenseTransactions]);

  const balanceData = useMemo(() => {
    const sorted = [...dateFilteredTransactions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    return sorted.reduce<Array<{ date: string; balance: number }>>((acc, tx) => {
      const previousBalance = acc.length === 0 ? 0 : acc[acc.length - 1].balance;
      const nextBalance = previousBalance + (tx.type === "income" ? tx.amount : -tx.amount);
      acc.push({ date: tx.date.slice(5), balance: nextBalance });
      return acc;
    }, []);
  }, [dateFilteredTransactions]);

  const monthlyExpenseData = useMemo<MonthlyExpensePoint[]>(() => {
    const grouped = expenseTransactions.reduce<Record<string, number>>((acc, tx) => {
      const key = tx.date.slice(0, 7);
      acc[key] = (acc[key] ?? 0) + tx.amount;
      return acc;
    }, {});

    return Object.entries(grouped)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, expense]) => ({
        month: monthLabel.format(new Date(`${month}-01`)),
        expense,
      }));
  }, [expenseTransactions]);

  const incomeExpenseData = useMemo<IncomeExpensePoint[]>(() => {
    const grouped = dateFilteredTransactions.reduce<Record<string, { income: number; expense: number }>>(
      (acc, tx) => {
        const key = tx.date.slice(0, 7);
        if (!acc[key]) {
          acc[key] = { income: 0, expense: 0 };
        }

        if (tx.type === "income") {
          acc[key].income += tx.amount;
        } else {
          acc[key].expense += tx.amount;
        }

        return acc;
      },
      {},
    );

    return Object.entries(grouped)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, totals]) => ({
        month: monthLabel.format(new Date(`${month}-01`)),
        income: totals.income,
        expense: totals.expense,
        net: totals.income - totals.expense,
      }));
  }, [dateFilteredTransactions]);

  if (loading && transactions.length === 0) {
    return <LoadingState label="Loading dashboard..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (transactions.length === 0) {
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

      <DashboardFilters
        dateRange={dateRange}
        expenseCategory={expenseCategory}
        categories={expenseCategories}
        onDateRangeChange={setDateRange}
        onExpenseCategoryChange={setExpenseCategory}
      />

      <div className="grid gap-5 xl:grid-cols-2">
        <BalanceLineChart data={balanceData} />
        <CategoryPieChart data={categoryData} />
        <IncomeExpenseComparisonChart data={incomeExpenseData} />
        <MonthlyExpenseBarChart data={monthlyExpenseData} />
      </div>
    </div>
  );
}
