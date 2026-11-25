import { ArrowLeft, ArrowRight } from "@untitledui/icons";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { SummaryRows } from "@/components/site/case-card";
import { ContactSection, SiteFooter } from "@/components/site/contact-section";
import { DotField } from "@/components/site/dot-field";
import { SiteHeader } from "@/components/site/site-header";
import { type Block, caseStudies, getCaseStudy } from "@/content/case-studies";

export const dynamicParams = false;

export function generateStaticParams() {
    return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const study = getCaseStudy(slug);
    if (!study) return {};
    return { title: `${study.summary.title} | Maicol Parker-Chavez`, description: study.summary.lead };
}

const BlockView = ({ block }: { block: Block }) => {
    switch (block.type) {
        case "p":
            return <p>{block.text}</p>;
        case "h3":
            return <h3 className="pt-4 text-xl font-semibold text-primary">{block.text}</h3>;
        case "ul":
            return (
                <ul className="flex list-disc flex-col gap-2 pl-6 marker:text-fg-quaternary">
                    {block.items.map((item) => (
                        <li key={item.slice(0, 32)}>{item}</li>
                    ))}
                </ul>
            );
        case "callout":
            return (
                <div className="rounded-xl bg-brand-primary p-6 ring-1 ring-brand ring-inset dark:bg-secondary dark:ring-secondary">
                    <p className="text-md font-semibold text-brand-primary">{block.title}</p>
                    <ul className="mt-3 flex list-disc flex-col gap-2 pl-6 text-secondary marker:text-fg-brand-secondary">
                        {block.items.map((item) => (
                            <li key={item.slice(0, 32)}>{item}</li>
                        ))}
                    </ul>
                </div>
            );
        case "image":
            return (
                <div className="relative my-2 aspect-video overflow-hidden rounded-xl bg-tertiary">
                    <Image src={block.src} alt={block.alt} fill sizes="(min-width: 1024px) 800px, 100vw" className="object-cover" />
                </div>
            );
        case "item":
            return (
                <div className="rounded-xl bg-primary p-6 ring-1 ring-secondary ring-inset">
                    <h3 className="text-lg font-semibold text-primary">{block.title}</h3>
                    <div className="mt-3 flex flex-col gap-3">
                        {block.text.map((t) => (
                            <p key={t.slice(0, 32)}>{t}</p>
                        ))}
                    </div>
                </div>
            );
    }
};

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const study = getCaseStudy(slug);
    if (!study) notFound();
    const next = getCaseStudy(study.next.slug)!;

    return (
        <>
            <SiteHeader />
            <main>
                {/* Intro */}
                <section className="dark-mode grain relative overflow-hidden bg-primary pt-10 pb-12 md:pt-16 md:pb-20">
                    <DotField className="absolute inset-0 size-full opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black_70%)] md:[mask-image:linear-gradient(to_right,transparent_35%,black_85%)]" />
                    <div className="pointer-events-none relative mx-auto max-w-container px-4 md:px-8 [&_a]:pointer-events-auto">
                        <Button href="/#work" color="link-gray" size="md" iconLeading={<ArrowLeft data-icon aria-hidden="true" />}>
                            All work
                        </Button>
                        <p className="mt-8 flex items-center gap-2 text-sm font-semibold text-brand-secondary md:text-md">
                            <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-solid" />
                            {study.eyebrow}
                        </p>
                        <h1 className="mt-4 max-w-4xl animate-rise text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-primary">{study.title}</h1>
                        <p className="mt-6 max-w-3xl animate-rise text-lg text-tertiary [animation-delay:200ms] md:text-xl">{study.intro}</p>
                        <dl className="mt-10 grid gap-8 border-t border-secondary pt-8 md:grid-cols-3">
                            {study.metrics.map((m) => (
                                <div key={m.value} className="flex flex-col gap-2">
                                    <dt className="text-md text-tertiary">{m.label}</dt>
                                    <dd className="tabular order-first text-display-xs font-semibold tracking-tight text-brand-tertiary_alt md:text-display-sm">{m.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>

                {/* At a glance */}
                <section className="bg-secondary py-12 md:py-16">
                    <div className="mx-auto max-w-container px-4 md:px-8">
                        <div className="rounded-3xl bg-primary p-6 shadow-xs ring-1 ring-secondary ring-inset md:p-10">
                            <h2 className="text-xl font-semibold text-primary md:text-display-xs">At a glance</h2>
                            <div className="mt-6">
                                <SummaryRows rows={study.summary.rows} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Body */}
                <section className="bg-primary py-12 md:py-20">
                    <div className="mx-auto grid max-w-container gap-12 px-4 md:px-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
                        <div className="flex min-w-0 flex-col gap-16">
                            {study.sections.map((section) => (
                                <article key={section.label}>
                                    <p className="text-sm font-semibold text-brand-secondary">{section.label}</p>
                                    <h2 className="mt-2 text-display-xs font-semibold tracking-tight text-primary md:text-display-sm">{section.title}</h2>
                                    <div className="mt-6 flex flex-col gap-5 text-lg text-tertiary">
                                        {section.blocks.map((block, i) => (
                                            <BlockView key={i} block={block} />
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>
                        <aside className="flex flex-col gap-8">
                            <div className="rounded-3xl bg-secondary p-6 ring-1 ring-secondary ring-inset">
                                <h2 className="text-sm font-semibold text-quaternary">My role</h2>
                                <p className="mt-2 text-lg font-semibold text-primary">{study.role.func}</p>
                                <p className="mt-1 text-sm text-tertiary">Official title: {study.role.official}</p>
                                <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-sm text-tertiary marker:text-fg-quaternary">
                                    {study.role.bullets.map((b) => (
                                        <li key={b.slice(0, 32)}>{b}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-quaternary">Collaborators</h2>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {study.collaborators.map((c) => (
                                        <Badge key={c} type="modern" color="gray" size="md">
                                            {c}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-quaternary">Methods</h2>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {study.methods.map((m) => (
                                        <Badge key={m} type="modern" color="gray" size="md">
                                            {m}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>

                {/* Next */}
                <section className="bg-secondary py-12 md:py-16">
                    <div className="mx-auto max-w-container px-4 md:px-8">
                        <Link
                            href={`/${next.slug}`}
                            className="group flex flex-col gap-4 rounded-3xl bg-primary p-6 shadow-xs ring-1 ring-secondary transition duration-300 ease-out ring-inset outline-focus-ring hover:-translate-y-1 hover:shadow-xl hover:ring-brand focus-visible:outline-2 md:flex-row md:items-center md:justify-between md:p-10"
                        >
                            <div>
                                <p className="text-sm font-semibold text-brand-secondary">Next case study</p>
                                <p className="mt-2 text-xl font-semibold text-primary md:text-display-xs">{study.next.title}</p>
                                <p className="mt-1 text-md text-tertiary">{next.summary.lead}</p>
                            </div>
                            <ArrowRight className="size-6 shrink-0 text-fg-brand-secondary transition duration-100 ease-linear group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                    </div>
                </section>

                <ContactSection />
            </main>
            <SiteFooter />
        </>
    );
}
