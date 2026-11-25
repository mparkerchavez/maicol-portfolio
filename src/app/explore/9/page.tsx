import { Fraunces, Geist } from "next/font/google";
import Image from "next/image";
import { Button } from "@/components/base/buttons/button";
import { AlignField } from "@/components/explore/align-field";
import { Actions, ReadLink, SiteHeader, mail, projectRows, projects, rowBy, workIntro } from "@/components/explore/round2";
import { ExploreBar, contactCopy, exMetadata } from "@/components/explore/shared";
import { type CaseSummary, about, building, featuredCase, hero, moreCases } from "@/content/site";
import { cx } from "@/utils/cx";

const displayFont = Fraunces({ subsets: ["latin"], variable: "--font-ex9d", display: "swap", axes: ["opsz"] });
const bodyFont = Geist({ subsets: ["latin"], variable: "--font-ex9", display: "swap" });

export const metadata = exMetadata("Alignment field");

const head = "font-display font-normal tracking-[-0.025em] text-primary";

const SupportingRow = ({ item }: { item: CaseSummary }) => (
    <article className="grid gap-x-10 gap-y-10 rounded-3xl bg-secondary p-6 md:p-12 lg:grid-cols-12">
        <div className="flex flex-col lg:col-span-4">
            <p className="font-display text-[clamp(4rem,6.5vw,6rem)] leading-none font-normal tracking-[-0.03em] text-brand-secondary tabular-nums">{item.stat.value}</p>
            <p className="mt-3 max-w-xs text-md leading-6 text-secondary">{item.stat.label}</p>
            <h3 className={cx(head, "mt-10 text-display-sm leading-[1.12] md:text-display-md")}>{item.title}</h3>
            <p className="mt-4 text-lg text-secondary">{item.lead}</p>
            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl bg-tertiary">
                <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1024px) 380px, 100vw" className="object-cover" />
            </div>
        </div>
        <div className="flex flex-col lg:col-span-7 lg:col-start-6">
            <dl className="grid gap-x-10 gap-y-10 md:grid-cols-2">
                {item.rows.map((row) => (
                    <div key={row.label}>
                        <dt className="text-md font-semibold text-primary">{row.label}</dt>
                        <dd className="mt-2 text-md leading-7 text-secondary">{row.text}</dd>
                    </div>
                ))}
            </dl>
            <ReadLink slug={item.slug} className="mt-10 self-start lg:mt-auto lg:pt-10" />
        </div>
    </article>
);

export default function DirectionNine() {
    const decided = rowBy(featuredCase.rows, "What I decided");
    const rest = featuredCase.rows.filter((r) => r.label !== "What I decided");
    return (
        <div id="top" className={cx("ex ex-9 min-h-svh", displayFont.variable, bodyFont.variable)}>
            <ExploreBar n={9} />
            {/* Opening: the field fills the first screen and follows the cursor */}
            <div className="dark-mode relative flex min-h-[calc(100svh-2.5rem)] flex-col overflow-hidden bg-primary">
                <AlignField mode="pointer" />
                <SiteHeader sticky={false} className="relative" />
                <section className="relative mx-auto flex w-full max-w-container flex-1 flex-col justify-center px-4 py-16 md:px-8 md:py-24">
                    <h1 className={cx(head, "max-w-[17ch] text-[clamp(2.75rem,6.6vw,6.75rem)] leading-[1.02] tracking-[-0.03em]")}>{hero.headline}</h1>
                    <p className="mt-10 max-w-2xl text-lg leading-8 text-secondary md:text-xl md:leading-9">{hero.supporting}</p>
                    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                        <Button href="#work" size="lg">
                            See the work
                        </Button>
                        <Button href={mail} size="lg" color="secondary">
                            Get in touch
                        </Button>
                    </div>
                </section>
            </div>

            <main>
                {/* Work */}
                <section id="work" className="mx-auto max-w-container scroll-mt-8 px-4 py-24 md:px-8 md:py-40">
                    <div className="max-w-3xl">
                        <h2 className={cx(head, "text-display-md leading-[1.08] md:text-display-xl")}>{workIntro.heading}</h2>
                        <p className="mt-6 text-xl leading-8 text-secondary">{workIntro.body}</p>
                    </div>

                    {/* Lead case: open layout, no container */}
                    <article className="mt-24 md:mt-36">
                        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
                            <div className="lg:col-span-5">
                                <p className="font-display text-[clamp(7rem,15vw,14rem)] leading-[0.82] font-normal tracking-[-0.05em] text-brand-secondary tabular-nums">
                                    {featuredCase.stat.value}
                                </p>
                                <p className="mt-6 text-xl text-secondary">{featuredCase.stat.label}</p>
                                <h3 className={cx(head, "mt-12 text-display-lg leading-[1.05] md:text-display-xl")}>{featuredCase.title}</h3>
                                <p className="mt-6 text-xl leading-8 text-secondary">{featuredCase.lead}</p>
                                <ReadLink slug={featuredCase.slug} className="mt-10" />
                            </div>
                            <div className="lg:col-span-6 lg:col-start-7">
                                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-tertiary">
                                    <Image src={featuredCase.image.src} alt={featuredCase.image.alt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-16 grid gap-x-10 gap-y-12 md:mt-24 lg:grid-cols-12">
                            <div className="lg:col-span-6">
                                <h4 className="text-md font-semibold text-brand-secondary">{decided.label}</h4>
                                <p className="mt-4 font-display text-display-xs leading-9 font-normal text-primary md:text-display-sm md:leading-[2.75rem]">{decided.text}</p>
                            </div>
                            <dl className="grid gap-x-10 gap-y-10 md:grid-cols-3 lg:col-span-5 lg:col-start-8 lg:grid-cols-1">
                                {rest.map((row) => (
                                    <div key={row.label}>
                                        <dt className="text-md font-semibold text-primary">{row.label}</dt>
                                        <dd className="mt-2 text-md leading-7 text-secondary">{row.text}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </article>

                    <div className="mt-24 flex flex-col gap-8 md:mt-36">
                        {moreCases.map((item) => (
                            <SupportingRow key={item.slug} item={item} />
                        ))}
                    </div>
                </section>

                {/* Building */}
                <section id="building" className="mx-auto max-w-container scroll-mt-8 px-4 pb-24 md:px-8 md:pb-40">
                    <div className="max-w-3xl">
                        <h2 className={cx(head, "text-display-md leading-[1.08] md:text-display-xl")}>What I'm building now</h2>
                        <p className="mt-6 text-lg leading-8 text-secondary">{building.intro}</p>
                    </div>
                    <div className="mt-16 grid gap-x-20 gap-y-20 md:mt-24 lg:grid-cols-2">
                        {projects.map((project) => (
                            <article key={project.name} className="flex flex-col">
                                <h3 className={cx(head, "text-display-lg md:text-display-xl")}>{project.name}</h3>
                                <dl className="mt-8 flex flex-col gap-7">
                                    {projectRows(project).map((row) => (
                                        <div key={row.label}>
                                            <dt className="text-md font-semibold text-primary">{row.label}</dt>
                                            <dd className="mt-2 text-lg leading-8 text-secondary">{row.text}</dd>
                                        </div>
                                    ))}
                                </dl>
                                <div className="mt-8 flex flex-wrap gap-3">
                                    {project.links.map((link) => (
                                        <Button key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" color="secondary" size="md">
                                            {link.label}
                                        </Button>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* About: photo, title, one reading column */}
                <section id="about" className="mx-auto max-w-5xl scroll-mt-8 px-4 pb-24 md:px-8 md:pb-40">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-tertiary">
                        <Image src={about.photo.src} alt={about.photo.alt} fill sizes="(min-width: 1024px) 960px, 100vw" className="object-cover object-left" />
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl">
                        <h2 className={cx(head, "text-display-lg md:text-display-xl")}>Connecting the dots.</h2>
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
                    </div>
                </section>
            </main>

            {/* Closing: every mark points at the email button */}
            <footer id="contact" className="dark-mode relative flex min-h-svh flex-col overflow-hidden bg-primary">
                <AlignField mode="target" />
                <div className="relative mx-auto flex w-full max-w-container flex-1 flex-col justify-center px-4 py-20 md:px-8 lg:items-end lg:text-right">
                    <h2 className={cx(head, "max-w-[14ch] text-[clamp(2.75rem,6.6vw,6.75rem)] leading-[1.02] tracking-[-0.03em]")}>{contactCopy.heading}</h2>
                    <p className="mt-8 max-w-xl text-lg leading-8 text-secondary md:text-xl">{contactCopy.body}</p>
                    <div data-field-target="" className="mt-10">
                        <Actions className="lg:justify-end" />
                    </div>
                </div>
                <p className="relative mx-auto w-full max-w-container px-4 pb-8 text-sm text-tertiary md:px-8">© 2026 Maicol Parker-Chavez</p>
            </footer>
        </div>
    );
}
