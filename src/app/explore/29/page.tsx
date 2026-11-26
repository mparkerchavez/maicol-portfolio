import { IBM_Plex_Sans, Libre_Franklin } from "next/font/google";
import { RoundFive } from "@/components/explore/round5";
import { exMetadata } from "@/components/explore/shared";
import { cx } from "@/utils/cx";

const displayFont = Libre_Franklin({ subsets: ["latin"], variable: "--font-ex29d", display: "swap" });
const bodyFont = IBM_Plex_Sans({ subsets: ["latin"], variable: "--font-ex29", display: "swap" });

export const metadata = exMetadata("IBM Plex Sans body");

export default function Direction() {
    return (
        <RoundFive
            n={29}
            fonts={cx(displayFont.variable, bodyFont.variable)}
            display="font-extrabold tracking-[-0.02em]"
            grid="offset"
            lead="top"
            rows="four"
            heroCaps="font-extrabold tracking-[-0.015em] leading-[0.9] text-[clamp(2.75rem,7.4vw,8rem)]"
            tone={{ size: 0.18, type: "classic", grid: "hex", contrast: 0.6 }}
        />
    );
}
