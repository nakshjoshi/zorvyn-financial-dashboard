import { jsonError, withDelay } from "@/app/api/_utils";
import { updateTransaction } from "@/app/api/_data/transactions-db";
import { TransactionPayload } from "@/types/finance";

interface Context {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, context: Context): Promise<Response> {
  await withDelay(700);

  const { id } = await context.params;

  try {
    const payload = (await request.json()) as Partial<TransactionPayload>;

    if (payload.type && payload.type !== "income" && payload.type !== "expense") {
      return jsonError("Invalid transaction type", 422);
    }

    const updated = updateTransaction(id, payload);
    if (!updated) {
      return jsonError("Transaction not found", 404);
    }

    return Response.json({ data: updated });
  } catch {
    return jsonError("Invalid request body", 400);
  }
}
