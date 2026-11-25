import { ArrowDown, LinkExternal01 } from "@untitledui/icons";
import Image from "next/image";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { FocusCases } from "@/components/explore/focus-cases";
import { ContactActions, ExFooter, ExHeader, ExploreBar, contactCopy, exMetadata } from "@/components/explore/shared";
import { about, building, contact, featuredCase, hero, moreCases } from "@/content/site";
import { cx } from "@/utils/cx";
import { ex4Font } from "../fonts";

export const metadata = exMetadata("Fog to focus");

/** Headline words arrive out of focus and sharpen one after another. Reduced motion: sharp from the start. */
const FocusHeadline = ({ text }: { text: string }) => {
    const words = text.split(" ");
    return (
        <h1 aria-label={text} className="text-[clamp(2.6rem,6vw,5.4rem)] leading-[1.03] font-semibold tracking-[-0.035em] text-primary">
            {words.map((w, i) => (
                <span key={i} aria-hidden="true" className="ex4-word" style={{ animationDelay: `${150 + i * 60}ms` }}>
                    {w}
                    {i < words.length - 1 ? " " : ""}
                </span>
            ))}
        </h1>
    );
};

export default function DirectionFour() {
    return (
        <div id="top" className={cx("ex ex-4 min-h-svh", ex4Font.variable)}>
            <ExploreBar n={4} />
            <ExHeader
                className="bg-primary/80 backdrop-blur-xl"
                mark={
                    <span aria-hidden="true" className="relative flex size-6 items-center justify-center">
                        <span className="absolute inset-0 rounded-full bg-brand-solid opacity-25 blur-[3px]" />
                        <span className="relative size-2.5 rounded-full bg-brand-solid" />
                    </span>
                }
            />
            <main>
                {/* Hero: ambiguity resolves */}
                <section className="ex4-mist relative overflow-hidden">
                    <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 pt-16 pb-20 text-center md:px-8 md:pt-28 md:pb-28">
                        <BadgeWithDot type="pill-color" color="brand" size="lg" className="max-w-full whitespace-normal">
                            {hero.badge}
                        </BadgeWithDot>
                        <div className="mt-8">
                            <FocusHeadline text={hero.headline} />
                        </div>
                        <p className="ex4-after mt-8 max-w-2xl text-lg text-tertiary md:text-xl">{hero.supporting}</p>
                        <div className="ex4-after mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                            <Button href={contact.mailto} size="xl">
                                Talk about a PM role
                            </Button>
                            <Button href="#work" size="xl" color="secondary" iconTrailing={<ArrowDown data-icon aria-hidden="true" />}>
                                See the work
                            </Button>
                        </div>
                    </div>
                    <div className="relative mx-auto max-w-5xl px-4 pb-20 md:px-8 md:pb-28">
                        <dl className="ex4-after grid gap-px overflow-hidden rounded-3xl bg-secondary ring-1 ring-secondary md:grid-cols-3">
                            {hero.stats.map((stat) => (
                                <div key={stat.value} className="flex flex-col gap-2 bg-primary/80 p-6 text-center backdrop-blur-sm md:p-8">
                                    <dt className="text-md text-tertiary">{stat.label}</dt>
                                    <dd className="order-first text-display-xs font-semibold tracking-tight whitespace-nowrap text-primary tabular-nums md:text-display-sm">
                                        {stat.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>

                {/* Work: one case in focus at a time */}
                <section id="work" className="mx-auto max-w-container scroll-mt-20 px-4 py-20 md:px-8 md:py-28">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-display-sm font-semibold tracking-tight text-primary md:text-display-md">Product decisions, with the evidence behind them.</h2>
                        <p className="mt-4 text-lg text-tertiary">
                            Three AI initiatives from Capital Group. Each one shows the problem, my role, what I decided, and what happened next.
                        </p>
                    </div>
                    <div className="mt-12 md:mt-16">
                        <FocusCases cases={[featuredCase, ...moreCases]} />
                    </div>
                </section>

                {/* Building */}
                <section id="building" className="ex4-mist-soft scroll-mt-20 py-20 md:py-28">
                    <div className="mx-auto max-w-container px-4 md:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="text-display-sm font-semibold tracking-tight text-primary md:text-display-md">What I'm building now</h2>
                            <p className="mt-4 text-lg text-tertiary">{building.intro}</p>
                        </div>
                        <div className="mt-12 grid gap-6 lg:grid-cols-2">
                            {building.projects.map((project) => (
                                <article key={project.name} className="flex flex-col gap-6 rounded-3xl bg-white/85 p-6 ring-1 ring-secondary backdrop-blur-sm ring-inset md:p-8">
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
                    </div>
                </section>

                {/* About: one reading column */}
                <section id="about" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-20 md:px-8 md:py-28">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-tertiary">
                        <Image src={about.photo.src} alt={about.photo.alt} fill sizes="(min-width: 1024px) 960px, 100vw" className="object-cover object-left" />
                    </div>
                    <div className="mx-auto mt-12 max-w-2xl">
                        <h2 className="text-display-sm font-semibold tracking-tight text-primary md:text-display-md">Connecting the dots.</h2>
                        <div className="mt-6 flex flex-col gap-5 text-lg text-tertiary">
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
                <section id="contact" className="ex4-mist relative overflow-hidden">
                    <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center md:px-8 md:py-28">
                        <h2 className="text-display-sm font-semibold tracking-tight text-primary md:text-display-md">{contactCopy.heading}</h2>
                        <p className="mt-4 max-w-2xl text-lg text-tertiary">{contactCopy.body}</p>
                        <ContactActions className="mt-8 w-full sm:w-auto sm:justify-center" />
                    </div>
                </section>
            </main>
            <ExFooter />
        </div>
    );
}
