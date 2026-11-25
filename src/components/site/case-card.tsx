import { ArrowRight } from "@untitledui/icons";
import Image from "next/image";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import type { CaseSummary } from "@/content/site";
import { cx } from "@/utils/cx";

export const SummaryRows = ({ rows, compact }: { rows: CaseSummary["rows"]; compact?: boolean }) => (
    <dl className="divide-y divide-secondary border-y border-secondary">
        {rows.map((row) => (
            <div key={row.label} className={cx("flex flex-col gap-1 py-4", !compact && "md:flex-row md:gap-6")}>
                <dt className={cx("shrink-0 text-sm font-semibold text-primary", !compact && "md:w-36")}>{row.label}</dt>
                <dd className="text-md text-tertiary">{row.text}</dd>
            </div>
        ))}
    </dl>
);

export const FeaturedCaseCard = ({ item }: { item: CaseSummary }) => (
    <article className="overflow-hidden rounded-2xl bg-primary shadow-xs ring-1 ring-secondary ring-inset">
        <div className="grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div className="p-4 pb-0 md:p-6 md:pb-0 lg:order-last lg:p-10 lg:pl-0">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-tertiary">
                    <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" priority />
                </div>
            </div>
            <div className="flex flex-col gap-6 p-6 md:p-10">
                <div className="flex flex-wrap items-center gap-3">
                    <Badge type="pill-color" color="brand" size="md">
                        Featured
                    </Badge>
                    <span className="text-sm font-semibold text-brand-secondary">{item.eyebrow}</span>
                </div>
                <div>
                    <h3 className="text-display-xs font-semibold text-primary md:text-display-sm">{item.title}</h3>
                    <p className="mt-3 text-lg font-medium text-secondary">{item.lead}</p>
                </div>
                <SummaryRows rows={item.rows} />
                <div>
                    <Button href={`/${item.slug}`} color="link-color" size="lg" iconTrailing={<ArrowRight data-icon aria-hidden="true" />}>
                        Read the case study
                    </Button>
                </div>
            </div>
        </div>
    </article>
);

export const CaseCard = ({ item }: { item: CaseSummary }) => (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-primary shadow-xs ring-1 ring-secondary ring-inset">
        <div className="relative aspect-video bg-tertiary">
            <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 768px) 600px, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-1 flex-col gap-5 p-6 md:p-8">
            <span className="text-sm font-semibold text-brand-secondary">{item.eyebrow}</span>
            <div>
                <h3 className="text-xl font-semibold text-primary md:text-display-xs">{item.title}</h3>
                <p className="mt-2 text-md font-medium text-secondary">{item.lead}</p>
            </div>
            <SummaryRows rows={item.rows} compact />
            <div className="mt-auto">
                <Button href={`/${item.slug}`} color="link-color" size="lg" iconTrailing={<ArrowRight data-icon aria-hidden="true" />}>
                    Read the case study
                </Button>
            </div>
        </div>
    </article>
);
