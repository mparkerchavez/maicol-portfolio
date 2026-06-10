import type { PageContext } from "@/stores/signal-store";

export function buildPageContext(context: PageContext) {
  return {
    page: context.page,
    inView: context.inView,
    lastHover: context.lastHover,
    inferredTrack: context.inferredTrack,
    recentBehavior: context.recentBehavior,
  };
}
