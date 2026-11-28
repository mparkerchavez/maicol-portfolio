"use client";

import { useEffect, useRef, useState } from "react";
import { HalftoneCmyk, HalftoneDots } from "@paper-design/shaders-react";
import { cx } from "@/utils/cx";

/**
 * Settings for the newspaper look, built on Paper's Halftone CMYK shader.
 * `cellPx` replaces the shader's relative `size`: it is the dot pitch in CSS pixels,
 * so dots stay the same size on screen whether the image is a full-width lead or a small card.
 */
export type NewspaperSettings = {
    /** Dot pitch in CSS pixels. Larger means fewer, bigger dots. */
    cellPx: number;
    /** Contrast before the image is screened, 0 to 2. */
    contrast: number;
    /** Dot edge softness, 0 to 1. */
    softness: number;
    /** Jitter on dot positions and color sampling, 0 to 1. */
    gridNoise: number;
    /** Paper grain on top of the result, 0 to 1. */
    grainOverlay: number;
    /** Grain that changes dot size, 0 to 1. */
    grainMixer: number;
    /** Grain scale, 0 to 1. Applies when grainOverlay or grainMixer is above 0. */
    grainSize: number;
    type: "dots" | "ink" | "sharp";
    colorBack: string;
    colorC: string;
    colorM: string;
    colorY: string;
    colorK: string;
    /** Proportional dot size per channel, -1 to 1. */
    gainC: number;
    gainM: number;
    gainY: number;
    gainK: number;
    /** Flat dot size added to every cell per channel, 0 to 1. */
    floodC: number;
    floodM: number;
    floodY: number;
    floodK: number;
};

/**
 * Tuned from Paper's Newspaper preset so small images stay readable:
 * dots held at a fixed pixel pitch, lower contrast and jitter, and three distinct grays
 * for C, M, and Y so hue differences survive as tone differences.
 */
export const newspaperDefaults: NewspaperSettings = {
    cellPx: 2,
    contrast: 1,
    softness: 1,
    gridNoise: 0.1,
    grainOverlay: 0.1,
    grainMixer: 0,
    grainSize: 0,
    type: "sharp",
    colorBack: "#f2f1e8",
    colorC: "#6f6f6a",
    colorM: "#878782",
    colorY: "#a3a39e",
    colorK: "#231f20",
    gainC: -0.4,
    gainM: -0.2,
    gainY: -0.2,
    gainK: -0.3,
    floodC: 0,
    floodM: 0,
    floodY: 0,
    floodK: 0.2,
};

export type HalftoneTone =
    | {
          /** Paper's Halftone CMYK shader. `settings` overrides any of the defaults above. */
          preset: "newspaper";
          settings?: Partial<NewspaperSettings>;
      }
    | {
          preset?: undefined;
          /** Grid size relative to the image box, 0 to 1. Smaller is finer. */
          size: number;
          type: "classic" | "gooey" | "holes" | "soft";
          grid: "square" | "hex";
          radius?: number;
          contrast?: number;
      };

/**
 * The shader sets dot rows per image height as mix(400, 7, size^0.7).
 * Invert that so each dot is `cellPx` CSS pixels on screen.
 * With fit="cover", the image is drawn at least as tall as the box, and taller when the box is wider than the image.
 */
const sizeForPitch = (boxW: number, boxH: number, imageAspect: number, cellPx: number) => {
    const drawnHeight = Math.max(boxH, boxW / imageAspect);
    const cells = Math.min(400, Math.max(7, drawnHeight / Math.max(cellPx, 0.5)));
    return Math.pow((400 - cells) / 393, 1 / 0.7);
};

const fill = { position: "absolute", inset: 0, width: "100%", height: "100%" } as const;

/**
 * Black and white halftone rendering of a photo, using Paper's shaders.
 * A grayscale copy of the photo sits underneath, so the image still shows if WebGL is unavailable.
 */
export const Halftone = ({ src, alt, tone, className }: { src: string; alt: string; tone: HalftoneTone; className?: string }) => {
    const url = `/_next/image?url=${encodeURIComponent(src)}&w=1920&q=75`;
    const boxRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [box, setBox] = useState<{ w: number; h: number } | null>(null);
    const [aspect, setAspect] = useState(16 / 9);
    const newspaper = tone.preset === "newspaper";

    useEffect(() => {
        if (!newspaper) return;
        const el = boxRef.current;
        if (!el) return;
        const img = imgRef.current;
        if (img?.complete && img.naturalHeight) setAspect(img.naturalWidth / img.naturalHeight);
        const observer = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            if (width && height) setBox({ w: width, h: height });
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, [newspaper]);

    const onLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalHeight) setAspect(naturalWidth / naturalHeight);
    };

    let shader: React.ReactNode = null;
    if (tone.preset === "newspaper") {
        // Wait for the first measurement so the dots never flash at the wrong size.
        if (box) {
            const { cellPx, ...rest } = { ...newspaperDefaults, ...tone.settings };
            shader = <HalftoneCmyk image={url} fit="cover" speed={0} size={sizeForPitch(box.w, box.h, aspect, cellPx)} {...rest} style={fill} />;
        }
    } else {
        shader = (
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
                style={fill}
            />
        );
    }

    return (
        <div ref={boxRef} role="img" aria-label={alt} className={cx("r4-photo relative aspect-video w-full overflow-hidden", className)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={imgRef} src={url} alt="" aria-hidden="true" onLoad={onLoad} className="absolute inset-0 size-full object-cover grayscale" />
            {shader}
        </div>
    );
};
