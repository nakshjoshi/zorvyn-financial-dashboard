"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Panel } from "@/components/ui/panel";
import { formatCurrency } from "@/lib/format";
import { MonthlyExpensePoint } from "@/types/finance";

const compactAmount = (value: number) => {
  if (Math.abs(value) >= 1000) {
    return `${Math.round(value / 100) / 10}k`;
  }
  return `${Math.round(value)}`;
};

export function MonthlyExpenseBarChart({ data }: { data: MonthlyExpensePoint[] }) {
  return (
    <Panel>
      <h3 className="font-semibold">Monthly Expense Trend</h3>
      <p className="mt-1 text-sm text-muted">How your spending changes month over month</p>
      <div className="mt-4 h-[280px] w-full">
        <ResponsiveContainer>
          <BarChart data={data} margin={{ left: 10, right: 10, top: 10 }}>
            <CartesianGrid stroke="rgba(149, 164, 193, 0.22)" strokeDasharray="4 4" />
            <XAxis dataKey="month" stroke="var(--muted)" />
            <YAxis stroke="var(--muted)" tickFormatter={compactAmount} width={50} />
            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
              contentStyle={{
                background: "rgba(7, 16, 41, 0.92)",
                border: "1px solid rgba(149, 164, 193, 0.25)",
                borderRadius: "12px",
                color: "#e6edf8",
              }}
            />
            <Bar dataKey="expense" radius={[8, 8, 0, 0]} fill="#7ecbff" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}
