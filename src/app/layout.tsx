import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const syne = localFont({
  src: [
    { path: "../fonts/syne/static/Syne-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/syne/static/Syne-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/syne/static/Syne-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/syne/static/Syne-Bold.ttf", weight: "700", style: "normal" },
    { path: "../fonts/syne/static/Syne-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-syne",
  display: "swap",
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
