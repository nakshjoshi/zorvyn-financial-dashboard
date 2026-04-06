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
        "glass-card rounded-2xl border border-white/10 bg-(--panel) p-5 shadow-[0_24px_58px_-34px_rgba(3,8,20,0.92)]",
        className,
      )}
    >
      {children}
    </section>
  );
}
