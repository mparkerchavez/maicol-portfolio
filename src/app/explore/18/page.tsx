import { Libre_Franklin } from "next/font/google";
import { RoundFour } from "@/components/explore/round4";
import { exMetadata } from "@/components/explore/shared";
import { cx } from "@/utils/cx";

const displayFont = Libre_Franklin({ subsets: ["latin"], variable: "--font-ex18d", display: "swap" });


export const metadata = exMetadata("Sapphire and jade");

export default function Direction() {
    return <RoundFour n={18} fonts={cx(displayFont.variable)} display="font-extrabold tracking-[-0.02em]" grid="even" lead="top" />;
}
