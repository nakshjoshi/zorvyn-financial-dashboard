export function withDelay(ms = 500): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function jsonError(message: string, status = 400): Response {
  return Response.json({ message }, { status });
}
