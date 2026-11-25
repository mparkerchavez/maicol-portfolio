import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { RouteProvider } from "@/providers/router-provider";
import "@/styles/globals.css";
import { cx } from "@/utils/cx";

const uncut = localFont({
    src: [
        { path: "./fonts/UncutSans-Light.woff2", weight: "300", style: "normal" },
        { path: "./fonts/UncutSans-Regular.woff2", weight: "400", style: "normal" },
        { path: "./fonts/UncutSans-Bold.woff2", weight: "600 700", style: "normal" },
    ],
    display: "swap",
    variable: "--font-uncut",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://maicolparkerchavez.com"),
    title: "Maicol Parker-Chavez | Product Manager, AI Products",
    description:
        "Product manager for AI products. I turn AI ambiguity into products people adopt and leaders believe in.",
    openGraph: {
        title: "Maicol Parker-Chavez | Product Manager, AI Products",
        description: "I turn AI ambiguity into products people adopt and leaders believe in.",
        url: "https://maicolparkerchavez.com",
        type: "website",
    },
};

export const viewport: Viewport = {
    themeColor: "#131210",
    colorScheme: "light",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={cx(uncut.variable, "light-mode")}>
            <body className="bg-primary antialiased">
                <RouteProvider>
                    {children}
                </RouteProvider>
            </body>
        </html>
    );
}
