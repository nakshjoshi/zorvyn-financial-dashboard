"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Panel } from "@/components/ui/panel";
import { CategoryBreakdown } from "@/types/finance";
import { formatCurrency } from "@/lib/format";

const colors = ["#3d8bfd", "#27d3c0", "#5865f2", "#7ecbff", "#1d4ed8", "#22c55e"];

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
            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
              contentStyle={{
                background: "rgba(7, 16, 41, 0.92)",
                border: "1px solid rgba(149, 164, 193, 0.25)",
                borderRadius: "12px",
                color: "#e6edf8",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}
