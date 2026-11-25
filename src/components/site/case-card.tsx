import { ArrowRight } from "@untitledui/icons";
import Link from "next/link";
import { Badge } from "@/components/base/badges/badges";
import type { CaseSummary } from "@/content/site";
import { cx } from "@/utils/cx";

export const SummaryRows = ({ rows, compact }: { rows: CaseSummary["rows"]; compact?: boolean }) => (
    <dl className="divide-y divide-secondary border-y border-secondary">
        {rows.map((row) => (
            <div key={row.label} className={cx("flex flex-col gap-1 py-4", !compact && "md:flex-row md:gap-8")}>
                <dt className={cx("shrink-0 text-sm font-semibold text-primary", !compact && "md:w-32")}>{row.label}</dt>
                <dd className="text-md text-tertiary">{row.text}</dd>
            </div>
        ))}
    </dl>
);

const ReadMore = () => (
    <span className="inline-flex items-center gap-2 text-md font-semibold text-brand-secondary">
        Read the case study
        <ArrowRight className="size-5 transition duration-200 ease-out group-hover:translate-x-1" aria-hidden="true" />
    </span>
);

const cardBase =
    "group relative block rounded-3xl bg-primary ring-1 ring-secondary ring-inset outline-focus-ring transition duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:ring-brand focus-visible:outline-2 focus-visible:outline-offset-4";

export const FeaturedCaseCard = ({ item }: { item: CaseSummary }) => (
    <Link href={`/${item.slug}`} className={cx(cardBase, "overflow-hidden")}>
        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="relative flex flex-col justify-between gap-10 overflow-hidden bg-brand-solid p-8 text-white md:p-12">
                <div className="flex flex-wrap items-center gap-3">
                    <Badge type="pill-color" color="gray" size="md" className="bg-white/15 text-white ring-white/25">
                        Featured
                    </Badge>
                    <span className="text-sm font-semibold text-white/80">{item.eyebrow}</span>
                </div>
                <div>
                    <p className="tabular text-[clamp(5rem,12vw,9.5rem)] leading-[0.85] font-bold tracking-tighter">{item.stat.value}</p>
                    <p className="mt-4 max-w-xs text-lg text-white/85">{item.stat.label}</p>
                </div>
                <svg aria-hidden="true" className="pointer-events-none absolute -right-10 -bottom-10 size-64 text-white/10" viewBox="0 0 100 100">
                    {Array.from({ length: 36 }).map((_, i) => (
                        <circle key={i} cx={8 + (i % 6) * 17} cy={8 + Math.floor(i / 6) * 17} r="2.2" fill="currentColor" />
                    ))}
                </svg>
            </div>
            <div className="flex flex-col gap-6 p-6 md:p-10">
                <div>
                    <h3 className="text-display-xs font-semibold tracking-tight text-primary md:text-display-sm">{item.title}</h3>
                    <p className="mt-3 text-lg text-tertiary">{item.lead}</p>
                </div>
                <SummaryRows rows={item.rows} />
                <ReadMore />
            </div>
        </div>
    </Link>
);

export const CaseCard = ({ item }: { item: CaseSummary }) => (
    <Link href={`/${item.slug}`} className={cx(cardBase, "flex h-full flex-col gap-6 p-6 md:p-8")}>
        <span className="text-sm font-semibold text-brand-secondary">{item.eyebrow}</span>
        <div className="flex items-end gap-4 border-b border-secondary pb-6">
            <p className="tabular text-display-lg leading-none font-bold tracking-tighter text-primary md:text-display-xl">{item.stat.value}</p>
            <p className="max-w-56 pb-1 text-sm text-tertiary">{item.stat.label}</p>
        </div>
        <div>
            <h3 className="text-xl font-semibold tracking-tight text-primary md:text-display-xs">{item.title}</h3>
            <p className="mt-2 text-md text-tertiary">{item.lead}</p>
        </div>
        <SummaryRows rows={item.rows} compact />
        <div className="mt-auto">
            <ReadMore />
        </div>
    </Link>
);
