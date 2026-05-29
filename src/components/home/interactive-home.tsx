"use client";

// First-pass interactive home prototype. The page becomes a product surface before case-study pages inherit the direction.
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Download, FileText, Mail, MessageSquare, PanelRightOpen, type LucideIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { SignalAnchor } from "@/components/signals/signal-anchor";
import { TrackedSection } from "@/components/signals/tracked-section";
import { OpenChatButton } from "@/components/site/open-chat-button";
import { AppButton, AppCard, AppTabButton, AppTag, AppTagGroup, AppTagList } from "@/components/ui";
import { curateTraces } from "@/data/curate-traces";
import type { CaseStudy, CaseStudySlug } from "@/data/case-studies";
import { LLAMITA_STATE_LABELS } from "@/lib/llamita-behavior";
import { useLlamitaBehaviorStore } from "@/stores/llamita-behavior-store";
import type { ThroughLine } from "@/stores/signal-store";
import { useSignalStore } from "@/stores/signal-store";

const throughLineStorageKey = "maicol-through-line";

const framings: Record<
  ThroughLine,
  {
    label: string;
    eyebrow: string;
    display: string;
    subhead: string;
    llamaNote: string;
  }
> = {
  designer: {
    label: "Product Designer",
    eyebrow: "DESIGN FUNCTION",
    display: "I have been a Product Designer for 24 years. I am working on what that becomes in the age of AI.",
    subhead: "Curate Mind is one piece of the answer. The rest is how product judgment changes when the material starts talking back.",
    llamaNote: "This frame asks what survives when screens stop being the center of the work.",
  },
  "ai-product-lead": {
    label: "AI Product Lead",
    eyebrow: "DEFAULT READ",
    display: "I work in the gap between AI capability and human adoption.",
    subhead: "Discovery, validation, prototyping, alignment. All in one person.",
    llamaNote: "This is the spine: moving AI capability into human use.",
  },
  "end-to-end-product": {
    label: "End-to-end Product",
    eyebrow: "OPERATING MODEL",
    display: "Twenty-four years of product work, converged on one function.",
    subhead: "Find where AI creates value. Prove it before the build. Scale what works.",
    llamaNote: "This frame answers the title problem: the function came before the label.",
  },
};

const framingOrder = Object.keys(framings) as ThroughLine[];

const recruiterProof = [
  { label: "STATUS", value: "OPEN TO SENIOR PM AND AI PRODUCT LEAD ROLES" },
  { label: "LOCATION", value: "LOS ANGELES" },
  { label: "RANGE", value: "$170K TO $190K" },
  { label: "SIGNAL", value: "RESUME AND CONTACT ABOVE THE FOLD" },
];

type InteractiveHomeProps = {
  caseStudies: CaseStudy[];
};

export function InteractiveHome({ caseStudies }: InteractiveHomeProps) {
  const [activeThroughLine, setActiveThroughLine] = useState<ThroughLine>("ai-product-lead");
  const [previewThroughLine, setPreviewThroughLine] = useState<ThroughLine | null>(null);
  const [activeCaseSlug, setActiveCaseSlug] = useState<CaseStudySlug>("capital-group");
  const [expandedTraceIndex, setExpandedTraceIndex] = useState(0);
  const setThroughLine = useSignalStore((state) => state.setThroughLine);
  const recordEvent = useSignalStore((state) => state.recordEvent);
  const llamitaState = useLlamitaBehaviorStore((state) => state.state);

  const currentFraming = framings[previewThroughLine ?? activeThroughLine];
  const currentFramingKey = previewThroughLine ?? activeThroughLine;
  const activeCase = useMemo(
    () => caseStudies.find((caseStudy) => caseStudy.slug === activeCaseSlug) ?? caseStudies[0]!,
    [activeCaseSlug, caseStudies],
  );
  const expandedTrace = curateTraces[expandedTraceIndex] ?? curateTraces[0];

  useEffect(() => {
    const stored = window.sessionStorage.getItem(throughLineStorageKey) as ThroughLine | null;

    if (stored && stored in framings) {
      setActiveThroughLine(stored);
      setThroughLine(stored);
    }
  }, [setThroughLine]);

  const commitThroughLine = (value: ThroughLine) => {
    setActiveThroughLine(value);
    setPreviewThroughLine(null);
    setThroughLine(value);
    window.sessionStorage.setItem(throughLineStorageKey, value);
  };

  const chooseCase = (caseStudy: CaseStudy) => {
    setActiveCaseSlug(caseStudy.slug);
    recordEvent({ type: "click", target: `case-proof:${caseStudy.slug}` });
  };

  return (
    <>
      <TrackedSection
        id="intent-cockpit"
        title="Intent Cockpit"
        className="site-container mt-8 grid min-h-[720px] gap-8 pb-6 pt-6 lg:grid-cols-[0.7fr_1.45fr_0.85fr] lg:items-stretch"
      >
        <aside className="flex flex-col justify-between gap-8 border-r border-hairline pr-5">
          <div>
            <p className="text-mono text-muted">01 /// INTENT COCKPIT</p>
            <div className="mt-8 grid gap-3" role="tablist" aria-label="Career framing">
              {framingOrder.map((value) => {
                const isActive = value === activeThroughLine;

                return (
                  <AppTabButton
                    key={value}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`w-full border px-4 py-3 text-left transition ${
                      isActive ? "border-ink bg-ink text-paper" : "border-hairline bg-transparent text-ink hover:border-ink"
                    }`}
                    onMouseEnter={() => {
                      if (!isActive) {
                        setPreviewThroughLine(value);
                      }
                    }}
                    onMouseLeave={() => setPreviewThroughLine(null)}
                    onFocus={() => {
                      if (!isActive) {
                        setPreviewThroughLine(value);
                      }
                    }}
                    onBlur={() => setPreviewThroughLine(null)}
                    onClick={() => commitThroughLine(value)}
                  >
                    <span className="block text-mono-sm opacity-70">{framings[value].eyebrow}</span>
                    <span className="mt-2 block text-h4">{framings[value].label}</span>
                  </AppTabButton>
                );
              })}
            </div>
          </div>

          <div className="border-t border-hairline pt-5">
            <p className="text-mono-sm text-muted">FAST READ</p>
            <div className="mt-4 grid gap-3">
              {recruiterProof.map((item) => (
                <div key={item.label}>
                  <p className="text-mono-sm text-muted">{item.label}</p>
                  <p className="mt-1 text-body-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="relative flex min-h-[620px] flex-col justify-between border-x border-hairline px-7 py-7">
          <div className="flex items-center justify-between gap-6">
            <p className="text-mono text-muted">ACTIVE FRAME /// {currentFraming.eyebrow}</p>
            <p className="hidden text-mono-sm text-muted xl:block">SIGNAL STATE: SESSION ONLY</p>
          </div>

          <ThroughLineCopy frameKey={currentFramingKey} framing={currentFraming} />
          <AboutAffordance />

          <div className="relative mt-8 min-h-[220px] overflow-hidden border border-hairline bg-paper">
            <Image
              src="/assets/prototype/interactive-cockpit-pixel.png"
              alt="Monochrome pixel-art product cockpit showing an evidence interface and Llamita"
              fill
              priority
              className="object-cover opacity-85 mix-blend-multiply"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute left-4 top-4 border border-ink bg-paper px-3 py-2 text-mono-sm">LIVE PRODUCT SURFACE</div>
            <div className="absolute bottom-4 right-4 max-w-[230px] border border-ink bg-paper p-3 text-body-sm">
              The visual system is monochrome for now. The interaction model is the color.
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-4 border-l border-hairline pl-5">
          <div className="border border-ink bg-surface p-4 shadow-[6px_6px_0_0_var(--color-ink)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-llamita-meta text-muted">{LLAMITA_STATE_LABELS[llamitaState]}</p>
                <p className="mt-4 text-llamita-body">{currentFraming.llamaNote}</p>
              </div>
            </div>
            <div className="mt-5 grid gap-2">
              <OpenChatButton prompt="tell me about Maicol" className="inline-flex items-center gap-2 text-mono">
                <MessageSquare aria-hidden="true" className="size-4" strokeWidth={1.5} />
                ASK ABOUT MAICOL
              </OpenChatButton>
              <OpenChatButton prompt="what should I look at first?" className="inline-flex items-center gap-2 text-mono text-muted hover:text-ink">
                <PanelRightOpen aria-hidden="true" className="size-4" strokeWidth={1.5} />
                WHAT SHOULD I READ FIRST?
              </OpenChatButton>
            </div>
          </div>

          <div className="grid gap-2 border-y border-hairline py-4">
            <TrackedAction href="mailto:mparkerchavez@gmail.com" targetId="home-cockpit-contact" icon={Mail}>
              CONTACT
            </TrackedAction>
            <TrackedAction href="/Maicol-Parker-Chavez-Resume.pdf" targetId="home-cockpit-resume" icon={Download}>
              DOWNLOAD RESUME
            </TrackedAction>
          </div>

            <div className="grid gap-3">
            <p className="text-mono-sm text-muted">PROOF INDEX</p>
            {caseStudies.map((caseStudy) => (
              <AppButton
                key={caseStudy.slug}
                type="button"
                intent="plain"
                className={`w-full border px-3 py-2 text-left ${
                  caseStudy.slug === activeCaseSlug ? "border-ink bg-ink text-paper" : "border-hairline bg-transparent text-ink hover:border-ink"
                }`}
                onClick={() => chooseCase(caseStudy)}
              >
                <span className="block text-mono-sm opacity-70">{caseStudy.marker}</span>
                <span className="mt-2 block text-body-sm">{caseStudy.cardTitle}</span>
              </AppButton>
            ))}
          </div>
        </aside>
      </TrackedSection>

      <ProofBoard caseStudies={caseStudies} activeCase={activeCase} chooseCase={chooseCase} />
      <TraceLab expandedTraceIndex={expandedTraceIndex} setExpandedTraceIndex={setExpandedTraceIndex} expandedTrace={expandedTrace} />
      <EarnestlyPreview />
    </>
  );
}

function ThroughLineCopy({
  frameKey,
  framing,
}: {
  frameKey: ThroughLine;
  framing: (typeof framings)[ThroughLine];
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="relative z-10 mt-7 min-h-[450px]">
        <h1 className="max-w-none text-h1">{framing.display}</h1>
        <p className="mt-6 max-w-[48ch] text-body-lg italic">{framing.subhead}</p>
      </div>
    );
  }

  return (
    <div className="relative z-10 mt-7 min-h-[450px]">
      <AnimatePresence initial={false}>
        <motion.div
          key={frameKey}
          className="absolute inset-x-0 top-0"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
        >
          <h1 className="max-w-none text-h1">{framing.display}</h1>
          <p className="mt-6 max-w-[48ch] text-body-lg italic">{framing.subhead}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function AboutAffordance() {
  const ref = useRef<HTMLSpanElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const setHoverLookTarget = useLlamitaBehaviorStore((state) => state.setHoverLookTarget);
  const clearHoverLookTarget = useLlamitaBehaviorStore((state) => state.clearHoverLookTarget);

  const beginLook = () => {
    if (shouldReduceMotion || !ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    setHoverLookTarget({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  const endLook = () => {
    clearHoverLookTarget();
  };

  return (
    <span
      ref={ref}
      className="relative z-10 mt-6 inline-flex"
      onPointerEnter={beginLook}
      onPointerLeave={endLook}
      onMouseEnter={beginLook}
      onMouseLeave={endLook}
      onFocus={beginLook}
      onBlur={endLook}
    >
      <OpenChatButton prompt="tell me about Maicol" className="inline-flex items-center gap-2 text-mono">
        TO LEARN ABOUT MAICOL
        <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
        ASK LLAMITA
      </OpenChatButton>
    </span>
  );
}

function TrackedAction({
  href,
  targetId,
  icon: Icon,
  children,
}: {
  href: string;
  targetId: string;
  icon: LucideIcon;
  children: string;
}) {
  return (
    <SignalAnchor
      href={href}
      signalType="click"
      targetId={targetId}
      uiIntent="plain"
      className="inline-flex items-center justify-between gap-4 border border-hairline px-4 py-2 text-mono no-underline transition hover:border-ink"
    >
      <span>{children}</span>
      <Icon aria-hidden="true" className="size-4" strokeWidth={1.5} />
    </SignalAnchor>
  );
}

function ProofBoard({
  caseStudies,
  activeCase,
  chooseCase,
}: {
  caseStudies: CaseStudy[];
  activeCase: CaseStudy;
  chooseCase: (caseStudy: CaseStudy) => void;
}) {
  return (
    <TrackedSection id="proof-board" title="Proof Board" className="site-container border-t border-hairline py-24">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="text-mono text-muted">02 /// PROOF BOARD</p>
          <h2 className="mt-6 max-w-[10ch] text-display-2">Evidence, not a gallery.</h2>
          <p className="mt-8 text-body-lg">
            The work appears as a decision system: what changed, how it was validated, and which proof matters for the visitor in front of it.
          </p>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-3 md:grid-cols-3">
            {caseStudies.map((caseStudy) => (
              <AppTabButton
                key={caseStudy.slug}
                type="button"
                aria-selected={caseStudy.slug === activeCase.slug}
                className={`min-h-[170px] border p-4 text-left transition ${
                  caseStudy.slug === activeCase.slug ? "border-ink bg-ink text-paper" : "border-hairline bg-transparent hover:border-ink"
                }`}
                onClick={() => chooseCase(caseStudy)}
              >
                <span className="block text-mono-sm opacity-70">{caseStudy.focus}</span>
                <span className="mt-6 block text-h4">{caseStudy.cardTitle}</span>
              </AppTabButton>
            ))}
          </div>

          <div className="grid gap-6 border border-ink bg-surface p-6 lg:grid-cols-[1fr_0.85fr]">
            <div>
              <p className="text-mono-sm text-muted">{activeCase.kicker}</p>
              <h3 className="mt-5 text-h2">{activeCase.title}</h3>
              <p className="mt-6 text-body-lg">{activeCase.lead}</p>
              <p className="mt-5 text-body text-muted">{activeCase.approach}</p>
              <AppTagGroup label={`${activeCase.cardTitle} proof`} size="sm">
                <AppTagList className="mt-8 flex flex-wrap gap-2">
                  {activeCase.chips.map((chip) => (
                    <AppTag key={chip} id={chip}>
                      {chip}
                    </AppTag>
                  ))}
                </AppTagList>
              </AppTagGroup>
            </div>

            <div className="grid content-between gap-6 border-l border-hairline pl-6">
              <EvidenceFlow caseStudy={activeCase} />
              <SignalAnchor
                href={`/work/${activeCase.slug}`}
                signalType="click"
                targetId={`proof-board-open:${activeCase.slug}`}
                uiIntent="plain"
                className="inline-flex items-center gap-2 text-mono no-underline"
              >
                OPEN CASE FILE
                <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
              </SignalAnchor>
            </div>
          </div>
        </div>
      </div>
    </TrackedSection>
  );
}

function EvidenceFlow({ caseStudy }: { caseStudy: CaseStudy }) {
  const flow = [
    { label: "PROBLEM", value: caseStudy.problem },
    { label: "METHOD", value: caseStudy.methods.slice(0, 2).join(" + ") },
    { label: "OUTCOME", value: caseStudy.metrics[0] ?? "Impact metric pending" },
  ];

  return (
    <div className="grid gap-3">
      {flow.map((item, index) => (
        <div key={item.label} className="grid grid-cols-[56px_1fr] gap-4">
          <div className="flex flex-col items-center">
            <span className="grid size-10 place-items-center border border-ink bg-paper text-mono-sm">{String(index + 1).padStart(2, "0")}</span>
            {index < flow.length - 1 ? <span className="h-8 w-px bg-hairline" /> : null}
          </div>
          <div className="pb-4">
            <p className="text-mono-sm text-muted">{item.label}</p>
            <p className="mt-1 text-body-sm">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function TraceLab({
  expandedTraceIndex,
  setExpandedTraceIndex,
  expandedTrace,
}: {
  expandedTraceIndex: number;
  setExpandedTraceIndex: (index: number) => void;
  expandedTrace: (typeof curateTraces)[number];
}) {
  const recordEvent = useSignalStore((state) => state.recordEvent);

  return (
    <TrackedSection id="trace-lab" title="Trace Lab" className="site-container border-t border-hairline py-24">
      <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="text-mono text-muted">03 /// TRACE LAB</p>
          <h2 className="mt-6 max-w-[9ch] text-display-2">Trust you can inspect.</h2>
          <p className="mt-8 text-body-lg">
            Curate Mind is represented as a small working surface: theme, position, evidence, source. The real traces can drop into this shell when
            the data spec lands.
          </p>
          <SignalAnchor
            href="https://curatemind.io"
            signalType="click"
            targetId="trace-lab-curate-mind"
            target="_blank"
            rel="noreferrer"
            uiIntent="plain"
            className="mt-8 inline-flex items-center gap-2 text-mono no-underline"
          >
            EXPLORE CURATEMIND.IO
            <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
          </SignalAnchor>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-3 md:grid-cols-3">
            {curateTraces.map((trace, index) => (
              <AppTabButton
                key={trace.position}
                type="button"
                aria-selected={expandedTraceIndex === index}
                className={`min-h-[150px] border p-4 text-left transition ${
                  expandedTraceIndex === index ? "border-ink bg-ink text-paper" : "border-hairline bg-transparent hover:border-ink"
                }`}
                onClick={() => {
                  setExpandedTraceIndex(index);
                  recordEvent({ type: "click", target: `curate-trace:${index + 1}` });
                }}
              >
                <span className="block text-mono-sm opacity-70">TRACE {String(index + 1).padStart(2, "0")}</span>
                <span className="mt-5 block text-body-sm">{trace.theme}</span>
              </AppTabButton>
            ))}
          </div>

          <div className="border border-ink bg-surface p-6">
            <div className="grid gap-4 lg:grid-cols-4">
              <TraceStep label="THEME" value={expandedTrace.theme} />
              <TraceStep label="POSITION" value={expandedTrace.position} />
              <TraceStep label="EVIDENCE" value={expandedTrace.evidence} muted />
              <TraceStep label="SOURCE" value={expandedTrace.source} muted />
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-6">
              <p className="text-body-sm text-muted">Prototype note: final traces should come from Curate Mind, not placeholder copy.</p>
              <OpenChatButton prompt={`explain this Curate Mind trace: ${expandedTrace.position}`} className="inline-flex items-center gap-2 text-mono">
                ASK LLAMITA TO EXPLAIN
                <MessageSquare aria-hidden="true" className="size-4" strokeWidth={1.5} />
              </OpenChatButton>
            </div>
          </div>
        </div>
      </div>
    </TrackedSection>
  );
}

function TraceStep({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="min-h-[220px] border border-hairline p-4">
      <p className="text-mono-sm text-muted">{label}</p>
      <p className={`mt-6 text-body-sm ${muted ? "text-muted" : "text-ink"}`}>{value}</p>
    </div>
  );
}

function EarnestlyPreview() {
  return (
    <TrackedSection id="earnestly-preview" title="Earnestly Preview" className="site-container border-t border-hairline py-24">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-mono text-muted">04 /// COMING NEXT</p>
          <h2 className="mt-6 text-display-2">Earnestly.</h2>
        </div>
        <AppCard padding="lg" className="grid gap-8 lg:grid-cols-[1fr_0.75fr]">
          <div>
            <p className="text-body-lg">
              UX coaching for builders shipping web apps with AI tools. The product is still forming, so this stays smaller than the proof surfaces.
            </p>
            <p className="mt-5 text-body italic text-muted">A future product for people building before they feel ready.</p>
          </div>
          <div className="grid content-between gap-6 border-l border-hairline pl-6">
            <div>
              <p className="text-mono-sm text-muted">STATUS</p>
              <p className="mt-2 text-body-sm">Coming soon. Interest capture stays in the next pass.</p>
            </div>
            <OpenChatButton prompt="what is Earnestly?" className="inline-flex items-center gap-2 text-mono">
              ASK WHAT THIS IS
              <FileText aria-hidden="true" className="size-4" strokeWidth={1.5} />
            </OpenChatButton>
          </div>
        </AppCard>
      </div>
    </TrackedSection>
  );
}
