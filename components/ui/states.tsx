import { Panel } from "@/components/ui/panel";

export function LoadingState({ label = "Loading data..." }: { label?: string }) {
  return (
    <Panel className="flex min-h-[180px] items-center justify-center">
      <p className="text-sm text-muted">{label}</p>
    </Panel>
  );
}

export function EmptyState({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <Panel className="flex min-h-[180px] flex-col items-center justify-center gap-2 text-center">
      <p className="font-semibold">{title}</p>
      <p className="max-w-sm text-sm text-muted">{message}</p>
    </Panel>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <Panel className="border-red-500/30 bg-red-500/10">
      <p className="font-semibold text-red-300">Something went wrong</p>
      <p className="mt-1 text-sm text-red-200/90">{message}</p>
    </Panel>
  );
}
