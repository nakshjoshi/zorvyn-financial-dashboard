"use client";

import { DashboardDateRange } from "@/types/finance";
import { Panel } from "@/components/ui/panel";

interface Props {
  dateRange: DashboardDateRange;
  expenseCategory: string;
  categories: string[];
  onDateRangeChange: (range: DashboardDateRange) => void;
  onExpenseCategoryChange: (category: string) => void;
}

const RANGE_OPTIONS: Array<{ value: DashboardDateRange; label: string }> = [
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "180d", label: "Last 6 months" },
  { value: "365d", label: "Last 12 months" },
  { value: "all", label: "All time" },
];

export function DashboardFilters({
  dateRange,
  expenseCategory,
  categories,
  onDateRangeChange,
  onExpenseCategoryChange,
}: Props) {
  const hasActiveFilters = dateRange !== "90d" || expenseCategory !== "all";

  return (
    <Panel className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold">Dashboard Filters</h3>
        <div className="flex items-center gap-2">
          <p className="text-xs text-muted">Category-wise expense insights with timeline controls</p>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={() => {
                onDateRangeChange("90d");
                onExpenseCategoryChange("all");
              }}
              className="rounded-full border border-white/20 px-2.5 py-1 text-xs text-muted transition hover:border-accent/45 hover:text-foreground"
            >
              Clear
            </button>
          ) : null}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="space-y-1 text-sm">
          <span className="text-muted">Date range</span>
          <select
            value={dateRange}
            onChange={(event) => onDateRangeChange(event.target.value as DashboardDateRange)}
            className="control-surface w-full rounded-xl border px-3 py-2 text-sm outline-none"
          >
            {RANGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1 text-sm">
          <span className="text-muted">Expense category</span>
          <select
            value={expenseCategory}
            onChange={(event) => onExpenseCategoryChange(event.target.value)}
            className="control-surface w-full rounded-xl border px-3 py-2 text-sm outline-none"
          >
            <option value="all">All expense categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      {categories.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onExpenseCategoryChange("all")}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              expenseCategory === "all"
                ? "border-accent/55 bg-[var(--hover-bg)] text-foreground"
                : "border-white/20 text-muted hover:border-accent/45 hover:text-foreground"
            }`}
          >
            All
          </button>
          {categories.slice(0, 8).map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onExpenseCategoryChange(category)}
              className={`rounded-full border px-3 py-1 text-xs transition ${
                expenseCategory === category
                  ? "border-accent/55 bg-[var(--hover-bg)] text-foreground"
                  : "border-white/20 text-muted hover:border-accent/45 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      ) : null}
    </Panel>
  );
}
