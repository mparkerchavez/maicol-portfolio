import { Albert_Sans, Newsreader } from "next/font/google";
import { RoundThree } from "@/components/explore/round3";
import { exMetadata } from "@/components/explore/shared";
import { cx } from "@/utils/cx";

const displayFont = Albert_Sans({ subsets: ["latin"], variable: "--font-ex12d", display: "swap" });
const bodyFont = Newsreader({ subsets: ["latin"], variable: "--font-ex12", display: "swap" });

export const metadata = exMetadata("Two-tone blocks");

export default function Direction() {
    return <RoundThree n={12} fonts={cx(displayFont.variable, bodyFont.variable)} display="font-extrabold tracking-[-0.015em]" hero="stack" heroBox grid="bento" footer="title" />;
}
