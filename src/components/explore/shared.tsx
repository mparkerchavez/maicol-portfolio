import { ChevronLeft, ChevronRight, Download01, Mail01 } from "@untitledui/icons";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/base/buttons/button";
import LinkedIn from "@/components/foundations/social-icons/linkedin";
import { contact } from "@/content/site";
import { cx } from "@/utils/cx";

export const directions = [
    {
        n: 1,
        name: "Through line",
        thesis: "One continuous route runs down the page and links every section, the way the work links users, builders, and leaders.",
    },
    {
        n: 2,
        name: "Adoption curve",
        thesis: "The hero is the real Prep Me adoption curve, 12 to ~90 to 300+, so the first thing a visitor reads is an outcome.",
    },
    {
        n: 3,
        name: "Three voices",
        thesis: "Users, builders, and funders as three overlapping circles. The product decision lives where they overlap.",
    },
    {
        n: 4,
        name: "Fog to focus",
        thesis: "The headline arrives out of focus and sharpens. Ambiguity to clarity, shown once, then the page stays calm and readable.",
    },
    {
        n: 5,
        name: "The readout",
        thesis: "The page is a stakeholder readout: one idea per slide, the format that earns leaders' confidence to commit.",
    },
    {
        n: 6,
        name: "Feature story",
        thesis: "The home page is laid out like a magazine feature. Scale and typeface contrast do the work that cards, badges, and outlines did before.",
    },
    {
        n: 7,
        name: "The index",
        thesis: "Type only. No cards and no images on the home page. One highlighter marks the phrases that matter, the way you would mark up a readout.",
    },
    {
        n: 8,
        name: "Color fields",
        thesis: "Each part of the page is its own sheet of color. Bright, flat, and loud about where one thing ends and the next begins.",
    },
    {
        n: 9,
        name: "Alignment field",
        thesis: "A field of small marks that turn toward your cursor. Scattered at rest, aligned around a point. It is texture, and it claims nothing.",
    },
    {
        n: 10,
        name: "The rail",
        thesis: "Name, navigation, and contact stay fixed in a left rail. The right side is one long, calm reading column.",
    },
    {
        n: 11,
        name: "Front page",
        thesis: "Round three. Sharp black and white with one blue. A lead story, then four full-width entries. News grotesque titles over a serif body.",
    },
    {
        n: 12,
        name: "Two-tone blocks",
        thesis: "Round three. The color blocks from direction 8 cut down to tomato, cream, and ink. Four equal blocks in a two by two grid.",
    },
    {
        n: 13,
        name: "Oxblood and blush",
        thesis: "Round three. One deep color and its tint. Softer corners, a grotesque over a bookish serif.",
    },
    {
        n: 14,
        name: "Ivory press",
        thesis: "Round three. Serif headlines over a sans body on warm ivory, with ochre for the close. An offset grid.",
    },
    {
        n: 15,
        name: "One hue",
        thesis: "Round three. Petrol and its lighter tints only. All sans, the plainest type of the five.",
    },
    {
        n: 16,
        name: "Sky and signal",
        thesis: "Round four. Sky blue hero, white cards, red-orange for buttons, figures, and the close. Libre Franklin throughout.",
    },
    {
        n: 17,
        name: "Red and lime",
        thesis: "Round four. Red-orange hero and close, lime for the two products. Libre Franklin titles over a serif body, mixed card widths.",
    },
    {
        n: 18,
        name: "Sapphire and jade",
        thesis: "Round four. Sapphire hero, cyan for the two products, jade close. The lead case opens with a wide photo.",
    },
    {
        n: 19,
        name: "Petrol tiles",
        thesis: "Round four. The petrol from direction 15 in the new card layout. Serif body, mixed card widths.",
    },
    {
        n: 20,
        name: "White tiles",
        thesis: "Round four. Closest to the reference: white cards, centered text, hairline joins, red-orange only for figures and the close.",
    },
    {
        n: 21,
        name: "Petrol, serif body",
        thesis: "Round five. Dark petrol hero and close, pale tint for the two products. Serif body. All four rows on every case.",
    },
    {
        n: 22,
        name: "Petrol, all bold",
        thesis: "Round five. Light petrol hero, one typeface, body copy set bold. Wide photo on the lead case. Two rows on the smaller cases.",
    },
    {
        n: 23,
        name: "White and red-orange",
        thesis: "Round five. White cards, red-orange for figures and the close. One typeface at regular weight. Two rows on the smaller cases.",
    },
    {
        n: 24,
        name: "White, all bold",
        thesis: "Round five. Red-orange hero and close on white cards, body copy set bold. Even card widths, all four rows.",
    },
    {
        n: 25,
        name: "Red with a little lime",
        thesis: "Round five. Red-orange hero and close, white cards. Lime appears only on the hero button and the footer link underline.",
    },
    {
        n: 26,
        name: "Geist body",
        thesis: "Round six. Libre Franklin titles over Geist. Caps headline at a moderate size, fine hex halftone, two rows on the smaller cases.",
    },
    {
        n: 27,
        name: "Inter body",
        thesis: "Round six. Libre Franklin titles over Inter. Larger, heavier caps headline, soft medium halftone, four rows.",
    },
    {
        n: 28,
        name: "Instrument Sans body",
        thesis: "Round six. Libre Franklin titles over Instrument Sans. Heavy caps headline, fine square-grid halftone, two rows.",
    },
    {
        n: 29,
        name: "IBM Plex Sans body",
        thesis: "Round six. Libre Franklin titles over IBM Plex Sans. Larger caps headline, very fine halftone, four rows.",
    },
    {
        n: 30,
        name: "DM Sans body",
        thesis: "Round six. Libre Franklin titles over DM Sans. The largest caps headline, coarse halftone, footer links in caps too.",
    },
];

/** Thin comparison bar above each direction. Plain UUI defaults so it stays out of the way of the direction itself. */
export const ExploreBar = ({ n }: { n: number }) => {
    const d = directions[n - 1];
    const total = directions.length;
    const prev = n > 1 ? n - 1 : total;
    const next = n < total ? n + 1 : 1;
    return (
        <div className="border-b border-secondary bg-secondary text-sm text-secondary">
            <div className="mx-auto flex max-w-container items-center justify-between gap-3 px-4 py-2 md:px-8">
                <Link href="/explore" className="rounded-sm font-semibold text-primary underline-offset-4 outline-focus-ring hover:underline focus-visible:outline-2">
                    Direction {n} of {total}: {d.name}
                </Link>
                <nav aria-label="Directions" className="flex items-center gap-1">
                    <Link
                        href={`/explore/${prev}`}
                        aria-label={`Previous direction: ${directions[prev - 1].name}`}
                        className="rounded-md p-1 text-fg-quaternary outline-focus-ring hover:bg-primary_hover hover:text-fg-secondary focus-visible:outline-2"
                    >
                        <ChevronLeft className="size-5" aria-hidden="true" />
                    </Link>
                    <Link
                        href={`/explore/${next}`}
                        aria-label={`Next direction: ${directions[next - 1].name}`}
                        className="rounded-md p-1 text-fg-quaternary outline-focus-ring hover:bg-primary_hover hover:text-fg-secondary focus-visible:outline-2"
                    >
                        <ChevronRight className="size-5" aria-hidden="true" />
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export const navItems = [
    { label: "Work", href: "#work" },
    { label: "Building", href: "#building" },
    { label: "About", href: "#about" },
];

export const ExHeader = ({ mark, className, sticky = true }: { mark?: ReactNode; className?: string; sticky?: boolean }) => (
    <header className={cx(sticky && "sticky top-0", "z-30", className)}>
        <div className="mx-auto flex h-16 max-w-container items-center justify-between gap-4 px-4 md:h-18 md:px-8">
            <a href="#top" className="flex items-center gap-2.5 rounded-md outline-focus-ring focus-visible:outline-2">
                {mark}
                <span className="text-md font-semibold text-primary md:text-lg">Maicol Parker-Chavez</span>
            </a>
            <div className="flex items-center gap-6">
                <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="rounded-sm text-md font-semibold text-tertiary outline-focus-ring transition duration-100 ease-linear hover:text-primary focus-visible:outline-2"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
                <Button href={contact.mailto} size="md" iconLeading={<Mail01 data-icon aria-hidden="true" />}>
                    <span className="hidden sm:inline">Talk about a PM role</span>
                    <span className="sm:hidden">Contact</span>
                </Button>
            </div>
        </div>
    </header>
);

export const contactCopy = {
    heading: "Hiring for a product manager?",
    body: "If you're here from my application, my resume and LinkedIn are right here. If you'd rather start with a conversation, email me directly.",
};

/** Email first, then resume and LinkedIn. Same three actions in every direction. */
export const ContactActions = ({ className, stack }: { className?: string; stack?: boolean }) => (
    <div className={cx("flex flex-col gap-3", !stack && "sm:flex-row sm:flex-wrap", className)}>
        <Button href={contact.mailto} size="xl" iconLeading={<Mail01 data-icon aria-hidden="true" />}>
            Email me
        </Button>
        <Button href={contact.resume} target="_blank" size="xl" color="secondary" iconLeading={<Download01 data-icon aria-hidden="true" />}>
            Download resume
        </Button>
        <Button
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            size="xl"
            color="secondary"
            iconLeading={<LinkedIn data-icon className="size-5" />}
        >
            LinkedIn
        </Button>
    </div>
);

export const ExFooter = ({ className }: { className?: string }) => (
    <footer className={cx("py-8", className)}>
        <div className="mx-auto max-w-container px-4 text-sm text-quaternary md:px-8">
            <p>© 2026 Maicol Parker-Chavez</p>
        </div>
    </footer>
);

export const exMetadata = (name: string) => ({
    title: `Exploration: ${name} | Maicol Parker-Chavez`,
    robots: { index: false, follow: false },
});
