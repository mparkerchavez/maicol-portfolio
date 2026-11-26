import { Inter, Libre_Franklin } from "next/font/google";
import { RoundFive } from "@/components/explore/round5";
import { exMetadata } from "@/components/explore/shared";
import { cx } from "@/utils/cx";

const displayFont = Libre_Franklin({ subsets: ["latin"], variable: "--font-ex27d", display: "swap" });
const bodyFont = Inter({ subsets: ["latin"], variable: "--font-ex27", display: "swap" });

export const metadata = exMetadata("Inter body");

export default function Direction() {
    return (
        <RoundFive
            n={27}
            fonts={cx(displayFont.variable, bodyFont.variable)}
            display="font-extrabold tracking-[-0.02em]"
            grid="offset"
            lead="top"
            rows="four"
            heroCaps="font-black tracking-[-0.02em] leading-[0.9] text-[clamp(2.75rem,7.4vw,8rem)]"
            tone={{ size: 0.5, type: "gooey", grid: "hex" }}
        />
    );
}
