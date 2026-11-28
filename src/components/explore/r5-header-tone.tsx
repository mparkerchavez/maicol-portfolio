"use client";

import { useEffect, useRef } from "react";

/**
 * Sets `data-tone` on the sticky nav wrapper as the page scrolls:
 * "accent" once the hero has scrolled under the nav, back to the default once the footer reaches it.
 * Looks for `heroSelector` and `footerSelector` in the document. Renders nothing visible.
 */
export const R5HeaderTone = ({ heroSelector = ".r4-hero", footerSelector = "#contact" }: { heroSelector?: string; footerSelector?: string }) => {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const wrap = ref.current?.closest<HTMLElement>(".r5-headwrap");
        if (!wrap) return;
        let frame = 0;

        const update = () => {
            frame = 0;
            const line = wrap.getBoundingClientRect().bottom;
            const hero = document.querySelector(heroSelector);
            const footer = document.querySelector(footerSelector);
            const pastHero = hero ? hero.getBoundingClientRect().bottom <= line : false;
            const atFooter = footer ? footer.getBoundingClientRect().top <= line : false;
            if (pastHero && !atFooter) wrap.dataset.tone = "accent";
            else delete wrap.dataset.tone;
        };
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        return () => {
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
            if (frame) cancelAnimationFrame(frame);
            delete wrap.dataset.tone;
        };
    }, [heroSelector, footerSelector]);

    return <span ref={ref} hidden />;
};
