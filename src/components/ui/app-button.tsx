"use client";

// Project button adapter. UUI remains the primitive, while this file locks the portfolio visual register.
import type { ComponentProps } from "react";
import { Button as UuiButton } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

type AppButtonIntent = "primary" | "secondary" | "link" | "inverse-link" | "plain" | "chip";

type AppButtonProps = ComponentProps<typeof UuiButton> & {
  intent?: AppButtonIntent;
};

const intentClasses: Record<AppButtonIntent, string> = {
  primary: "rounded-none border border-ink bg-ink text-mono text-paper shadow-none hover:bg-paper hover:text-ink",
  secondary: "rounded-none border border-hairline bg-surface text-ink shadow-none hover:border-ink",
  link: "rounded-none p-0 text-ink no-underline hover:text-muted",
  "inverse-link": "rounded-none p-0 text-inverse-ink no-underline hover:text-inverse-ink/70",
  plain: "rounded-none bg-transparent p-0 text-ink shadow-none hover:bg-transparent",
  chip: "h-auto whitespace-normal rounded-none border border-hairline bg-surface px-3 py-2 text-left text-mono text-ink shadow-none hover:border-ink",
};

const intentColor: Record<AppButtonIntent, AppButtonProps["color"]> = {
  primary: "primary",
  secondary: "secondary",
  link: "link-gray",
  "inverse-link": "link-gray",
  plain: "tertiary",
  chip: "secondary",
};

export function AppButton({ intent = "primary", color, className, ...props }: AppButtonProps) {
  return <UuiButton color={color ?? intentColor[intent]} className={cx(intentClasses[intent], className)} {...props} />;
}

