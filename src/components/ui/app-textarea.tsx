"use client";

// Project textarea adapter. UUI provides the accessible field behavior, this file applies site tokens.
import type { ComponentProps } from "react";
import { TextArea as UuiTextArea } from "@/components/base/textarea/textarea";
import { cx } from "@/utils/cx";

type AppTextAreaProps = Omit<ComponentProps<typeof UuiTextArea>, "textAreaClassName"> & {
  textAreaClassName?: string;
};

export function AppTextArea({ textAreaClassName, ...props }: AppTextAreaProps) {
  return (
    <UuiTextArea
      textAreaClassName={cx("min-h-28 rounded-none bg-surface text-body text-ink shadow-none ring-hairline focus:ring-ink", textAreaClassName)}
      {...props}
    />
  );
}
