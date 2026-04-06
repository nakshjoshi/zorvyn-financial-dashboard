export type TransactionType = "income" | "expense";
export type UserRole = "admin" | "viewer";

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  notes?: string;
}

export interface Summary {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

export interface CategoryBreakdown {
  category: string;
  value: number;
}

export interface BalancePoint {
  date: string;
  balance: number;
}

export interface MonthlyExpensePoint {
  month: string;
  expense: number;
}

export interface IncomeExpensePoint {
  month: string;
  income: number;
  expense: number;
  net: number;
}

export type DashboardDateRange = "30d" | "90d" | "180d" | "365d" | "all";

export interface MonthlyComparison {
  currentMonth: number;
  previousMonth: number;
  delta: number;
  deltaPercent: number;
}

export interface Insights {
  highestSpendingCategory: {
    category: string;
    amount: number;
  };
  monthlyComparison: MonthlyComparison;
  analytics: {
    avgExpense: number;
    avgIncome: number;
    savingsRate: number;
  };
}

export interface TransactionFilters {
  search: string;
  category: string;
  type: TransactionType | "all";
}

export interface TransactionSort {
  field: "date" | "amount" | "category" | "type";
  direction: "asc" | "desc";
}

export interface TransactionPayload {
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  notes?: string;
}
