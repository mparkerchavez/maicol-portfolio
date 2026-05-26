"use client";

import { AppCard, AppTag, AppTagGroup, AppTagList } from "@/components/ui";
import type { CaseStudy } from "@/data/case-studies";
import { useSignalStore } from "@/stores/signal-store";

type CaseStudyCardProps = {
  caseStudy: CaseStudy;
};

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const recordEvent = useSignalStore((state) => state.recordEvent);

  return (
    <AppCard
      href={`/work/${caseStudy.slug}`}
      interactive
      className="group flex min-h-[430px] flex-col justify-between no-underline"
      onMouseEnter={() => recordEvent({ type: "hover", target: `case-card:${caseStudy.slug}` })}
      onClick={() => recordEvent({ type: "click", target: `case-card:${caseStudy.slug}` })}
    >
      <div>
        <p className="text-mono text-muted">{caseStudy.marker}</p>
        <p className="mt-4 text-mono-sm text-muted">{caseStudy.focus}</p>
        <h2 className="mt-10">{caseStudy.cardTitle}</h2>
        <p className="mt-6 text-body-lg">{caseStudy.problem}</p>
        <p className="mt-5 text-body italic text-muted">{caseStudy.approach}</p>
      </div>
      <div>
        <AppTagGroup label={`${caseStudy.cardTitle} metrics`} size="sm">
          <AppTagList className="mt-10 flex flex-wrap gap-2">
            {caseStudy.chips.map((chip) => (
              <AppTag key={chip} id={chip}>
                {chip}
              </AppTag>
            ))}
          </AppTagList>
        </AppTagGroup>
        <span className="mt-8 block text-mono transition group-hover:translate-x-1">OPEN →</span>
      </div>
    </AppCard>
  );
}
