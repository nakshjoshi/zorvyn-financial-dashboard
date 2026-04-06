import { Panel } from "@/components/ui/panel";
import { formatCurrency } from "@/lib/format";
import { Insights } from "@/types/finance";

export function InsightsPanel({ insights }: { insights: Insights }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Panel>
        <p className="text-sm text-muted">Highest Spending Category</p>
        <p className="mt-2 text-xl font-semibold text-amber-300">
          {insights.highestSpendingCategory.category}
        </p>
        <p className="mt-1 text-sm text-muted">
          {formatCurrency(insights.highestSpendingCategory.amount)} spent
        </p>
      </Panel>

      <Panel>
        <p className="text-sm text-muted">Monthly Comparison</p>
        <p className="mt-2 text-xl font-semibold">
          {formatCurrency(insights.monthlyComparison.currentMonth)}
        </p>
        <p className="mt-1 text-sm text-muted">
          Previous: {formatCurrency(insights.monthlyComparison.previousMonth)}
        </p>
        <p
          className={`mt-1 text-sm ${
            insights.monthlyComparison.delta >= 0 ? "text-emerald-300" : "text-red-300"
          }`}
        >
          {insights.monthlyComparison.delta >= 0 ? "+" : ""}
          {formatCurrency(insights.monthlyComparison.delta)} (
          {insights.monthlyComparison.deltaPercent}%)
        </p>
      </Panel>

      <Panel>
        <p className="text-sm text-muted">Analytics</p>
        <p className="mt-2 text-sm">Avg income: {formatCurrency(insights.analytics.avgIncome)}</p>
        <p className="mt-1 text-sm">Avg expense: {formatCurrency(insights.analytics.avgExpense)}</p>
        <p className="mt-1 text-sm text-teal-300">
          Savings rate: {insights.analytics.savingsRate}%
        </p>
      </Panel>
    </div>
  );
}
