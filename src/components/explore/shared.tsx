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
];

/** Thin comparison bar above each direction. Plain UUI defaults so it stays out of the way of the direction itself. */
export const ExploreBar = ({ n }: { n: number }) => {
    const d = directions[n - 1];
    const prev = n > 1 ? n - 1 : 5;
    const next = n < 5 ? n + 1 : 1;
    return (
        <div className="border-b border-secondary bg-secondary text-sm text-secondary">
            <div className="mx-auto flex max-w-container items-center justify-between gap-3 px-4 py-2 md:px-8">
                <Link href="/explore" className="rounded-sm font-semibold text-primary underline-offset-4 outline-focus-ring hover:underline focus-visible:outline-2">
                    Direction {n} of 5: {d.name}
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
