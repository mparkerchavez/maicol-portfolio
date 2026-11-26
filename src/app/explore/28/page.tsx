import { Instrument_Sans, Libre_Franklin } from "next/font/google";
import { RoundFive } from "@/components/explore/round5";
import { exMetadata } from "@/components/explore/shared";
import { cx } from "@/utils/cx";

const displayFont = Libre_Franklin({ subsets: ["latin"], variable: "--font-ex28d", display: "swap" });
const bodyFont = Instrument_Sans({ subsets: ["latin"], variable: "--font-ex28", display: "swap" });

export const metadata = exMetadata("Instrument Sans body");

export default function Direction() {
    return (
        <RoundFive
            n={28}
            fonts={cx(displayFont.variable, bodyFont.variable)}
            display="font-extrabold tracking-[-0.02em]"
            grid="offset"
            lead="top"
            rows="two"
            heroCaps="font-black tracking-[-0.02em] leading-[0.92] text-[clamp(2.75rem,6.6vw,7rem)]"
            tone={{ size: 0.3, type: "classic", grid: "square" }}
        />
    );
}
