import { type Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SyncUser from "@/components/SyncUser";
import { Providers } from "@/components/Providers";
import { StarsBackground } from "@/components/ui/stars-background";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PostRaft",
  description: "Get started to schedule your sociall media posts with PostRaft.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black relative `}
          >
            {/* 🌌 Background stars */}
            <StarsBackground
              starDensity={0.0009}
              allStarsTwinkle={true}
              twinkleProbability={0.7}
              minTwinkleSpeed={0.5}
              maxTwinkleSpeed={1}
              className="absolute inset-0 h-full w-full z-0"
            />

            {/* 🧱 Foreground content wrapper */}
            <div className="relative z-10 flex flex-col">
              {/* 🧭 Navbar */}
              <header className="flex justify-end items-center p-4 gap-4 h-16">
                <Navbar />
              </header>

              {/* 📦 Page-specific content */}
              <main className="flex-grow">{children}</main>

              <footer>
                <Footer />
              </footer>
            </div>
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
