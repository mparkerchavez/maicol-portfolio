import { CaseStudyCard } from "@/components/home/case-study-card";
import { CurateMiniApp } from "@/components/home/curate-mini-app";
import { EarnestlyCard } from "@/components/home/earnestly-card";
import { ThroughLineToggle } from "@/components/home/through-line-toggle";
import { PageSignal } from "@/components/signals/page-signal";
import { SignalPhrase } from "@/components/signals/signal-phrase";
import { TrackedSection } from "@/components/signals/tracked-section";
import { OpenChatButton } from "@/components/site/open-chat-button";
import { PageFrame } from "@/components/site/page-frame";
import { caseStudies } from "@/data/case-studies";

export default function Home() {
  const showSignalHelper = process.env.NODE_ENV !== "production";

  return (
    <PageFrame>
      <PageSignal slug="home" title="Home" />

      <TrackedSection id="hero" title="Positioning" className="site-container pt-24 md:pt-32">
        <p className="text-mono text-muted">01 /// POSITIONING</p>
        <div className="mt-10">
          <ThroughLineToggle />
        </div>
        <OpenChatButton prompt="tell me about Maicol" className="mt-10 text-mono text-muted hover:text-ink">
          TO LEARN ABOUT MAICOL → ASK LLAMITA
        </OpenChatButton>
      </TrackedSection>

      <TrackedSection id="case-studies" title="Case Studies" className="site-container pt-32">
        <div className="grid gap-4 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>
      </TrackedSection>

      <TrackedSection id="curate-mind-mini-app" title="Curate Mind" className="site-container pt-32">
        <p className="text-mono text-muted">05 /// LIVE PRODUCT</p>
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.4fr]">
          <div>
            <h2>Curate Mind.</h2>
            <p className="mt-6 text-body-lg">
              A research system that traces themes to positions, evidence, and sources. The full product currently holds 178 sources, 1,561 data
              points, 28 positions, and 11 themes.
            </p>
            <p className="mt-5 text-body text-muted">
              The placeholder cards show the trust architecture shape. Real traces land with the Curate Mind data spec.
            </p>
          </div>
          <CurateMiniApp />
        </div>
      </TrackedSection>

      <TrackedSection id="earnestly" title="Earnestly" className="site-container pt-32">
        <p className="text-mono text-muted">06 /// COMING NEXT</p>
        <div className="mt-8">
          <EarnestlyCard />
        </div>
      </TrackedSection>

      {showSignalHelper ? (
        <div className="site-container pt-24">
          <p className="text-body-sm text-muted">
            Signal examples are live: hover on <SignalPhrase phrase="Curate Mind" tag="builder" /> or{" "}
            <SignalPhrase phrase="trust architecture" tag="trust" /> for two seconds, then inspect the signal store behavior in devtools.
          </p>
        </div>
      ) : null}
    </PageFrame>
  );
}
