import { getSummary } from "@/app/api/_data/transactions-db";
import { withDelay } from "@/app/api/_utils";

export async function GET(): Promise<Response> {
  await withDelay();
  return Response.json({ data: getSummary() });
}
