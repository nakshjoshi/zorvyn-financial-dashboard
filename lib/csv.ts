import { Transaction } from "@/types/finance";

export function exportTransactionsCsv(transactions: Transaction[]): void {
  const header = ["Date", "Amount (INR)", "Category", "Type", "Notes"];
  const rows = transactions.map((tx) => [
    tx.date,
    tx.amount.toString(),
    tx.category,
    tx.type,
    tx.notes ?? "",
  ]);

  const csv = [header, ...rows]
    .map((line) =>
      line
        .map((value) => `"${value.replaceAll('"', '""')}"`)
        .join(","),
    )
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `transactions-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
