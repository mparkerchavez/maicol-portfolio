"use client";

import Link from "next/link";
import { Tag, TagGroup, TagList } from "@/components/base/tags/tags";
import type { CaseStudy } from "@/data/case-studies";
import { useSignalStore } from "@/stores/signal-store";

type CaseStudyCardProps = {
  caseStudy: CaseStudy;
};

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const recordEvent = useSignalStore((state) => state.recordEvent);

  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="interactive-card hairline-card group flex min-h-[430px] flex-col justify-between p-6 no-underline"
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
        <TagGroup label={`${caseStudy.cardTitle} metrics`} size="sm">
          <TagList className="mt-10 flex flex-wrap gap-2">
            {caseStudy.chips.map((chip) => (
              <Tag key={chip} id={chip} className="rounded-none bg-transparent text-mono-sm text-muted shadow-none ring-hairline">
                {chip}
              </Tag>
            ))}
          </TagList>
        </TagGroup>
        <span className="mt-8 block text-mono transition group-hover:translate-x-1">OPEN →</span>
      </div>
    </Link>
  );
}
