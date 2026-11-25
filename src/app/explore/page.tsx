import Link from "next/link";
import { directions } from "@/components/explore/shared";

export const metadata = {
    title: "Five directions | Maicol Parker-Chavez",
    robots: { index: false, follow: false },
};

const swatches: Record<number, string[]> = {
    1: ["#f6f7f9", "#121826", "#2741c9"],
    2: ["#f4f7f5", "#0f231c", "#0b6b4f", "#f6c453"],
    3: ["#ffffff", "#2f55e0", "#f2b705", "#e0457b"],
    4: ["#f7f7fb", "#1b1838", "#5434d4", "#c9c2f5"],
    5: ["#1f1428", "#fbf7f4", "#b8245f", "#ffb38a"],
};

export default function ExploreIndex() {
    return (
        <main className="min-h-svh bg-primary">
            <div className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
                <h1 className="text-display-sm font-semibold tracking-tight text-primary md:text-display-md">Five directions for the interim site</h1>
                <p className="mt-4 text-lg text-tertiary">
                    Same approved copy and the same three case studies in each. They differ in concept, layout, type, color, and motion. All five are built on
                    Untitled UI v8 with re-pointed tokens.
                </p>
                <ol className="mt-12 flex flex-col gap-4">
                    {directions.map((d) => (
                        <li key={d.n}>
                            <Link
                                href={`/explore/${d.n}`}
                                className="flex flex-col gap-3 rounded-2xl bg-primary p-6 ring-1 ring-secondary outline-focus-ring transition duration-100 ease-linear ring-inset hover:bg-primary_hover focus-visible:outline-2 sm:flex-row sm:items-start sm:gap-6"
                            >
                                <span aria-hidden="true" className="flex shrink-0 gap-1 pt-1">
                                    {swatches[d.n].map((c) => (
                                        <span key={c} className="size-5 rounded-full ring-1 ring-black/10 ring-inset" style={{ background: c }} />
                                    ))}
                                </span>
                                <span>
                                    <span className="block text-lg font-semibold text-primary">
                                        {d.n}. {d.name}
                                    </span>
                                    <span className="mt-1 block text-md text-tertiary">{d.thesis}</span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ol>
                <p className="mt-10 text-md text-tertiary">
                    Baseline for comparison:{" "}
                    <Link href="/" className="font-semibold text-brand-secondary underline underline-offset-4">
                        the current “connecting the dots” home page
                    </Link>
                    .
                </p>
            </div>
        </main>
    );
}
