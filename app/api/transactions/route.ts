import { addTransaction, getTransactions } from "@/app/api/_data/transactions-db";
import { jsonError, withDelay } from "@/app/api/_utils";
import { TransactionPayload } from "@/types/finance";

export async function GET(): Promise<Response> {
  await withDelay();
  return Response.json({ data: getTransactions() });
}

export async function POST(request: Request): Promise<Response> {
  await withDelay(700);

  try {
    const payload = (await request.json()) as Partial<TransactionPayload>;

    if (!payload.date || !payload.category || !payload.type || payload.amount === undefined) {
      return jsonError("Missing required fields", 422);
    }

    if (payload.type !== "income" && payload.type !== "expense") {
      return jsonError("Invalid transaction type", 422);
    }

    const transaction = addTransaction({
      date: payload.date,
      category: payload.category,
      type: payload.type,
      amount: Number(payload.amount),
      notes: payload.notes,
    });

    return Response.json({ data: transaction }, { status: 201 });
  } catch {
    return jsonError("Invalid request body", 400);
  }
}
