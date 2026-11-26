import { Libre_Franklin, Source_Serif_4 } from "next/font/google";
import { RoundFour } from "@/components/explore/round4";
import { exMetadata } from "@/components/explore/shared";
import { cx } from "@/utils/cx";

const displayFont = Libre_Franklin({ subsets: ["latin"], variable: "--font-ex19d", display: "swap" });
const bodyFont = Source_Serif_4({ subsets: ["latin"], variable: "--font-ex19", display: "swap" });

export const metadata = exMetadata("Petrol tiles");

export default function Direction() {
    return <RoundFour n={19} fonts={cx(displayFont.variable, bodyFont.variable)} display="font-extrabold tracking-[-0.02em]" grid="offset" lead="side" />;
}
