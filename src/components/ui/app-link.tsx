"use client";

// Project link adapter. It uses the UUI Button link variant for standard link affordances.
import type { ComponentProps } from "react";
import { AppButton } from "@/components/ui/app-button";

type AppLinkProps = ComponentProps<typeof AppButton> & {
  href: string;
};

export function AppLink(props: AppLinkProps) {
  return <AppButton intent="link" {...props} />;
}

