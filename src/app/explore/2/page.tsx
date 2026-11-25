import { ArrowDown, ArrowRight, LinkExternal01 } from "@untitledui/icons";
import Image from "next/image";
import Link from "next/link";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ContactActions, ExFooter, ExHeader, ExploreBar, contactCopy, exMetadata } from "@/components/explore/shared";
import { type CaseSummary, about, building, contact, featuredCase, hero, moreCases } from "@/content/site";
import { cx } from "@/utils/cx";
import { ex2Font } from "../fonts";

export const metadata = exMetadata("Adoption curve");

/*
 * The hero chart plots the real Prep Me adoption numbers from the case study:
 * 12 associates in the pilot, then ~90, then 300+ within a year. No invented data points.
 */
const W = 600;
const H = 360;
const y = (v: number) => 316 - (v / 320) * 250;
const points = [
    { x: 64, v: 12, label: "12", note: "pilot" },
    { x: 300, v: 90, label: "~90", note: "" },
    { x: 536, v: 300, label: "300+", note: "within a year" },
];
const curve = `M${points[0].x},${y(12)} C180,${y(16)} 230,${y(70)} ${points[1].x},${y(90)} S470,${y(285)} ${points[2].x},${y(300)}`;

const AdoptionChart = () => (
    <figure className="ex2-chart rounded-3xl bg-white p-5 shadow-sm ring-1 ring-secondary ring-inset md:p-8">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-labelledby="ex2-chart-title">
            <title id="ex2-chart-title">Prep Me adoption grew from 12 associates in the pilot to about 90, then to more than 300 within a year.</title>
            <defs>
                <linearGradient id="ex2-area" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-brand-600)" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="var(--color-brand-600)" stopOpacity="0" />
                </linearGradient>
            </defs>
            <line x1="40" x2="560" y1="316" y2="316" stroke="var(--color-neutral-300)" strokeWidth="2" />
            <path className="ex2-area" d={`${curve} L${points[2].x},316 L${points[0].x},316 Z`} fill="url(#ex2-area)" />
            <path className="ex2-line" d={curve} fill="none" stroke="var(--color-brand-600)" strokeWidth="5" strokeLinecap="round" pathLength={1} />
            {points.map((p, i) => (
                <g key={p.label} className="ex2-point" style={{ animationDelay: `${600 + i * 450}ms` }}>
                    <circle cx={p.x} cy={y(p.v)} r="9" fill="white" stroke="var(--color-brand-600)" strokeWidth="4" />
                    <text
                        x={p.x}
                        y={y(p.v) - (i === 2 ? 46 : 22)}
                        textAnchor={i === 2 ? "end" : i === 0 ? "start" : "middle"}
                        className="fill-[var(--color-text-primary)] text-[30px] font-semibold"
                        style={{ fontStretch: "85%" }}
                    >
                        {p.label}
                    </text>
                    {p.note && (
                        <text
                            x={p.x}
                            y={i === 0 ? 346 : y(p.v) - 20}
                            textAnchor={i === 2 ? "end" : "start"}
                            className="fill-[var(--color-text-tertiary)] text-[17px]"
                        >
                            {p.note}
                        </text>
                    )}
                </g>
            ))}
        </svg>
        <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm text-tertiary">
            <span className="font-semibold text-primary">Sales associates using Prep Me</span>
            <span>Capital Group, first year after the pilot</span>
        </figcaption>
    </figure>
);

/** Amber annotation tag, the chart's voice carried into the rest of the page. */
const Note = ({ value, label, className }: { value: string; label: string; className?: string }) => (
    <p className={cx("ex2-note inline-flex max-w-full flex-wrap items-baseline gap-x-2 rounded-lg px-3 py-1.5", className)}>
        <span className="text-lg font-semibold tabular-nums">{value}</span>
        <span className="text-sm">{label}</span>
    </p>
);

const Rows = ({ rows }: { rows: CaseSummary["rows"] }) => (
    <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
        {rows.map((row) => (
            <div key={row.label}>
                <dt className="text-sm font-semibold text-primary">{row.label}</dt>
                <dd className="mt-1 text-md text-tertiary">{row.text}</dd>
            </div>
        ))}
    </dl>
);

const CaseRow = ({ item, featured }: { item: CaseSummary; featured?: boolean }) => (
    <Link
        href={`/${item.slug}`}
        className={cx(
            "group grid gap-8 rounded-3xl bg-white p-6 ring-1 ring-secondary outline-focus-ring transition duration-150 ease-out ring-inset hover:ring-brand focus-visible:outline-2 focus-visible:outline-offset-4 md:p-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-14",
            featured && "ring-2 ring-brand",
        )}
    >
        <div className="flex flex-col gap-5">
            <p className="text-sm font-semibold text-brand-secondary">{item.eyebrow}</p>
            <h3 className={cx("font-semibold tracking-tight text-primary", featured ? "text-display-sm" : "text-display-xs")}>{item.title}</h3>
            <p className="text-md text-tertiary">{item.lead}</p>
            <Note value={item.stat.value} label={item.stat.label} className="self-start" />
            {featured && (
                <div className="relative mt-2 hidden aspect-[4/3] overflow-hidden rounded-2xl bg-secondary lg:block">
                    <Image src={item.image.src} alt={item.image.alt} fill sizes="420px" className="object-cover" />
                </div>
            )}
        </div>
        <div className="flex flex-col gap-8">
            <Rows rows={item.rows} />
            <span className="mt-auto inline-flex items-center gap-2 text-md font-semibold text-brand-secondary">
                Read the case study
                <ArrowRight className="size-5 transition duration-200 ease-out group-hover:translate-x-1" aria-hidden="true" />
            </span>
        </div>
    </Link>
);

export default function DirectionTwo() {
    return (
        <div id="top" className={cx("ex ex-2 min-h-svh", ex2Font.variable)}>
            <ExploreBar n={2} />
            <ExHeader
                className="bg-primary/90 backdrop-blur-md"
                mark={
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6">
                        <path d="M3 20 C9 19 11 15 13 12 S18 5 21 4" fill="none" stroke="var(--color-brand-600)" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                }
            />
            <main>
                {/* Hero: the outcome first */}
                <section className="mx-auto grid max-w-container items-center gap-12 px-4 pt-12 pb-16 md:px-8 md:pt-16 md:pb-24 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
                    <div>
                        <BadgeWithDot type="pill-color" color="success" size="lg" className="max-w-full whitespace-normal">
                            {hero.badge}
                        </BadgeWithDot>
                        <h1 className="mt-7 text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-primary" style={{ fontStretch: "88%" }}>
                            {hero.headline}
                        </h1>
                        <p className="mt-6 max-w-xl text-lg text-tertiary">{hero.supporting}</p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Button href={contact.mailto} size="xl">
                                Talk about a PM role
                            </Button>
                            <Button href="#work" size="xl" color="secondary" iconTrailing={<ArrowDown data-icon aria-hidden="true" />}>
                                See the work
                            </Button>
                        </div>
                    </div>
                    <AdoptionChart />
                </section>

                <section aria-label="Proof" className="mx-auto max-w-container px-4 pb-20 md:px-8 md:pb-28">
                    <dl className="grid gap-4 md:grid-cols-3">
                        {hero.stats.map((stat) => (
                            <div key={stat.value} className="flex flex-col gap-2 rounded-2xl bg-secondary p-5">
                                <dt className="text-md text-tertiary">{stat.label}</dt>
                                <dd className="order-first text-display-xs font-semibold tracking-tight whitespace-nowrap text-primary tabular-nums md:text-display-sm" style={{ fontStretch: "88%" }}>
                                    {stat.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </section>

                {/* Work */}
                <section id="work" className="scroll-mt-20 bg-secondary py-20 md:py-28">
                    <div className="mx-auto max-w-container px-4 md:px-8">
                        <div className="max-w-3xl">
                            <h2 className="text-display-sm font-semibold tracking-tight text-primary md:text-display-md" style={{ fontStretch: "88%" }}>
                                Product decisions, with the evidence behind them.
                            </h2>
                            <p className="mt-4 text-lg text-tertiary">
                                Three AI initiatives from Capital Group. Each one shows the problem, my role, what I decided, and what happened next.
                            </p>
                        </div>
                        <div className="mt-12 flex flex-col gap-6">
                            <CaseRow item={featuredCase} featured />
                            {moreCases.map((item) => (
                                <CaseRow key={item.slug} item={item} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Building */}
                <section id="building" className="mx-auto max-w-container scroll-mt-20 px-4 py-20 md:px-8 md:py-28">
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
                        <h2 className="text-display-sm font-semibold tracking-tight text-primary md:text-display-md" style={{ fontStretch: "88%" }}>
                            What I'm building now
                        </h2>
                        <p className="text-lg text-tertiary">{building.intro}</p>
                    </div>
                    <div className="mt-12 grid gap-6 lg:grid-cols-2">
                        {building.projects.map((project) => (
                            <article key={project.name} className="flex flex-col gap-6 rounded-3xl bg-white p-6 ring-1 ring-secondary ring-inset md:p-8">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <h3 className="text-display-xs font-semibold tracking-tight text-primary">{project.name}</h3>
                                    <BadgeWithDot type="pill-color" color="warning" size="md">
                                        {project.status}
                                    </BadgeWithDot>
                                </div>
                                <dl className="flex flex-col gap-5">
                                    {[
                                        { label: "Why I built it", text: project.why },
                                        { label: "What it is", text: project.what },
                                        { label: "Where it's headed", text: project.next },
                                    ].map((row) => (
                                        <div key={row.label}>
                                            <dt className="text-sm font-semibold text-primary">{row.label}</dt>
                                            <dd className="mt-1 text-md text-tertiary">{row.text}</dd>
                                        </div>
                                    ))}
                                </dl>
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
                </section>

                {/* About */}
                <section id="about" className="scroll-mt-20 bg-secondary py-20 md:py-28">
                    <div className="mx-auto grid max-w-container gap-12 px-4 md:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
                        <figure className="lg:sticky lg:top-28 lg:self-start">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-tertiary">
                                <Image src={about.photo.src} alt={about.photo.alt} fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover object-left" />
                            </div>
                        </figure>
                        <div>
                            <h2 className="text-display-sm font-semibold tracking-tight text-primary md:text-display-md" style={{ fontStretch: "88%" }}>
                                Connecting the dots.
                            </h2>
                            <div className="mt-6 flex max-w-2xl flex-col gap-5 text-lg text-tertiary">
                                {about.paragraphs.map((p) => (
                                    <p key={p.slice(0, 24)}>{p}</p>
                                ))}
                                <p>
                                    {about.dubplate.before}
                                    <a href={about.dubplate.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-secondary underline underline-offset-4">
                                        {about.dubplate.name}
                                    </a>
                                    {about.dubplate.after}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <section id="contact" className="mx-auto max-w-container px-4 py-20 md:px-8 md:py-28">
                    <div className="grid gap-8 rounded-3xl bg-brand-primary p-6 ring-1 ring-brand ring-inset md:p-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-end">
                        <div>
                            <h2 className="text-display-sm font-semibold tracking-tight text-primary md:text-display-md" style={{ fontStretch: "88%" }}>
                                {contactCopy.heading}
                            </h2>
                            <p className="mt-4 max-w-xl text-lg text-secondary">{contactCopy.body}</p>
                        </div>
                        <ContactActions stack className="lg:items-stretch" />
                    </div>
                </section>
            </main>
            <ExFooter />
        </div>
    );
}
