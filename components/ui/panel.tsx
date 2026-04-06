import { clsx } from "clsx";

export function Panel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={clsx(
        "rounded-2xl border border-white/10 bg-(--panel) p-5 shadow-[0_20px_45px_-28px_rgba(0,0,0,0.55)]",
        className,
      )}
    >
      {children}
    </section>
  );
}
