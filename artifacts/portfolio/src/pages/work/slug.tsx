import { Link, useParams, useLocation } from "wouter";
import { useEffect } from "react";
import { LlamitaChip } from "@/components/case-study/llamita-chip";
import { PageSignal } from "@/components/signals/page-signal";
import { SignalPhrase } from "@/components/signals/signal-phrase";
import { TrackedSection } from "@/components/signals/tracked-section";
import { PageFrame } from "@/components/site/page-frame";
import { getCaseStudy, getNextCaseStudy } from "@/data/case-studies";

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();

  const caseStudy = getCaseStudy(slug);

  useEffect(() => {
    if (slug && !caseStudy) {
      navigate("/");
    }
  }, [slug, caseStudy, navigate]);

  if (!caseStudy) {
    return null;
  }

  const next = getNextCaseStudy(caseStudy.slug);

  return (
    <PageFrame showBreadcrumb>
      <PageSignal slug={`work/${caseStudy.slug}`} title={caseStudy.title} />

      <article className="site-container pt-20">
        <TrackedSection id="case-hero" title={caseStudy.title}>
          <p className="text-mono text-muted">{caseStudy.kicker}</p>
          <h1 className="mt-8 max-w-4xl">{caseStudy.title}</h1>
          <p className="mt-8 text-body-lg">{caseStudy.lead}</p>
        </TrackedSection>

        <div className="mt-20 grid gap-12 lg:grid-cols-12">
          <aside className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
            <div className="hairline-card p-6">
              <SidebarBlock label="MY ROLE" value={caseStudy.role} />
              <SidebarList label="COLLABORATORS" values={caseStudy.collaborators} />
              <SidebarList label="METHODS" values={caseStudy.methods} chips />
              <div className="mt-8 border border-hairline bg-surface p-4">
                <p className="text-mono-sm text-muted">IMPACT METRICS</p>
                <ul className="mt-4 grid gap-3 text-body-sm">
                  {caseStudy.metrics.map((metric) => (
                    <li key={metric}>{metric}</li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8">
            {caseStudy.sections.map((section) => (
              <TrackedSection key={section.eyebrow} id={section.eyebrow.toLowerCase().replaceAll(" ", "-").replaceAll("/", "")} title={section.title} className="mb-20">
                <p className="text-mono-sm text-muted">{section.eyebrow}</p>
                <h2 className="mt-4">{section.title}</h2>
                <div className="mt-8 grid gap-5">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-body">
                      {renderSignalParagraph(paragraph)}
                    </p>
                  ))}
                </div>
                {section.chips ? (
                  <div className="mt-8 flex flex-wrap gap-3">
                    {section.chips.map((chip) => (
                      <LlamitaChip key={chip} prompt={chip} />
                    ))}
                  </div>
                ) : null}
              </TrackedSection>
            ))}

            <section className="border-t border-hairline pt-10">
              <p className="text-mono-sm text-muted">OTHER PROJECTS</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {caseStudy.related.map((relatedSlug) => {
                  const related = getCaseStudy(relatedSlug);

                  return related ? (
                    <Link key={related.slug} href={`/work/${related.slug}`} className="hairline-card interactive-card p-4 no-underline">
                      <p className="text-mono-sm text-muted">{related.focus}</p>
                      <h3 className="mt-3">{related.cardTitle}</h3>
                    </Link>
                  ) : null;
                })}
              </div>
            </section>
          </div>
        </div>
      </article>

      <nav className="site-container mt-24 flex items-end justify-between gap-8 border-t border-hairline pt-10">
        <Link href="/" className="text-mono">
          {"<-"} BACK TO INDEX
        </Link>
        {next ? (
          <Link href={`/work/${next.slug}`} className="max-w-sm text-right no-underline">
            <p className="text-mono-sm text-muted">NEXT CASE STUDY</p>
            <h3 className="mt-2">{next.cardTitle} -&gt;</h3>
          </Link>
        ) : null}
      </nav>
    </PageFrame>
  );
}

function SidebarBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-mono-sm text-muted">{label}</p>
      <p className="mt-2 text-body-sm">{value}</p>
    </div>
  );
}

function SidebarList({ label, values, chips = false }: { label: string; values: string[]; chips?: boolean }) {
  return (
    <div className="mt-8">
      <p className="text-mono-sm text-muted">{label}</p>
      <ul className={chips ? "mt-3 flex flex-wrap gap-2" : "mt-3 grid gap-2 text-body-sm"}>
        {values.map((value) => (
          <li key={value} className={chips ? "border border-hairline px-2 py-1 text-mono-sm text-muted" : undefined}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

function renderSignalParagraph(paragraph: string) {
  if (paragraph.includes("300+ active sales associates")) {
    return (
      <>
        {paragraph.split("300+ active sales associates")[0]}
        <SignalPhrase phrase="300+ active sales associates" tag="outcome" />
        {paragraph.split("300+ active sales associates")[1]}
      </>
    );
  }

  if (paragraph.includes("12-person pilot")) {
    return (
      <>
        {paragraph.split("12-person pilot")[0]}
        <SignalPhrase phrase="12-person pilot" tag="adoption" />
        {paragraph.split("12-person pilot")[1]}
      </>
    );
  }

  if (paragraph.includes("LangChain")) {
    return (
      <>
        {paragraph.split("LangChain")[0]}
        <SignalPhrase phrase="LangChain" tag="technical" />
        {paragraph.split("LangChain")[1]}
      </>
    );
  }

  if (paragraph.includes("agenda-first")) {
    return (
      <>
        {paragraph.split("agenda-first")[0]}
        <SignalPhrase phrase="agenda-first" tag="judgment" />
        {paragraph.split("agenda-first")[1]}
      </>
    );
  }

  return paragraph;
}
