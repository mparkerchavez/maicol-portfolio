import { Archivo, Inter } from "next/font/google";
import Image from "next/image";
import { Button } from "@/components/base/buttons/button";
import { SiteHeader, mail, projectRows, projects, rowBy, workIntro } from "@/components/explore/round2";
import { ExploreBar, contactCopy, exMetadata } from "@/components/explore/shared";
import { type CaseSummary, about, building, contact, featuredCase, hero, moreCases } from "@/content/site";
import { cx } from "@/utils/cx";

const displayFont = Archivo({ subsets: ["latin"], variable: "--font-ex7d", display: "swap", axes: ["wdth"] });
const bodyFont = Inter({ subsets: ["latin"], variable: "--font-ex7", display: "swap" });

export const metadata = exMetadata("The index");

const narrow = { fontVariationSettings: '"wdth" 68' };
const big = "font-display font-extrabold tracking-[-0.02em] text-primary";

/** Highlights the given phrases inside a string with the marker. */
const Marked = ({ text, phrases }: { text: string; phrases: string[] }) => {
    const pattern = new RegExp(`(${phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`);
    return (
        <>
            {text.split(pattern).map((part, i) =>
                phrases.includes(part) ? (
                    <span key={i} className="ex7-mark">
                        {part}
                    </span>
                ) : (
                    part
                ),
            )}
        </>
    );
};

const Field = ({ label, text, className }: { label: string; text: string; className?: string }) => (
    <div className={className}>
        <dt className="font-display text-md font-bold text-primary">{label}</dt>
        <dd className="mt-3 text-md leading-7 text-secondary">{text}</dd>
    </div>
);

const TextLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} className="font-display text-lg font-bold text-primary underline decoration-2 underline-offset-[6px] outline-focus-ring hover:decoration-4 focus-visible:outline-2">
        {children}
    </a>
);

const Entry = ({ item }: { item: CaseSummary }) => (
    <article className="ex7-rule pt-10 md:pt-14">
        <div className="grid gap-x-8 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
                <p className={cx(big, "text-[clamp(4.5rem,9vw,8.5rem)] leading-[0.85] tabular-nums")} style={narrow}>
                    {item.stat.value}
                </p>
                <p className="mt-4 max-w-[16rem] text-md leading-6 text-secondary">{item.stat.label}</p>
            </div>
            <div className="lg:col-span-8">
                <h3 className={cx(big, "max-w-[20ch] text-display-md leading-[1.05] md:text-display-lg")}>{item.title}</h3>
                <p className="mt-5 text-xl text-secondary">{item.lead}</p>
            </div>
        </div>
        <dl className="mt-14 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
            {item.rows.map((row) => (
                <Field key={row.label} label={row.label} text={row.text} />
            ))}
        </dl>
        <div className="mt-12">
            <TextLink href={`/${item.slug}`}>Read the case study</TextLink>
        </div>
    </article>
);

export default function DirectionSeven() {
    const decided = rowBy(featuredCase.rows, "What I decided");
    const rest = featuredCase.rows.filter((r) => r.label !== "What I decided");
    return (
        <div id="top" className={cx("ex ex-7 min-h-svh", displayFont.variable, bodyFont.variable)}>
            <ExploreBar n={7} />
            <SiteHeader className="bg-primary" nameClassName="font-display font-extrabold" />
            <main>
                {/* Opening: fills the first screen, headline sits on the fold */}
                <section className="mx-auto flex min-h-[calc(100svh-7.5rem)] max-w-container flex-col justify-end px-4 pt-16 pb-12 md:px-8 md:pb-16">
                    <h1 className={cx(big, "text-[clamp(3.25rem,9.4vw,9.75rem)] leading-[0.88] tracking-[-0.025em]")} style={narrow}>
                        <Marked text={hero.headline} phrases={["people adopt", "leaders believe in."]} />
                    </h1>
                    <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:items-end">
                        <p className="text-lg leading-8 text-secondary lg:col-span-6">{hero.supporting}</p>
                        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:col-start-8 lg:justify-end">
                            <Button href="#work" size="lg">
                                See the work
                            </Button>
                            <Button href={mail} size="lg" color="secondary">
                                Get in touch
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Work: three entries, type only */}
                <section id="work" className="mx-auto max-w-container scroll-mt-20 px-4 py-24 md:px-8 md:py-40">
                    <div className="grid gap-6 lg:grid-cols-12">
                        <h2 className={cx(big, "text-display-md leading-[1.05] md:text-display-xl lg:col-span-8")}>{workIntro.heading}</h2>
                        <p className="text-lg leading-8 text-secondary lg:col-span-4 lg:pt-3">{workIntro.body}</p>
                    </div>

                    {/* Lead entry: the number runs the full width, the decision is set as the pull line */}
                    <article className="ex7-rule mt-20 pt-10 md:mt-32 md:pt-14">
                        <div className="flex flex-col gap-x-10 gap-y-6 lg:flex-row lg:items-end">
                            <p className={cx(big, "text-[clamp(8rem,26vw,25rem)] leading-[0.78] tracking-[-0.03em] tabular-nums")} style={narrow}>
                                {featuredCase.stat.value}
                            </p>
                            <div className="lg:pb-6">
                                <p className="text-xl text-secondary">{featuredCase.stat.label}</p>
                                <h3 className={cx(big, "mt-5 max-w-[16ch] text-display-lg leading-[1.02] md:text-display-xl")}>{featuredCase.title}</h3>
                            </div>
                        </div>
                        <p className="mt-16 max-w-[34ch] font-display text-display-sm leading-[1.2] font-bold tracking-[-0.01em] text-primary md:mt-24 md:text-display-lg md:leading-[1.14]">
                            <Marked text={decided.text} phrases={["Associates did not want to chat with AI."]} />
                        </p>
                        <dl className="mt-16 grid gap-x-8 gap-y-10 md:mt-24 md:grid-cols-3">
                            {rest.map((row) => (
                                <Field key={row.label} label={row.label} text={row.text} />
                            ))}
                        </dl>
                        <div className="mt-12">
                            <TextLink href={`/${featuredCase.slug}`}>Read the case study</TextLink>
                        </div>
                    </article>

                    <div className="mt-28 flex flex-col gap-28 md:mt-40 md:gap-40">
                        {moreCases.map((item) => (
                            <Entry key={item.slug} item={item} />
                        ))}
                    </div>
                </section>

                {/* About comes before the side projects here */}
                <section id="about" className="scroll-mt-20 bg-secondary py-24 md:py-40">
                    <div className="mx-auto grid max-w-container gap-x-8 gap-y-12 px-4 md:px-8 lg:grid-cols-12">
                        <div className="lg:col-span-5">
                            <h2 className={cx(big, "text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.88]")} style={narrow}>
                                Connecting the dots.
                            </h2>
                            <div className="relative mt-12 aspect-[4/3] overflow-hidden rounded-2xl bg-tertiary">
                                <Image src={about.photo.src} alt={about.photo.alt} fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover object-left" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-7 text-lg leading-8 text-secondary lg:col-span-6 lg:col-start-7 lg:pt-4">
                            <p className="font-display text-display-xs leading-9 font-bold text-primary">{about.paragraphs[0]}</p>
                            {about.paragraphs.slice(1).map((p) => (
                                <p key={p.slice(0, 24)}>{p}</p>
                            ))}
                            <p>
                                {about.dubplate.before}
                                <a href={about.dubplate.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline decoration-2 underline-offset-4">
                                    {about.dubplate.name}
                                </a>
                                {about.dubplate.after}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Building */}
                <section id="building" className="mx-auto max-w-container scroll-mt-20 px-4 py-24 md:px-8 md:py-40">
                    <div className="grid gap-6 lg:grid-cols-12">
                        <h2 className={cx(big, "text-display-md leading-[1.05] md:text-display-xl lg:col-span-6")}>What I'm building now</h2>
                        <p className="text-lg leading-8 text-secondary lg:col-span-6">{building.intro}</p>
                    </div>
                    <div className="mt-20 grid gap-x-16 gap-y-24 md:mt-28 lg:grid-cols-2">
                        {projects.map((project) => (
                            <article key={project.name} className="ex7-rule pt-10">
                                <h3 className={cx(big, "text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.9]")} style={narrow}>
                                    {project.name}
                                </h3>
                                <dl className="mt-10 flex flex-col gap-8">
                                    {projectRows(project).map((row) => (
                                        <Field key={row.label} label={row.label} text={row.text} />
                                    ))}
                                </dl>
                                <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                                    {project.links.map((link) => (
                                        <TextLink key={link.href} href={link.href}>
                                            {link.label}
                                        </TextLink>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>

            {/* Closing sheet: the highlighter takes the whole screen */}
            <footer id="contact" className="flex min-h-svh flex-col" style={{ background: "var(--ex-mark)" }}>
                <div className="mx-auto flex w-full max-w-container flex-1 flex-col justify-between gap-16 px-4 py-16 md:px-8 md:py-24">
                    <div>
                        <h2 className="font-display text-display-sm font-extrabold text-primary">Get in touch</h2>
                        <p className="mt-4 max-w-xl text-xl leading-8 text-primary">{contactCopy.body}</p>
                    </div>
                    <ul className={cx(big, "flex flex-col text-[clamp(3.5rem,13vw,13rem)] leading-[0.88]")} style={narrow}>
                        <li>
                            <a href={mail} className="ex7-biglink rounded-sm outline-focus-ring focus-visible:outline-2">
                                Email
                            </a>
                        </li>
                        <li>
                            <a href={contact.resume} target="_blank" className="ex7-biglink rounded-sm outline-focus-ring focus-visible:outline-2">
                                Resume
                            </a>
                        </li>
                        <li>
                            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="ex7-biglink rounded-sm outline-focus-ring focus-visible:outline-2">
                                LinkedIn
                            </a>
                        </li>
                    </ul>
                    <p className="text-md font-medium text-primary">© 2026 Maicol Parker-Chavez</p>
                </div>
            </footer>
        </div>
    );
}
