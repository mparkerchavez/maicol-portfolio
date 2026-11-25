import { Bricolage_Grotesque, Source_Serif_4 } from "next/font/google";
import Image from "next/image";
import { Button } from "@/components/base/buttons/button";
import { Actions, ReadLink, SiteHeader, mail, projectRows, projects, rowBy, workIntro } from "@/components/explore/round2";
import { ExploreBar, contactCopy, exMetadata } from "@/components/explore/shared";
import { type CaseSummary, about, building, featuredCase, hero, moreCases } from "@/content/site";
import { cx } from "@/utils/cx";

const displayFont = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-ex6d", display: "swap", axes: ["opsz", "wdth"] });
const bodyFont = Source_Serif_4({ subsets: ["latin"], variable: "--font-ex6", display: "swap", axes: ["opsz"] });

export const metadata = exMetadata("Feature story");

const head = "font-display font-bold tracking-[-0.03em] text-primary";

const SecondaryStory = ({ item }: { item: CaseSummary }) => (
    <article className="flex flex-col">
        <p className="font-display text-[clamp(4rem,7vw,6.5rem)] leading-none font-bold tracking-[-0.04em] text-brand-secondary tabular-nums">{item.stat.value}</p>
        <p className="mt-3 max-w-xs text-lg text-secondary">{item.stat.label}</p>
        <h3 className={cx(head, "mt-10 text-display-sm md:text-display-md")}>{item.title}</h3>
        <p className="mt-4 text-xl leading-8 text-secondary">{item.lead}</p>
        <div className="relative mt-10 aspect-[3/2] overflow-hidden rounded-2xl bg-tertiary">
            <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1024px) 580px, 100vw" className="object-cover" />
        </div>
        <dl className="mt-10 flex flex-col gap-8">
            {item.rows.map((row) => (
                <div key={row.label}>
                    <dt className="font-display text-lg font-bold text-primary">{row.label}</dt>
                    <dd className="mt-2 text-lg leading-8 text-secondary">{row.text}</dd>
                </div>
            ))}
        </dl>
        <ReadLink slug={item.slug} className="mt-10 self-start font-display" />
    </article>
);

export default function DirectionSix() {
    const decided = rowBy(featuredCase.rows, "What I decided");
    const rest = featuredCase.rows.filter((r) => r.label !== "What I decided");
    return (
        <div id="top" className={cx("ex ex-6 min-h-svh", displayFont.variable, bodyFont.variable)}>
            <ExploreBar n={6} />
            <SiteHeader className="bg-primary font-display" nameClassName="font-bold" />
            <main>
                {/* Opening: the headline is the cover line */}
                <section className="mx-auto max-w-container px-4 pt-16 pb-28 md:px-8 md:pt-28 md:pb-44">
                    <h1 className={cx(head, "max-w-[15ch] text-[clamp(2.75rem,8.4vw,8.25rem)] leading-[0.94] tracking-[-0.04em]")}>{hero.headline}</h1>
                    <div className="mt-14 grid gap-10 md:mt-24 lg:grid-cols-12">
                        <div className="lg:col-span-6 lg:col-start-7">
                            <p className="text-xl leading-9 text-secondary md:text-[1.5rem] md:leading-10">{hero.supporting}</p>
                            <div className="mt-10 flex flex-col gap-3 font-display sm:flex-row">
                                <Button href="#work" size="lg">
                                    See the work
                                </Button>
                                <Button href={mail} size="lg" color="secondary">
                                    Get in touch
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Work */}
                <section id="work" className="scroll-mt-20 bg-secondary py-24 md:py-40">
                    <div className="mx-auto max-w-container px-4 md:px-8">
                        <div className="grid gap-6 lg:grid-cols-12">
                            <h2 className={cx(head, "text-display-md md:text-display-lg lg:col-span-7")}>{workIntro.heading}</h2>
                            <p className="text-xl leading-8 text-secondary lg:col-span-4 lg:col-start-9 lg:pt-3">{workIntro.body}</p>
                        </div>

                        {/* The lead story */}
                        <article className="mt-24 md:mt-36">
                            <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12 lg:items-end">
                                <div className="lg:col-span-5">
                                    <p className="font-display text-[clamp(7rem,17vw,16rem)] leading-[0.8] font-bold tracking-[-0.06em] text-brand-secondary tabular-nums">
                                        {featuredCase.stat.value}
                                    </p>
                                    <p className="mt-6 text-xl text-secondary">{featuredCase.stat.label}</p>
                                </div>
                                <div className="lg:col-span-7">
                                    <h3 className={cx(head, "text-display-lg leading-[1.02] md:text-display-2xl")}>{featuredCase.title}</h3>
                                    <p className="mt-6 text-xl leading-9 text-secondary md:text-[1.5rem]">{featuredCase.lead}</p>
                                </div>
                            </div>
                            <div className="relative mt-16 aspect-[16/8] overflow-hidden rounded-3xl bg-tertiary md:mt-20">
                                <Image src={featuredCase.image.src} alt={featuredCase.image.alt} fill sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover" />
                            </div>
                            <div className="mt-16 grid gap-x-8 gap-y-14 md:mt-20 lg:grid-cols-12">
                                <div className="lg:col-span-7">
                                    <h4 className="font-display text-lg font-bold text-brand-secondary">{decided.label}</h4>
                                    <p className="mt-4 font-display text-display-xs leading-9 font-medium tracking-[-0.01em] text-primary md:text-display-sm md:leading-[2.75rem]">
                                        {decided.text}
                                    </p>
                                    <ReadLink slug={featuredCase.slug} className="mt-10 font-display" />
                                </div>
                                <dl className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9">
                                    {rest.map((row) => (
                                        <div key={row.label}>
                                            <dt className="font-display text-lg font-bold text-primary">{row.label}</dt>
                                            <dd className="mt-2 text-lg leading-8 text-secondary">{row.text}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </article>

                        {/* Two shorter stories */}
                        <div className="mt-32 grid gap-x-16 gap-y-28 md:mt-44 lg:grid-cols-2">
                            {moreCases.map((item) => (
                                <SecondaryStory key={item.slug} item={item} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Building */}
                <section id="building" className="mx-auto max-w-container scroll-mt-20 px-4 py-24 md:px-8 md:py-40">
                    <div className="grid gap-x-8 gap-y-12 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <div className="lg:sticky lg:top-28">
                                <h2 className={cx(head, "text-display-md md:text-display-lg")}>What I'm building now</h2>
                                <p className="mt-6 text-lg leading-8 text-secondary">{building.intro}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-24 lg:col-span-7 lg:col-start-6">
                            {projects.map((project) => (
                                <article key={project.name}>
                                    <h3 className={cx(head, "text-display-lg md:text-display-xl")}>{project.name}</h3>
                                    <div className="mt-8 flex flex-col gap-6 text-xl leading-9 text-secondary">
                                        {projectRows(project).map((row) => (
                                            <p key={row.label}>
                                                <span className="font-display font-bold text-primary">{row.label}. </span>
                                                {row.text}
                                            </p>
                                        ))}
                                    </div>
                                    <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-display">
                                        {project.links.map((link) => (
                                            <Button key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" color="link-color" size="lg">
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
                <section id="about" className="mx-auto max-w-container scroll-mt-20 px-4 pb-24 md:px-8 md:pb-40">
                    <div className="relative aspect-[16/8] overflow-hidden rounded-3xl bg-tertiary">
                        <Image src={about.photo.src} alt={about.photo.alt} fill sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover object-left" />
                    </div>
                    <div className="mt-16 grid gap-x-8 gap-y-8 md:mt-24 lg:grid-cols-12">
                        <h2 className={cx(head, "text-display-lg md:text-display-xl lg:col-span-5")}>Connecting the dots.</h2>
                        <div className="flex flex-col gap-7 text-xl leading-9 text-secondary lg:col-span-6 lg:col-start-7">
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

            {/* Back cover */}
            <footer id="contact" className="dark-mode flex min-h-svh flex-col bg-primary">
                <div className="mx-auto flex w-full max-w-container flex-1 flex-col justify-between gap-20 px-4 py-20 md:px-8 md:py-28">
                    <div>
                        <h2 className={cx(head, "max-w-[12ch] text-[clamp(3rem,9vw,9rem)] leading-[0.92] tracking-[-0.045em]")}>{contactCopy.heading}</h2>
                        <p className="mt-10 max-w-xl text-xl leading-9 text-secondary">{contactCopy.body}</p>
                        <Actions className="mt-10 font-display" />
                    </div>
                    <div className="flex flex-col justify-between gap-4 font-display text-md text-tertiary sm:flex-row sm:items-end">
                        <p className="text-display-xs font-bold text-primary">Maicol Parker-Chavez</p>
                        <p>© 2026</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
