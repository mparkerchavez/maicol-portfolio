import { ArrowLeft, ArrowRight } from "@untitledui/icons";
import type { Metadata } from "next";
import { DM_Sans, Libre_Franklin } from "next/font/google";
import { notFound } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { Halftone } from "@/components/explore/halftone";
import { R5Footer, R5Header, r5Pad, r5Proof, r5Size } from "@/components/explore/r5-chrome";
import { Figure } from "@/components/explore/round5";
import { type Block, caseStudies, getCaseStudy } from "@/content/case-studies";
import { cx } from "@/utils/cx";

const displayFont = Libre_Franklin({ subsets: ["latin"], variable: "--font-ex31d", display: "swap" });
const bodyFont = DM_Sans({ subsets: ["latin"], variable: "--font-ex31", display: "swap" });

const HOME = "/";
const display = "font-extrabold tracking-[-0.02em]";
/** The landing page measure for 18px running text. */
const prose = "max-w-[38rem]";
const newspaper = { preset: "newspaper" } as const;

export const dynamicParams = false;

export function generateStaticParams() {
    return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const study = getCaseStudy(slug);
    if (!study) return {};
    return { title: `${study.summary.title} | Maicol Parker-Chavez`, description: study.summary.lead };
}

/** "01 · The challenge" becomes "The challenge". */
const plainLabel = (label: string) => label.replace(/^\d+\s*·\s*/, "");

const List = ({ items }: { items: string[] }) => (
    <ul className={cx("flex list-disc flex-col gap-3 pl-6", prose)}>
        {items.map((item) => (
            <li key={item.slice(0, 32)}>{item}</li>
        ))}
    </ul>
);

const BlockView = ({ block }: { block: Block }) => {
    switch (block.type) {
        case "p":
            return <p className={prose}>{block.text}</p>;
        case "h3":
            return <h3 className={cx("pt-8 font-display text-[var(--ex-ink)]", display, r5Size.title)}>{block.text}</h3>;
        case "ul":
            return <List items={block.items} />;
        case "callout":
            return (
                <div className="r5-note my-4 max-w-[44rem] px-6 py-8 md:px-10 md:py-10">
                    <h3 className={cx("font-display text-[var(--ex-ink)]", display, r5Size.title)}>{block.title}</h3>
                    <div className="mt-4">
                        <List items={block.items} />
                    </div>
                </div>
            );
        case "image":
            return <Halftone src={block.src} alt={block.alt} tone={newspaper} className="my-6" />;
        case "item":
            return (
                <div className="pt-8">
                    <h3 className={cx("font-display text-[var(--ex-ink)]", display, r5Size.title)}>{block.title}</h3>
                    <div className={cx("mt-3 flex flex-col gap-4", prose)}>
                        {block.text.map((t) => (
                            <p key={t.slice(0, 32)}>{t}</p>
                        ))}
                    </div>
                </div>
            );
    }
};

/** A label in the left column, content on the right. Stacks on small screens. */
const Split = ({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) => (
    <section className={cx("r4-card grid gap-x-16 gap-y-8 lg:grid-cols-12", r5Pad, className)}>
        <h2 className={cx("font-display lg:col-span-3", display, r5Size.title)}>{label}</h2>
        <div className="lg:col-span-9">{children}</div>
    </section>
);

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const study = getCaseStudy(slug);
    if (!study) notFound();
    const next = getCaseStudy(study.next.slug)!;
    const leadImage = study.summary.image;

    return (
        <div id="top" className={cx("ex r4 r5 ex-31 min-h-svh", displayFont.variable, bodyFont.variable)}>
            <div className="r4-stack flex flex-col">
                <R5Header display={display} home={HOME} scrollTone strongNav />

                <main className="r4-stack flex flex-col">
                    <section className={cx("r4-card r4-hero flex min-h-[calc(90svh-4.75rem)] flex-col", r5Pad, "md:py-16 xl:py-20")}>
                        <div>
                            <Button
                                href="/#work"
                                color="secondary"
                                size="md"
                                className="font-display"
                                iconLeading={<ArrowLeft data-icon aria-hidden="true" />}
                            >
                                All work
                            </Button>
                        </div>
                        <h1 className="mt-10 max-w-[80%] font-display text-[clamp(2.5rem,6.2vw,7rem)] leading-[0.92] font-black tracking-[-0.025em] text-balance uppercase max-lg:max-w-none">
                            {study.title}
                        </h1>
                        <p className={cx("r4-hero-copy mt-auto pt-16 text-pretty lg:ml-auto lg:w-[52%]", r5Size.lede)}>{study.intro}</p>
                    </section>

                    <section className={cx("r4-card", r5Pad)}>
                        <Halftone src={leadImage.src} alt={leadImage.alt} tone={newspaper} className="lg:aspect-[21/10]" />
                        <dl className="mt-12 grid gap-x-10 gap-y-10 md:mt-16 md:grid-cols-3 xl:gap-x-14">
                            {study.metrics.map((m) => (
                                <div key={m.value} className="border-t-2 border-[var(--ex-ink)] pt-5 md:pt-6">
                                    <dt className="r3-fig font-display text-[clamp(1.85rem,2.75vw,3rem)] leading-[1.04] font-black tracking-[-0.025em] text-balance tabular-nums">
                                        {m.value}
                                    </dt>
                                    <dd className={cx("r3-muted mt-3 text-pretty", r5Size.body, "md:text-xl md:leading-7")}>{m.label}</dd>
                                </div>
                            ))}
                        </dl>
                    </section>

                    <Split label="At a glance">
                        <dl className="grid gap-x-16 gap-y-10 md:grid-cols-2 xl:gap-x-24">
                            {study.summary.rows.map((row) => (
                                <div key={row.label}>
                                    <dt className={cx("font-display", display, r5Size.title)}>{row.label}</dt>
                                    <dd className={cx("r3-muted mt-2", prose, r5Size.body)}>{row.text}</dd>
                                </div>
                            ))}
                        </dl>
                    </Split>

                    {study.sections.map((section) => (
                        <Split key={section.label} label={plainLabel(section.label)}>
                            <h3 className={cx("max-w-[22ch] font-display text-balance", display, r5Size.large)}>{section.title}</h3>
                            <div className={cx("r3-muted mt-10 flex flex-col gap-5", r5Size.body)}>
                                {section.blocks
                                    .filter((b) => !(b.type === "image" && b.src === leadImage.src))
                                    .map((block, i) => (
                                        <BlockView key={i} block={block} />
                                    ))}
                            </div>
                        </Split>
                    ))}

                    <Split label="My role">
                        <p className={cx("max-w-[22ch] font-display text-balance", display, r5Size.large)}>{study.role.func}</p>
                        <p className={cx("r3-muted mt-4", r5Size.body)}>Official title: {study.role.official}</p>
                        <div className={cx("r3-muted mt-10", r5Size.body)}>
                            <List items={study.role.bullets} />
                        </div>
                        <dl className="mt-14 grid gap-x-16 gap-y-10 md:grid-cols-2 xl:gap-x-24">
                            {[
                                { label: "Collaborators", items: study.collaborators },
                                { label: "Methods", items: study.methods },
                            ].map((group) => (
                                <div key={group.label}>
                                    <dt className={cx("font-display", display, r5Size.title)}>{group.label}</dt>
                                    <dd className={cx("r3-muted mt-2", prose, r5Size.body)}>{group.items.join(", ")}</dd>
                                </div>
                            ))}
                        </dl>
                    </Split>

                    <Split label="Next case study">
                        <p className={cx("max-w-[22ch] font-display text-balance", display, r5Size.large)}>{study.next.title}</p>
                        <p className={cx("mt-6", prose, r5Size.deck, r5Proof)}>
                            <Figure text={next.summary.statSentence ?? next.summary.lead} value={next.summary.stat.value} />
                        </p>
                        <div className="mt-10">
                            <Button
                                href={`/${next.slug}`}
                                size="lg"
                                className="r3-btn font-display"
                                iconTrailing={<ArrowRight data-icon aria-hidden="true" />}
                            >
                                Read the case study
                            </Button>
                        </div>
                    </Split>
                </main>

                <R5Footer display={display} caps />
            </div>
        </div>
    );
}
