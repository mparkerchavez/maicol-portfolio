import { Inter_Tight, Inter } from "next/font/google";
import { RoundThree } from "@/components/explore/round3";
import { exMetadata } from "@/components/explore/shared";
import { cx } from "@/utils/cx";

const displayFont = Inter_Tight({ subsets: ["latin"], variable: "--font-ex15d", display: "swap" });
const bodyFont = Inter({ subsets: ["latin"], variable: "--font-ex15", display: "swap" });

export const metadata = exMetadata("One hue");

export default function Direction() {
    return <RoundThree n={15} fonts={cx(displayFont.variable, bodyFont.variable)} display="font-bold tracking-[-0.015em]" hero="split" heroBox grid="rows" footer="title" />;
}
