import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { StatusStrip } from "@/components/site/status-strip";

type PageFrameProps = {
  children: ReactNode;
  showBreadcrumb?: boolean;
};

export function PageFrame({ children, showBreadcrumb }: PageFrameProps) {
  return (
    <>
      <StatusStrip />
      <SiteHeader showBreadcrumb={showBreadcrumb} />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
