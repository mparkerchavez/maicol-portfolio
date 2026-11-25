import { ArrowDown, ArrowRight, LinkExternal01 } from "@untitledui/icons";
import Image from "next/image";
import Link from "next/link";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ContactActions, ExFooter, ExHeader, ExploreBar, contactCopy, exMetadata } from "@/components/explore/shared";
import { type CaseSummary, about, building, contact, featuredCase, hero, moreCases } from "@/content/site";
import { cx } from "@/utils/cx";
import { ex3Font } from "../fonts";

export const metadata = exMetadata("Three voices");

/*
 * The three groups come straight from the About copy: the people who use the product,
 * the people who build it, and the people who fund it. The overlap is where decisions come from.
 */
const voices = [
    { key: "use", label: ["People who", "use it"], cx: 182, cy: 186, color: "var(--color-brand-600)", lx: 120, ly: 140, from: "-60px,-40px" },
    { key: "build", label: ["People who", "build it"], cx: 338, cy: 186, color: "var(--ex-sun)", lx: 400, ly: 140, from: "60px,-40px" },
    { key: "fund", label: ["People who", "fund it"], cx: 260, cy: 322, color: "var(--ex-rose)", lx: 260, ly: 400, from: "0px,60px" },
];

const Venn = ({ className, small }: { className?: string; small?: boolean }) => (
    <svg viewBox="0 0 520 480" className={cx("ex3-venn", className)} role="img" aria-labelledby={small ? undefined : "ex3-venn-title"} aria-hidden={small || undefined}>
        {!small && <title id="ex3-venn-title">Three overlapping circles: people who use the product, people who build it, and people who fund it. The product decision sits where all three overlap.</title>}
        <g style={{ mixBlendMode: "multiply" }}>
            {voices.map((v, i) => (
                <circle
                    key={v.key}
                    className="ex3-circle"
                    cx={v.cx}
                    cy={v.cy}
                    r="150"
                    fill={v.color}
                    fillOpacity={i === 0 ? 0.5 : 0.62}
                    style={{ "--from": v.from } as React.CSSProperties}
                />
            ))}
        </g>
        {!small &&
            voices.map((v) => (
                <text key={v.key} x={v.lx} y={v.ly} textAnchor="middle" className="ex3-label fill-[var(--color-text-primary)] text-[19px] font-semibold" stroke="rgba(255,255,255,0.7)" strokeWidth="4" paintOrder="stroke">
                    <tspan x={v.lx}>{v.label[0]}</tspan>
                    <tspan x={v.lx} dy="24">
                        {v.label[1]}
                    </tspan>
                </text>
            ))}
        {!small && (
            <g className="ex3-label">
                <circle cx="260" cy="238" r="7" fill="var(--color-text-primary)" />
                <text x="260" y="270" textAnchor="middle" className="fill-[var(--color-text-primary)] text-[16px] font-bold" stroke="rgba(255,255,255,0.8)" strokeWidth="4" paintOrder="stroke">
                    The decision
                </text>
            </g>
        )}
    </svg>
);

const Rows = ({ rows }: { rows: CaseSummary["rows"] }) => (
    <dl className="flex flex-col gap-5">
        {rows.map((row) => (
            <div key={row.label}>
                <dt className="text-sm font-semibold text-primary">{row.label}</dt>
                <dd className="mt-1 text-md text-tertiary">{row.text}</dd>
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

const cardLink =
    "group flex flex-col gap-6 rounded-3xl p-6 outline-focus-ring transition duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 md:p-8";

export default function DirectionThree() {
    return (
        <div id="top" className={cx("ex ex-3 min-h-svh", ex3Font.variable)}>
            <ExploreBar n={3} />
            <ExHeader
                className="bg-primary/90 backdrop-blur-md"
                mark={
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6">
                        <g style={{ mixBlendMode: "multiply" }}>
                            <circle cx="9" cy="9" r="6" fill="var(--color-brand-600)" fillOpacity="0.6" />
                            <circle cx="15" cy="9" r="6" fill="var(--ex-sun)" fillOpacity="0.7" />
                            <circle cx="12" cy="14.5" r="6" fill="var(--ex-rose)" fillOpacity="0.7" />
                        </g>
                    </svg>
                }
            />
            <main>
                {/* Hero */}
                <section className="mx-auto grid max-w-container items-center gap-10 px-4 pt-12 pb-16 md:px-8 md:pt-16 md:pb-24 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
                    <div>
                        <BadgeWithDot type="pill-color" color="brand" size="lg" className="max-w-full whitespace-normal">
                            {hero.badge}
                        </BadgeWithDot>
                        <h1 className="mt-7 text-[clamp(2.6rem,5.6vw,5rem)] leading-[1.04] font-semibold tracking-[-0.03em] text-primary">{hero.headline}</h1>
                        <p className="mt-6 max-w-2xl text-lg text-tertiary md:text-xl">{hero.supporting}</p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Button href={contact.mailto} size="xl">
                                Talk about a PM role
                            </Button>
                            <Button href="#work" size="xl" color="secondary" iconTrailing={<ArrowDown data-icon aria-hidden="true" />}>
                                See the work
                            </Button>
                        </div>
                    </div>
                    <Venn className="mx-auto w-full max-w-[26rem] lg:max-w-none" />
                </section>

                <section aria-label="Proof" className="mx-auto max-w-container px-4 pb-20 md:px-8 md:pb-28">
                    <dl className="grid gap-4 md:grid-cols-3">
                        {hero.stats.map((stat, i) => (
                            <div key={stat.value} className="flex gap-4 rounded-3xl bg-secondary p-6">
                                <span
                                    aria-hidden="true"
                                    className="mt-2 size-3 shrink-0 rounded-full"
                                    style={{ background: ["var(--color-brand-600)", "var(--ex-sun)", "var(--ex-rose)"][i] }}
                                />
                                <div className="flex flex-col gap-1.5">
                                    <dt className="text-md text-tertiary">{stat.label}</dt>
                                    <dd className="order-first text-display-xs font-semibold tracking-tight whitespace-nowrap text-primary tabular-nums md:text-display-sm">
                                        {stat.value}
                                    </dd>
                                </div>
                            </div>
                        ))}
                    </dl>
                </section>

                {/* Work: a bento, featured case on the left */}
                <section id="work" className="mx-auto max-w-container scroll-mt-20 px-4 pb-20 md:px-8 md:pb-28">
                    <h2 className="max-w-3xl text-display-sm font-semibold tracking-tight text-primary md:text-display-md">
                        Product decisions, with the evidence behind them.
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg text-tertiary">
                        Three AI initiatives from Capital Group. Each one shows the problem, my role, what I decided, and what happened next.
                    </p>
                    <div className="mt-12 grid gap-6 lg:grid-cols-2">
                        <Link href={`/${featuredCase.slug}`} className={cx(cardLink, "bg-brand-primary hover:bg-brand-secondary lg:row-span-2")}>
                            <p className="text-sm font-semibold text-brand-secondary">{featuredCase.eyebrow}</p>
                            <div>
                                <h3 className="text-display-xs font-semibold tracking-tight text-primary md:text-display-sm">{featuredCase.title}</h3>
                                <p className="mt-3 text-lg text-secondary">{featuredCase.lead}</p>
                            </div>
                            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-white">
                                <Image src={featuredCase.image.src} alt={featuredCase.image.alt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
                            </div>
                            <Rows rows={featuredCase.rows} />
                            <div className="mt-auto">
                                <ReadMore />
                            </div>
                        </Link>
                        {moreCases.map((item) => (
                            <Link key={item.slug} href={`/${item.slug}`} className={cx(cardLink, "bg-white ring-1 ring-secondary ring-inset hover:bg-primary_hover")}>
                                <p className="text-sm font-semibold text-brand-secondary">{item.eyebrow}</p>
                                <div>
                                    <h3 className="text-xl font-semibold tracking-tight text-primary md:text-display-xs">{item.title}</h3>
                                    <p className="mt-2 text-md text-tertiary">{item.lead}</p>
                                </div>
                                <p className="text-md text-tertiary">
                                    <span className="mr-2 text-display-xs font-semibold text-primary tabular-nums">{item.stat.value}</span>
                                    {item.stat.label}
                                </p>
                                <Rows rows={item.rows} />
                                <div className="mt-auto">
                                    <ReadMore />
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Building */}
                <section id="building" className="scroll-mt-20 bg-secondary py-20 md:py-28">
                    <div className="mx-auto max-w-container px-4 md:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="text-display-sm font-semibold tracking-tight text-primary md:text-display-md">What I'm building now</h2>
                            <p className="mt-4 text-lg text-tertiary">{building.intro}</p>
                        </div>
                        <div className="mt-12 grid gap-6 lg:grid-cols-2">
                            {building.projects.map((project) => (
                                <article key={project.name} className="flex flex-col gap-6 rounded-3xl bg-white p-6 md:p-8">
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <h3 className="text-display-xs font-semibold tracking-tight text-primary">{project.name}</h3>
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
                    </div>
                </section>

                {/* About */}
                <section id="about" className="mx-auto grid max-w-container scroll-mt-20 gap-12 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
                    <div className="relative lg:sticky lg:top-28 lg:self-start">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-tertiary">
                            <Image src={about.photo.src} alt={about.photo.alt} fill sizes="(min-width: 1024px) 500px, 100vw" className="object-cover object-left" />
                        </div>
                        <Venn small className="absolute -right-4 -bottom-6 w-28 md:w-36" />
                    </div>
                    <div>
                        <h2 className="text-display-sm font-semibold tracking-tight text-primary md:text-display-md">Connecting the dots.</h2>
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
                </section>

                {/* Contact */}
                <section id="contact" className="px-4 pb-16 md:px-8 md:pb-24">
                    <div className="mx-auto max-w-container rounded-[2rem] bg-secondary px-6 py-14 text-center md:px-12 md:py-20">
                        <h2 className="text-display-sm font-semibold tracking-tight text-primary md:text-display-md">{contactCopy.heading}</h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-tertiary">{contactCopy.body}</p>
                        <ContactActions className="mt-8 sm:justify-center" />
                    </div>
                </section>
            </main>
            <ExFooter />
        </div>
    );
}
