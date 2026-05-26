"use client";

// Project tab button adapter for custom tablist interactions that UUI Button should not own.
import type { ButtonHTMLAttributes } from "react";
import { cx } from "@/utils/cx";

type AppTabButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">;

export function AppTabButton({ className, type = "button", ...props }: AppTabButtonProps) {
  return <button type={type} className={cx("bg-transparent p-0", className)} {...props} />;
}

