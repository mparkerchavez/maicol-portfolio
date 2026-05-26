"use client";

// Project input adapter. UUI provides the accessible field behavior, this file applies site tokens.
import type { ComponentProps } from "react";
import { Input as UuiInput } from "@/components/base/input/input";
import { cx } from "@/utils/cx";

type AppInputProps = ComponentProps<typeof UuiInput>;

export function AppInput({ wrapperClassName, inputClassName, size = "lg", ...props }: AppInputProps) {
  return (
    <UuiInput
      size={size}
      wrapperClassName={cx("rounded-none bg-surface shadow-none ring-hairline focus-within:ring-ink", wrapperClassName)}
      inputClassName={cx("text-body text-ink placeholder:text-muted", inputClassName)}
      {...props}
    />
  );
}

