import { ArrowDown, ArrowRight, LinkExternal01 } from "@untitledui/icons";
import Image from "next/image";
import Link from "next/link";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { RouteTrack } from "@/components/explore/route-track";
import { ContactActions, ExFooter, ExHeader, ExploreBar, contactCopy, exMetadata } from "@/components/explore/shared";
import { type CaseSummary, about, building, contact, featuredCase, hero, moreCases } from "@/content/site";
import { cx } from "@/utils/cx";
import { ex1Font } from "../fonts";

export const metadata = exMetadata("Through line");

/** A station on the route. Sits on the line, level with the section heading. */
const Station = ({ size = "md" }: { size?: "md" | "lg" }) => (
    <span aria-hidden="true" data-station="" className={cx("ex1-station", size === "lg" && "ex1-station-lg")} />
);

const Section = ({ id, children, className }: { id?: string; children: React.ReactNode; className?: string }) => (
    <section id={id} className={cx("relative scroll-mt-20 pr-4 pl-12 md:pr-8 md:pl-28", className)}>
        {children}
    </section>
);

const Rows = ({ rows, cols }: { rows: CaseSummary["rows"]; cols?: boolean }) => (
    <dl className={cx("grid gap-x-10 gap-y-6", cols && "md:grid-cols-2")}>
        {rows.map((row) => (
            <div key={row.label}>
                <dt className="text-sm font-semibold text-brand-secondary">{row.label}</dt>
                <dd className="mt-1.5 text-md text-tertiary">{row.text}</dd>
            </div>
        ))}
    </dl>
);

const ReadMore = () => (
    <span className="inline-flex items-center gap-2 text-md font-semibold text-brand-secondary">
        Read the case study
        <ArrowRight className="size-5 transition duration-200 ease-out group-hover:translate-x-1" aria-hidden="true" />
    </span>
);

const panel = "rounded-3xl bg-white ring-1 ring-secondary ring-inset";

export default function DirectionOne() {
    return (
        <div id="top" className={cx("ex ex-1 min-h-svh", ex1Font.variable)}>
            <ExploreBar n={1} />
            <ExHeader
                className="border-b border-secondary bg-primary/90 backdrop-blur-md"
                mark={
                    <span aria-hidden="true" className="relative flex h-5 w-5 items-center justify-center">
                        <span className="absolute inset-y-0 w-[3px] rounded-full bg-brand-solid" />
                        <span className="relative size-3 rounded-full border-[3px] border-brand bg-white" />
                    </span>
                }
            />
            <main className="mx-auto max-w-container">
                <RouteTrack>
                    {/* Hero: the start of the route */}
                    <Section className="pt-16 pb-20 [--st-top:4rem] md:pt-24 md:pb-28 md:[--st-top:6rem]">
                        <Station size="lg" />
                        <BadgeWithDot type="pill-color" color="brand" size="lg" className="max-w-full whitespace-normal">
                            {hero.badge}
                        </BadgeWithDot>
                        <h1 className="mt-8 max-w-[15ch] text-[clamp(2.75rem,6.4vw,5.75rem)] leading-[1.0] font-bold tracking-[-0.035em] text-primary">
                            {hero.headline}
                        </h1>
                        <p className="mt-8 max-w-2xl text-lg text-tertiary md:text-xl">{hero.supporting}</p>
                        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                            <Button href={contact.mailto} size="xl">
                                Talk about a PM role
                            </Button>
                            <Button href="#work" size="xl" color="secondary" iconTrailing={<ArrowDown data-icon aria-hidden="true" />}>
                                See the work
                            </Button>
                        </div>
                        <dl className="mt-16 grid gap-8 md:mt-20 md:grid-cols-3 md:gap-10">
                            {hero.stats.map((stat) => (
                                <div key={stat.value} className="border-t-[3px] border-brand pt-5">
                                    <dt className="text-md text-tertiary">{stat.label}</dt>
                                    <dd className="order-first mb-2 text-display-sm font-bold tracking-tight whitespace-nowrap text-primary tabular-nums lg:text-display-md">
                                        {stat.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </Section>

                    {/* Work */}
                    <Section id="work" className="pb-20 md:pb-28">
                        <Station />
                        <h2 className="max-w-3xl text-display-sm font-bold tracking-tight text-primary md:text-display-md">
                            Product decisions, with the evidence behind them.
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg text-tertiary">
                            Three AI initiatives from Capital Group. Each one shows the problem, my role, what I decided, and what happened next.
                        </p>

                        <Link
                            href={`/${featuredCase.slug}`}
                            className={cx(
                                panel,
                                "group mt-12 grid overflow-hidden outline-focus-ring transition duration-200 ease-out hover:ring-brand focus-visible:outline-2 focus-visible:outline-offset-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]",
                            )}
                        >
                            <div className="relative min-h-64 bg-secondary lg:min-h-full">
                                <Image src={featuredCase.image.src} alt={featuredCase.image.alt} fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
                            </div>
                            <div className="flex flex-col gap-8 p-6 md:p-10">
                                <div>
                                    <p className="text-sm font-semibold text-tertiary">{featuredCase.eyebrow}</p>
                                    <h3 className="mt-3 text-display-xs font-bold tracking-tight text-primary md:text-display-sm">{featuredCase.title}</h3>
                                    <p className="mt-3 text-lg text-tertiary">{featuredCase.lead}</p>
                                </div>
                                <Rows rows={featuredCase.rows} cols />
                                <ReadMore />
                            </div>
                        </Link>

                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            {moreCases.map((item) => (
                                <Link
                                    key={item.slug}
                                    href={`/${item.slug}`}
                                    className={cx(
                                        panel,
                                        "group flex flex-col gap-6 p-6 outline-focus-ring transition duration-200 ease-out hover:ring-brand focus-visible:outline-2 focus-visible:outline-offset-4 md:p-8",
                                    )}
                                >
                                    <p className="text-sm font-semibold text-tertiary">{item.eyebrow}</p>
                                    <div>
                                        <h3 className="text-xl font-bold tracking-tight text-primary md:text-display-xs">{item.title}</h3>
                                        <p className="mt-2 text-md text-tertiary">{item.lead}</p>
                                    </div>
                                    <p className="flex items-baseline gap-3 border-l-[3px] border-brand pl-4">
                                        <span className="text-display-sm font-bold tracking-tight text-primary tabular-nums">{item.stat.value}</span>
                                        <span className="text-sm text-tertiary">{item.stat.label}</span>
                                    </p>
                                    <Rows rows={item.rows} />
                                    <div className="mt-auto">
                                        <ReadMore />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </Section>

                    {/* Building */}
                    <Section id="building" className="pb-20 md:pb-28">
                        <Station />
                        <h2 className="text-display-sm font-bold tracking-tight text-primary md:text-display-md">What I'm building now</h2>
                        <p className="mt-4 max-w-3xl text-lg text-tertiary">{building.intro}</p>
                        <div className="mt-12 grid gap-6 lg:grid-cols-2">
                            {building.projects.map((project) => (
                                <article key={project.name} className={cx(panel, "flex flex-col gap-6 p-6 md:p-8")}>
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <h3 className="text-display-xs font-bold tracking-tight text-primary">{project.name}</h3>
                                        <BadgeWithDot type="pill-color" color="warning" size="md">
                                            {project.status}
                                        </BadgeWithDot>
                                    </div>
                                    <Rows
                                        rows={[
                                            { label: "Why I built it", text: project.why },
                                            { label: "What it is", text: project.what },
                                            { label: "Where it's headed", text: project.next },
                                        ]}
                                    />
                                    <div className="mt-auto flex flex-wrap gap-3">
                                        {project.links.map((link) => (
                                            <Button
                                                key={link.href}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                color="secondary"
                                                size="lg"
                                                iconTrailing={<LinkExternal01 data-icon aria-hidden="true" />}
                                            >
                                                {link.label}
                                            </Button>
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </Section>

                    {/* About */}
                    <Section id="about" className="pb-20 md:pb-28">
                        <Station />
                        <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
                            <div>
                                <h2 className="text-display-sm font-bold tracking-tight text-primary md:text-display-md">Connecting the dots.</h2>
                                <div className="mt-6 flex max-w-2xl flex-col gap-5 text-lg text-tertiary">
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
                            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-tertiary lg:sticky lg:top-28 lg:self-start">
                                <Image src={about.photo.src} alt={about.photo.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover object-left" />
                            </div>
                        </div>
                    </Section>

                    {/* Contact: the end of the line */}
                    <Section id="contact" className="pb-20 md:pb-28">
                        <Station size="lg" />
                        <div className="rounded-3xl bg-white p-6 ring-2 ring-brand ring-inset md:p-12">
                            <h2 className="text-display-sm font-bold tracking-tight text-primary md:text-display-md">{contactCopy.heading}</h2>
                            <p className="mt-4 max-w-2xl text-lg text-tertiary">{contactCopy.body}</p>
                            <ContactActions className="mt-8" />
                        </div>
                    </Section>
                </RouteTrack>
            </main>
            <ExFooter className="border-t border-secondary" />
        </div>
    );
}
