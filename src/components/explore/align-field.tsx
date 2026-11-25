"use client";

import { useEffect, useRef } from "react";

/**
 * Direction 9. A field of short marks. At rest they point every which way; near a focal point they line up.
 * "pointer" mode follows the cursor (and drifts slowly when there is none). "target" mode lines up on the
 * element marked [data-field-target] inside the same section. Decorative only. Reduced motion draws one still frame.
 */
export const AlignField = ({ mode = "pointer", color = "#f4f2ec", accent = "#ff8a4c" }: { mode?: "pointer" | "target"; color?: string; accent?: string }) => {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        const host = canvas?.parentElement;
        if (!canvas || !host) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const GAP = 30;
        const LEN = 11;
        let w = 0;
        let h = 0;
        let marks: { x: number; y: number; base: number; a: number }[] = [];
        let pointer: { x: number; y: number } | null = null;
        let raf = 0;
        let visible = true;

        const seeded = (i: number) => {
            const v = Math.sin(i * 127.1 + 311.7) * 43758.5453;
            return v - Math.floor(v);
        };

        const resize = () => {
            const rect = host.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = rect.width;
            h = rect.height;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            marks = [];
            let i = 0;
            for (let y = GAP / 2; y < h; y += GAP) {
                for (let x = GAP / 2; x < w; x += GAP) {
                    const base = seeded(i++) * Math.PI;
                    marks.push({ x, y, base, a: base });
                }
            }
        };

        const focal = (t: number) => {
            if (mode === "target") {
                const el = host.querySelector<HTMLElement>("[data-field-target]");
                if (el) {
                    const a = el.getBoundingClientRect();
                    const b = host.getBoundingClientRect();
                    return { x: a.left - b.left + a.width / 2, y: a.top - b.top + a.height / 2 };
                }
            }
            if (pointer) return pointer;
            return { x: w * (0.68 + 0.18 * Math.sin(t / 5200)), y: h * (0.5 + 0.28 * Math.sin(t / 3700 + 1)) };
        };

        const draw = (t: number, settle: boolean) => {
            const f = focal(t);
            const radius = mode === "target" ? Math.max(w, h) * 0.75 : 300;
            ctx.clearRect(0, 0, w, h);
            ctx.lineWidth = 1.5;
            ctx.lineCap = "round";
            for (const m of marks) {
                const dx = f.x - m.x;
                const dy = f.y - m.y;
                const d = Math.hypot(dx, dy);
                const pull = Math.max(0, 1 - d / radius);
                const eased = pull * pull * (3 - 2 * pull);
                let toward = Math.atan2(dy, dx);
                // Marks have no direction, so compare angles modulo a half turn.
                let diff = toward - m.base;
                diff = Math.atan2(Math.sin(2 * diff), Math.cos(2 * diff)) / 2;
                toward = m.base + diff * eased;
                m.a = settle ? toward : m.a + (toward - m.a) * 0.12;
                const cx = Math.cos(m.a) * (LEN / 2);
                const cy = Math.sin(m.a) * (LEN / 2);
                ctx.strokeStyle = eased > 0.55 ? accent : color;
                ctx.globalAlpha = 0.22 + eased * 0.6;
                ctx.beginPath();
                ctx.moveTo(m.x - cx, m.y - cy);
                ctx.lineTo(m.x + cx, m.y + cy);
                ctx.stroke();
            }
            ctx.globalAlpha = 1;
        };

        const loop = (t: number) => {
            if (visible) draw(t, false);
            raf = requestAnimationFrame(loop);
        };

        const onMove = (e: PointerEvent) => {
            const b = host.getBoundingClientRect();
            pointer = { x: e.clientX - b.left, y: e.clientY - b.top };
        };
        const onLeave = () => {
            pointer = null;
        };

        resize();
        draw(0, true);
        const ro = new ResizeObserver(() => {
            resize();
            draw(performance.now(), true);
        });
        ro.observe(host);
        const io = new IntersectionObserver(([e]) => {
            visible = e.isIntersecting;
        });
        io.observe(host);

        if (!reduce) {
            if (mode === "pointer") {
                host.addEventListener("pointermove", onMove);
                host.addEventListener("pointerleave", onLeave);
            }
            raf = requestAnimationFrame(loop);
        }
        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            io.disconnect();
            host.removeEventListener("pointermove", onMove);
            host.removeEventListener("pointerleave", onLeave);
        };
    }, [mode, color, accent]);

    return <canvas ref={ref} aria-hidden="true" data-mode={mode} className="ex9-canvas" />;
};
