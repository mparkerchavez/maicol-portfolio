import { Download01, Mail01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import LinkedIn from "@/components/foundations/social-icons/linkedin";
import { contact } from "@/content/site";

export const ContactSection = () => (
    <section id="contact" className="bg-primary py-16 md:py-24">
        <div className="mx-auto max-w-container px-4 md:px-8">
            <div className="flex flex-col gap-10 rounded-2xl bg-secondary px-6 py-10 md:flex-row md:items-end md:justify-between md:gap-16 md:p-16">
                <div className="max-w-2xl">
                    <p className="text-sm font-semibold text-brand-secondary md:text-md">Hiring for a product manager?</p>
                    <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">Let's talk.</h2>
                    <p className="mt-4 text-lg text-tertiary md:text-xl">
                        If you're here from my application, my resume and LinkedIn are below. If you'd rather start with a conversation, email me
                        directly.
                    </p>
                </div>
                <div className="flex w-full shrink-0 flex-col gap-6 md:w-auto">
                    <Button href={contact.mailto} size="xl" iconLeading={<Mail01 data-icon aria-hidden="true" />} className="w-full md:w-auto">
                        Email me
                    </Button>
                    <div>
                        <p className="mb-3 text-sm font-semibold text-quaternary">Credentials</p>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Button href={contact.resume} target="_blank" color="secondary" size="lg" iconLeading={<Download01 data-icon aria-hidden="true" />}>
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
        </div>
    </section>
);

export const SiteFooter = () => (
    <footer className="border-t border-secondary bg-primary py-8">
        <div className="mx-auto max-w-container px-4 text-sm text-quaternary md:px-8">
            <p>© 2026 Maicol Parker-Chavez</p>
        </div>
    </footer>
);
