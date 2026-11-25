"use client";

import { type ReactNode, useEffect, useRef } from "react";

/** Fades and lifts its children into view once they scroll on screen. */
export const Reveal = ({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.dataset.reveal = "visible";
                    io.disconnect();
                }
            },
            { rootMargin: "0px 0px -10% 0px" },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div ref={ref} data-reveal="" className={className} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
            {children}
        </div>
    );
};

/** Splits a word into letters that start scattered and settle into place. */
export const SettleWord = ({ word, baseDelay = 200 }: { word: string; baseDelay?: number }) => {
    const offsets = [
        [-14, 10, -12],
        [10, -16, 9],
        [-6, 18, 6],
        [16, -8, -10],
        [-12, -14, 12],
        [8, 14, -7],
        [-16, 6, 10],
        [12, -12, -9],
        [-8, 16, 7],
    ];
    return (
        <span className="inline-block whitespace-nowrap" aria-label={word}>
            {word.split("").map((ch, i) => {
                const [dx, dy, dr] = offsets[i % offsets.length];
                return (
                    <span
                        key={i}
                        aria-hidden="true"
                        className="inline-block animate-settle"
                        style={
                            {
                                "--dx": `${dx}px`,
                                "--dy": `${dy}px`,
                                "--dr": `${dr}deg`,
                                animationDelay: `${baseDelay + i * 70}ms`,
                            } as React.CSSProperties
                        }
                    >
                        {ch}
                    </span>
                );
            })}
        </span>
    );
};
