"use client";

import { useEffect, useRef } from "react";

type Dot = { tx: number; ty: number; sx: number; sy: number; x: number; y: number; ox: number; oy: number; delay: number; a: number };

const SPACING = 30;
const SETTLE_MS = 2200;
const PATH_MS = 1400;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * "Connecting the dots": a field of scattered dots that settles into order,
 * then a single orange path connects a handful of them. Dots near the pointer drift aside.
 */
export const DotField = ({ className }: { className?: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let dots: Dot[] = [];
        let path: number[] = [];
        let w = 0;
        let h = 0;
        let start = performance.now();
        let raf = 0;
        let pointer = { x: -9999, y: -9999 };
        let rand = mulberry32(7);

        const build = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = canvas.getBoundingClientRect();
            w = rect.width;
            h = rect.height;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            rand = mulberry32(7);
            const cols = Math.ceil(w / SPACING) + 1;
            const rows = Math.ceil(h / SPACING) + 1;
            const offX = (w - (cols - 1) * SPACING) / 2;
            const offY = (h - (rows - 1) * SPACING) / 2;
            dots = [];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const tx = offX + c * SPACING;
                    const ty = offY + r * SPACING;
                    const spread = 90 + rand() * 140;
                    const ang = rand() * Math.PI * 2;
                    dots.push({
                        tx,
                        ty,
                        sx: tx + Math.cos(ang) * spread,
                        sy: ty + Math.sin(ang) * spread,
                        x: tx,
                        y: ty,
                        ox: 0,
                        oy: 0,
                        delay: (1 - tx / Math.max(w, 1)) * 500 + rand() * 500,
                        a: 0.22 + rand() * 0.3,
                    });
                }
            }

            // A rising path across the right half of the field.
            path = [];
            const steps = 7;
            for (let i = 0; i < steps; i++) {
                const fx = 0.56 + (i / (steps - 1)) * 0.38;
                const fy = 0.78 - (i / (steps - 1)) * 0.5 + (i % 2 === 0 ? 0.06 : -0.04);
                const c = Math.round((fx * w - offX) / SPACING);
                const r = Math.round((fy * h - offY) / SPACING);
                const idx = Math.max(0, Math.min(rows - 1, r)) * cols + Math.max(0, Math.min(cols - 1, c));
                if (!path.includes(idx)) path.push(idx);
            }
        };

        const draw = (now: number) => {
            const elapsed = reduce ? Infinity : now - start;
            ctx.clearRect(0, 0, w, h);
            let moving = false;

            for (const d of dots) {
                const t = Math.max(0, Math.min(1, (elapsed - d.delay) / SETTLE_MS));
                const e = easeOut(t);
                if (t < 1) moving = true;

                // Pointer repulsion with spring back.
                const dx = d.tx - pointer.x;
                const dy = d.ty - pointer.y;
                const dist = Math.hypot(dx, dy);
                const radius = 110;
                let goalX = 0;
                let goalY = 0;
                if (dist < radius && dist > 0.01) {
                    const force = (1 - dist / radius) * 18;
                    goalX = (dx / dist) * force;
                    goalY = (dy / dist) * force;
                }
                d.ox += (goalX - d.ox) * 0.15;
                d.oy += (goalY - d.oy) * 0.15;
                if (Math.abs(d.ox - goalX) > 0.05 || Math.abs(d.oy - goalY) > 0.05) moving = true;

                d.x = d.sx + (d.tx - d.sx) * e + d.ox;
                d.y = d.sy + (d.ty - d.sy) * e + d.oy;

                ctx.globalAlpha = d.a * (0.25 + 0.75 * e);
                ctx.fillStyle = "rgb(211 204 192)";
                ctx.beginPath();
                ctx.arc(d.x, d.y, 1.4, 0, Math.PI * 2);
                ctx.fill();
            }

            // Connect the dots once the field has settled.
            const pathT = Math.max(0, Math.min(1, (elapsed - SETTLE_MS - 300) / PATH_MS));
            if (pathT < 1) moving = true;
            if (pathT > 0 && path.length > 1) {
                const pts = path.map((i) => dots[i]).filter(Boolean);
                const segs = pts.length - 1;
                const progress = easeOut(pathT) * segs;
                // On narrower screens the path sits behind the copy, so it stays quiet there.
                const pathAlpha = w >= 1200 ? 1 : 0.35;
                ctx.globalAlpha = 0.9 * pathAlpha;
                ctx.strokeStyle = "rgb(249 117 75)";
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(pts[0].x, pts[0].y);
                for (let i = 1; i <= segs; i++) {
                    const p = pts[i];
                    const prev = pts[i - 1];
                    const local = Math.max(0, Math.min(1, progress - (i - 1)));
                    if (local <= 0) break;
                    ctx.lineTo(prev.x + (p.x - prev.x) * local, prev.y + (p.y - prev.y) * local);
                }
                ctx.stroke();

                pts.forEach((p, i) => {
                    if (progress < i - 0.001) return;
                    ctx.globalAlpha = pathAlpha;
                    ctx.fillStyle = "rgb(249 117 75)";
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, i === pts.length - 1 ? 4.5 : 3, 0, Math.PI * 2);
                    ctx.fill();
                });
            }
            ctx.globalAlpha = 1;

            raf = moving ? requestAnimationFrame(draw) : 0;
        };

        const kick = () => {
            if (!raf) raf = requestAnimationFrame(draw);
        };

        const onMove = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
            kick();
        };
        const onLeave = () => {
            pointer = { x: -9999, y: -9999 };
            kick();
        };

        build();
        start = performance.now();
        kick();

        const ro = new ResizeObserver(() => {
            build();
            start = performance.now() - SETTLE_MS - PATH_MS - 1000;
            kick();
        });
        ro.observe(canvas);
        const host = canvas.parentElement;
        if (!reduce) {
            host?.addEventListener("pointermove", onMove);
            host?.addEventListener("pointerleave", onLeave);
        }

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            host?.removeEventListener("pointermove", onMove);
            host?.removeEventListener("pointerleave", onLeave);
        };
    }, []);

    return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
};

function mulberry32(seed: number) {
    let a = seed;
    return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
