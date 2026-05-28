// Shared monochrome pixel-style Llamita placeholder until final sprite assets land.
import { cx } from "@/utils/cx";

type PixelLlamitaMarkProps = {
  className?: string;
};

export function PixelLlamitaMark({ className }: PixelLlamitaMarkProps) {
  return (
    <span aria-hidden="true" className={cx("relative block h-14 w-14", className)}>
      <span className="absolute left-2 top-1 h-2 w-2 bg-ink" />
      <span className="absolute right-2 top-1 h-2 w-2 bg-ink" />
      <span className="absolute left-3 top-3 h-3 w-2 bg-ink" />
      <span className="absolute right-3 top-3 h-3 w-2 bg-ink" />
      <span className="absolute left-1/2 top-4 h-8 w-10 -translate-x-1/2 border-2 border-ink bg-paper" />
      <span className="absolute left-4 top-7 h-1.5 w-1.5 bg-ink" />
      <span className="absolute right-4 top-7 h-1.5 w-1.5 bg-ink" />
      <span className="absolute left-1/2 top-9 h-1.5 w-3 -translate-x-1/2 bg-ink" />
      <span className="absolute left-1/2 top-11 h-1 w-5 -translate-x-1/2 bg-hairline" />
      <span className="absolute bottom-0 left-5 h-2 w-2 bg-ink" />
      <span className="absolute bottom-0 right-5 h-2 w-2 bg-ink" />
    </span>
  );
}
