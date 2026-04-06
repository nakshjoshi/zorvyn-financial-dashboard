"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Panel } from "@/components/ui/panel";
import { CategoryBreakdown } from "@/types/finance";
import { formatCurrency } from "@/lib/format";

const colors = ["#14b8a6", "#f59e0b", "#06b6d4", "#22c55e", "#ef4444", "#a3e635"];

export function CategoryPieChart({ data }: { data: CategoryBreakdown[] }) {
  return (
    <Panel>
      <h3 className="font-semibold">Expense Breakdown</h3>
      <p className="mt-1 text-sm text-muted">Spend distribution by category</p>
      <div className="mt-4 h-[280px] w-full">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="category"
              outerRadius={90}
              innerRadius={45}
              paddingAngle={4}
              label
            >
              {data.map((entry, index) => (
                <Cell key={entry.category} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}
