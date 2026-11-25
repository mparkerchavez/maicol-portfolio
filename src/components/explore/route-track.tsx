"use client";

import { type ReactNode, useEffect, useRef } from "react";

/**
 * Direction 1. A route line that fills as the visitor scrolls, and marks each station
 * ([data-station]) as reached once the line passes it. Reduced motion: drawn in full.
 */
export const RouteTrack = ({ children }: { children: ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const root = ref.current;
        const fill = fillRef.current;
        if (!root || !fill) return;
        const stations = Array.from(root.querySelectorAll<HTMLElement>("[data-station]"));
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) {
            fill.style.transform = "scaleY(1)";
            stations.forEach((s) => (s.dataset.reached = "true"));
            return;
        }
        let frame = 0;
        const update = () => {
            frame = 0;
            const rect = root.getBoundingClientRect();
            const head = window.innerHeight * 0.6;
            const progress = Math.min(1, Math.max(0, (head - rect.top) / rect.height));
            fill.style.transform = `scaleY(${progress})`;
            stations.forEach((s) => {
                s.dataset.reached = s.getBoundingClientRect().top < head ? "true" : "false";
            });
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <div ref={ref} className="relative">
            <div aria-hidden="true" className="ex1-track">
                <div ref={fillRef} className="ex1-fill" />
            </div>
            {children}
        </div>
    );
};
