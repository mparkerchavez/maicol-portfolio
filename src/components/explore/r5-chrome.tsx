import { Button } from "@/components/base/buttons/button";
import { R5HeaderTone } from "@/components/explore/r5-header-tone";
import { mail } from "@/components/explore/round2";
import { contact } from "@/content/site";
import { cx } from "@/utils/cx";

export const r5Size = {
    large: "text-[clamp(2.25rem,4.4vw,4.5rem)] leading-[1.02]",
    medium: "text-[clamp(1.75rem,2.5vw,2.5rem)] leading-[1.1]",
    title: "text-xl leading-7 md:text-2xl md:leading-8",
    body: "text-lg leading-8",
};

export const r5Pad = "px-6 py-14 md:px-14 md:py-20 xl:px-20 xl:py-24";

/**
 * Sticky nav: square top corners, rounded bottom corners, a line underneath. `home` prefixes the section links.
 * `scrollTone` switches the nav to the hero colors between the hero and the footer.
 * `strongNav` sets the Work and About links semibold, so they hold up in white on the accent color.
 */
export const R5Header = ({ display, home, scrollTone, strongNav }: { display: string; home: string; scrollTone?: boolean; strongNav?: boolean }) => (
    <div className="r5-headwrap sticky top-0 z-30">
        {scrollTone && <R5HeaderTone />}
        <header className="r4-card r5-head">
            <div className="flex h-16 items-center justify-between gap-4 px-6 md:h-18 md:px-14 xl:px-20">
                <a href={home || "#top"} className={cx("rounded-md font-display text-md outline-focus-ring focus-visible:outline-2 md:text-lg", display)}>
                    Maicol Parker-Chavez
                </a>
                <div className="flex items-center gap-7">
                    <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
                        {[
                            { label: "Work", href: `${home}#work` },
                            { label: "About", href: `${home}#about` },
                        ].map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className={cx(
                                    "r4-nav rounded-sm font-display text-md outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2",
                                    strongNav ? "font-semibold" : "font-medium",
                                )}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                    <Button href={mail} size="md" className="r3-btn font-display">
                        Get in touch
                    </Button>
                </div>
            </div>
        </header>
    </div>
);

/** Full-height close: the heading sits directly on top of the three links. */
export const R5Footer = ({ display, caps }: { display: string; caps?: boolean }) => (
    <footer id="contact" className={cx("r4-card r4-close flex min-h-[calc(100svh-4.5rem)] flex-col justify-end", r5Pad, "md:py-14 xl:py-16")}>
        <h2 className={cx("font-display", display, r5Size.medium)}>Get in touch</h2>
        <ul className={cx("mt-4 flex flex-col font-display text-[clamp(3.25rem,11.5vw,11rem)] leading-[1.04]", display, caps && "uppercase")}>
            {[
                { label: "Email", href: mail },
                { label: "Resume", href: contact.resume, blank: true },
                { label: "LinkedIn", href: contact.linkedin, blank: true },
            ].map((l) => (
                <li key={l.label}>
                    <a
                        href={l.href}
                        {...(l.blank ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="r3-biglink rounded-sm outline-focus-ring focus-visible:outline-2"
                    >
                        {l.label}
                    </a>
                </li>
            ))}
        </ul>
        <p className="mt-12 font-display text-md font-medium md:mt-16">© 2026 Maicol Parker-Chavez</p>
    </footer>
);
