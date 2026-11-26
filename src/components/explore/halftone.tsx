"use client";

import { HalftoneCmyk, HalftoneDots } from "@paper-design/shaders-react";
import { cx } from "@/utils/cx";

/** Paper's Halftone CMYK shader with its Newspaper preset values. */
const newspaper = {
    colorBack: "#f2f1e8",
    colorC: "#7a7a75",
    colorM: "#7a7a75",
    colorY: "#7a7a75",
    colorK: "#231f20",
    size: 0.01,
    contrast: 2,
    softness: 0.2,
    grainSize: 0,
    grainMixer: 0,
    grainOverlay: 0.2,
    gridNoise: 0.6,
    floodC: 0,
    floodM: 0,
    floodY: 0,
    floodK: 0.1,
    gainC: -0.17,
    gainM: -0.45,
    gainY: -0.45,
    gainK: 0,
    type: "dots",
} as const;

export type HalftoneTone = {
    /** "newspaper" uses the Halftone CMYK shader and ignores the dot settings below. */
    preset?: "newspaper";
    /** Grid size relative to the image box, 0 to 1. Smaller is finer. */
    size: number;
    type: "classic" | "gooey" | "holes" | "soft";
    grid: "square" | "hex";
    radius?: number;
    contrast?: number;
};

/**
 * Black and white halftone rendering of a photo, using Paper's Halftone Dots shader.
 * A grayscale copy of the photo sits underneath, so the image still shows if WebGL is unavailable.
 */
export const Halftone = ({ src, alt, tone, className }: { src: string; alt: string; tone: HalftoneTone; className?: string }) => {
    const url = `/_next/image?url=${encodeURIComponent(src)}&w=1920&q=75`;
    return (
        <div role="img" aria-label={alt} className={cx("r4-photo relative aspect-video w-full overflow-hidden", className)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover grayscale" />
            {tone.preset === "newspaper" ? (
                <HalftoneCmyk image={url} fit="cover" speed={0} {...newspaper} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            ) : (
                <HalftoneDots
                    image={url}
                    fit="cover"
                    colorBack="#fafaf8"
                    colorFront="#111111"
                    originalColors={false}
                    inverted={false}
                    size={tone.size}
                    type={tone.type}
                    grid={tone.grid}
                    radius={tone.radius ?? 1.1}
                    contrast={tone.contrast ?? 0.5}
                    grainMixer={0}
                    grainOverlay={0}
                    grainSize={0.5}
                    speed={0}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                />
            )}
        </div>
    );
};
