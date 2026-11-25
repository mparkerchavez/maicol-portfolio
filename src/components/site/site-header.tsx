import { Mail01 } from "@untitledui/icons";
import Link from "next/link";
import { Button } from "@/components/base/buttons/button";
import { contact } from "@/content/site";

const navItems = [
    { label: "Work", href: "/#work" },
    { label: "Building", href: "/#building" },
    { label: "About", href: "/#about" },
];

export const SiteHeader = () => (
    <header className="dark-mode sticky top-0 z-30 border-b border-secondary bg-primary/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-container items-center justify-between gap-4 px-4 md:h-18 md:px-8">
            <Link href="/" className="group flex items-center gap-2.5 rounded-md outline-focus-ring focus-visible:outline-2">
                <span aria-hidden="true" className="flex gap-1">
                    <span className="size-2 rounded-full bg-fg-quaternary transition duration-300 group-hover:translate-x-0.5" />
                    <span className="size-2 rounded-full bg-fg-quaternary" />
                    <span className="size-2 rounded-full bg-brand-solid transition duration-300 group-hover:-translate-x-0.5" />
                </span>
                <span className="text-md font-semibold text-primary md:text-lg">Maicol Parker-Chavez</span>
            </Link>
            <div className="flex items-center gap-6">
                <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-md font-semibold text-tertiary transition duration-100 ease-linear hover:text-primary"
                        >
                            {item.label}
                        </Link>
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
