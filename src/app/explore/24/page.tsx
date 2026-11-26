import { Libre_Franklin } from "next/font/google";
import { RoundFive } from "@/components/explore/round5";
import { exMetadata } from "@/components/explore/shared";
import { cx } from "@/utils/cx";

const displayFont = Libre_Franklin({ subsets: ["latin"], variable: "--font-ex24d", display: "swap" });


export const metadata = exMetadata("White, all bold");

export default function Direction() {
    return <RoundFive n={24} fonts={cx(displayFont.variable)} display="font-extrabold tracking-[-0.02em]" grid="even" lead="top" rows="four" boldBody />;
}
