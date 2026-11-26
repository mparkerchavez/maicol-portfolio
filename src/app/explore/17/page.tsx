import { Libre_Franklin, Source_Serif_4 } from "next/font/google";
import { RoundFour } from "@/components/explore/round4";
import { exMetadata } from "@/components/explore/shared";
import { cx } from "@/utils/cx";

const displayFont = Libre_Franklin({ subsets: ["latin"], variable: "--font-ex17d", display: "swap" });
const bodyFont = Source_Serif_4({ subsets: ["latin"], variable: "--font-ex17", display: "swap" });

export const metadata = exMetadata("Red and lime");

export default function Direction() {
    return <RoundFour n={17} fonts={cx(displayFont.variable, bodyFont.variable)} display="font-black tracking-[-0.025em]" grid="offset" lead="side" />;
}
