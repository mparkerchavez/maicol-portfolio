import { CaseStudyCard } from "@/components/home/case-study-card";
import { CurateMiniApp } from "@/components/home/curate-mini-app";
import { EarnestlyCard } from "@/components/home/earnestly-card";
import { HomeHero } from "@/components/home/home-hero";
import { PageSignal } from "@/components/signals/page-signal";
import { TrackedSection } from "@/components/signals/tracked-section";
import { PageFrame } from "@/components/site/page-frame";
import { caseStudies } from "@/data/case-studies";

// Home page composed to Spec 03 Section 2: status strip and header (PageFrame),
// hero with persona nav, case study triptych, Curate Mind mini-app, Earnestly
// card, footer (PageFrame). Llamita stays global via the root layout.
export default function Home() {
  return (
    <PageFrame>
      <PageSignal slug="home" title="Home" />

      <TrackedSection id="hero" title="Positioning" className="site-container pb-20 pt-12 md:pt-16">
        <HomeHero />
      </TrackedSection>

      <TrackedSection id="case-studies" title="Case studies" className="site-container border-t border-hairline py-20 md:py-24">
        <div className="grid gap-4 min-[800px]:grid-cols-2 min-[1100px]:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>
      </TrackedSection>

      <TrackedSection id="curate-mind" title="Curate Mind" className="site-container border-t border-hairline py-20 md:py-24">
        <p className="text-mono text-muted">05 /// LIVE PRODUCT</p>
        <h2 className="mt-6">Curate Mind.</h2>
        <p className="mt-6 text-body-lg">
          Curate Mind is my research system, built because AI adoption kept stalling when outputs were not trustworthy. Every answer traces back
          through a data point to an original source. The demo at curatemind.io runs on a February 2026 AI research dataset: 178 sources, 1,561 data
          points, 28 positions across 11 themes.
        </p>
        <div className="mt-10">
          <CurateMiniApp />
        </div>
      </TrackedSection>

      <TrackedSection id="earnestly" title="Earnestly" className="site-container border-t border-hairline py-20 md:py-24">
        <p className="text-mono text-muted">06 /// COMING NEXT</p>
        <div className="mt-8">
          <EarnestlyCard />
        </div>
      </TrackedSection>
    </PageFrame>
  );
}
