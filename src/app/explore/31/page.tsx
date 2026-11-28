import { DM_Sans, Libre_Franklin } from "next/font/google";
import { RoundFive } from "@/components/explore/round5";
import { exMetadata } from "@/components/explore/shared";
import { cx } from "@/utils/cx";

const displayFont = Libre_Franklin({ subsets: ["latin"], variable: "--font-ex31d", display: "swap" });
const bodyFont = DM_Sans({ subsets: ["latin"], variable: "--font-ex31", display: "swap" });

export const metadata = exMetadata("Working version");

/** The working version chosen on 2026-11-25. Iterate here. */
export default function Direction() {
    return (
        <RoundFive
            n={31}
            fonts={cx(displayFont.variable, bodyFont.variable)}
            display="font-extrabold tracking-[-0.02em]"
            grid="offset"
            lead="top"
            rows="three"
            casesFirst
            inlineStat
            titleFirst
            unifiedType
            heroVh={90}
            scrollTone
            heroCaps="max-w-[80%] max-lg:max-w-none font-black tracking-[-0.025em] leading-[0.88] text-[clamp(2.75rem,8.2vw,9rem)]"
            tone={{ preset: "newspaper", size: 0.01, type: "classic", grid: "square" }}
            capsClose
            casePath="/explore/31"
        />
    );
}
