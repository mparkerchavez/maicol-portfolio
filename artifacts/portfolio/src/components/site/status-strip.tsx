export function StatusStrip() {
  return (
    <div className="sticky top-0 z-40 border-b border-hairline bg-paper/95 backdrop-blur">
      <div className="site-container flex min-h-8 items-center justify-between gap-4 text-mono-sm text-muted">
        <span>MAICOL PARKER-CHAVEZ</span>
        <span>{ "///" }</span>
        <span>AI PRODUCT STRATEGIST</span>
        <span>{ "///" }</span>
        <span className="hidden md:inline">OPEN TO SENIOR PM AND AI PRODUCT LEAD ROLES</span>
      </div>
    </div>
  );
}
