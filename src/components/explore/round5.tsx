import { ArrowRight, LinkExternal01 } from "@untitledui/icons";
import Image from "next/image";
import { Button } from "@/components/base/buttons/button";
import { Halftone, type HalftoneTone } from "@/components/explore/halftone";
import { R5Footer, R5Header } from "@/components/explore/r5-chrome";
import { mail, projects } from "@/components/explore/round2";
import { ExploreBar } from "@/components/explore/shared";
import { type CaseSummary, about, building, featuredCase, hero, moreCases } from "@/content/site";
import { cx } from "@/utils/cx";

/**
 * Round five. Directions 21 to 25 keep the flush card layout from round four with three changes:
 * the earlier, fuller copy from site.ts is back, corners are small, and every card starts its text at the top.
 * Palette, body typeface and weight, lead layout, and how many rows the smaller cases show change per direction.
 */
export type RoundFiveProps = {
    n: number;
    fonts: string;
    /** Weight and tracking for display type. */
    display: string;
    grid: "even" | "offset";
    lead: "side" | "top";
    /** Rows on the two smaller case cards. The lead case always shows all four. "three" adds My role and drops the lead line. */
    rows: "two" | "three" | "four";
    /** Set body copy in a heavier weight. */
    boldBody?: boolean;
    /** Classes for an all-caps hero headline. Replaces the default hero size. */
    heroCaps?: string;
    /** Set the three footer links in caps too. */
    capsClose?: boolean;
    /** Render every photo as a black and white halftone. */
    tone?: HalftoneTone;
    /** Path prefix for case study links, for example "/explore/31". */
    casePath?: string;
    /** Put the two smaller cases ahead of the build cards, and link to the build cards from the Work intro. */
    casesFirst?: boolean;
    /** Set each smaller case stat as a full sentence with the figure inline. */
    inlineStat?: boolean;
};

type Project = (typeof building.projects)[number];
type Row = { label: string; text: string };

const work = {
    heading: "Product decisions, with the evidence behind them.",
    body: "Three AI initiatives from Capital Group, and two products I'm building myself in 2026.",
};

/** Five sizes for the whole page: hero, large, medium, title, body. */
const size = {
    hero: "text-[clamp(2.75rem,6.1vw,6.5rem)] leading-[0.98]",
    large: "text-[clamp(2.25rem,4.4vw,4.5rem)] leading-[1.02]",
    medium: "text-[clamp(1.75rem,2.5vw,2.5rem)] leading-[1.1]",
    title: "text-xl leading-7 md:text-2xl md:leading-8",
    body: "text-lg leading-8",
};

const pad = "px-6 py-14 md:px-14 md:py-20 xl:px-20 xl:py-24";

/** "300+" inside a sentence takes the figure color, so the figure and its context stay one thought. */
const Figure = ({ text, value }: { text: string; value: string }) => {
    const at = text.indexOf(value);
    if (at < 0) return <>{text}</>;
    return (
        <>
            {text.slice(0, at)}
            <span className="r3-fig tabular-nums">{value}</span>
            {text.slice(at + value.length)}
        </>
    );
};

const Photo = ({ image, sizes, className, tone }: { image: CaseSummary["image"]; sizes: string; className?: string; tone?: HalftoneTone }) =>
    tone ? (
        <Halftone src={image.src} alt={image.alt} tone={tone} className={className} />
    ) : (
        <div className={cx("r4-photo relative aspect-video w-full overflow-hidden", className)}>
            <Image src={image.src} alt={image.alt} fill loading="eager" sizes={sizes} className="object-cover" />
        </div>
    );

const ReadButton = ({ href }: { href: string }) => (
    <Button href={href} size="lg" className="r3-btn font-display" iconTrailing={<ArrowRight data-icon aria-hidden="true" />}>
        Read the case study
    </Button>
);

/** Labels sit one clear step above the body size. */
const Rows = ({ rows, display, className }: { rows: Row[]; display: string; className?: string }) => (
    <dl className={className}>
        {rows.map((row) => (
            <div key={row.label}>
                <dt className={cx("font-display", display, size.title)}>{row.label}</dt>
                <dd className={cx("r3-muted mt-2 max-w-[38rem]", size.body)}>{row.text}</dd>
            </div>
        ))}
    </dl>
);

const CaseCard = ({
    item,
    rows,
    display,
    className,
    tone,
    casePath,
    hideLead,
    inlineStat,
}: {
    item: CaseSummary;
    rows: Row[];
    display: string;
    className?: string;
    tone?: HalftoneTone;
    casePath: string;
    hideLead?: boolean;
    inlineStat?: boolean;
}) => (
    <article className={cx("r4-card flex flex-col", pad, className)}>
        <Photo image={item.image} sizes="(min-width: 1024px) 50vw, 100vw" tone={tone} />
        <h3 className={cx("mt-12 font-display", display, size.title)}>{item.title}</h3>
        <p className={cx("mt-4 font-display text-balance", inlineStat ? "max-w-[34ch]" : "max-w-[24ch]", display, size.medium)}>
            {inlineStat ? (
                <Figure text={item.statSentence ?? `${item.stat.value} ${item.stat.label}`} value={item.stat.value} />
            ) : (
                <>
                    <span className="r3-fig tabular-nums">{item.stat.value}</span> {item.stat.label}
                </>
            )}
        </p>
        {!hideLead && <p className={cx("r3-muted mt-5 max-w-[38rem]", size.body)}>{item.lead}</p>}
        <Rows rows={rows} display={display} className="mt-12 flex flex-col gap-8" />
        <div className="mt-auto pt-12">
            <ReadButton href={`${casePath}/${item.slug}`} />
        </div>
    </article>
);

const BuildCard = ({ project, display, className, id }: { project: Project; display: string; className?: string; id?: string }) => (
    <article id={id} className={cx("r4-card r4-build flex flex-col", id && "scroll-mt-20", pad, className)}>
        <h3 className={cx("r3-fig font-display", display, size.large)}>{project.name}</h3>
        <p className={cx("mt-4 font-display", display, size.title)}>{project.status}</p>
        <p className={cx("r3-muted mt-5 max-w-[38rem]", size.body)}>{project.what}</p>
        <Rows
            rows={[
                { label: "Why I built it", text: project.why },
                { label: "Where it's headed", text: project.next },
            ]}
            display={display}
            className="mt-12 flex flex-col gap-8"
        />
        <div className="mt-auto flex flex-wrap gap-3 pt-12">
            {project.links.map((link, i) => (
                <Button
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="lg"
                    color={i === 0 ? "primary" : "secondary"}
                    className={cx("font-display", i === 0 && "r3-btn")}
                    iconTrailing={<LinkExternal01 data-icon aria-hidden="true" />}
                >
                    {link.label}
                </Button>
            ))}
        </div>
    </article>
);

export const RoundFive = ({ n, fonts, display, grid, lead, rows, boldBody, heroCaps, capsClose, tone, casePath = "", casesFirst, inlineStat }: RoundFiveProps) => {
    const spans =
        grid === "offset"
            ? ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"]
            : ["lg:col-span-6", "lg:col-span-6", "lg:col-span-6", "lg:col-span-6"];
    const item = featuredCase;
    const keep: Record<RoundFiveProps["rows"], string[] | null> = {
        two: ["What I decided", "Outcome"],
        three: ["My role", "What I decided", "Outcome"],
        four: null,
    };
    const pick = (all: Row[]) => {
        const labels = keep[rows];
        return labels ? all.filter((r) => labels.includes(r.label)) : all;
    };
    const caseOffset = casesFirst ? 0 : 2;
    const buildOffset = casesFirst ? 2 : 0;

    const caseCards = moreCases.map((c, i) => (
        <CaseCard
            key={c.slug}
            casePath={casePath}
            item={c}
            rows={pick(c.rows)}
            display={display}
            className={spans[i + caseOffset]}
            tone={tone}
            hideLead={rows === "three"}
            inlineStat={inlineStat}
        />
    ));

    const leadText = (
        <>
            <h3 className={cx("font-display", display, size.title)}>{item.title}</h3>
            <p className={cx("mt-5 max-w-[20ch] font-display text-balance", display, size.large)}>
                <Figure text={item.lead} value={item.stat.value} />
            </p>
        </>
    );

    return (
        <div id="top" className={cx("ex r4 r5 min-h-svh", `ex-${n}`, fonts, boldBody && "r5-bold")}>
            <ExploreBar n={n} />
            <div className="r4-stack flex flex-col">
                <R5Header display={display} home="" />

                <main className="r4-stack flex flex-col">
                    <section className={cx("r4-card r4-hero flex min-h-[calc(100svh-7.25rem)] flex-col", pad, "md:py-16 xl:py-20")}>
                        <h1
                            className={cx(
                                "font-display text-balance",
                                heroCaps ? cx("uppercase", heroCaps) : cx("max-w-[78%] max-lg:max-w-none", display, size.hero),
                            )}
                        >
                            {hero.headline}
                        </h1>
                        <div className="mt-auto pt-16 lg:ml-auto lg:w-[46%]">
                            <p className={cx("r4-hero-copy", size.body, "md:text-xl md:leading-8")}>{hero.supporting}</p>
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Button href="#work" size="lg" className="r3-btn font-display">
                                    See the work
                                </Button>
                                <Button href={mail} size="lg" color="secondary" className="font-display">
                                    Get in touch
                                </Button>
                            </div>
                        </div>
                    </section>

                    <section id="work" className="r4-stack flex scroll-mt-20 flex-col">
                        <div className={cx("r4-card", pad)}>
                            <h2 className={cx("max-w-[20ch] font-display text-balance", display, size.large)}>{work.heading}</h2>
                            <p className={cx("r3-muted mt-6", size.body, "md:text-xl md:leading-8")}>
                                {casesFirst ? (
                                    <>
                                        Three AI initiatives from Capital Group, and{" "}
                                        <a
                                            href="#building"
                                            className="rounded-xs text-current underline decoration-1 underline-offset-[0.18em] transition-[text-decoration-thickness] outline-focus-ring hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
                                        >
                                            two products I am building end to end in 2026
                                        </a>
                                        .
                                    </>
                                ) : (
                                    work.body
                                )}
                            </p>
                        </div>

                        <article className={cx("r4-card r4-lead", pad)}>
                            {lead === "side" ? (
                                <div className="grid items-start gap-x-16 gap-y-12 lg:grid-cols-12 xl:gap-x-24">
                                    <div className="lg:col-span-6">{leadText}</div>
                                    <Photo
                                        image={item.image}
                                        sizes="(min-width: 1024px) 50vw, 100vw"
                                        className="max-lg:order-first lg:col-span-6"
                                        tone={tone}
                                    />
                                </div>
                            ) : (
                                <>
                                    <Photo image={item.image} sizes="100vw" className="lg:aspect-[21/9]" tone={tone} />
                                    <div className="mt-12 md:mt-16">{leadText}</div>
                                </>
                            )}
                            <Rows rows={item.rows} display={display} className="mt-16 grid gap-x-16 gap-y-10 md:grid-cols-2 xl:gap-x-24" />
                            <div className="mt-12">
                                <ReadButton href={`${casePath}/${item.slug}`} />
                            </div>
                        </article>

                        <div className="r4-stack grid lg:grid-cols-12">
                            {casesFirst && caseCards}
                            {projects.map((project, i) => (
                                <BuildCard
                                    key={project.name}
                                    id={casesFirst && i === 0 ? "building" : undefined}
                                    project={project}
                                    display={display}
                                    className={spans[i + buildOffset]}
                                />
                            ))}
                            {!casesFirst && caseCards}
                        </div>
                    </section>

                    <section id="about" className={cx("r4-card scroll-mt-20", pad)}>
                        <div className="mx-auto max-w-[54rem]">
                            <Photo image={about.photo} sizes="(min-width: 1024px) 864px, 100vw" className="aspect-[3/2]" />
                            <h2 className={cx("mt-14 font-display md:mt-20", display, size.large)}>Connecting the dots.</h2>
                            <div className={cx("r3-muted mt-8 flex flex-col gap-6", size.body, "md:text-xl md:leading-8")}>
                                <p>{about.paragraphs[0]}</p>
                                <p>{building.intro}</p>
                                {about.paragraphs.slice(1).map((p) => (
                                    <p key={p.slice(0, 24)}>{p}</p>
                                ))}
                                <p>
                                    {about.dubplate.before}
                                    {about.dubplate.name}
                                    {about.dubplate.after}
                                </p>
                            </div>
                            <div className="mt-10">
                                <Button
                                    href={about.dubplate.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    size="lg"
                                    className="r3-btn font-display"
                                    iconTrailing={<LinkExternal01 data-icon aria-hidden="true" />}
                                >
                                    Try Dubplate
                                </Button>
                            </div>
                        </div>
                    </section>
                </main>

                <R5Footer display={display} caps={capsClose} />
            </div>
        </div>
    );
};
