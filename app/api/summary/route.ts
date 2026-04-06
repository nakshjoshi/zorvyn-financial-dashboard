import { getSummary } from "@/app/api/_data/transactions-db";
import { withDelay } from "@/app/api/_utils";
import { APP_CURRENCY } from "@/lib/constants";

export async function GET(): Promise<Response> {
  await withDelay();
  return Response.json({ currency: APP_CURRENCY, data: getSummary() });
}
