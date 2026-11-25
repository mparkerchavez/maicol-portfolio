import { ArrowDown, ArrowUpRight, Mail01 } from "@untitledui/icons";
import Image from "next/image";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { CaseCard, FeaturedCaseCard } from "@/components/site/case-card";
import { ContactSection, SiteFooter } from "@/components/site/contact-section";
import { DotField } from "@/components/site/dot-field";
import { Reveal, SettleWord } from "@/components/site/reveal";
import { SiteHeader } from "@/components/site/site-header";
import { about, building, contact, featuredCase, hero, moreCases } from "@/content/site";

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
    <p className="flex items-center gap-2 text-sm font-semibold text-brand-secondary md:text-md">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-solid" />
        {children}
    </p>
);

export default function HomePage() {
    return (
        <>
            <SiteHeader />
            <main>
                {/* Hero: ambiguity settles into order */}
                <section className="dark-mode grain relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-primary md:min-h-[calc(100svh-4.5rem)]">
                    <DotField className="absolute inset-0 size-full [mask-image:linear-gradient(to_bottom,transparent,black_60%)] md:[mask-image:linear-gradient(to_right,transparent_15%,black_70%)]" />
                    <div className="pointer-events-none relative mx-auto flex w-full max-w-container flex-1 flex-col justify-center px-4 pt-14 pb-10 md:px-8 md:pt-20">
                        <div className="pointer-events-auto animate-rise">
                            <BadgeWithDot type="pill-color" color="brand" size="lg" className="max-w-full whitespace-normal">
                                {hero.badge}
                            </BadgeWithDot>
                        </div>
                        <h1 className="pointer-events-auto mt-8 max-w-5xl text-[clamp(2.75rem,7vw,5.75rem)] leading-[0.98] font-semibold tracking-[-0.035em] text-primary">
                            I turn AI <SettleWord word="ambiguity" baseDelay={350} /> into products people <span className="text-brand-tertiary_alt">adopt</span>{" "}
                            and leaders <span className="text-brand-tertiary_alt">believe&nbsp;in.</span>
                        </h1>
                        <p className="pointer-events-auto mt-8 max-w-2xl animate-rise text-lg text-tertiary [animation-delay:900ms] md:text-xl">
                            {hero.supporting}
                        </p>
                        <div className="pointer-events-auto mt-10 flex animate-rise flex-col gap-3 [animation-delay:1100ms] sm:flex-row">
                            <Button href={contact.mailto} size="xl" iconLeading={<Mail01 data-icon aria-hidden="true" />}>
                                Talk about a PM role
                            </Button>
                            <Button href="#work" size="xl" color="secondary" iconTrailing={<ArrowDown data-icon aria-hidden="true" />}>
                                See the work
                            </Button>
                        </div>
                    </div>
                    <div className="relative border-t border-secondary bg-primary/60 backdrop-blur-sm">
                        <dl className="mx-auto grid max-w-container divide-y divide-secondary px-4 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-8">
                            {hero.stats.map((stat, i) => (
                                <div
                                    key={stat.value}
                                    className="flex animate-rise flex-col gap-2 py-6 md:px-8 md:py-8 md:first:pl-0"
                                    style={{ animationDelay: `${1300 + i * 120}ms` }}
                                >
                                    <dt className="text-md text-tertiary">{stat.label}</dt>
                                    <dd className="tabular order-first text-display-sm font-semibold tracking-tight whitespace-nowrap text-primary md:text-display-xs lg:text-display-sm xl:text-display-md">{stat.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>

                {/* Work */}
                <section id="work" className="scroll-mt-16 bg-primary py-20 md:scroll-mt-18 md:py-32">
                    <div className="mx-auto max-w-container px-4 md:px-8">
                        <Reveal className="max-w-3xl">
                            <Eyebrow>Selected work</Eyebrow>
                            <h2 className="mt-4 text-display-md font-semibold tracking-tight text-primary md:text-display-lg">
                                Product decisions, with the evidence behind them.
                            </h2>
                            <p className="mt-5 text-lg text-tertiary md:text-xl">
                                Three AI initiatives from Capital Group. Each one shows the problem, my role, what I decided, and what happened next.
                            </p>
                        </Reveal>
                        <div className="mt-14 flex flex-col gap-6 md:mt-20 md:gap-8">
                            <Reveal>
                                <FeaturedCaseCard item={featuredCase} />
                            </Reveal>
                            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                                {moreCases.map((item, i) => (
                                    <Reveal key={item.slug} delay={i * 120} className="h-full">
                                        <CaseCard item={item} />
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Building */}
                <section id="building" className="dark-mode grain scroll-mt-16 bg-primary py-20 md:scroll-mt-18 md:py-32">
                    <div className="mx-auto max-w-container px-4 md:px-8">
                        <Reveal className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
                            <div>
                                <Eyebrow>Building in 2026</Eyebrow>
                                <h2 className="mt-4 text-display-md font-semibold tracking-tight text-primary md:text-display-lg">What I'm building now</h2>
                            </div>
                            <p className="text-lg text-tertiary md:text-xl lg:pt-12">{building.intro}</p>
                        </Reveal>
                        <div className="mt-14 grid gap-6 md:mt-20 lg:grid-cols-2 lg:gap-8">
                            {building.projects.map((project, i) => (
                                <Reveal key={project.name} delay={i * 120} className="h-full">
                                    <article className="flex h-full flex-col gap-8 rounded-3xl bg-secondary p-6 ring-1 ring-secondary ring-inset md:p-10">
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <h3 className="text-display-sm font-semibold tracking-tight text-primary">{project.name}</h3>
                                            <BadgeWithDot type="pill-color" color="warning" size="md">
                                                {project.status}
                                            </BadgeWithDot>
                                        </div>
                                        <dl className="flex flex-col gap-6">
                                            {[
                                                { label: "Why I built it", text: project.why },
                                                { label: "What it is", text: project.what },
                                                { label: "Where it's headed", text: project.next },
                                            ].map((row, j) => (
                                                <div key={row.label} className="grid grid-cols-[1.75rem_1fr] gap-x-3">
                                                    <span aria-hidden="true" className="tabular pt-0.5 text-sm font-semibold text-brand-tertiary_alt">
                                                        0{j + 1}
                                                    </span>
                                                    <div>
                                                        <dt className="text-md font-semibold text-primary">{row.label}</dt>
                                                        <dd className="mt-1.5 text-md text-tertiary">{row.text}</dd>
                                                    </div>
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
                                                    iconTrailing={<ArrowUpRight data-icon aria-hidden="true" />}
                                                >
                                                    {link.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </article>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About */}
                <section id="about" className="scroll-mt-16 bg-primary py-20 md:scroll-mt-18 md:py-32">
                    <div className="mx-auto grid max-w-container gap-14 px-4 md:px-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
                        <Reveal className="relative mr-3 mb-3 md:mr-5 md:mb-5 lg:sticky lg:top-28 lg:self-start">
                            <div aria-hidden="true" className="absolute -right-3 -bottom-3 h-full w-full rounded-3xl bg-brand-solid md:-right-5 md:-bottom-5" />
                            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-tertiary">
                                <Image
                                    src={about.photo.src}
                                    alt={about.photo.alt}
                                    fill
                                    sizes="(min-width: 1024px) 680px, 100vw"
                                    className="object-cover object-left"
                                />
                            </div>
                        </Reveal>
                        <Reveal delay={120}>
                            <Eyebrow>About</Eyebrow>
                            <h2 className="mt-4 text-display-md font-semibold tracking-tight text-primary">Connecting the dots.</h2>
                            <div className="mt-8 flex flex-col gap-6 text-lg text-tertiary">
                                {about.paragraphs.map((p) => (
                                    <p key={p.slice(0, 24)}>{p}</p>
                                ))}
                                <p>
                                    {about.dubplate.before}
                                    <span className="font-semibold text-primary">{about.dubplate.name}</span>
                                    {about.dubplate.after}
                                </p>
                            </div>
                            <div className="mt-10">
                                <Button
                                    href={about.dubplate.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    color="secondary"
                                    size="lg"
                                    iconTrailing={<ArrowUpRight data-icon aria-hidden="true" />}
                                >
                                    Try Dubplate
                                </Button>
                            </div>
                        </Reveal>
                    </div>
                </section>

                <ContactSection />
            </main>
            <SiteFooter />
        </>
    );
}
