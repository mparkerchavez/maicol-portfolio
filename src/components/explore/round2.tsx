import { ArrowRight, Download01, Mail01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import LinkedIn from "@/components/foundations/social-icons/linkedin";
import { building, contact } from "@/content/site";
import { cx } from "@/utils/cx";

/** Round two shares only chrome and data helpers. Every section layout is written per direction. */

export const mail = `mailto:${contact.email}`;

/** Earnestly first, then Curate Mind. */
export const projects = [...building.projects].reverse();

export const projectRows = (p: (typeof building.projects)[number]) => [
    { label: "Why I built it", text: p.why },
    { label: "What it is", text: p.what },
    { label: "Where it's headed", text: p.next },
];

export const workIntro = {
    heading: "Product decisions, with the evidence behind them.",
    body: "Three AI initiatives from Capital Group. Each one shows the problem, my role, what I decided, and what happened next.",
};

const nav = [
    { label: "Work", href: "#work" },
    { label: "Building", href: "#building" },
    { label: "About", href: "#about" },
];

/** Name only, no mark. One universal action. */
export const SiteHeader = ({ className, nameClassName, sticky = true }: { className?: string; nameClassName?: string; sticky?: boolean }) => (
    <header className={cx(sticky && "sticky top-0", "z-30", className)}>
        <div className="mx-auto flex h-16 max-w-container items-center justify-between gap-4 px-4 md:h-18 md:px-8">
            <a href="#top" className={cx("rounded-md text-md font-semibold text-primary outline-focus-ring focus-visible:outline-2 md:text-lg", nameClassName)}>
                Maicol Parker-Chavez
            </a>
            <div className="flex items-center gap-7">
                <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
                    {nav.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="rounded-sm text-md font-medium text-secondary outline-focus-ring transition duration-100 ease-linear hover:text-primary focus-visible:outline-2"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
                <Button href={mail} size="md">
                    Get in touch
                </Button>
            </div>
        </div>
    </header>
);

/** Email, resume, LinkedIn at ordinary button sizes. */
export const Actions = ({ className, size = "lg", stack }: { className?: string; size?: "md" | "lg"; stack?: boolean }) => (
    <div className={cx("flex flex-col gap-3", !stack && "sm:flex-row sm:flex-wrap", className)}>
        <Button href={mail} size={size} iconLeading={<Mail01 data-icon aria-hidden="true" />}>
            Email me
        </Button>
        <Button href={contact.resume} target="_blank" size={size} color="secondary" iconLeading={<Download01 data-icon aria-hidden="true" />}>
            Resume
        </Button>
        <Button href={contact.linkedin} target="_blank" rel="noopener noreferrer" size={size} color="secondary" iconLeading={<LinkedIn data-icon className="size-5" />}>
            LinkedIn
        </Button>
    </div>
);

export const ReadLink = ({ slug, className }: { slug: string; className?: string }) => (
    <Button href={`/${slug}`} color="link-color" size="lg" className={className} iconTrailing={<ArrowRight data-icon aria-hidden="true" />}>
        Read the case study
    </Button>
);

export const rowBy = (rows: { label: string; text: string }[], label: string) => rows.find((r) => r.label === label)!;
