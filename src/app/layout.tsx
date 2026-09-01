import type { Metadata } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { VERSION } from "@/lib/arc";

/* Archivo carries a width axis, so headlines can run slightly expanded —
   machined rather than editorial. Inter sets text; JetBrains Mono is the
   font ARC's own terminal ships with, so it does all the data and labels. */
const display = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["wdth"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arc.dev"),
  title: {
    default: "ARC — a terminal, editor and git workspace",
    template: "%s — ARC",
  },
  description:
    "An open-source desktop workspace built on a real PTY. Terminal, editor, git, SSH, databases and a REST client in one window. Built with Tauri, Rust and React. MIT licensed.",
  keywords: [
    "terminal emulator",
    "code editor",
    "git client",
    "Tauri",
    "Rust",
    "developer workspace",
    "SSH client",
    "open source",
  ],
  openGraph: {
    title: "ARC — a terminal, editor and git workspace",
    description:
      "Terminal, editor, git, SSH, databases and a REST client in one window. Open source, built with Tauri and Rust.",
    type: "website",
    siteName: "ARC",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARC — a terminal, editor and git workspace",
    description: "One window for the terminal, the editor and the whole git history. MIT licensed.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-void"
        >
          Skip to content
        </a>
        <Navigation version={VERSION} />
        <main id="main" className="relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
