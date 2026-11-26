import { DM_Sans, Libre_Franklin } from "next/font/google";
import { RoundFive } from "@/components/explore/round5";
import { exMetadata } from "@/components/explore/shared";
import { cx } from "@/utils/cx";

const displayFont = Libre_Franklin({ subsets: ["latin"], variable: "--font-ex30d", display: "swap" });
const bodyFont = DM_Sans({ subsets: ["latin"], variable: "--font-ex30", display: "swap" });

export const metadata = exMetadata("DM Sans body");

export default function Direction() {
    return (
        <RoundFive
            n={30}
            fonts={cx(displayFont.variable, bodyFont.variable)}
            display="font-extrabold tracking-[-0.02em]"
            grid="offset"
            lead="top"
            rows="two"
            heroCaps="font-black tracking-[-0.025em] leading-[0.88] text-[clamp(2.75rem,8.2vw,9rem)]"
            tone={{ size: 0.42, type: "classic", grid: "square" }}
            capsClose
        />
    );
}
