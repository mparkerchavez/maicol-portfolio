"use client";

import Link from "next/link";
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
        <div className="mt-10 flex flex-wrap gap-2">
          {caseStudy.chips.map((chip) => (
            <span key={chip} className="border border-hairline px-2 py-1 text-mono-sm text-muted">
              {chip}
            </span>
          ))}
        </div>
        <span className="mt-8 block text-mono transition group-hover:translate-x-1">OPEN →</span>
      </div>
    </Link>
  );
}
