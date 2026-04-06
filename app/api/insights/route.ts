import { getInsights } from "@/app/api/_data/transactions-db";
import { withDelay } from "@/app/api/_utils";

export async function GET(): Promise<Response> {
  await withDelay(650);
  return Response.json({ data: getInsights() });
}
