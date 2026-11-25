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
    <header className="sticky top-0 z-30 border-b border-secondary bg-primary/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-container items-center justify-between gap-4 px-4 md:h-18 md:px-8">
            <Link href="/" className="text-md font-semibold text-primary outline-focus-ring focus-visible:outline-2 md:text-lg">
                Maicol Parker-Chavez
            </Link>
            <div className="flex items-center gap-6">
                <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-md font-semibold text-tertiary transition duration-100 ease-linear hover:text-tertiary_hover"
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
