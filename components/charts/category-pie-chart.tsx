"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Panel } from "@/components/ui/panel";
import { CategoryBreakdown } from "@/types/finance";
import { formatCurrency } from "@/lib/format";

const colors = ["#3d8bfd", "#27d3c0", "#5865f2", "#7ecbff", "#1d4ed8", "#22c55e"];

export function CategoryPieChart({ data }: { data: CategoryBreakdown[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const hasData = data.length > 0 && total > 0;

  return (
    <Panel>
      <h3 className="font-semibold">Expense Breakdown</h3>
      <p className="mt-1 text-sm text-muted">Spend distribution by category</p>
      <div className="mt-4 h-[280px] w-full">
        <ResponsiveContainer>
          <PieChart>
            {hasData ? (
              <Pie
                data={data}
                dataKey="value"
                nameKey="category"
                outerRadius={90}
                innerRadius={50}
                paddingAngle={3}
                labelLine={false}
                label={({ percent }) => {
                  const share = percent ?? 0;
                  return share >= 0.08 ? `${Math.round(share * 100)}%` : "";
                }}
              >
                {data.map((entry, index) => (
                  <Cell key={entry.category} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            ) : null}
            <Tooltip
              formatter={(value, _name, item) => {
                const category = String(item?.payload?.category ?? "Expense");
                return [formatCurrency(Number(value)), category];
              }}
              contentStyle={{
                background: "rgba(7, 16, 41, 0.92)",
                border: "1px solid rgba(149, 164, 193, 0.25)",
                borderRadius: "12px",
                color: "#e6edf8",
              }}
            />
            {hasData ? (
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ color: "var(--muted)", fontSize: "12px", paddingTop: "8px" }}
              />
            ) : null}
          </PieChart>
        </ResponsiveContainer>
      </div>
      {hasData ? (
        <p className="text-xs text-muted">Total expenses: {formatCurrency(total)}</p>
      ) : (
        <p className="text-xs text-muted">No expense data for the selected filter.</p>
      )}
    </Panel>
  );
}
