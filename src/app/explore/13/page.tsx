import { Hanken_Grotesk, Literata } from "next/font/google";
import { RoundThree } from "@/components/explore/round3";
import { exMetadata } from "@/components/explore/shared";
import { cx } from "@/utils/cx";

const displayFont = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-ex13d", display: "swap" });
const bodyFont = Literata({ subsets: ["latin"], variable: "--font-ex13", display: "swap" });

export const metadata = exMetadata("Oxblood and blush");

export default function Direction() {
    return <RoundThree n={13} fonts={cx(displayFont.variable, bodyFont.variable)} display="font-extrabold tracking-[-0.015em]" hero="split" grid="bento" footer="links" />;
}
