import Link from "next/link";
import { directions } from "@/components/explore/shared";

export const metadata = {
    title: "Fifteen directions | Maicol Parker-Chavez",
    robots: { index: false, follow: false },
};

const swatches: Record<number, string[]> = {
    1: ["#f6f7f9", "#121826", "#2741c9"],
    2: ["#f4f7f5", "#0f231c", "#0b6b4f", "#f6c453"],
    3: ["#ffffff", "#2f55e0", "#f2b705", "#e0457b"],
    4: ["#f7f7fb", "#1b1838", "#5434d4", "#c9c2f5"],
    5: ["#1f1428", "#fbf7f4", "#b8245f", "#ffb38a"],
    6: ["#f6f2ea", "#16130f", "#c2311d"],
    7: ["#ffffff", "#0c0c0c", "#d8f24a"],
    8: ["#ff6542", "#ffcb3d", "#86e0ae", "#9bdcf5", "#ffb5cf"],
    9: ["#101915", "#f4f2ec", "#b8440c"],
    10: ["#fafaf7", "#1a1a18", "#0b5f6b"],
    11: ["#ffffff", "#0a0a0a", "#1f44e0", "#efeeea"],
    12: ["#fbf6ee", "#1a1412", "#ff6542", "#efe3d0"],
    13: ["#fcf5f2", "#6b1226", "#f3d5cf"],
    14: ["#f4f1e9", "#1c1b18", "#e8b84a", "#ddd6c3"],
    15: ["#f6f9f9", "#0d3b44", "#86dbe6", "#cdebef"],
    16: ["#0099ff", "#fdfdfe", "#e02b00", "#d6eeff"],
    17: ["#e02b00", "#fdfdff", "#c9ff1f"],
    18: ["#0042ac", "#00d3fb", "#83fd80", "#fbfcff"],
    19: ["#0d3b44", "#cdebef", "#86dbe6", "#f6f9f9"],
    20: ["#fafaf8", "#111111", "#e02b00"],
    21: ["#0d3b44", "#cdebef", "#f6f9f9"],
    22: ["#86dbe6", "#0d3b44", "#cdebef", "#f6f9f9"],
    23: ["#fafaf8", "#111111", "#e02b00"],
    24: ["#e02b00", "#fafaf8", "#111111"],
    25: ["#e02b00", "#fdfdff", "#c9ff1f"],
};

export default function ExploreIndex() {
    return (
        <main className="min-h-svh bg-primary">
            <div className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
                <h1 className="text-display-sm font-semibold tracking-tight text-primary md:text-display-md">Twenty-five directions for the interim site</h1>
                <p className="mt-4 text-lg text-tertiary">
                    Round five (21 to 25) keeps the flush cards with small corners, brings back the fuller copy, and starts every card's text at the top. The five differ in color, body typeface and weight, and how much each case shows. Earlier rounds are kept for comparison.
                </p>
                {[
                    { title: "Round five: small corners, fuller copy", list: directions.filter((d) => d.n > 20) },
                    { title: "Round four: flush cards, short copy", list: directions.filter((d) => d.n > 15 && d.n <= 20) },
                    { title: "Round three: one structure, five treatments", list: directions.filter((d) => d.n > 10 && d.n <= 15) },
                    { title: "Round two: after feedback", list: directions.filter((d) => d.n > 5 && d.n <= 10) },
                    { title: "Round one", list: directions.filter((d) => d.n <= 5) },
                ].map((round) => (
                    <section key={round.title} className="mt-12">
                        <h2 className="text-lg font-semibold text-primary">{round.title}</h2>
                        <ol className="mt-4 flex flex-col gap-4">
                            {round.list.map((d) => (
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
                    </section>
                ))}
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
