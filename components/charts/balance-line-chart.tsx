"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BalancePoint } from "@/types/finance";
import { formatCurrency } from "@/lib/format";
import { Panel } from "@/components/ui/panel";

export function BalanceLineChart({ data }: { data: BalancePoint[] }) {
  return (
    <Panel>
      <h3 className="font-semibold">Balance Trend</h3>
      <p className="mt-1 text-sm text-muted">Running balance over transaction timeline</p>
      <div className="mt-4 h-[280px] w-full">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke="rgba(149, 164, 193, 0.22)" strokeDasharray="4 4" />
            <XAxis dataKey="date" stroke="var(--muted)" />
            <YAxis stroke="var(--muted)" />
            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
              contentStyle={{
                background: "rgba(7, 16, 41, 0.92)",
                border: "1px solid rgba(149, 164, 193, 0.25)",
                borderRadius: "12px",
                color: "#e6edf8",
              }}
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#3d8bfd"
              strokeWidth={3}
              dot={{ r: 2 }}
              activeDot={{ r: 5, fill: "#27d3c0" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}
