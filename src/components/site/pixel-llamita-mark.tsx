// Shared monochrome pixel-style Llamita placeholder until final sprite assets land.
import type { LlamitaState } from "@/lib/llamita-behavior";
import { cx } from "@/utils/cx";

type PixelLlamitaMarkProps = {
  className?: string;
  state?: LlamitaState;
};

export function PixelLlamitaMark({ className, state = "idle" }: PixelLlamitaMarkProps) {
  const isSleeping = state === "sleeping";
  const isTalking = state === "talking";
  const isThinking = state === "thinking";
  const isWrong = state === "wrong";

  return (
    <span aria-hidden="true" className={cx("relative block h-14 w-14", className)}>
      <span className="absolute left-2 top-1 h-2 w-2 bg-ink" />
      <span className="absolute right-2 top-1 h-2 w-2 bg-ink" />
      <span className="absolute left-3 top-3 h-3 w-2 bg-ink" />
      <span className="absolute right-3 top-3 h-3 w-2 bg-ink" />
      <span className="absolute left-1/2 top-4 h-8 w-10 -translate-x-1/2 border-2 border-ink bg-paper" />
      <span
        className={cx(
          "absolute left-4 bg-ink",
          isSleeping ? "top-8 h-0.5 w-2" : isWrong ? "top-7 h-1 w-2" : "top-7 h-1.5 w-1.5",
        )}
      />
      <span
        className={cx(
          "absolute right-4 bg-ink",
          isSleeping ? "top-8 h-0.5 w-2" : isWrong ? "top-7 h-1 w-2" : "top-7 h-1.5 w-1.5",
        )}
      />
      <span className={cx("absolute left-1/2 top-9 -translate-x-1/2 bg-ink", isTalking ? "h-2 w-3" : "h-1.5 w-3")} />
      <span className={cx("absolute left-1/2 -translate-x-1/2 bg-hairline", isThinking ? "top-12 h-1 w-8" : "top-11 h-1 w-5")} />
      {isThinking ? (
        <>
          <span className="absolute bottom-2 left-3 h-1 w-1 bg-ink" />
          <span className="absolute bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 bg-ink" />
          <span className="absolute bottom-2 right-3 h-1 w-1 bg-ink" />
        </>
      ) : null}
      <span className="absolute bottom-0 left-5 h-2 w-2 bg-ink" />
      <span className="absolute bottom-0 right-5 h-2 w-2 bg-ink" />
    </span>
  );
}
