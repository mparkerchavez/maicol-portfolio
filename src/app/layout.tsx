import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { RouteProvider } from "@/providers/router-provider";
import "@/styles/globals.css";
import { cx } from "@/utils/cx";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
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
    themeColor: "#ffffff",
    colorScheme: "light",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="light-mode">
            <body className={cx(inter.variable, "bg-primary antialiased")}>
                <RouteProvider>
                    {children}
                </RouteProvider>
            </body>
        </html>
    );
}
