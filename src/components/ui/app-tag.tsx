"use client";

// Project tag adapter. UUI Tag remains the primitive for metrics and method chips.
import type { ComponentProps } from "react";
import { Tag as UuiTag, TagGroup, TagList } from "@/components/base/tags/tags";
import { cx } from "@/utils/cx";

type AppTagProps = Omit<ComponentProps<typeof UuiTag>, "className"> & {
  className?: string;
};

export { TagGroup as AppTagGroup, TagList as AppTagList };

export function AppTag({ className, ...props }: AppTagProps) {
  return <UuiTag className={cx("rounded-none bg-transparent text-mono-sm text-muted shadow-none ring-hairline", className)} {...props} />;
}
