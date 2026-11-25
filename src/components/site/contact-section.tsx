import { Download01, Mail01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import LinkedIn from "@/components/foundations/social-icons/linkedin";
import { contact } from "@/content/site";

export const ContactSection = () => (
    <section id="contact" className="grain relative overflow-hidden bg-brand-solid py-20 text-white md:py-28">
        <svg aria-hidden="true" className="pointer-events-none absolute top-1/2 -right-24 hidden h-[140%] -translate-y-1/2 text-white/10 md:block" viewBox="0 0 200 200">
            {Array.from({ length: 100 }).map((_, i) => (
                <circle key={i} cx={10 + (i % 10) * 20} cy={10 + Math.floor(i / 10) * 20} r="2" fill="currentColor" />
            ))}
        </svg>
        <div className="relative mx-auto flex max-w-container flex-col gap-12 px-4 md:px-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
                <p className="text-md font-semibold text-white/80">Let's talk</p>
                <h2 className="mt-3 text-display-md font-semibold tracking-tight md:text-display-lg">Hiring for a product manager?</h2>
                <p className="mt-5 text-lg text-white/85 md:text-xl">
                    If you're here from my application, my resume and LinkedIn are right here. If you'd rather start with a conversation, email me
                    directly.
                </p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-6 lg:w-auto">
                <Button href={contact.mailto} size="xl" color="secondary" iconLeading={<Mail01 data-icon aria-hidden="true" />} className="w-full lg:w-auto">
                    Email me
                </Button>
                <div>
                    <p className="mb-3 text-sm font-semibold text-white/75">Credentials</p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button
                            href={contact.resume}
                            target="_blank"
                            color="secondary"
                            size="lg"
                            iconLeading={<Download01 data-icon aria-hidden="true" />}
                        >
                            Download resume
                        </Button>
                        <Button
                            href={contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            color="secondary"
                            size="lg"
                            iconLeading={<LinkedIn data-icon className="size-5" />}
                        >
                            LinkedIn
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export const SiteFooter = () => (
    <footer className="dark-mode bg-primary py-8">
        <div className="mx-auto flex max-w-container flex-col gap-2 px-4 text-sm text-quaternary md:flex-row md:justify-between md:px-8">
            <p>© 2026 Maicol Parker-Chavez</p>
        </div>
    </footer>
);
