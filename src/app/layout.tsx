import type { Metadata } from "next";
import { Lora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ARC — AI-Native Terminal for Modern Engineering",
  description:
    "Terminal, editor, agents, and orchestration — unified into one intelligent runtime. Built for developers who ship at the speed of thought.",
  keywords: [
    "AI terminal",
    "AI coding assistant",
    "AI developer tools",
    "agent runtime",
    "AI editor",
    "terminal for developers",
  ],
  authors: [{ name: "ARC Systems" }],
  openGraph: {
    title: "ARC — The AI-Native Operating Layer for Developers",
    description:
      "Terminal, editor, agents, and orchestration — unified into one intelligent runtime.",
    type: "website",
    siteName: "ARC",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARC — AI-Native Terminal",
    description:
      "Terminal, editor, agents, and orchestration — unified into one intelligent runtime.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lora.variable} ${inter.variable} ${mono.variable}`}>
      <body className="grain antialiased">
        {/* Edge vertical rails — running mark of the brand */}
        <div className="pointer-events-none fixed inset-y-0 left-4 z-[60] hidden lg:flex flex-col justify-between text-[10px] font-mono tracking-wider-mono uppercase text-silver-700">
          <span className="rotate-180 [writing-mode:vertical-rl]">ARC // SYS // v0.4.2</span>
          <span className="rotate-180 [writing-mode:vertical-rl]">RUNTIME // INDEX</span>
        </div>
        <div className="pointer-events-none fixed inset-y-0 right-4 z-[60] hidden lg:flex flex-col justify-between items-end text-[10px] font-mono tracking-wider-mono uppercase text-silver-700">
          <span className="[writing-mode:vertical-rl]">© 2026 — ENGINEERED IN THE OPEN</span>
          <span className="[writing-mode:vertical-rl]">BUILD · 8a7c9d2f</span>
        </div>

        <Navigation />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
