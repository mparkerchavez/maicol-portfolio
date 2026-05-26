"use client";

// Project card adapter. UUI v8 Pro has card templates, but no generic base Card primitive.
import Link from "next/link";
import type { ComponentProps, ComponentPropsWithoutRef } from "react";
import { cx } from "@/utils/cx";

type Padding = "none" | "sm" | "md" | "lg";

type AppCardBaseProps = {
  interactive?: boolean;
  padding?: Padding;
  className?: string;
};

type AppCardDivProps = ComponentPropsWithoutRef<"div"> &
  AppCardBaseProps & {
    href?: never;
  };

type AppCardLinkProps = Omit<ComponentProps<typeof Link>, "className"> &
  AppCardBaseProps & {
    href: ComponentProps<typeof Link>["href"];
  };

type AppCardProps = AppCardDivProps | AppCardLinkProps;

const paddingClasses: Record<Padding, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8 md:p-10",
};

export function AppCard({ interactive = false, padding = "md", className, href, ...props }: AppCardProps) {
  const classes = cx("hairline-card", interactive && "interactive-card", paddingClasses[padding], className);

  if (href) {
    return <Link href={href} className={classes} {...(props as Omit<AppCardLinkProps, "href" | "className" | "interactive" | "padding">)} />;
  }

  return <div className={classes} {...(props as ComponentPropsWithoutRef<"div">)} />;
}

