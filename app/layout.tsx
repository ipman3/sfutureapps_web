import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "Professional Website Design &amp; Development",
    template: "%s — sFuture Apps",
  },
  description: "sFuture Apps — Professional Website Design &amp; Development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
