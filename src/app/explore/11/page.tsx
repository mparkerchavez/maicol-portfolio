import { Libre_Franklin, Source_Serif_4 } from "next/font/google";
import { RoundThree } from "@/components/explore/round3";
import { exMetadata } from "@/components/explore/shared";
import { cx } from "@/utils/cx";

const displayFont = Libre_Franklin({ subsets: ["latin"], variable: "--font-ex11d", display: "swap" });
const bodyFont = Source_Serif_4({ subsets: ["latin"], variable: "--font-ex11", display: "swap" });

export const metadata = exMetadata("Front page");

export default function Direction() {
    return <RoundThree n={11} fonts={cx(displayFont.variable, bodyFont.variable)} display="font-extrabold tracking-[-0.02em]" hero="split" grid="rows" footer="links" />;
}
