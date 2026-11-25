import { ArrowRight, LinkExternal01 } from "@untitledui/icons";
import Image from "next/image";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ContactActions, ExHeader, ExploreBar, contactCopy, exMetadata } from "@/components/explore/shared";
import { SlideCounter } from "@/components/explore/slide-counter";
import { type CaseSummary, about, building, contact, featuredCase, hero, moreCases } from "@/content/site";
import { cx } from "@/utils/cx";
import { ex5Font } from "../fonts";

export const metadata = exMetadata("The readout");

/** One idea per slide. Full viewport on desktop, natural height on small screens. */
const Slide = ({ id, children, className, label }: { id?: string; children: React.ReactNode; className?: string; label: string }) => (
    <section id={id} aria-label={label} data-slide="" className={cx("ex5-slide scroll-mt-16 md:scroll-mt-18", className)}>
        <div className="mx-auto flex w-full max-w-container flex-col justify-center px-4 py-16 md:px-8 md:py-20">{children}</div>
    </section>
);

const display = "font-bold tracking-[-0.03em] text-primary";
const wide = { fontVariationSettings: '"opsz" 96, "wdth" 100' };

const Rows = ({ rows, large }: { rows: CaseSummary["rows"]; large?: boolean }) => (
    <dl className={cx("grid gap-x-12 gap-y-8 md:grid-cols-2", large && "lg:gap-y-12")}>
        {rows.map((row) => (
            <div key={row.label} className="border-l-2 border-brand pl-5">
                <dt className={cx("font-semibold text-brand-secondary", large ? "text-md" : "text-sm")}>{row.label}</dt>
                <dd className={cx("mt-2 text-secondary", large ? "text-lg md:text-xl" : "text-md")}>{row.text}</dd>
            </div>
        ))}
    </dl>
);

const ReadButton = ({ slug }: { slug: string }) => (
    <Button href={`/${slug}`} size="lg" color="secondary" iconTrailing={<ArrowRight data-icon aria-hidden="true" />}>
        Read the case study
    </Button>
);

const Figure = ({ value, label }: { value: string; label: string }) => (
    <p className="flex flex-col gap-2">
        <span className="ex5-figure text-[clamp(3.5rem,7vw,6.5rem)] leading-none font-bold tracking-[-0.04em] tabular-nums" style={wide}>
            {value}
        </span>
        <span className="max-w-xs text-lg text-tertiary">{label}</span>
    </p>
);

const SupportingCase = ({ item }: { item: CaseSummary }) => (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col gap-6">
            <p className="text-md font-semibold text-tertiary">{item.eyebrow}</p>
            <h3 className={cx(display, "text-display-sm md:text-display-md")} style={wide}>
                {item.title}
            </h3>
            <p className="text-lg text-tertiary">{item.lead}</p>
            <Figure value={item.stat.value} label={item.stat.label} />
        </div>
        <div className="flex flex-col gap-10 lg:pt-2">
            <Rows rows={item.rows} />
            <div>
                <ReadButton slug={item.slug} />
            </div>
        </div>
    </div>
);

export default function DirectionFive() {
    return (
        <div id="top" className={cx("ex ex-5 min-h-svh", ex5Font.variable)}>
            <div className="dark-mode bg-primary">
                <ExploreBar n={5} />
                <ExHeader
                    className="bg-primary/85 backdrop-blur-md"
                    mark={
                        <span aria-hidden="true" className="flex h-5 items-end gap-0.5">
                            <span className="h-2 w-1.5 rounded-sm bg-fg-quaternary" />
                            <span className="h-3.5 w-1.5 rounded-sm bg-fg-quaternary" />
                            <span className="h-5 w-1.5 rounded-sm bg-brand-solid" />
                        </span>
                    }
                />
                <main>
                    {/* Title slide */}
                    <Slide label="Introduction" className="ex5-title">
                        <BadgeWithDot type="pill-color" color="brand" size="lg" className="max-w-full self-start whitespace-normal">
                            {hero.badge}
                        </BadgeWithDot>
                        <h1 className={cx(display, "mt-8 max-w-[16ch] text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.98]")} style={wide}>
                            {hero.headline}
                        </h1>
                        <p className="mt-8 max-w-2xl text-lg text-tertiary md:text-xl">{hero.supporting}</p>
                        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                            <Button href={contact.mailto} size="xl">
                                Talk about a PM role
                            </Button>
                            <Button href="#work" size="xl" color="secondary">
                                See the work
                            </Button>
                        </div>
                    </Slide>

                    {/* Proof slide */}
                    <Slide label="Proof">
                        <dl className="grid gap-12 md:grid-cols-3 md:gap-10">
                            {hero.stats.map((stat) => (
                                <div key={stat.value} className="flex flex-col gap-4">
                                    <dt className="max-w-xs text-lg text-tertiary md:text-xl">{stat.label}</dt>
                                    <dd className="ex5-figure order-first text-[clamp(2.75rem,4.6vw,4.75rem)] leading-[1.02] font-bold tracking-[-0.04em] whitespace-pre-line tabular-nums" style={wide}>
                                        {stat.value.replace(" → ", " →\n")}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </Slide>

                    {/* Section slide: work */}
                    <Slide id="work" label="Selected work">
                        <h2 className={cx(display, "max-w-[18ch] text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.02]")} style={wide}>
                            Product decisions, with the evidence behind them.
                        </h2>
                        <p className="mt-8 max-w-2xl text-lg text-tertiary md:text-xl">
                            Three AI initiatives from Capital Group. Each one shows the problem, my role, what I decided, and what happened next.
                        </p>
                    </Slide>

                    {/* Featured case, overview */}
                    <Slide label={featuredCase.title}>
                        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
                            <div className="flex flex-col gap-6">
                                <p className="text-md font-semibold text-tertiary">{featuredCase.eyebrow}</p>
                                <h3 className={cx(display, "text-display-md md:text-display-lg")} style={wide}>
                                    {featuredCase.title}
                                </h3>
                                <p className="text-xl text-tertiary">{featuredCase.lead}</p>
                                <Figure value={featuredCase.stat.value} label={featuredCase.stat.label} />
                            </div>
                            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-secondary ring-1 ring-secondary">
                                <Image src={featuredCase.image.src} alt={featuredCase.image.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
                            </div>
                        </div>
                    </Slide>

                    {/* Featured case, the decisions */}
                    <Slide label={`${featuredCase.title}: decisions`}>
                        <Rows rows={featuredCase.rows} large />
                        <div className="mt-12">
                            <ReadButton slug={featuredCase.slug} />
                        </div>
                    </Slide>

                    {moreCases.map((item) => (
                        <Slide key={item.slug} label={item.title}>
                            <SupportingCase item={item} />
                        </Slide>
                    ))}

                    {/* Building */}
                    <Slide id="building" label="Building in 2026">
                        <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
                            <h2 className={cx(display, "text-display-md md:text-display-lg")} style={wide}>
                                What I'm building now
                            </h2>
                            <p className="text-lg text-tertiary">{building.intro}</p>
                        </div>
                        <div className="mt-12 grid gap-6 lg:grid-cols-2">
                            {building.projects.map((project) => (
                                <article key={project.name} className="flex flex-col gap-5 rounded-3xl bg-secondary p-6 ring-1 ring-secondary ring-inset md:p-8">
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <h3 className="text-display-xs font-bold tracking-tight text-primary" style={wide}>
                                            {project.name}
                                        </h3>
                                        <BadgeWithDot type="pill-color" color="warning" size="md">
                                            {project.status}
                                        </BadgeWithDot>
                                    </div>
                                    <dl className="flex flex-col gap-4">
                                        {[
                                            { label: "Why I built it", text: project.why },
                                            { label: "What it is", text: project.what },
                                            { label: "Where it's headed", text: project.next },
                                        ].map((row) => (
                                            <div key={row.label}>
                                                <dt className="text-sm font-semibold text-brand-secondary">{row.label}</dt>
                                                <dd className="mt-1 text-md text-secondary">{row.text}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                    <div className="mt-auto flex flex-wrap gap-3 pt-2">
                                        {project.links.map((link) => (
                                            <Button
                                                key={link.href}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                color="secondary"
                                                size="md"
                                                iconTrailing={<LinkExternal01 data-icon aria-hidden="true" />}
                                            >
                                                {link.label}
                                            </Button>
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </Slide>

                    {/* About */}
                    <Slide id="about" label="About">
                        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-16">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-secondary">
                                <Image src={about.photo.src} alt={about.photo.alt} fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover object-left" />
                            </div>
                            <div>
                                <h2 className={cx(display, "text-display-md")} style={wide}>
                                    Connecting the dots.
                                </h2>
                                <div className="mt-6 flex max-w-2xl flex-col gap-4 text-md text-tertiary md:text-lg">
                                    {about.paragraphs.map((p) => (
                                        <p key={p.slice(0, 24)}>{p}</p>
                                    ))}
                                    <p>
                                        {about.dubplate.before}
                                        <a
                                            href={about.dubplate.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-semibold text-brand-secondary underline underline-offset-4"
                                        >
                                            {about.dubplate.name}
                                        </a>
                                        {about.dubplate.after}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Slide>

                    {/* Contact: the ask */}
                    <Slide id="contact" label="Contact" className="ex5-close">
                        <h2 className={cx(display, "max-w-[16ch] text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.02]")} style={wide}>
                            {contactCopy.heading}
                        </h2>
                        <p className="mt-6 max-w-2xl text-lg text-tertiary md:text-xl">{contactCopy.body}</p>
                        <ContactActions className="mt-10" />
                        <p className="mt-16 text-sm text-quaternary">© 2026 Maicol Parker-Chavez</p>
                    </Slide>
                </main>
                <SlideCounter />
            </div>
        </div>
    );
}
