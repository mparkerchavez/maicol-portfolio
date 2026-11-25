import { Red_Hat_Display, Red_Hat_Text } from "next/font/google";
import Image from "next/image";
import { Button } from "@/components/base/buttons/button";
import { Actions, ReadLink, SiteHeader, mail, projectRows, projects, workIntro } from "@/components/explore/round2";
import { ExploreBar, exMetadata, contactCopy } from "@/components/explore/shared";
import { type CaseSummary, about, building, featuredCase, hero, moreCases } from "@/content/site";
import { cx } from "@/utils/cx";

const displayFont = Red_Hat_Display({ subsets: ["latin"], variable: "--font-ex8d", display: "swap" });
const bodyFont = Red_Hat_Text({ subsets: ["latin"], variable: "--font-ex8", display: "swap" });

export const metadata = exMetadata("Color fields");

const head = "font-display font-black tracking-[-0.035em]";
const sheet = "ex8-sheet rounded-3xl px-5 py-14 md:px-14 md:py-20";

const Rows = ({ rows, className }: { rows: CaseSummary["rows"]; className?: string }) => (
    <dl className={className}>
        {rows.map((row) => (
            <div key={row.label}>
                <dt className="font-display text-lg font-extrabold">{row.label}</dt>
                <dd className="mt-2 text-md leading-7 font-medium">{row.text}</dd>
            </div>
        ))}
    </dl>
);

const DarkLink = ({ slug }: { slug: string }) => <ReadLink slug={slug} className="font-display !text-(--ex-ink) underline" />;

const HalfSheet = ({ item, color }: { item: CaseSummary; color: string }) => (
    <article className={cx(sheet, "flex flex-col")} style={{ background: color }}>
        <p className={cx(head, "text-[clamp(4.5rem,8vw,7.5rem)] leading-[0.9] tabular-nums")}>{item.stat.value}</p>
        <p className="mt-3 max-w-xs text-lg font-medium">{item.stat.label}</p>
        <h3 className={cx(head, "mt-10 text-display-sm leading-[1.08] md:text-display-md")}>{item.title}</h3>
        <p className="mt-4 text-xl font-medium">{item.lead}</p>
        <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-2xl bg-white/40">
            <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
        </div>
        <Rows rows={item.rows} className="mt-10 flex flex-col gap-8" />
        <div className="mt-10">
            <DarkLink slug={item.slug} />
        </div>
    </article>
);

export default function DirectionEight() {
    return (
        <div id="top" className={cx("ex ex-8 min-h-svh", displayFont.variable, bodyFont.variable)}>
            <ExploreBar n={8} />
            <SiteHeader className="bg-primary" nameClassName="font-display font-black" />
            <main className="flex flex-col gap-3 px-3 pb-3 md:gap-4 md:px-4 md:pb-4">
                {/* Opening sheet */}
                <section className={cx(sheet, "flex min-h-[calc(100svh-8.5rem)] flex-col justify-between gap-16")} style={{ background: "var(--ex-tomato)" }}>
                    <h1 className={cx(head, "max-w-[16ch] text-[clamp(2.9rem,8vw,8.25rem)] leading-[0.95]")}>{hero.headline}</h1>
                    <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
                        <p className="text-xl leading-8 font-medium lg:col-span-7">{hero.supporting}</p>
                        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
                            <Button href="#work" size="lg">
                                See the work
                            </Button>
                            <Button href={mail} size="lg" color="secondary">
                                Get in touch
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Work */}
                <section id="work" className="scroll-mt-20">
                    <div className="grid gap-6 px-2 py-20 md:px-10 md:py-32 lg:grid-cols-12">
                        <h2 className={cx(head, "text-display-md leading-[1.05] text-primary md:text-display-xl lg:col-span-8")}>{workIntro.heading}</h2>
                        <p className="text-xl leading-8 text-secondary lg:col-span-4 lg:pt-3">{workIntro.body}</p>
                    </div>

                    <div className="flex flex-col gap-3 md:gap-4">
                        {/* Lead case: full-width sheet */}
                        <article className={sheet} style={{ background: "var(--ex-sun)" }}>
                            <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12 lg:items-center">
                                <div className="lg:col-span-6">
                                    <p className={cx(head, "text-[clamp(7rem,16vw,15rem)] leading-[0.82] tracking-[-0.05em] tabular-nums")}>{featuredCase.stat.value}</p>
                                    <p className="mt-5 text-xl font-medium">{featuredCase.stat.label}</p>
                                    <h3 className={cx(head, "mt-12 text-display-lg leading-[1.02] md:text-display-xl")}>{featuredCase.title}</h3>
                                    <p className="mt-5 text-xl leading-8 font-medium">{featuredCase.lead}</p>
                                </div>
                                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/40 lg:col-span-6">
                                    <Image src={featuredCase.image.src} alt={featuredCase.image.alt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
                                </div>
                            </div>
                            <Rows rows={featuredCase.rows} className="mt-16 grid gap-x-10 gap-y-10 md:mt-24 md:grid-cols-2 lg:grid-cols-4" />
                            <div className="mt-12">
                                <DarkLink slug={featuredCase.slug} />
                            </div>
                        </article>

                        {/* Two half sheets */}
                        <div className="grid gap-3 md:gap-4 lg:grid-cols-2">
                            <HalfSheet item={moreCases[0]} color="var(--ex-mint)" />
                            <HalfSheet item={moreCases[1]} color="var(--ex-sky)" />
                        </div>
                    </div>
                </section>

                {/* Building */}
                <section id="building" className={cx(sheet, "mt-16 scroll-mt-20 md:mt-28")} style={{ background: "var(--ex-pink)" }}>
                    <div className="grid gap-6 lg:grid-cols-12">
                        <h2 className={cx(head, "text-display-md leading-[1.05] md:text-display-xl lg:col-span-6")}>What I'm building now</h2>
                        <p className="text-lg leading-8 font-medium lg:col-span-6">{building.intro}</p>
                    </div>
                    <div className="mt-16 grid gap-3 md:mt-24 md:gap-4 lg:grid-cols-2">
                        {projects.map((project) => (
                            <article key={project.name} className="flex flex-col rounded-2xl bg-white p-6 md:p-10">
                                <h3 className={cx(head, "text-display-lg md:text-display-xl")}>{project.name}</h3>
                                <Rows rows={projectRows(project)} className="mt-8 flex flex-col gap-7" />
                                <div className="mt-auto flex flex-wrap gap-3 pt-10">
                                    {project.links.map((link) => (
                                        <Button key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" size="md">
                                            {link.label}
                                        </Button>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* About */}
                <section id="about" className="scroll-mt-20 px-2 py-20 md:px-10 md:py-32">
                    <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
                        <div className="lg:col-span-6">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-tertiary">
                                <Image src={about.photo.src} alt={about.photo.alt} fill sizes="(min-width: 1024px) 620px, 100vw" className="object-cover object-left" />
                            </div>
                        </div>
                        <div className="lg:col-span-6">
                            <h2 className={cx(head, "text-display-lg leading-[1.02] text-primary md:text-display-2xl")}>Connecting the dots.</h2>
                            <div className="mt-8 flex flex-col gap-6 text-lg leading-8 text-secondary">
                                {about.paragraphs.map((p) => (
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

                {/* Closing sheet: same color as the opening one */}
                <footer id="contact" className={cx(sheet, "flex min-h-[calc(100svh-2rem)] flex-col justify-between gap-16")} style={{ background: "var(--ex-tomato)" }}>
                    <h2 className={cx(head, "text-[clamp(3.5rem,12vw,12rem)] leading-[0.9]")}>Get in touch.</h2>
                    <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
                        <div className="lg:col-span-7">
                            <p className="max-w-xl text-xl leading-8 font-medium">{contactCopy.body}</p>
                            <Actions className="mt-8" />
                        </div>
                        <p className="text-md font-medium lg:col-span-5 lg:text-right">© 2026 Maicol Parker-Chavez</p>
                    </div>
                </footer>
            </main>
        </div>
    );
}
