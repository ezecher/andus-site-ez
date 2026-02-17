import type { Metadata } from "next";
import { Archivo, Syne } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Andus Labs",
    template: "%s | Andus Labs",
  },
  description:
    "We solve the human side of AI. People drive transformation, not technology.",
  openGraph: {
    title: "Andus Labs",
    description: "We solve the human side of AI.",
    url: "https://anduslabs.com",
    siteName: "Andus Labs",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} ${syne.variable} font-body bg-cream text-violet antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
