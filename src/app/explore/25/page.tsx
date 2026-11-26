import { Libre_Franklin, Source_Serif_4 } from "next/font/google";
import { RoundFive } from "@/components/explore/round5";
import { exMetadata } from "@/components/explore/shared";
import { cx } from "@/utils/cx";

const displayFont = Libre_Franklin({ subsets: ["latin"], variable: "--font-ex25d", display: "swap" });
const bodyFont = Source_Serif_4({ subsets: ["latin"], variable: "--font-ex25", display: "swap" });

export const metadata = exMetadata("Red with a little lime");

export default function Direction() {
    return <RoundFive n={25} fonts={cx(displayFont.variable, bodyFont.variable)} display="font-extrabold tracking-[-0.02em]" grid="offset" lead="side" rows="two" />;
}
