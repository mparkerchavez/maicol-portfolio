import { Funnel_Display, Funnel_Sans } from "next/font/google";
import Image from "next/image";
import { Button } from "@/components/base/buttons/button";
import { RailNav } from "@/components/explore/rail-nav";
import { Actions, ReadLink, SiteHeader, projectRows, projects, workIntro } from "@/components/explore/round2";
import { ExploreBar, contactCopy, exMetadata } from "@/components/explore/shared";
import { type CaseSummary, about, building, featuredCase, hero, moreCases } from "@/content/site";
import { cx } from "@/utils/cx";

const displayFont = Funnel_Display({ subsets: ["latin"], variable: "--font-ex10d", display: "swap" });
const bodyFont = Funnel_Sans({ subsets: ["latin"], variable: "--font-ex10", display: "swap" });

export const metadata = exMetadata("The rail");

const head = "font-display font-bold tracking-[-0.03em] text-primary";

/** Label on the left, text on the right, like a spec sheet. */
const Spec = ({ rows, lead }: { rows: { label: string; text: string }[]; lead?: boolean }) => (
    <dl className="flex flex-col gap-8">
        {rows.map((row) => (
            <div key={row.label} className="grid gap-x-8 gap-y-2 sm:grid-cols-[9rem_minmax(0,1fr)]">
                <dt className="font-display text-md font-bold text-primary sm:pt-0.5">{row.label}</dt>
                <dd className={cx("leading-8 text-secondary", lead && row.label === "What I decided" ? "text-xl text-primary" : "text-lg")}>{row.text}</dd>
            </div>
        ))}
    </dl>
);

const Case = ({ item, lead }: { item: CaseSummary; lead?: boolean }) => (
    <article>
        <p
            className={cx(
                "font-display leading-[0.85] font-bold tracking-[-0.05em] text-brand-secondary tabular-nums",
                lead ? "text-[clamp(6.5rem,13vw,12rem)]" : "text-[clamp(4rem,6vw,5.5rem)]",
            )}
        >
            {item.stat.value}
        </p>
        <p className={cx("mt-4 text-secondary", lead ? "text-xl" : "text-lg")}>{item.stat.label}</p>
        <h3 className={cx(head, "mt-10 leading-[1.05]", lead ? "text-display-lg md:text-display-xl" : "text-display-sm md:text-display-md")}>{item.title}</h3>
        <p className={cx("mt-4 text-secondary", lead ? "text-xl leading-8" : "text-lg")}>{item.lead}</p>
        <div className={cx("relative mt-10 overflow-hidden rounded-3xl bg-tertiary", lead ? "aspect-[16/10]" : "aspect-[16/7]")}>
            <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
        </div>
        <div className="mt-12">
            <Spec rows={item.rows} lead={lead} />
        </div>
        <ReadLink slug={item.slug} className="mt-10" />
    </article>
);

export default function DirectionTen() {
    return (
        <div id="top" className={cx("ex ex-10 min-h-svh", displayFont.variable, bodyFont.variable)}>
            <ExploreBar n={10} />
            <SiteHeader className="bg-primary lg:hidden" nameClassName="font-display font-bold" />
            <div className="lg:grid lg:grid-cols-[22rem_minmax(0,1fr)] xl:grid-cols-[26rem_minmax(0,1fr)]">
                {/* The rail: who, where, and how to reach him, always in view */}
                <aside className="hidden bg-secondary lg:block">
                    <div className="sticky top-0 flex h-svh flex-col justify-between gap-10 p-10 xl:p-12">
                        <div>
                            <a href="#intro" className={cx(head, "block rounded-md text-display-md leading-[1.02] outline-focus-ring focus-visible:outline-2")}>
                                Maicol
                                <br />
                                Parker-Chavez
                            </a>
                            <p className="mt-4 text-lg text-secondary">Product manager for AI products</p>
                        </div>
                        <RailNav />
                        <Actions size="md" stack />
                    </div>
                </aside>

                <main className="px-4 md:px-8 lg:px-16 xl:px-24">
                    <div className="mx-auto max-w-3xl lg:mx-0">
                        <section id="intro" className="scroll-mt-20 pt-16 pb-24 md:pt-24 md:pb-36 lg:pt-28">
                            <h1 className={cx(head, "text-[clamp(2.6rem,5.2vw,5rem)] leading-[1.02]")}>{hero.headline}</h1>
                            <p className="mt-10 text-xl leading-9 text-secondary">{hero.supporting}</p>
                            <div className="mt-10 lg:hidden">
                                <Button href="#work" size="lg">
                                    See the work
                                </Button>
                            </div>
                        </section>

                        <section id="work" className="scroll-mt-20 pb-24 md:pb-36 lg:scroll-mt-12">
                            <h2 className={cx(head, "text-display-md leading-[1.08] md:text-display-lg")}>{workIntro.heading}</h2>
                            <p className="mt-5 text-xl leading-8 text-secondary">{workIntro.body}</p>
                            <div className="mt-20 md:mt-28">
                                <Case item={featuredCase} lead />
                            </div>
                            {moreCases.map((item) => (
                                <div key={item.slug} className="mt-24 border-t border-secondary pt-20 md:mt-32 md:pt-28">
                                    <Case item={item} />
                                </div>
                            ))}
                        </section>

                        <section id="building" className="scroll-mt-20 pb-24 md:pb-36 lg:scroll-mt-12">
                            <h2 className={cx(head, "text-display-md leading-[1.08] md:text-display-lg")}>What I'm building now</h2>
                            <p className="mt-5 text-lg leading-8 text-secondary">{building.intro}</p>
                            {projects.map((project) => (
                                <article key={project.name} className="mt-16 rounded-3xl bg-secondary p-6 md:mt-20 md:p-12">
                                    <h3 className={cx(head, "text-display-md md:text-display-lg")}>{project.name}</h3>
                                    <div className="mt-10">
                                        <Spec rows={projectRows(project)} />
                                    </div>
                                    <div className="mt-10 flex flex-wrap gap-3">
                                        {project.links.map((link) => (
                                            <Button key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" color="secondary" size="md">
                                                {link.label}
                                            </Button>
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </section>

                        <section id="about" className="scroll-mt-20 pb-24 md:pb-36 lg:scroll-mt-12">
                            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-tertiary">
                                <Image src={about.photo.src} alt={about.photo.alt} fill sizes="(min-width: 1024px) 760px, 100vw" className="object-cover object-left" />
                            </div>
                            <h2 className={cx(head, "mt-14 text-display-md leading-[1.08] md:text-display-lg")}>Connecting the dots.</h2>
                            <div className="mt-8 flex flex-col gap-6 text-lg leading-8 text-secondary">
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
                        </section>

                        <section id="contact" className="flex min-h-[70svh] scroll-mt-20 flex-col justify-center border-t border-secondary py-24 lg:scroll-mt-0">
                            <h2 className={cx(head, "text-[clamp(2.6rem,5.2vw,5rem)] leading-[1.02]")}>Get in touch.</h2>
                            <p className="mt-8 text-xl leading-9 text-secondary">{contactCopy.body}</p>
                            <Actions className="mt-10" />
                            <p className="mt-20 text-sm text-tertiary">© 2026 Maicol Parker-Chavez</p>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
