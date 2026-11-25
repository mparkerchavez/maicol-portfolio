"use client";

import { useEffect, useState } from "react";
import { cx } from "@/utils/cx";

const items = [
    { id: "top", label: "Introduction" },
    { id: "work", label: "Work" },
    { id: "building", label: "Building" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
];

/** Direction 10. Rail navigation that marks the section you are reading. */
export const RailNav = () => {
    const [active, setActive] = useState("top");

    useEffect(() => {
        const sections = items.map((i) => document.getElementById(i.id === "top" ? "intro" : i.id)).filter(Boolean) as HTMLElement[];
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActive(e.target.id === "intro" ? "top" : e.target.id);
                });
            },
            { rootMargin: "-40% 0px -55% 0px" },
        );
        sections.forEach((s) => io.observe(s));
        return () => io.disconnect();
    }, []);

    return (
        <nav aria-label="Main">
            <ul className="flex flex-col gap-1">
                {items.map((item) => {
                    const on = active === item.id;
                    return (
                        <li key={item.id}>
                            <a
                                href={`#${item.id === "top" ? "intro" : item.id}`}
                                aria-current={on ? "true" : undefined}
                                className={cx(
                                    "flex items-center gap-3 rounded-md py-1.5 text-lg outline-focus-ring transition-colors duration-150 focus-visible:outline-2",
                                    on ? "font-semibold text-primary" : "font-medium text-tertiary hover:text-primary",
                                )}
                            >
                                <span aria-hidden="true" className={cx("h-0.5 rounded-full bg-fg-brand-primary transition-all duration-200 motion-reduce:transition-none", on ? "w-8" : "w-0")} />
                                {item.label}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};
