"use client";

import { ArrowRight } from "@untitledui/icons";
import Image from "next/image";
import Link from "next/link";
import { Tabs } from "@/components/application/tabs/tabs";
import type { CaseSummary } from "@/content/site";

/**
 * Direction 4. The three cases as a focus selector built on UUI Tabs (vertical, line type).
 * The selected case comes into focus; the others stay soft until chosen. Prep Me is selected first.
 */
export const FocusCases = ({ cases }: { cases: CaseSummary[] }) => (
    <Tabs defaultSelectedKey={cases[0].slug} orientation="vertical" className="gap-8 lg:flex-row lg:gap-14">
        <Tabs.List type="line" size="md" aria-label="Case studies" className="w-full shrink-0 gap-1 lg:w-80">
            {cases.map((item, i) => (
                <Tabs.Item key={item.slug} id={item.slug} className="w-full py-3 pl-5 text-left whitespace-normal">
                    <span className="flex flex-col items-start gap-1">
                        <span className="text-sm font-semibold">
                            {item.eyebrow.split(" · ")[0]}
                            {i === 0 && " (featured)"}
                        </span>
                        <span className="text-lg leading-snug font-semibold">{item.title}</span>
                    </span>
                </Tabs.Item>
            ))}
        </Tabs.List>
        {cases.map((item) => (
            <Tabs.Panel key={item.slug} id={item.slug} className="ex4-panel min-w-0 flex-1 rounded-3xl">
                <article className="grid gap-10 rounded-3xl bg-white p-6 shadow-[0_30px_60px_-30px_rgba(40,30,110,0.25)] ring-1 ring-secondary ring-inset md:p-10 xl:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
                    <div className="flex flex-col gap-6">
                        <p className="text-sm font-semibold text-brand-secondary">{item.eyebrow}</p>
                        <h3 className="text-display-xs font-semibold tracking-tight text-primary md:text-display-sm">{item.title}</h3>
                        <p className="text-lg text-tertiary">{item.lead}</p>
                        <dl className="flex flex-col gap-5">
                            {item.rows.map((row) => (
                                <div key={row.label}>
                                    <dt className="text-sm font-semibold text-primary">{row.label}</dt>
                                    <dd className="mt-1 text-md text-tertiary">{row.text}</dd>
                                </div>
                            ))}
                        </dl>
                        <Link
                            href={`/${item.slug}`}
                            className="group mt-2 inline-flex items-center gap-2 self-start rounded-md text-md font-semibold text-brand-secondary outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-4"
                        >
                            Read the case study
                            <ArrowRight className="size-5 transition duration-200 ease-out group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="rounded-2xl bg-brand-primary p-6">
                            <p className="text-display-md font-semibold tracking-tight text-brand-tertiary tabular-nums">{item.stat.value}</p>
                            <p className="mt-2 text-md text-secondary">{item.stat.label}</p>
                        </div>
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary">
                            <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1280px) 360px, 100vw" className="object-cover" />
                        </div>
                    </div>
                </article>
            </Tabs.Panel>
        ))}
    </Tabs>
);
