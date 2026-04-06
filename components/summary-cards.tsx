import { motion } from "framer-motion";
import { Panel } from "@/components/ui/panel";
import { formatCurrency } from "@/lib/format";
import { Summary } from "@/types/finance";

export function SummaryCards({ summary }: { summary: Summary }) {
  const cards = [
    {
      label: "Total Balance",
      value: summary.totalBalance,
      tone: "text-transparent bg-clip-text bg-[linear-gradient(94deg,var(--accent),var(--accent-soft))]",
    },
    { label: "Total Income", value: summary.totalIncome, tone: "text-cyan-300" },
    { label: "Total Expenses", value: summary.totalExpenses, tone: "text-indigo-300" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card, index) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.06 }}
        >
          <Panel>
            <p className="text-sm text-muted">{card.label}</p>
            <p className={`mt-2 text-2xl font-semibold ${card.tone}`}>
              {formatCurrency(card.value)}
            </p>
          </Panel>
        </motion.div>
      ))}
    </div>
  );
}
