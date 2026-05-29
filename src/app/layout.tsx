import type { Metadata } from "next";
import "./globals.css";
import { LlamitaPlaceholder } from "@/components/site/llamita-placeholder";
import { getIdleObservationContent } from "@/lib/llamita-observations";

export const metadata: Metadata = {
  title: "Maicol Parker-Chavez",
  description: "AI product strategist portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const idleObservations = getIdleObservationContent();

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {children}
        <LlamitaPlaceholder idleObservations={idleObservations} />
      </body>
    </html>
  );
}
