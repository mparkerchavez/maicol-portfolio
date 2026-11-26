import { ArrowRight, LinkExternal01 } from "@untitledui/icons";
import Image from "next/image";
import { Button } from "@/components/base/buttons/button";
import { mail } from "@/components/explore/round2";
import { ExploreBar } from "@/components/explore/shared";
import { type R4Build, type R4Case, r4 } from "@/content/home-r4";
import { contact } from "@/content/site";
import { cx } from "@/utils/cx";

/**
 * Round four. Directions 16 to 20 share one structure and the approved short copy.
 * Every block is a rounded card, and the cards sit flush against each other with a hairline gap.
 * Palette, body typeface, grid widths, lead layout, and text alignment change per direction.
 */
export type RoundFourProps = {
    n: number;
    fonts: string;
    /** Weight and tracking for display type. */
    display: string;
    grid: "even" | "offset";
    lead: "side" | "top";
    align?: "left" | "center";
    /** Where the hero copy and buttons sit along the bottom edge. */
    heroCopy?: "right" | "left";
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
    body: "text-lg leading-8 md:text-xl md:leading-8",
};

const pad = "px-6 py-14 md:px-14 md:py-20 xl:px-20 xl:py-28";

/** Figure and label are one sentence in one typeface, so the thought survives on its own. */
const StatLine = ({ stat, display, className }: { stat: R4Case["stat"]; display: string; className: string }) => (
    <p className={cx("font-display text-balance", display, className)}>
        <span className="r3-fig tabular-nums">{stat.value}</span> {stat.label}
    </p>
);

const Photo = ({ image, sizes, className }: { image: R4Case["image"]; sizes: string; className?: string }) => (
    <div className={cx("r4-photo relative aspect-video w-full overflow-hidden", className)}>
        <Image src={image.src} alt={image.alt} fill loading="eager" sizes={sizes} className="object-cover" />
    </div>
);

const ReadButton = ({ slug }: { slug: string }) => (
    <Button href={`/${slug}`} size="lg" className="r3-btn font-display" iconTrailing={<ArrowRight data-icon aria-hidden="true" />}>
        Read the case study
    </Button>
);

const Lines = ({ lines, className }: { lines: string[]; className?: string }) => (
    <div className={cx("r3-muted flex flex-col gap-4", size.body, className)}>
        {lines.map((line) => (
            <p key={line.slice(0, 24)}>{line}</p>
        ))}
    </div>
);

const CaseCard = ({ item, display, center, className }: { item: R4Case; display: string; center: boolean; className?: string }) => (
    <article className={cx("r4-card r4-case flex flex-col", pad, center && "items-center text-center", className)}>
        <Photo image={item.image} sizes="(min-width: 1024px) 50vw, 100vw" />
        <h3 className={cx("mt-12 font-display md:mt-16", display, size.title)}>{item.title}</h3>
        <StatLine stat={item.stat} display={display} className={cx("mt-4 max-w-[24ch]", size.medium)} />
        <Lines lines={item.lines} className="mt-6 max-w-[34rem]" />
        <div className="mt-auto pt-10">
            <ReadButton slug={item.slug} />
        </div>
    </article>
);

const BuildCard = ({ item, display, center, className }: { item: R4Build; display: string; center: boolean; className?: string }) => (
    <article className={cx("r4-card r4-build flex min-h-[26rem] flex-col justify-end md:min-h-[34rem]", pad, center && "items-center justify-center text-center", className)}>
        <h3 className={cx("r3-fig font-display", display, size.large)}>{item.name}</h3>
        <p className={cx("r3-muted mt-6 max-w-[34rem]", size.body)}>{item.line}</p>
        <div className={cx("mt-10 flex flex-wrap gap-3", center && "justify-center")}>
            {item.links.map((link, i) => (
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

export const RoundFour = ({ n, fonts, display, grid, lead, align = "left", heroCopy = "right" }: RoundFourProps) => {
    const center = align === "center";
    const spans = grid === "offset" ? ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"] : ["lg:col-span-6", "lg:col-span-6", "lg:col-span-6", "lg:col-span-6"];
    const item = r4.lead;

    return (
        <div id="top" className={cx("ex r4 min-h-svh", `ex-${n}`, fonts)}>
            <ExploreBar n={n} />
            <div className="r4-stack flex flex-col">
                <header className="r4-card r4-head sticky top-0 z-30">
                    <div className="flex h-16 items-center justify-between gap-4 px-6 md:h-20 md:px-14 xl:px-20">
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

                <main className="r4-stack flex flex-col">
                    {/* Hero: headline at about three quarters of the width, copy and actions pinned to the bottom */}
                    <section className={cx("r4-card r4-hero flex min-h-[calc(100svh-7.75rem)] flex-col", pad, "md:py-16 xl:py-20")}>
                        <h1 className={cx("max-w-[78%] font-display text-balance max-lg:max-w-none", display, size.hero)}>{r4.hero.headline}</h1>
                        <div className={cx("mt-auto pt-16", heroCopy === "right" && "lg:ml-auto lg:w-[42%]", heroCopy === "left" && "lg:w-[46%]")}>
                            <p className={cx("r4-hero-copy", size.body, "md:text-[1.375rem] md:leading-9")}>{r4.hero.supporting}</p>
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

                    {/* Work: statement and context stacked, then the lead case, then four cards */}
                    <section id="work" className="r4-stack flex scroll-mt-20 flex-col">
                        <div className={cx("r4-card r4-intro", pad, center && "text-center")}>
                            <h2 className={cx("max-w-[20ch] font-display text-balance", display, size.large, center && "mx-auto")}>{r4.work.heading}</h2>
                            <p className={cx("r3-muted mt-6", size.body, "md:text-[1.375rem] md:leading-9")}>{r4.work.body}</p>
                        </div>

                        {lead === "side" ? (
                            <article className={cx("r4-card r4-lead grid items-center gap-x-16 gap-y-12 lg:grid-cols-12 xl:gap-x-24", pad)}>
                                <div className="lg:col-span-6">
                                    <h3 className={cx("font-display", display, size.title)}>{item.title}</h3>
                                    <StatLine stat={item.stat} display={display} className={cx("mt-5", size.large)} />
                                    <Lines lines={item.lines} className="mt-8 max-w-[34rem]" />
                                    <div className="mt-10">
                                        <ReadButton slug={item.slug} />
                                    </div>
                                </div>
                                <Photo image={item.image} sizes="(min-width: 1024px) 58vw, 100vw" className="max-lg:order-first lg:col-span-6" />
                            </article>
                        ) : (
                            <article className={cx("r4-card r4-lead flex flex-col", pad, center && "items-center text-center")}>
                                <Photo image={item.image} sizes="(min-width: 1280px) 1100px, 100vw" className={center ? "mx-auto max-w-[72rem]" : undefined} />
                                <h3 className={cx("mt-14 font-display md:mt-20", display, size.title)}>{item.title}</h3>
                                <StatLine stat={item.stat} display={display} className={cx("mt-5 max-w-[22ch]", size.large)} />
                                <Lines lines={item.lines} className="mt-8 max-w-[40rem]" />
                                <div className="mt-10">
                                    <ReadButton slug={item.slug} />
                                </div>
                            </article>
                        )}

                        <div className="r4-stack grid lg:grid-cols-12">
                            {r4.builds.map((build, i) => (
                                <BuildCard key={build.name} item={build} display={display} center={center} className={spans[i]} />
                            ))}
                            {r4.cases.map((c, i) => (
                                <CaseCard key={c.slug} item={c} display={display} center={center} className={spans[i + 2]} />
                            ))}
                        </div>
                    </section>

                    {/* About: one centered column, photo first */}
                    <section id="about" className={cx("r4-card r4-about scroll-mt-20", pad)}>
                        <div className="mx-auto max-w-[54rem]">
                            <Photo image={r4.about.photo} sizes="(min-width: 1024px) 864px, 100vw" className="aspect-[3/2]" />
                            <h2 className={cx("mt-14 font-display md:mt-20", display, size.large)}>{r4.about.heading}</h2>
                            <div className={cx("r3-muted mt-8 flex flex-col gap-6", size.body)}>
                                {r4.about.paragraphs.map((p) => (
                                    <p key={p.slice(0, 24)}>{p}</p>
                                ))}
                            </div>
                            <div className="mt-10">
                                <Button
                                    href={r4.about.dubplate.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    size="lg"
                                    className="r3-btn font-display"
                                    iconTrailing={<LinkExternal01 data-icon aria-hidden="true" />}
                                >
                                    {r4.about.dubplate.label}
                                </Button>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Close: heading sits directly on top of the three links */}
                <footer id="contact" className={cx("r4-card r4-close flex min-h-[calc(100svh-5rem)] flex-col justify-end", pad, "md:py-14 xl:py-16")}>
                    <h2 className={cx("font-display", display, size.medium)}>{r4.footer.heading}</h2>
                    <ul className={cx("mt-4 flex flex-col font-display text-[clamp(3.25rem,11.5vw,11rem)] leading-[1.04]", display)}>
                        {[
                            { label: "Email", href: mail },
                            { label: "Resume", href: contact.resume, blank: true },
                            { label: "LinkedIn", href: contact.linkedin, blank: true },
                        ].map((l) => (
                            <li key={l.label}>
                                <a href={l.href} {...(l.blank ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="r3-biglink rounded-sm outline-focus-ring focus-visible:outline-2">
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-12 font-display text-md font-medium md:mt-16">{r4.footer.legal}</p>
                </footer>
            </div>
        </div>
    );
};
