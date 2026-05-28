import { InteractiveHome } from "@/components/home/interactive-home";
import { PageSignal } from "@/components/signals/page-signal";
import { PageFrame } from "@/components/site/page-frame";
import { caseStudies } from "@/data/case-studies";

export default function Home() {
  return (
    <PageFrame>
      <PageSignal slug="home" title="Home" />
      <InteractiveHome caseStudies={caseStudies} />
    </PageFrame>
  );
}
