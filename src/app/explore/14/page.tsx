import { Newsreader, Geist } from "next/font/google";
import { RoundThree } from "@/components/explore/round3";
import { exMetadata } from "@/components/explore/shared";
import { cx } from "@/utils/cx";

const displayFont = Newsreader({ subsets: ["latin"], variable: "--font-ex14d", display: "swap" });
const bodyFont = Geist({ subsets: ["latin"], variable: "--font-ex14", display: "swap" });

export const metadata = exMetadata("Ivory press");

export default function Direction() {
    return <RoundThree n={14} fonts={cx(displayFont.variable, bodyFont.variable)} display="font-medium tracking-[-0.02em]" hero="stack" grid="offset" footer="title" />;
}
