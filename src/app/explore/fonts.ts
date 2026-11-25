import { Bricolage_Grotesque, Hanken_Grotesk, Instrument_Sans, Onest, Schibsted_Grotesk } from "next/font/google";

export const ex1Font = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-ex1", display: "swap" });
export const ex2Font = Instrument_Sans({ subsets: ["latin"], variable: "--font-ex2", display: "swap", axes: ["wdth"] });
export const ex3Font = Onest({ subsets: ["latin"], variable: "--font-ex3", display: "swap" });
export const ex4Font = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-ex4", display: "swap" });
export const ex5Font = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-ex5", display: "swap", axes: ["opsz", "wdth"] });
