import { ArrowRight, LinkExternal01 } from "@untitledui/icons";
import Image from "next/image";
import { Button } from "@/components/base/buttons/button";
import { Actions, mail, projects } from "@/components/explore/round2";
import { ExploreBar, contactCopy } from "@/components/explore/shared";
import { type CaseSummary, about, building, contact, featuredCase, hero, moreCases } from "@/content/site";
import { cx } from "@/utils/cx";

/**
 * Round three. One structure for directions 11 to 15: split hero, Prep Me as the lead story,
 * a grid of four (two builds, two cases), About, and a full-height close.
 * Palette, type, corner radius, grid layout, and footer style change per direction.
 */
export type RoundThreeProps = {
    n: number;
    fonts: string;
    /** Weight and tracking for display type. */
    display: string;
    hero: "split" | "stack";
    /** Put the hero inside a color block. */
    heroBox?: boolean;
    grid: "rows" | "bento" | "offset";
    footer: "links" | "title";
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

const projectRows = (p: Project): Row[] => [
    { label: "Why I built it", text: p.why },
    { label: "Where it's headed", text: p.next },
];

const Rows = ({ rows, display, className }: { rows: Row[]; display: string; className?: string }) => (
    <dl className={className}>
        {rows.map((row) => (
            <div key={row.label}>
                <dt className={cx("font-display text-lg", display)}>{row.label}</dt>
                <dd className="r3-muted mt-2 text-md leading-7 md:text-lg md:leading-8">{row.text}</dd>
            </div>
        ))}
    </dl>
);

/** The label sits directly under its figure, in the display face, so it never floats on its own. */
const Stat = ({ stat, display, size }: { stat: CaseSummary["stat"]; display: string; size: string }) => (
    <p>
        <span className={cx("r3-fig block font-display leading-[0.82] tabular-nums", display, size)}>{stat.value}</span>
        <span className={cx("mt-4 block max-w-[30ch] font-display text-xl leading-6 md:text-2xl md:leading-7", display)}>{stat.label}</span>
    </p>
);

const ReadButton = ({ slug }: { slug: string }) => (
    <Button href={`/${slug}`} size="lg" className="r3-btn" iconTrailing={<ArrowRight data-icon aria-hidden="true" />}>
        Read the case study
    </Button>
);

const ProjectLinks = ({ project }: { project: Project }) => (
    <div className="flex flex-wrap gap-3">
        {project.links.map((link, i) => (
            <Button
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                color={i === 0 ? "primary" : "secondary"}
                className={i === 0 ? "r3-btn" : undefined}
                iconTrailing={<LinkExternal01 data-icon aria-hidden="true" />}
            >
                {link.label}
            </Button>
        ))}
    </div>
);

const cardPad = "p-7 md:p-12";
const cardFig = "text-[clamp(4.5rem,8vw,7.5rem)]";
const cardName = "text-[clamp(3rem,5.6vw,5.25rem)] leading-[0.95]";

const CaseHead = ({ item, display }: { item: CaseSummary; display: string }) => (
    <>
        <Stat stat={item.stat} display={display} size={cardFig} />
        <h3 className={cx("mt-10 font-display text-display-sm leading-[1.12] md:text-display-md md:leading-[1.1]", display)}>{item.title}</h3>
        <p className="mt-2 text-lg font-semibold">Capital Group</p>
        <p className="r3-muted mt-5 text-xl leading-8">{item.lead}</p>
    </>
);

const ProjectHead = ({ project, display }: { project: Project; display: string }) => (
    <>
        <h3 className={cx("r3-fig font-display", display, cardName)}>{project.name}</h3>
        <p className="mt-3 text-lg font-semibold">{project.status}</p>
        <p className="r3-muted mt-5 text-xl leading-8">{project.what}</p>
    </>
);

/** Tall card for the two by two and offset grids. */
const TallCard = ({ children, rows, action, display, className }: { children: React.ReactNode; rows: Row[]; action: React.ReactNode; display: string; className?: string }) => (
    <article className={cx("r3-box r3-box-card flex flex-col", cardPad, className)}>
        {children}
        <Rows rows={rows} display={display} className="mt-12 flex flex-col gap-8" />
        <div className="mt-auto pt-12">{action}</div>
    </article>
);

/** Full-width card for the stacked layout: summary on the left, detail on the right. */
const WideCard = ({ children, rows, action, display }: { children: React.ReactNode; rows: Row[]; action: React.ReactNode; display: string }) => (
    <article className={cx("r3-box r3-box-card grid gap-x-16 gap-y-12 lg:grid-cols-12", cardPad)}>
        <div className="flex flex-col lg:col-span-5">
            {children}
            <div className="mt-auto pt-10">{action}</div>
        </div>
        <Rows rows={rows} display={display} className="grid content-start gap-x-12 gap-y-10 sm:grid-cols-2 lg:col-span-7" />
    </article>
);

export const RoundThree = ({ n, fonts, display, hero: heroLayout, heroBox, grid, footer }: RoundThreeProps) => {
    const Card = grid === "rows" ? WideCard : TallCard;
    const spans = grid === "offset" ? ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"] : ["lg:col-span-6", "lg:col-span-6", "lg:col-span-6", "lg:col-span-6"];
    const page = "mx-auto w-full max-w-[100rem] px-3 md:px-5";
    const inset = "px-4 md:px-10";

    const heroButtons = (
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="#work" size="lg" className={heroBox ? "r3-btn" : undefined}>
                See the work
            </Button>
            <Button href={mail} size="lg" color="secondary">
                Get in touch
            </Button>
        </div>
    );
    const headline = "font-display leading-[0.98]";

    return (
        <div id="top" className={cx("ex min-h-svh", `ex-${n}`, fonts)}>
            <ExploreBar n={n} />
            <header className="sticky top-0 z-30 bg-primary">
                <div className={cx(page, "flex h-16 items-center justify-between gap-4 md:h-18")}>
                    <a href="#top" className={cx("rounded-md font-display text-md text-primary outline-focus-ring focus-visible:outline-2 md:text-lg", inset, display)}>
                        Maicol Parker-Chavez
                    </a>
                    <div className={cx("flex items-center gap-7", inset)}>
                        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="rounded-sm text-md font-medium text-secondary outline-focus-ring transition duration-100 ease-linear hover:text-primary focus-visible:outline-2"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                        <Button href={mail} size="md">
                            Get in touch
                        </Button>
                    </div>
                </div>
            </header>
            <main className={cx(page, "flex flex-col pb-3 md:pb-5")}>
                {/* Hero: headline on the left, supporting copy and actions on the right */}
                <section
                    className={cx(
                        "flex min-h-[calc(100svh-7.5rem)] flex-col",
                        heroBox ? "r3-box r3-box-close px-5 py-12 md:px-12 md:py-16" : cx(inset, "py-12 md:py-20"),
                    )}
                >
                    {heroLayout === "split" ? (
                        <div className="grid flex-1 gap-x-16 gap-y-12 lg:grid-cols-12">
                            <h1 className={cx(headline, display, "text-[clamp(2.75rem,6.3vw,6.5rem)] lg:col-span-7")}>{hero.headline}</h1>
                            <div className="lg:col-span-5 lg:self-end">
                                <p className={cx("text-xl leading-8 md:text-[1.375rem] md:leading-9", heroBox ? "r3-muted" : "text-secondary")}>{hero.supporting}</p>
                                {heroButtons}
                            </div>
                        </div>
                    ) : (
                        <>
                            <h1 className={cx(headline, display, "max-w-[17ch] text-[clamp(2.75rem,7.6vw,7.75rem)]")}>{hero.headline}</h1>
                            <div className="mt-14 grid gap-10 md:mt-auto md:pt-20 lg:grid-cols-12">
                                <div className="lg:col-span-6 lg:col-start-7">
                                    <p className={cx("text-xl leading-8 md:text-[1.375rem] md:leading-9", heroBox ? "r3-muted" : "text-secondary")}>{hero.supporting}</p>
                                    {heroButtons}
                                </div>
                            </div>
                        </>
                    )}
                </section>

                {/* Work: one section. Lead story, then four entries. */}
                <section id="work" className="scroll-mt-20">
                    <div className={cx(inset, "grid gap-6 py-20 md:py-32 lg:grid-cols-12")}>
                        <h2 className={cx("font-display text-display-md leading-[1.05] text-primary md:text-display-xl md:leading-[1.02] lg:col-span-8", display)}>{work.heading}</h2>
                        <p className="text-xl leading-8 text-secondary lg:col-span-4 lg:pt-3">{work.body}</p>
                    </div>

                    <div className="flex flex-col gap-3 md:gap-5">
                        <article className="r3-box r3-box-lead px-7 py-12 md:px-12 md:py-20">
                            <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12 lg:items-end">
                                <div className="lg:col-span-7">
                                    <Stat stat={featuredCase.stat} display={display} size="text-[clamp(7rem,17vw,16rem)]" />
                                    <h3 className={cx("mt-12 font-display text-display-lg leading-[1.05] md:text-display-2xl md:leading-[1]", display)}>{featuredCase.title}</h3>
                                    <p className="mt-3 text-lg font-semibold">Capital Group</p>
                                    <p className="r3-muted mt-6 max-w-2xl text-xl leading-8 md:text-2xl md:leading-9">{featuredCase.lead}</p>
                                </div>
                                <div className="relative aspect-[4/3] overflow-hidden bg-white/10 lg:col-span-5" style={{ borderRadius: "calc(var(--r3-radius) * 0.6)" }}>
                                    <Image src={featuredCase.image.src} alt={featuredCase.image.alt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
                                </div>
                            </div>
                            <Rows rows={featuredCase.rows} display={display} className="mt-16 grid gap-x-16 gap-y-12 md:mt-24 md:grid-cols-2" />
                            <div className="mt-14">
                                <ReadButton slug={featuredCase.slug} />
                            </div>
                        </article>

                        <div className={cx("grid gap-3 md:gap-5", grid !== "rows" && "lg:grid-cols-12")}>
                            {projects.map((project, i) => (
                                <Card key={project.name} rows={projectRows(project)} action={<ProjectLinks project={project} />} display={display} className={spans[i]}>
                                    <ProjectHead project={project} display={display} />
                                </Card>
                            ))}
                            {moreCases.map((item, i) => (
                                <Card key={item.slug} rows={item.rows} action={<ReadButton slug={item.slug} />} display={display} className={spans[i + 2]}>
                                    <CaseHead item={item} display={display} />
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About */}
                <section id="about" className={cx(inset, "scroll-mt-20 py-24 md:py-40")}>
                    <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
                        <div className="lg:col-span-6">
                            <div className="relative aspect-[4/3] overflow-hidden bg-tertiary" style={{ borderRadius: "var(--r3-radius)" }}>
                                <Image src={about.photo.src} alt={about.photo.alt} fill sizes="(min-width: 1024px) 720px, 100vw" className="object-cover object-left" />
                            </div>
                        </div>
                        <div className="lg:col-span-6">
                            <h2 className={cx("font-display text-display-lg leading-[1.02] text-primary md:text-display-2xl", display)}>Connecting the dots.</h2>
                            <div className="mt-8 flex flex-col gap-6 text-lg leading-8 text-secondary">
                                <p>{about.paragraphs[0]}</p>
                                <p>{building.intro}</p>
                                {about.paragraphs.slice(1).map((p) => (
                                    <p key={p.slice(0, 24)}>{p}</p>
                                ))}
                                <p>
                                    {about.dubplate.before}
                                    <a href={about.dubplate.href} target="_blank" rel="noopener noreferrer" className="font-bold text-primary underline decoration-2 underline-offset-4">
                                        {about.dubplate.name}
                                    </a>
                                    {about.dubplate.after}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Close */}
                <footer id="contact" className="r3-box r3-box-close flex min-h-[calc(100svh-2.5rem)] flex-col justify-between gap-16 px-5 py-12 md:px-12 md:py-16">
                    {footer === "links" ? (
                        <>
                            <div className="grid gap-6 lg:grid-cols-12">
                                <h2 className={cx("font-display text-display-sm md:text-display-md lg:col-span-5", display)}>Get in touch</h2>
                                <p className="r3-muted max-w-xl text-xl leading-8 lg:col-span-7">{contactCopy.body}</p>
                            </div>
                            <ul className={cx("flex flex-col gap-2 font-display text-[clamp(3.25rem,11.5vw,11rem)] leading-[1.02]", display)}>
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
                        </>
                    ) : (
                        <>
                            <h2 className={cx("font-display text-[clamp(3.5rem,13vw,13rem)] leading-[0.95]", display)}>Get in touch.</h2>
                            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
                                <div className="lg:col-span-7">
                                    <p className="r3-muted max-w-xl text-xl leading-8">{contactCopy.body}</p>
                                    <Actions className="mt-8 [&>*:first-child]:[background:var(--btn)] [&>*:first-child]:[color:var(--btn-fg)]" />
                                </div>
                            </div>
                        </>
                    )}
                    <p className="text-md font-medium">© 2026 Maicol Parker-Chavez</p>
                </footer>
            </main>
        </div>
    );
};
