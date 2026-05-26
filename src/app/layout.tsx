import type { Metadata } from "next";
import "./globals.css";
import { LlamitaPlaceholder } from "@/components/site/llamita-placeholder";

export const metadata: Metadata = {
  title: "Maicol Parker-Chavez",
  description: "AI product strategist portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {children}
        <LlamitaPlaceholder />
      </body>
    </html>
  );
}
