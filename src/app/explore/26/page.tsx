import { Geist, Libre_Franklin } from "next/font/google";
import { RoundFive } from "@/components/explore/round5";
import { exMetadata } from "@/components/explore/shared";
import { cx } from "@/utils/cx";

const displayFont = Libre_Franklin({ subsets: ["latin"], variable: "--font-ex26d", display: "swap" });
const bodyFont = Geist({ subsets: ["latin"], variable: "--font-ex26", display: "swap" });

export const metadata = exMetadata("Geist body");

export default function Direction() {
    return (
        <RoundFive
            n={26}
            fonts={cx(displayFont.variable, bodyFont.variable)}
            display="font-extrabold tracking-[-0.02em]"
            grid="offset"
            lead="top"
            rows="two"
            heroCaps="font-extrabold tracking-[-0.015em] leading-[0.92] text-[clamp(2.75rem,6.6vw,7rem)]"
            tone={{ size: 0.3, type: "classic", grid: "hex" }}
        />
    );
}
