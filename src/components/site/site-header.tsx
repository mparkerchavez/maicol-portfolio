import Link from "next/link";
import { SignalAnchor } from "@/components/signals/signal-anchor";

type SiteHeaderProps = {
  showBreadcrumb?: boolean;
};

export function SiteHeader({ showBreadcrumb = false }: SiteHeaderProps) {
  return (
    <header className="sticky top-8 z-30 border-b border-hairline bg-paper/88 backdrop-blur">
      <div className="site-container flex min-h-20 items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          {showBreadcrumb ? (
            <Link href="/" className="text-mono text-muted transition hover:text-ink">
              ← BACK
            </Link>
          ) : null}
          <Link href="/" className="text-h3 leading-none text-ink">
            Maicol Parker-Chavez
          </Link>
        </div>
        <nav aria-label="Primary" className="flex items-center gap-5 text-mono text-ink">
          <SignalAnchor href="mailto:mparkerchavez@gmail.com" signalType="click" targetId="header-contact">
            CONTACT
          </SignalAnchor>
          <SignalAnchor href="/Maicol-Parker-Chavez-Resume.pdf" signalType="click" targetId="header-resume">
            RESUME
          </SignalAnchor>
        </nav>
      </div>
    </header>
  );
}
