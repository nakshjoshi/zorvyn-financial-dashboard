import {
  Insights,
  Summary,
  Transaction,
  TransactionPayload,
} from "@/types/finance";

let transactions: Transaction[] = [
  {
    id: "tx-1",
    date: "2026-03-02",
    amount: 4200,
    category: "Salary",
    type: "income",
    notes: "Monthly payroll",
  },
  {
    id: "tx-2",
    date: "2026-03-05",
    amount: 240,
    category: "Groceries",
    type: "expense",
    notes: "Weekly shopping",
  },
  {
    id: "tx-3",
    date: "2026-03-10",
    amount: 125,
    category: "Transport",
    type: "expense",
  },
  {
    id: "tx-4",
    date: "2026-03-15",
    amount: 540,
    category: "Freelance",
    type: "income",
  },
  {
    id: "tx-5",
    date: "2026-03-18",
    amount: 95,
    category: "Utilities",
    type: "expense",
  },
  {
    id: "tx-6",
    date: "2026-04-01",
    amount: 4300,
    category: "Salary",
    type: "income",
  },
  {
    id: "tx-7",
    date: "2026-04-03",
    amount: 320,
    category: "Rent",
    type: "expense",
  },
  {
    id: "tx-8",
    date: "2026-04-04",
    amount: 170,
    category: "Entertainment",
    type: "expense",
  },
];

export function getTransactions(): Transaction[] {
  return [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function addTransaction(payload: TransactionPayload): Transaction {
  const transaction: Transaction = {
    id: crypto.randomUUID(),
    ...payload,
    amount: Number(payload.amount),
  };
  transactions = [transaction, ...transactions];
  return transaction;
}

export function updateTransaction(
  id: string,
  payload: Partial<TransactionPayload>,
): Transaction | null {
  let updated: Transaction | null = null;

  transactions = transactions.map((tx) => {
    if (tx.id !== id) {
      return tx;
    }

    updated = {
      ...tx,
      ...payload,
      amount:
        payload.amount !== undefined ? Number(payload.amount) : Number(tx.amount),
    };

    return updated;
  });

  return updated;
}

export function getSummary(): Summary {
  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpenses = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  return {
    totalBalance: totalIncome - totalExpenses,
    totalIncome,
    totalExpenses,
  };
}

export function getInsights(): Insights {
  const expenseByCategory = transactions
    .filter((tx) => tx.type === "expense")
    .reduce<Record<string, number>>((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {});

  const highest = Object.entries(expenseByCategory).sort((a, b) => b[1] - a[1])[0];

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();
  const prevMonthDate = new Date(thisYear, thisMonth - 1, 1);

  const monthTotal = (month: number, year: number): number =>
    transactions
      .filter((tx) => {
        const d = new Date(tx.date);
        return d.getMonth() === month && d.getFullYear() === year;
      })
      .reduce(
        (sum, tx) => sum + (tx.type === "income" ? tx.amount : -tx.amount),
        0,
      );

  const currentMonth = monthTotal(thisMonth, thisYear);
  const previousMonth = monthTotal(
    prevMonthDate.getMonth(),
    prevMonthDate.getFullYear(),
  );
  const delta = currentMonth - previousMonth;
  const deltaPercent =
    previousMonth === 0 ? 100 : Number(((delta / Math.abs(previousMonth)) * 100).toFixed(2));

  const expenses = transactions.filter((tx) => tx.type === "expense");
  const incomes = transactions.filter((tx) => tx.type === "income");

  const avgExpense =
    expenses.length === 0
      ? 0
      : expenses.reduce((sum, tx) => sum + tx.amount, 0) / expenses.length;
  const avgIncome =
    incomes.length === 0
      ? 0
      : incomes.reduce((sum, tx) => sum + tx.amount, 0) / incomes.length;

  const { totalIncome, totalExpenses } = getSummary();
  const savingsRate =
    totalIncome === 0 ? 0 : Number((((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(2));

  return {
    highestSpendingCategory: {
      category: highest?.[0] ?? "N/A",
      amount: highest?.[1] ?? 0,
    },
    monthlyComparison: {
      currentMonth,
      previousMonth,
      delta,
      deltaPercent,
    },
    analytics: {
      avgExpense: Number(avgExpense.toFixed(2)),
      avgIncome: Number(avgIncome.toFixed(2)),
      savingsRate,
    },
  };
}
