"use client";

import { ChevronDown, ChevronUp } from "@untitledui/icons";
import { useEffect, useState } from "react";
import { Button } from "@/components/base/buttons/button";

/** Direction 5. Fixed deck counter: shows the current slide and steps to the previous or next one. */
export const SlideCounter = () => {
    const [index, setIndex] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const slides = Array.from(document.querySelectorAll<HTMLElement>("[data-slide]"));
        setTotal(slides.length);
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setIndex(slides.indexOf(e.target as HTMLElement));
                });
            },
            { rootMargin: "-45% 0px -45% 0px" },
        );
        slides.forEach((s) => io.observe(s));
        return () => io.disconnect();
    }, []);

    const go = (delta: number) => {
        const slides = document.querySelectorAll<HTMLElement>("[data-slide]");
        const target = slides[Math.min(slides.length - 1, Math.max(0, index + delta))];
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    };

    if (!total) return null;

    return (
        <nav
            aria-label="Slides"
            className="fixed right-4 bottom-4 z-40 hidden items-center md:flex gap-1 rounded-xl bg-secondary/90 p-1 shadow-lg ring-1 ring-secondary backdrop-blur-md md:right-6 md:bottom-6"
        >
            <Button color="tertiary" size="sm" aria-label="Previous slide" onClick={() => go(-1)} isDisabled={index === 0} iconLeading={<ChevronUp data-icon aria-hidden="true" />} />
            <span className="min-w-14 text-center text-sm font-semibold text-secondary tabular-nums">
                {index + 1} of {total}
            </span>
            <Button color="tertiary" size="sm" aria-label="Next slide" onClick={() => go(1)} isDisabled={index === total - 1} iconLeading={<ChevronDown data-icon aria-hidden="true" />} />
        </nav>
    );
};
