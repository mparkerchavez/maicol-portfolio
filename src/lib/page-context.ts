import type { PageContext } from "@/stores/signal-store";

export function buildPageContext(context: PageContext) {
  return {
    page: context.page,
    inView: context.inView,
    lastHover: context.lastHover,
    selectedPersona: context.selectedPersona,
    inferredTrack: context.inferredTrack,
    recentBehavior: context.recentBehavior,
  };
}
