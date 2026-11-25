import { ArrowDown, ArrowUpRight, Mail01 } from "@untitledui/icons";
import Image from "next/image";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { CaseCard, FeaturedCaseCard } from "@/components/site/case-card";
import { ContactSection, SiteFooter } from "@/components/site/contact-section";
import { SiteHeader } from "@/components/site/site-header";
import { about, building, contact, featuredCase, hero, moreCases } from "@/content/site";

const SectionHeading = ({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) => (
    <div className="max-w-3xl">
        <p className="text-sm font-semibold text-brand-secondary md:text-md">{eyebrow}</p>
        <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">{title}</h2>
        {children && <div className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">{children}</div>}
    </div>
);

export default function HomePage() {
    return (
        <>
            <SiteHeader />
            <main>
                {/* Hero */}
                <section className="bg-primary pt-12 pb-16 md:pt-24 md:pb-24">
                    <div className="mx-auto max-w-container px-4 md:px-8">
                        <BadgeWithDot type="pill-color" color="brand" size="lg" className="max-w-full whitespace-normal">
                            {hero.badge}
                        </BadgeWithDot>
                        <h1 className="mt-6 max-w-4xl text-display-md font-semibold tracking-tight text-primary md:text-display-xl">{hero.headline}</h1>
                        <p className="mt-6 max-w-3xl text-lg text-tertiary md:text-xl">{hero.supporting}</p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10">
                            <Button href={contact.mailto} size="xl" iconLeading={<Mail01 data-icon aria-hidden="true" />}>
                                Talk about a PM role
                            </Button>
                            <Button href="#work" size="xl" color="secondary" iconTrailing={<ArrowDown data-icon aria-hidden="true" />}>
                                See the work
                            </Button>
                        </div>
                        <dl className="mt-12 grid gap-8 border-t border-secondary pt-8 md:mt-16 md:grid-cols-3 md:pt-10">
                            {hero.stats.map((stat) => (
                                <div key={stat.value} className="flex flex-col gap-2">
                                    <dt className="text-md font-medium text-tertiary">{stat.label}</dt>
                                    <dd className="order-first text-display-sm font-semibold text-brand-tertiary_alt md:text-display-md">{stat.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>

                {/* Work */}
                <section id="work" className="scroll-mt-16 bg-secondary py-16 md:scroll-mt-18 md:py-24">
                    <div className="mx-auto max-w-container px-4 md:px-8">
                        <SectionHeading eyebrow="Selected work" title="Product decisions, with the evidence behind them">
                            Three AI initiatives from Capital Group. Each one shows the problem, my role, what I decided, and what happened next.
                        </SectionHeading>
                        <div className="mt-12 flex flex-col gap-8 md:mt-16">
                            <FeaturedCaseCard item={featuredCase} />
                            <div className="grid gap-8 md:grid-cols-2">
                                {moreCases.map((item) => (
                                    <CaseCard key={item.slug} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Building */}
                <section id="building" className="scroll-mt-16 bg-primary py-16 md:scroll-mt-18 md:py-24">
                    <div className="mx-auto max-w-container px-4 md:px-8">
                        <SectionHeading eyebrow="Building in 2026" title="What I'm building now">
                            {building.intro}
                        </SectionHeading>
                        <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-2">
                            {building.projects.map((project) => (
                                <article key={project.name} className="flex flex-col gap-6 rounded-2xl bg-primary p-6 shadow-xs ring-1 ring-secondary ring-inset md:p-8">
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <h3 className="text-display-xs font-semibold text-primary">{project.name}</h3>
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
                                                size="md"
                                                iconTrailing={<ArrowUpRight data-icon aria-hidden="true" />}
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
                <section id="about" className="scroll-mt-16 bg-secondary py-16 md:scroll-mt-18 md:py-24">
                    <div className="mx-auto grid max-w-container gap-10 px-4 md:px-8 lg:grid-cols-2 lg:gap-16">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-tertiary lg:sticky lg:top-28 lg:self-start">
                            <Image
                                src={about.photo.src}
                                alt={about.photo.alt}
                                fill
                                sizes="(min-width: 1024px) 600px, 100vw"
                                className="object-cover object-left"
                            />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-brand-secondary md:text-md">About</p>
                            <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">A little more about me</h2>
                            <div className="mt-6 flex flex-col gap-5 text-lg text-tertiary">
                                {about.paragraphs.map((p) => (
                                    <p key={p.slice(0, 24)}>{p}</p>
                                ))}
                                <p>
                                    {about.dubplate.before}
                                    <span className="font-semibold text-secondary">{about.dubplate.name}</span>
                                    {about.dubplate.after}
                                </p>
                            </div>
                            <div className="mt-8">
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
                        </div>
                    </div>
                </section>

                <ContactSection />
            </main>
            <SiteFooter />
        </>
    );
}

