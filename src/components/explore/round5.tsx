import { ArrowRight, LinkExternal01 } from "@untitledui/icons";
import Image from "next/image";
import { Button } from "@/components/base/buttons/button";
import { Halftone, type HalftoneTone } from "@/components/explore/halftone";
import { mail, projects } from "@/components/explore/round2";
import { ExploreBar } from "@/components/explore/shared";
import { type CaseSummary, about, building, contact, featuredCase, hero, moreCases } from "@/content/site";
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
    /** Rows on the two smaller case cards. The lead case always shows all four. */
    rows: "two" | "four";
    /** Set body copy in a heavier weight. */
    boldBody?: boolean;
    /** Classes for an all-caps hero headline. Replaces the default hero size. */
    heroCaps?: string;
    /** Set the three footer links in caps too. */
    capsClose?: boolean;
    /** Render every photo as a black and white halftone. */
    tone?: HalftoneTone;
};

type Project = (typeof building.projects)[number];
type Row = { label: string; text: string };

const work = {
    heading: "Product decisions, with the evidence behind them.",
    body: "Three AI initiatives from Capital Group, and two products I'm building myself in 2026.",
};

const navItems = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
];

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

const ReadButton = ({ slug }: { slug: string }) => (
    <Button href={`/${slug}`} size="lg" className="r3-btn font-display" iconTrailing={<ArrowRight data-icon aria-hidden="true" />}>
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

const CaseCard = ({ item, rows, display, className, tone }: { item: CaseSummary; rows: Row[]; display: string; className?: string; tone?: HalftoneTone }) => (
    <article className={cx("r4-card flex flex-col", pad, className)}>
        <Photo image={item.image} sizes="(min-width: 1024px) 50vw, 100vw" tone={tone} />
        <h3 className={cx("mt-12 font-display", display, size.title)}>{item.title}</h3>
        <p className={cx("mt-4 max-w-[24ch] font-display text-balance", display, size.medium)}>
            <span className="r3-fig tabular-nums">{item.stat.value}</span> {item.stat.label}
        </p>
        <p className={cx("r3-muted mt-5 max-w-[38rem]", size.body)}>{item.lead}</p>
        <Rows rows={rows} display={display} className="mt-12 flex flex-col gap-8" />
        <div className="mt-auto pt-12">
            <ReadButton slug={item.slug} />
        </div>
    </article>
);

const BuildCard = ({ project, display, className }: { project: Project; display: string; className?: string }) => (
    <article className={cx("r4-card r4-build flex flex-col", pad, className)}>
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

export const RoundFive = ({ n, fonts, display, grid, lead, rows, boldBody, heroCaps, capsClose, tone }: RoundFiveProps) => {
    const spans =
        grid === "offset"
            ? ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"]
            : ["lg:col-span-6", "lg:col-span-6", "lg:col-span-6", "lg:col-span-6"];
    const item = featuredCase;
    const pick = (all: Row[]) => (rows === "four" ? all : all.filter((r) => r.label === "What I decided" || r.label === "Outcome"));

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
                <div className="r5-headwrap sticky top-0 z-30">
                    <header className="r4-card r5-head">
                        <div className="flex h-16 items-center justify-between gap-4 px-6 md:h-18 md:px-14 xl:px-20">
                            <a href="#top" className={cx("rounded-md font-display text-md outline-focus-ring focus-visible:outline-2 md:text-lg", display)}>
                                Maicol Parker-Chavez
                            </a>
                            <div className="flex items-center gap-7">
                                <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
                                    {navItems.map((link) => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            className="r4-nav rounded-sm font-display text-md font-medium outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </nav>
                                <Button href={mail} size="md" className="r3-btn font-display">
                                    Get in touch
                                </Button>
                            </div>
                        </div>
                    </header>
                </div>

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
                            <p className={cx("r3-muted mt-6", size.body, "md:text-xl md:leading-8")}>{work.body}</p>
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
                                <ReadButton slug={item.slug} />
                            </div>
                        </article>

                        <div className="r4-stack grid lg:grid-cols-12">
                            {projects.map((project, i) => (
                                <BuildCard key={project.name} project={project} display={display} className={spans[i]} />
                            ))}
                            {moreCases.map((c, i) => (
                                <CaseCard key={c.slug} item={c} rows={pick(c.rows)} display={display} className={spans[i + 2]} tone={tone} />
                            ))}
                        </div>
                    </section>

                    <section id="about" className={cx("r4-card scroll-mt-20", pad)}>
                        <div className="mx-auto max-w-[54rem]">
                            <Photo image={about.photo} sizes="(min-width: 1024px) 864px, 100vw" className="aspect-[3/2]" tone={tone} />
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

                <footer id="contact" className={cx("r4-card r4-close flex min-h-[calc(100svh-4.5rem)] flex-col justify-end", pad, "md:py-14 xl:py-16")}>
                    <h2 className={cx("font-display", display, size.medium)}>Get in touch</h2>
                    <ul className={cx("mt-4 flex flex-col font-display text-[clamp(3.25rem,11.5vw,11rem)] leading-[1.04]", display, capsClose && "uppercase")}>
                        {[
                            { label: "Email", href: mail },
                            { label: "Resume", href: contact.resume, blank: true },
                            { label: "LinkedIn", href: contact.linkedin, blank: true },
                        ].map((l) => (
                            <li key={l.label}>
                                <a
                                    href={l.href}
                                    {...(l.blank ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                    className="r3-biglink rounded-sm outline-focus-ring focus-visible:outline-2"
                                >
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-12 font-display text-md font-medium md:mt-16">© 2026 Maicol Parker-Chavez</p>
                </footer>
            </div>
        </div>
    );
};
